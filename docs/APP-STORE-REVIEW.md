# Soft OS code and app-store release review

Review date: 12 October 2026. Reviewed repository commit: `fc78dba1627e49d87d011016313698a043517b4a` plus the policy/review documents created during this task.

## Scope and research status

This review covers the supplied bundled website, the uploaded Cloudflare Worker now stored at `backend/pebble-worker.js`, Capacitor configuration, Android/iOS starter projects and installed Capacitor privacy manifests. Supabase backend source/migrations, deployed service settings, signed iOS archives and store accounts were not available.

Official Apple, Google, EU and provider pages were requested, but every request was rejected with a proxy `403 Forbidden` before a page could be read. The source list and exact outcomes are in [official-source-checks.json](official-source-checks.json). The checklist below is a set of release gates to verify against the current official wording, not a claim that all October 2026 requirements have been researched or satisfied. Numeric SDK deadlines, age thresholds, legal retention periods and regional obligations must be checked once access is available.

Domain additions saved in the cloud environment draft: `developer.apple.com`, `support.google.com`, `developer.android.com`, `eur-lex.europa.eu`, `console.groq.com`, `supabase.com`, `www.cloudflare.com`. The existing package-manager presets were preserved. Draft persistence was confirmed; runtime access and publication were not confirmed. Review and save the changes in environment settings, then publish the environment to continue live-source verification.

## Confirmed findings, in release-priority order

| Priority | Finding and evidence | Required next step |
| --- | --- | --- |
| High | No dedicated AI data-sharing permission gate was found. `Ig` sends chat plus `yg`/`dg` planner context; the chat screen contains a brief disclosure but no explicit consent action. Synthetic requests contained name, task, event, habit, mood and remembered facts. | Add a clear permission screen before any AI content transmission, including summaries. Identify the receiving services and data categories, let users decline while using the planner, record the choice and provide withdrawal controls. Verify current Apple AI/privacy wording and Google disclosure/consent applicability. |
| High | “Erase everything” does not erase all local information. A browser test confirmed profile name, goals and `softos:sync-backup` remained after resetting tasks and memory. `data-reset` also preserves intention/preferences and does not clear separately stored API keys or sessions. | Make the deletion semantics explicit and offer complete local-data deletion, covering backup keys and credentials. Do not describe the current control as complete erasure. Preserve any user-selected export only with a clear explanation. |
| High | The `ai-clear`/New chat action calls `Ug` when memory is on and at least two user messages exist. It sends up to the last 12 conversation entries to generate a memory note. This extra AI request was reproduced with mocked responses. | Disclose this operation in permission and privacy flows. Avoid presenting it as provider-data deletion. A true delete-conversation control should not generate a new provider request merely to summarize the deleted data. |
| High | Account deletion depends on the unreviewed `delete_my_account` Supabase RPC. The frontend keeps the device's planner copy after account deletion. | Verify authenticated account deletion, all related records/storage objects, server-side session handling, failure reporting and backup retention. Publish and test an external account/data-deletion request route for Google Play as well as the in-app deletion path. |
| High | Account sync uploads `Fp()`, a full copy of planner state, not only tasks. It includes notes, journal/mood, money, AI history and memory. | Verify consent/disclosures, Supabase row isolation and access grants with two separate test accounts. Complete privacy labels and Data Safety from this full data flow. |
| High | No in-app privacy-policy link or public policy URL was found in the supplied application. Provider retention, training settings, processing regions and logging are unverified. | Finalize and host the [policy draft](PRIVACY-POLICY-DRAFT.md), link it in the app/account flows and store listings, and obtain the missing backend information. GitHub Markdown alone is not proof of a valid public store policy page. |
| Medium | AI feedback (`ai-fb`/`ai-why`) records response-style feedback locally. No dedicated inappropriate-content reporting route to the developer was found. | Verify Google's current AI-generated-content reporting rules. Add a working in-app reporting/flagging mechanism and an operator review/response process where required; a thumbs-down style preference alone is not established content reporting. |
| Medium | Auth sessions and optional personal Groq API keys use localStorage. No separate application-level encryption was observed. Android `allowBackup` is enabled. | Review native secure credential storage and backup exclusions. Audit XSS/external-script exposure and provider-key abuse protection. Document actual OS backup behavior instead of claiming information never leaves the device. |
| High (abuse/security) | The Worker defaults to wildcard CORS when `ALLOWED_ORIGINS` is empty and has no independent caller authentication. Its per-IP limit is instance-local memory and resets when the map is cleared/recycled. Synthetic tests confirmed an unlisted origin succeeds by default and a caller-supplied allowed Origin succeeds without other authentication. | Confirm deployed origins and robust abuse/budget controls. CORS is not identity verification, since non-browser clients can supply Origin headers. Consider supported shared rate limiting and appropriate request authorization/attestation without exposing secrets; choose controls compatible with the account-optional app. |
| Medium | The Worker parses the entire JSON body before applying the 16,000 message-character limit. It has no explicit upstream timeout/exception handler. | Add bounded body-size parsing and controlled upstream timeout/error handling. Confirm content/reporting safeguards and avoid sensitive-content logging. The message-character limit alone is not a complete request-body limit. |
| Medium | Local-model/CDN code exists, but `Kh` calls cloud `Gh` and normal `qh` calls `gh`/`fh` over HTTP. | Describe this build as cloud AI. Do not claim on-device AI merely because model-download code is bundled. Reaudit recipients, download size and policy if that feature becomes active. |

