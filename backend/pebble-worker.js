/* =========================================================
   Pebble proxy — a tiny Cloudflare Worker that lets every visitor
   of Soft OS chat with Pebble using YOUR Groq key, without the key
   ever being sent to their browser.

   Setup (no installs needed, works from a Chromebook):
   1. dash.cloudflare.com → Workers & Pages → Create → Worker → Deploy
   2. Edit code → replace everything with this file → Deploy
   3. Settings → Variables and Secrets → Add → type "Secret",
      name GROQ_API_KEY, value = your gsk_… key → Deploy
   4. Copy the worker's URL (https://….workers.dev) into the app build.

   Optional plain-text variables:
   - ALLOWED_ORIGINS  e.g. "https://my-site.netlify.app,null"
                      ("null" = the app opened as a local file).
                      Empty = allow every site.
   - PER_MINUTE       requests per visitor per minute (default 8)
   - PER_DAY          requests per visitor per day (default 150)
   ========================================================= */
const GROQ = 'https://api.groq.com/openai/v1';
const MODELS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'];
const MAX_TOKENS = 1200;      // per answer (includes the model's hidden thinking)
const MAX_CHARS = 16000;      // whole conversation sent per request

// Simple per-visitor limits. They live in this worker instance's memory, so they
// are a speed bump against abuse, not a hard wall (Cloudflare may run several
// instances). Groq's own limits on your key are the hard wall.
const hits = new Map();
function limited(ip, perMin, perDay) {
  const now = Date.now();
  const h = hits.get(ip) ?? { min: [], dayStart: now, day: 0 };
  h.min = h.min.filter((t) => now - t < 60_000);
  if (now - h.dayStart > 86_400_000) { h.dayStart = now; h.day = 0; }
  if (h.min.length >= perMin || h.day >= perDay) { hits.set(ip, h); return true; }
  h.min.push(now); h.day++; hits.set(ip, h);
  if (hits.size > 20_000) hits.clear(); // keep memory bounded
  return false;
}

function cors(req, env) {
  const origin = req.headers.get('Origin') ?? '';
  const list = (env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const allow = !list.length ? '*' : list.includes(origin) ? origin : '';
  return {
    ...(allow ? { 'Access-Control-Allow-Origin': allow } : {}),
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}
const json = (body, status, headers) => new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json' } });
const err = (message, status, headers) => json({ error: { message } }, status, headers);

export default {
  async fetch(req, env) {
    const h = cors(req, env);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
    if (!h['Access-Control-Allow-Origin']) return err('This site is not allowed to use Pebble.', 403, h);
    if (!env.GROQ_API_KEY) return err('The Pebble server has no GROQ_API_KEY secret yet.', 500, h);
    const upstream = env.UPSTREAM || GROQ; // UPSTREAM only for local tests
    const path = new URL(req.url).pathname.replace(/\/+$/, '');

    // which models Pebble may use (no tokens spent)
    if (req.method === 'GET' && path.endsWith('/models')) return json({ object: 'list', data: MODELS.map((id) => ({ id, object: 'model' })) }, 200, h);

    if (req.method !== 'POST' || !path.endsWith('/chat/completions')) return err('Not found', 404, h);
    const ip = req.headers.get('CF-Connecting-IP') ?? 'unknown';
    if (limited(ip, Number(env.PER_MINUTE) || 8, Number(env.PER_DAY) || 150)) return err('Pebble is chatting with a lot of people right now. Wait a minute, then try again.', 429, h);

    let body;
    try { body = await req.json(); } catch { return err('Bad request', 400, h); }
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const chars = messages.reduce((n, m) => n + String(m?.content ?? '').length, 0);
    if (!messages.length || chars > MAX_CHARS || messages.some((m) => !['system', 'user', 'assistant'].includes(m?.role))) return err('That conversation is too long. Start a new chat.', 413, h);

    // only what Pebble needs is forwarded; everything else is fixed here
    const model = MODELS.includes(body.model) ? body.model : MODELS[0];
    const out = {
      model,
      messages: messages.map((m) => ({ role: m.role, content: String(m.content) })),
      stream: true,
      max_completion_tokens: Math.min(MAX_TOKENS, Number(body.max_completion_tokens) || MAX_TOKENS),
      temperature: Math.min(1.5, Math.max(0, Number(body.temperature ?? 0.7))),
      top_p: 0.95,
      reasoning_effort: 'low',
      include_reasoning: false,
    };
    const r = await fetch(`${upstream}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(out),
    });
    if (!r.ok) {
      // never pass Groq's raw errors on (they can mention the key or account)
      if (r.status === 429) return err('Pebble has reached its limit for now. Try again in a minute.', 429, h);
      if (r.status === 401) return err('The Pebble server’s Groq key isn’t valid any more.', 502, h);
      return err(`Groq had a problem (${r.status}). Try again in a moment.`, 502, h);
    }
    return new Response(r.body, { status: 200, headers: { ...h, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store' } });
  },
};
