# Soft OS mobile project

This project packages the uploaded Soft OS v2.8 website with Capacitor 8.5.3 for Android and iOS. `www/index.html` is an unchanged copy of your upload. It is a compiled website, rather than the original editable source project.

## What is prepared

- Android Studio project: `android/`
- Xcode project: `ios/App/App.xcodeproj`
- Website bundled locally, without relying on a hosted website for the main interface.
- Exact dependency versions and an npm lockfile.
- Provisional application ID: `dev.softos.planner`. Choose and verify your final unique application ID before creating store listings. Change the Capacitor appId, the Android applicationId/namespace and Java package, and the Xcode bundle identifier together. `cap sync` alone does not rename native projects.

This is a development starter, not an approved or signed store release. Generated icons and splash screens are defaults and need your final branding.

## Install and update the website

Use Node.js 22 or newer. From this directory:

```sh
npm ci
npm run sync
```

For future website updates, replace `www/index.html` with the new complete website build, include any referenced assets in `www/`, and run `npm run sync`. Keep the original source project separately so features can be maintained without editing minified generated JavaScript.

## Android

Install Android Studio and the Android SDK (API 36 and build tools 35.0.0; Gradle uses these build tools by default). Java 21 is required by this starter. From this directory:

```sh
npm run open:android
```

Run on an Android emulator and a real device. For a command-line debug build after configuring your Android SDK:

```sh
cd android
./gradlew --no-daemon --max-workers=2 assembleDebug
```

A debug APK is for testing, not for Google Play submission. In Android Studio, create a signed release Android App Bundle using a private upload key. Store the key securely outside this project and back it up. Do not put passwords or signing keys in source files.

## iPhone and iPad

A Mac with a current supported Xcode installation is required. After `npm ci` and `npm run sync`:

```sh
npm run open:ios
```

Choose your Apple Developer team, final bundle identifier, and supported device targets in Xcode. Test on the simulator and real devices. Archive a signed release build and upload it to App Store Connect/TestFlight. iOS compilation and signing were not performed in this Linux cloud workspace.

## Store release prerequisites

1. Enroll in the Apple Developer Program: https://developer.apple.com/programs/enroll/
2. Create a Google Play Console developer account: https://play.google.com/console/signup
3. Choose the final unique app identifier, app name, version, and distribution countries. Complete identity/business verification and any testing requirements shown for your accounts.
4. Replace default app icons/splash screens, collect actual device screenshots, and prepare store descriptions, support contact details, and a public support page.
5. Publish a privacy policy describing actual data handling. The website uses local browser storage, Supabase accounts/planner sync, and a Cloudflare-hosted assistant with Groq integration. Its AI screen says messages and a planner summary are sent to Groq. Verify the production backend behavior, retention, logging, and third-party terms before completing Apple privacy and Google Data Safety disclosures. Do not describe all use as private/offline.
6. Validate consent and disclosures for sending planner content to the AI provider. Verify signup, email confirmation, login, sync, sign-out, data export/import, and account deletion. The Delete account action invokes a Supabase `delete_my_account` RPC; its presence in the frontend does not establish that the backend exists or deletes all relevant data. Google also requires an external account-deletion request route for apps with account creation; verify the current store rules for your release.
7. Test the complete workflow on both platforms: keyboard and safe areas, navigation/back button, focus timer when backgrounded, restart persistence, offline behavior, file import, and backup export. Browser download links may require native Files/Share integration in a WebView. Web localStorage is tied to the app origin: website data does not automatically transfer into a newly installed app. Export/import must be tested as the migration path.
8. Configure account-email redirects and any native deep-link handling with your backend. Verify endpoint access/CORS from the native app origins. The current frontend contains production endpoints and a Supabase publishable client key; never add a private service-role key to the app.
9. If selling subscriptions or digital upgrades, implement and review the applicable Apple/Google billing requirements before offering purchases. No monetization changes were made here.
10. Submit through TestFlight/Google Play testing, address any failures, and then submit signed production builds for store review. Approval remains the stores' decision; a web wrapper alone does not guarantee acceptance.

## Validation in this workspace

- Installed exact Capacitor versions, repeated installation with `npm ci`, and synchronized both platforms successfully.
- Website launched in Chromium at a 390 x 844 phone viewport with external HTTP requests blocked.
- Main screen and Tasks navigation worked; a new task persisted after page reload; no JavaScript runtime errors were observed in that check.
- No horizontal overflow was observed on the initial phone screen.
- Online account/AI functionality, native device behavior, and store review were not validated.
- See `BUILD-STATUS.md` for native compilation results.

## GitHub layout

This mobile project is published under `mobile/` in the GitHub repository. The original website is also available at the repository root as `index.html`. Downloadable copies of this project and the Android testing APK are under `downloads/`. After cloning the repository, run installation and synchronization commands from `mobile/`. Capacitor regenerates the ignored native web assets/configuration during `npm run sync`.