Code anchors in the bundled root `index.html`: authentication/sync/deletion around line 61; memory around line 73; HTTP AI requests around line 92; planner summary around line 94; chat disclosure around line 160; chat submission and summary around line 166; local erase/start-over around line 698. Lines are very long because the source is bundled; search the named functions/actions for the exact code. `mobile/www/index.html` is an identical copy.

## Browser validation performed

The [synthetic evidence](privacy-audit-evidence.json) was captured at a 390 x 844 phone viewport. All AI responses were mocked and other external HTTP requests were blocked. No real planner data or credentials were sent to an AI service.

- Two AI messages generated two content requests.
- The next message included earlier conversation history.
- The first request's system context included the seeded name, task, event, habit, mood and remembered preference.
- Starting a new chat generated one additional memory-summary request.
- Erasing the planner removed tasks/current memory but retained the seeded profile name, goals and local backup.
- No JavaScript runtime errors occurred during these checks.

The supplied Worker was also tested with synthetic requests and a mocked upstream. Model allowlisting, the 1,200-token cap, message-character limit, instance-local IP rate limit and sanitization of upstream error bodies worked in those tests. See [worker evidence](worker-audit-evidence.json). The Worker retains the upstream API key server-side, uses `Cache-Control: no-store` on streamed replies and has no explicit content-log/persistent-storage writes. These are positive source findings, not evidence of production zero-retention or distributed abuse prevention.

This was not a production-backend, native-device, server deletion, database security-isolation or iOS compilation test. No application logic was changed as part of this review.

## Apple release gates to check against current official rules

