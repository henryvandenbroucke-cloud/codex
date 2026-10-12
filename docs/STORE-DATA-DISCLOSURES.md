# Store privacy-disclosure worksheet

Status: publisher worksheet, not completed App Store Connect or Play Console answers. Prepared 12 October 2026 from the frontend and supplied Worker. Current official Apple/Google definitions were retrieved on 12 October 2026; see [verified requirements](VERIFIED-STORE-REQUIREMENTS.md).

Local-only storage is distinct from transmission to a provider. Optional features still belong in the assessment when they transmit data. Account synchronization persists the full planner remotely. Provider handling of AI content/metadata, ephemeral-processing qualifications and sharing exemptions must be verified rather than assumed.

| Information and trigger | Confirmed flow | Candidate store categories to assess | Decisions still needed |
| --- | --- | --- | --- |
| Email, profile name, account identifier; sign up/sign in | Email/password to Supabase Auth; session locally; name and user ID with synchronized state | Apple: Contact Info / Identifiers; Google: Personal Info / User IDs | Which fields are linked to identity; security/auth handling; required vs optional; retention/deletion |
| Tasks, events, event locations, notes, journal, goals and preferences; account use | Full planner state to Supabase | User Content and other applicable categories; assess entered locations based on actual use | Confirm categories and whether journal content/mood is Health/Fitness or other sensitive data; associated-record deletion |
| Income, expenses, balances, categories, budgets, bills and savings; account use and AI prompts | Full finance state to Supabase; finance summaries/labels to Groq via Worker or directly | Financial Info / Other Financial Info; assess purchase-history classification where records describe purchases | Confirm categories, identity linkage, optionality and purpose. No bank/payment-card API integration was identified |
| Habits, focus records and mood; account use and AI prompts | Full state to Supabase; selected habits/focus/mood in AI context | User Content, Other Data and Health/Fitness where appropriate to the actual functionality | Resolve health/wellbeing classification and sensitive-data legal conditions; do not automatically classify as unrelated anonymous analytics |
| AI messages/responses, recent conversation, remembered facts/preferences/summaries | Requests to Cloudflare Worker then Groq; direct Groq with a user's own key; history/memory also in account sync | User Content / Other User-Generated Content; assess messages/content subcategories against current definitions | Full recipients, identity linkage, retention/training, processing purpose, deletion, informed permission and withdrawal |
| IP address, request timing and rate-limit counters; Worker AI use | Cloudflare receives requests; Worker reads `CF-Connecting-IP` and retains IP-keyed counters/timestamps in instance memory | Assess current platform definitions for identifiers, approximate location and diagnostics; IP alone is not automatic proof that each category is used | Whether providers derive location/identifiers or retain logs, duration, security purpose, ephemeral-processing eligibility |
| Optional personal Groq API key | Locally stored; sent as an authentication header directly to Groq | Security/account information as applicable under current definitions | Secure storage and backup exclusions; provider handling. Not included in the reviewed planner export/sync state |
| Local planner backup import/export | Selected JSON read locally; exported JSON written to the user-selected environment | Not automatically remote collection by the app | OS backup/cloud-storage behavior; no claim that exported files are encrypted or automatically deleted |
| Support/privacy email | User-supplied email/content processed in the Gmail privacy-contact mailbox | Contact Info / User Content if relevant to each store's reporting scope | Retention, access, verification, response process and any attachments |

Purposes to assess: app functionality, authentication/sync, user-requested AI and personalization, security/abuse prevention and support. No advertising SDK or active behavioral-analytics integration was identified in the reviewed frontend/Worker. Provider logs and production analytics remain unverified.

Do not answer “no data collected” for the app as a whole merely because the planner works without an account. Do not answer “no sharing” merely because traffic is encrypted or uses a proxy. Apple tracking definitions and Google's provider-sharing exemptions are different concepts; determine them from actual use and agreements.

## Before submitting questionnaire answers

1. Review current official definitions and every enabled feature/provider in the signed production build.
2. Obtain Supabase, Cloudflare and Groq account settings/agreements, processing regions, logs, retention and deletion details.
3. Verify which records are linked to the account or other identity, which use is optional and what stops after permission withdrawal.
4. Align the privacy policy, in-app notices, consent controls and actual data flow. A draft policy cannot replace an unimplemented consent or deletion function.
5. Inspect any OS backups, additional SDKs, crash reporters, billing features and backend analytics before completing tracking, security and deletion claims.
6. Keep a dated record of the final answers and update them when behavior/providers change.

Official starting points: [Apple app privacy details](https://developer.apple.com/app-store/app-privacy-details/), [Google Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en), [Google User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en). These pages were successfully retrieved in the current review. Google requires ephemeral processing to be included in the form response even where it is not displayed publicly; Apple defines collection as access beyond servicing the request in real time. Apply each definition separately to actual provider behavior.
