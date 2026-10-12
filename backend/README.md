# Pebble AI Worker

`pebble-worker.js` is an unchanged copy of the Worker supplied by the owner. It forwards messages to Groq and keeps the provider key server-side. No actual API-key value is included in this repository.

See the [code/privacy review](../docs/APP-STORE-REVIEW.md) for tested protections and unresolved issues. The source alone does not establish deployed settings, Cloudflare/Groq logging, retention or production access controls. Deployment was not performed in this review. Store `GROQ_API_KEY` securely in Cloudflare Worker secrets; never commit its value.