Official starting points: [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/), especially privacy/data use, AI sharing, account deletion, minimum functionality, completeness, safety and payments; [App privacy details](https://developer.apple.com/app-store/app-privacy-details/); [Upcoming requirements](https://developer.apple.com/news/upcoming-requirements/).

- Enroll an eligible legal publisher, complete required agreements, final bundle ID, signing and account verification. For EU distribution, review applicable Digital Services Act trader status/contact requirements.
- Build/archive with the currently accepted Xcode and platform SDK versions. The starter's iOS 15 deployment target does not identify the SDK used to build it.
- Test iPhone/iPad supported targets, safe areas, keyboard, accessibility, restart/offline persistence, account flows, backup import/export and timer behavior when backgrounded.
- Assess minimum functionality with the complete planner workflow. A Capacitor wrapper is not itself a guarantee of approval.
- Provide final icons/screenshots, accurate metadata, age-rating answers, privacy/support URLs, review notes and a dedicated review account if required for review. Remove placeholders and avoid describing cloud features as fully offline.
- Provide explicit AI-sharing permission, a policy accessible inside the app, and a functioning in-app account-deletion path. Verify current rules for any added social login and any required equivalent login option; this reviewed build uses email/password.
- Complete privacy disclosures for the actual app and all providers. Inspect the signed archive's aggregated privacy report and required-reason APIs; the installed Capacitor SDK has privacy-manifest files, but this does not validate the final archive or required reasons for other SDKs. Do not invent accessed-API reasons.
- Review content safety and age appropriateness of general-purpose AI, especially conversations about mood/health. The system prompt contains emergency guidance but is not proof of a moderation or emergency workflow.
- If digital subscriptions/upgrades are introduced, review applicable billing/purchase rules and regional exceptions before implementing payments. No purchase flow was identified in the reviewed code.

## Google Play release gates to check against current official rules

Official starting points: [User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en), [Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en), [Account deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en), [AI-generated content](https://support.google.com/googleplay/android-developer/answer/13985936?hl=en), [Personal-account testing](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en), [Target API requirements](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en).

- Enroll and verify the publisher/account, including any required identity, contact, device and organization checks. Follow the account's actual testing/production-access requirements; do not assume an account has immediate production access.
- Choose the final application ID, use a signed production Android App Bundle, configure Play App Signing/upload-key management and increment version codes. The repository APK is a debug test build.
- Verify the current target API and platform compatibility deadlines. The debug APK targets API 36 with minimum API 24; that fact does not establish compliance with a future submission date.
- Test the final production build, device sizes, native file handling, crashes, network failures and accessible navigation. Inspect the final merged manifest and all bundled SDKs for permissions and data handling.
- Provide a stable, publicly accessible privacy policy with the required publisher/contact and retention/deletion information. Verify the current URL/format rules; a repository file is not automatically a compliant hosted policy URL.
- Complete Data Safety accurately, including optional sync and AI behavior, purpose, optionality, collection/sharing, encryption and deletion answers. Claim provider-sharing exemptions only when the contracts and use meet the definitions.
- Provide and test both the in-app account-deletion initiation path and the required external deletion-request web route. State retained data/periods where applicable and handle associated data, not just a login record.
- Provide prominent disclosure and consent where the actual sensitive-data collection/sharing requires it. Ensure behavior matches the privacy policy and listing.
- Verify applicable AI-generated-content safeguards and in-app reporting rules. Complete content rating, target-audience/age answers and any health-related declarations appropriate to mood/wellbeing functionality.
- Complete ads declarations, store metadata/screenshots, support details and applicable regional/trader requirements. If minors are targeted, review Families/child-data rules rather than relying on the general-audience label.
- Review current Play Billing rules before adding digital products. Manually tracking money is not proof of a payment/banking integration.

## Privacy law and provider obligations to assess

Official starting points: [GDPR text](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng), [Groq data handling](https://console.groq.com/docs/your-data), [Supabase DPA](https://supabase.com/legal/dpa), [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/). None of these pages were live-verified in this run.

For applicable GDPR processing, review controller identity/contact, purposes and Article 6 legal grounds, Article 9 conditions if sensitive health/special-category information is processed, notices under Articles 13/14, rights handling, data minimization, security, retention, processor agreements, international-transfer safeguards and children's consent rules. Assess whether a DPIA is required for the actual scale/risk; it is not automatically required for every planner.

Review relevant local storage/cookie rules, other distribution-country privacy/consumer laws and accessibility obligations. Necessary local storage does not automatically justify a blanket consent banner, and a privacy policy alone does not authorize optional sensitive-data sharing. Do not claim worldwide legal compliance from this frontend review.

Verify provider terms, age limits, settings, subprocessors, logging, retention/training behavior and processing locations for the exact production accounts. Generic vendor descriptions are not evidence that zero-data-retention is enabled for this app.

## Missing facts needed to finalize the policy

1. Controller jurisdiction and any required address/representative details. The owner confirmed Henry Vandenbroucke as the publisher and `firebasestudio572@gmail.com` as the privacy contact.
2. Intended distribution countries, minimum age, permitted minor use and any parental-consent design. The owner specified a general audience, not an app specifically for children.
3. Deployed Cloudflare Worker settings/logging, Supabase schema/RLS/deletion implementation, hosting region and email delivery configuration. The Worker source has now been supplied and reviewed.
4. Groq account/plan terms, retention/training/zero-retention settings, provider processing locations and transfer safeguards.
5. Actual retention periods and deletion handling for cloud planner/auth records, AI content, access/error logs, backups and support email.
6. Any backend/host analytics, crash reporting, advertising or data disclosures absent from the supplied frontend.
7. Live privacy/support and external deletion-request URLs, safe identity-verification procedures and responsible person for privacy/content reports.
8. Current official requirements once the network changes are applied, and final native/device/store validation.

## Recommended implementation order

First establish the backend data inventory, deletion guarantees and retention periods. Then implement privacy links, AI permission/withdrawal and honest complete-deletion controls. Add content reporting and review the credential/backup design. Finalize the policy and disclosure questionnaires from the resulting behavior, then test signed native builds and prepare store review. Documentation alone does not implement these changes.
