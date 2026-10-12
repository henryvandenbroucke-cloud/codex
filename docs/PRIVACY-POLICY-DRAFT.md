# Soft OS Privacy Policy — draft

Last updated: 12 October 2026. Status: draft for publisher review; not yet an effective or verified production policy.

> Before publishing this policy, complete the bracketed fields and confirm the backend details listed below. The frontend and supplied Cloudflare Worker have been reviewed, but the Supabase database configuration, provider contracts, deployed environment settings and production logs were not supplied. Current official policy pages were blocked by the environment network allowlist during this review.

## 1. Who is responsible for your information

Soft OS is a personal planner with calendar, tasks, money tracking, savings jars, habits, notes, a journal, a focus timer and the optional Pebble AI assistant.

Publisher and data controller: **Henry Vandenbroucke**, **[confirm country/jurisdiction]**.

Privacy contact: **firebasestudio572@gmail.com**. Do not include passwords, API keys or sensitive journal entries in a privacy request.

**[Add the controller's address, representative or data protection contact where applicable, and the live policy/support URLs.]**

## 2. Information you enter and information stored on your device

The planner stores information you provide, including:

- Your chosen name, goals, intentions and preferences.
- Tasks, subtasks, events, dates, times, notes and event locations you enter.
- Manually entered account labels, balances, income, expenses, budgets, bills and savings goals.
- Habits, completion records, focus sessions, journal entries and mood selections.
- Pebble chat messages and responses, remembered facts, conversation summaries and response preferences or feedback.

The current app uses local storage for planner data, settings, backups and session information. If you supply your own Groq API key, the app stores that key locally and uses it to authenticate requests to Groq. Do not enter someone else's key. An exported planner backup does not include the separately stored API key or authentication session in the reviewed frontend.

Information may be sensitive because of what you choose to write. For example, journal entries, chat messages, habits and mood selections can reveal health or other private matters. Information about other people can also appear in your tasks, events and notes.

The reviewed app does not request permission to read your contacts, your device calendar, your precise device location, microphone or camera. It does not directly connect to a bank account. You may choose a backup file to import using the file picker.

Device operating systems may back up or restore application information. The Android project currently permits backups. Your device and backup-provider settings affect this behavior. Local storage in the reviewed frontend is not separately encrypted by application code; device protections remain important.

## 3. Optional accounts and synchronization

If you create an account, your email and password are sent to Supabase's authentication service. The app also retains authentication/session information locally so that you can remain signed in. The app does not save a plaintext copy of your account password as a planner field.

When you sign in and enable account use, the app synchronizes the full planner state with the Supabase-backed service. This includes notes and journal content, money and habit information, mood entries, chat history and AI memory, in addition to tasks and calendar data. Account identifiers and update timestamps are used to keep copies synchronized.

**[Confirm the Supabase hosting region, security controls, email provider, access permissions, processing agreement and retention/deletion rules.]**

Using the core planner without an account avoids account synchronization. It does not stop AI network requests if you use Pebble.

## 4. Pebble AI and the information sent for answers

Pebble uses a remote AI service in the reviewed version. Its active request path is cloud-based; it is not a verified on-device AI feature.

When you send a message, the app sends your message and recent conversation history, together with a planner summary and any enabled remembered facts or conversation notes. The planner summary can include your name, today's tasks and overdue-task information, today's and upcoming events, spending and income totals, spending categories, budgets, upcoming bills, savings goals, habits and streaks, focus time and today's mood.

By default, these requests go through the Pebble server hosted on Cloudflare Workers. The supplied Worker forwards message content to Groq using a server-side secret and streams the response back to the app. Deployed settings still need confirmation, including that the upstream service has not been changed. If you enter your own Groq API key, the frontend sends AI requests directly to Groq using that key.

When memory is enabled, the app can save facts and preferences for later conversations. Starting a new chat can send part of the previous conversation to the AI service to create a short memory summary. The memory toggle controls use of remembered information; it does not turn off cloud AI requests or remove all existing chat data.

The current interface lets you view or remove memories, turn memory off, and start a new chat. Starting a new chat is not a request to erase copies already processed by a provider.

AI answers may be inaccurate. The assistant is not an emergency, medical or financial advisory service. Avoid including information you do not want processed by the AI services.

**[Confirm Cloudflare and Groq processing roles, server logging, account tier, training/data-use settings, retention, deletion processes, locations and safeguards. Do not promise zero retention or no model training without verified account-specific evidence.]**

**[Implement an informed, explicit AI-sharing permission step before the first transmission, including AI-generated summaries, and provide a way to withdraw permission. This draft does not claim that step already exists.]**

## 5. Other service information

Online services receive information needed to process requests, which may include IP addresses, request timestamps, user-agent/device information, error information and security or access logs. The supplied Worker uses the visitor's IP address and request timing/counts for in-memory rate limiting. These entries remain in the Worker instance until it is recycled or its bounded map is cleared; the code does not guarantee a fixed 24-hour deletion period for IP addresses. The supplied Worker contains no explicit content-log or persistent database writes, but that does not establish that Cloudflare or Groq keeps no operational logs or content. Their actual handling depends on the production service settings and contracts.

The reviewed frontend contains no identified advertising SDK or active third-party behavioral analytics integration. This finding does not establish that hosting or backend logs are absent.

**[Confirm any production analytics, crash reporting, advertising, sale/sharing of data, and all other service providers before finalizing this section.]**

Some bundled code refers to model downloads from Hugging Face and public JavaScript CDNs, but the reviewed active AI routing uses the cloud. These are not established active recipients in this version. Reassess the policy if an on-device model-download feature is enabled later.

## 6. Why information is used and lawful grounds

Information is used to provide your planner, account authentication and synchronization, AI features you choose to use, abuse/rate-limit protection, and responses to support/privacy requests. If you contact us by email, your email address, message and any voluntarily supplied attachments are processed through the privacy-contact mailbox, which is hosted by Gmail. Service operators may also process necessary security and reliability information.

For users covered by the GDPR or similar laws, the publisher must identify the applicable lawful grounds for each operation. The intended mapping to review is: performance of the requested service for essential planner/account operations; valid consent for optional AI disclosure where required; and a documented legitimate interest for proportionate security/abuse prevention where applicable. If health or other special-category information is processed, an additional lawful condition may be needed; ordinary consent or a privacy policy alone does not automatically supply it.

**[Confirm the actual Article 6/Article 9 grounds, necessity, consent design and ability to withdraw consent, including for third-party AI. Do not treat acceptance of this policy as blanket consent.]**

## 7. Retention, backups and deletion

Local information remains available until you remove it through relevant app controls, clear the app's/site's storage or otherwise remove the stored copy. Backup files you export remain wherever you save them and must be managed separately.

The current “Erase everything” control resets planner records but keeps selected profile information, including the name and goals, and does not remove every locally stored backup or credential. It must not be relied on as complete deletion. “Start over” resets the planner and, when signed in, logs you out while leaving the account's cloud copy available; it also does not establish that every credential or operating-system backup is deleted.

The “Delete account” action requests account deletion from a Supabase backend function. The interface is designed to keep the planner copy on the current device after account deletion. Backend completion, associated-record deletion and backup handling need verification. If a deletion attempt fails or you want help making a request, contact **firebasestudio572@gmail.com**.

**[Publish a working external account/data-deletion request page and verify identity safely. Document the production completion period, any legally necessary exceptions and retention durations for authentication records, cloud planner data, AI request/response records, service logs, provider backups and support requests.]**

Removing local chat or memory does not by itself delete already processed server/provider records. Logging out does not delete your cloud account. The publisher must confirm and publish accurate retention schedules before release.

## 8. Sharing, international processing and security

Data is disclosed to the services needed for the features you use, as described above, and may also be disclosed when legally required. **[Confirm processor/subprocessor relationships and whether any other disclosures occur.]**

Depending on the selected service regions and providers, information may be processed outside your country. **[Identify relevant processing regions and applicable transfer safeguards, such as adequacy decisions or Standard Contractual Clauses; explain how users can obtain information about the safeguards.]**

The frontend uses HTTPS for the configured Supabase and AI service endpoints. This does not establish end-to-end encryption, verified database isolation or a complete server-security assessment. **[Confirm access controls, row-level security, operational access, encryption and incident procedures before making broader security promises.]**

## 9. Your choices and rights

You can use the core planner without account synchronization, export a planner backup, import a backup, control Pebble memory and choose whether to use the AI assistant. See the limitations of the current deletion controls above.

Depending on where you live and the legal basis, you may have rights to access, correct, delete or obtain a portable copy of your personal data, restrict or object to certain processing, and withdraw consent without affecting the lawfulness of earlier processing. Contact **firebasestudio572@gmail.com** to make a request. You may also be able to complain to a competent data-protection authority. **[Confirm the relevant authority, response periods, verification process and any legally permitted exceptions.]**

If applicable GDPR processing is based on consent, you can withdraw that consent. **[Specify the actual in-app withdrawal control and what processing stops; contact alone is not a substitute for implementing a suitable control.]**

## 10. Children

Soft OS is intended for a general audience and is not specifically directed at children. **[Confirm the minimum age, store target-age groups, whether minors can use accounts/AI, provider terms and any parental-consent procedure required in the distribution countries. General-audience targeting does not establish that no children use the app.]**

## 11. Changes and contact

Material changes to data handling will be reflected in an updated policy and, where required, appropriate notice or renewed consent before the changed processing begins. Questions and privacy requests can be sent to **firebasestudio572@gmail.com**.

This policy becomes effective only after the publisher resolves the marked items, verifies production behavior and publishes the finalized version at a public policy URL accessible from the app and store listings.
