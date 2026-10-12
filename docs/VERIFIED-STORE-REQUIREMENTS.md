# Verified release requirements and next steps

Checked against the linked official pages on **12 October 2026**. These are the requirements most relevant to the supplied Soft OS planner and AI assistant. This is not a claim that every law in every distribution country has been assessed. Production service settings, Supabase deletion/security, final native archives and store-account verification remain unverified.

## Fix before store testing

| Gate | Official requirement | What Soft OS needs |
| --- | --- | --- |
| AI permission | Apple Review Guideline 5.1.2(i): “You must clearly disclose where personal data will be shared with third parties, including with third-party AI, and obtain explicit permission before doing so.” [Source](https://developer.apple.com/app-store/review/guidelines/) | An explicit allow/decline choice before sending messages, planner summaries or old-chat summaries to Cloudflare/Groq. Keep the planner available when AI is declined. |
| Prominent disclosure | Google's User Data policy requires an in-app disclosure and affirmative consent when sensitive-data collection/use/sharing is outside reasonable user expectations. The disclosure must precede collection and cannot exist only in the policy or settings. [Source](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) | Clearly identify planner/financial/mood data and cloud AI recipients before the first request. Provide meaningful withdrawal controls. |
| Privacy policy | Apple requires an accessible in-app policy link and App Store Connect metadata link. Google requires a comprehensive policy in-app and in Play Console at an active, publicly accessible, non-geofenced, non-editable URL, not a PDF. [Apple](https://developer.apple.com/app-store/review/guidelines/) · [Google](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) | Finalize the marked facts in the policy draft, host the HTML at a public URL, and add app/listing links. A GitHub draft does not finalize the policy. |
| Account/data deletion | Apple requires in-app account deletion when accounts can be created. Google requires readily discoverable deletion initiation both in-app and outside the app, plus deletion of associated data; disclosed legitimate retention exceptions may apply. [Apple](https://developer.apple.com/app-store/review/guidelines/) · [Google](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en) | Verify Supabase `delete_my_account`, related records and backups. Provide an external request page that works without reinstalling the app. Google permits a customer-service email or request form as a pathway, but it must actually be operated and linked appropriately. |
| Local erasure | Policy claims and actual data handling must match. Current code keeps profile/backup data after “Erase everything.” | Separate a reset from complete local deletion and document the exact behavior. Verify local credentials, backups and account/cloud scope. |
| AI content reporting | Google: “Apps that generate content using AI must contain in-app user reporting or flagging features that allow users to report or flag offensive content to developers without needing to exit the app.” [Source](https://support.google.com/googleplay/android-developer/answer/13985936?hl=en) | Add an actual report-to-developer flow and a moderation/response process. Existing thumbs-down feedback changes response style; it does not send a content report. |
| Privacy questionnaires | Apple privacy details and Google's Data Safety cover enabled optional features and providers. Their collection/sharing definitions differ. [Apple](https://developer.apple.com/app-store/app-privacy-details/) · [Google](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en) | Complete the worksheet from full Supabase sync, AI context, IP/rate-limit handling and provider settings. Do not mark the app as collecting nothing. |

## Developer accounts and test schedule

- **Apple:** enrollment requires the applicable legal age of majority and identity verification. The official price is **99 USD per membership year**, with regional pricing and possible eligible waivers. The enrollment page describes a parent/guardian option for someone below the age of majority. [Enrollment](https://developer.apple.com/programs/enroll/)
- **Google:** the official signup page requires age **18 or older** and a **US$25 one-time registration fee**, plus the account's verification requirements. [Enrollment](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en)
- **New personal Google Play accounts created after 13 November 2023:** the current requirement is a closed test with **at least 12 testers opted in continuously for at least 14 days**, then an application for production access. Completing the duration is not automatic production approval. [Testing](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)

Choose the correct legal account type; do not create a nominal organization merely to avoid testing. Do not give anyone your account password or signing keys in chat.

## Build requirements confirmed for this submission date

- **Google Play:** since **31 August 2026**, new standard phone apps and app updates must target **Android 16 / API 36 or higher**. The existing debug APK targets API 36, so that target value meets the currently stated rule. Release signing, a production App Bundle, device testing and the final build still need verification. The November extension is unnecessary for an app already targeting API 36. [Target API](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)
- **Apple:** since **28 April 2026**, App Store Connect uploads must be built with **Xcode 26 or later**, using the applicable **iOS/iPadOS 26 SDK**. Since **9 September 2026**, the published minimum deployment requirement is iOS/iPadOS 13 or later; the project's iOS 15 deployment target meets that minimum, but no iOS archive was built here. A deployment target is different from the build SDK. Updated age-rating questions also apply. [Upcoming requirements](https://developer.apple.com/news/upcoming-requirements/)

Before the final upload, recheck the official pages and the store account's current requirements; they can change.

## Provider facts confirmed from official documentation

**Groq:** its current data page says inference inputs/outputs are not retained by default, but may be logged for reliability or abuse monitoring for up to **30 days**, unless legally required longer. Usage metadata is always collected. Zero Data Retention is available in Data Controls and must be enabled/verified for the actual account; it is not established by this app's Worker code. The page says retained customer data is in US Google Cloud buckets and describes applicable SCCs. [Groq documentation](https://console.groq.com/docs/your-data)

The reviewed Worker uses streaming `/chat/completions`; no batch/fine-tuning integration was found. Its lack of explicit content logging and its `no-store` response do not establish provider zero retention. This Groq data page does not by itself establish this app's full model-training or all-provider contractual position.

**Supabase and Cloudflare:** their published DPAs address processing roles, subprocessors, transfers and deletion/return obligations. Contract-end deletion terms are not the same as the app's individual-account deletion SLA. Confirm the applicable agreements, Supabase region/backups, Cloudflare logging settings and the developer's actual retention schedule. [Supabase DPA](https://supabase.com/legal/customer-resources/data-processing-addendum) · [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/)

**EU privacy rights:** the European Commission's official guidance covers information/access, rectification, erasure, restriction, portability and objection rights. The EUR-Lex full-law endpoints returned empty responses in this run; the Commission guidance was successfully read. Applicable GDPR legal grounds, special-category conditions, transfer safeguards and other jurisdiction-specific duties still require the publisher's actual facts. [Commission guidance](https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en)

## Next work, in order

1. Obtain the Supabase schema/RLS/deletion setup and confirm publisher country, service regions and retention/logging settings.
2. Implement AI permission/withdrawal, privacy links, complete local deletion, verified account deletion and AI reporting. Improve Worker shared abuse/budget controls.
3. Finalize the privacy policy, public deletion/support pages and store disclosure answers from the resulting behavior.
4. Enroll in the appropriate developer accounts, choose final app IDs/artwork, build signed releases and test on actual Android/iOS devices. Use a Mac with the required Xcode for iOS.
5. Run the required Google closed test and Apple TestFlight testing as appropriate, prepare screenshots/review instructions, and submit for store review.

The research and documents are now prepared. These steps have not been implemented merely by writing this checklist.
