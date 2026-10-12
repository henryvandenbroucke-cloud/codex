# Soft OS

Personal planner website and mobile projects for iPhone/iPad and Android.

## Browse the code

- [Original uploaded website](index.html)
- [Mobile project and release guide](mobile/README.md)
- [Website bundled in the mobile app](mobile/www/index.html)
- [Android project](mobile/android)
- [iPhone/iPad project](mobile/ios)
- [Store listing draft](mobile/STORE-LISTING.md)
- [Build and validation results](mobile/BUILD-STATUS.md)

The website was provided as one bundled `index.html`. Its JavaScript and styles are included in that file; the original unbundled frontend source was not provided.

## Privacy and release review

- [Privacy policy draft](docs/PRIVACY-POLICY-DRAFT.md), using the publisher-confirmed contact details
- [Standalone privacy-page draft](privacy.html), ready to preview locally and finalize before hosting
- [Code findings and store release checklist](docs/APP-STORE-REVIEW.md)
- [Verified official requirements and next steps](docs/VERIFIED-STORE-REQUIREMENTS.md)
- [Apple/Google data-disclosure worksheet](docs/STORE-DATA-DISCLOSURES.md)
- [Uploaded Pebble Worker source](backend/pebble-worker.js)

These are drafts and review findings. Official Apple, Google and provider pages were retrieved and reviewed on 12 October 2026; exact requirements and sources are in the verified-requirements document. The policy still needs production retention, hosting-region and other marked details. No consent/deletion fixes or store submission were performed by writing these documents.

## Download the prepared files

- [Complete mobile project ZIP](downloads/soft-os-mobile.zip)
- [Android testing APK](downloads/soft-os-debug.apk)

The APK is a debug build for testing, not a Google Play production release. The mobile projects use a provisional application ID and default icons. iOS compilation, native device testing, signed releases, store listings, and store submission remain pending. Developer accounts, final branding, privacy disclosures, and a Mac with Xcode for the iPhone build are still required.

## Work on the mobile project

Use Node.js 22 or newer. After cloning this repository:

```sh
cd mobile
npm ci
npm run sync
```

Then use `npm run open:android` for Android Studio or, on a Mac, `npm run open:ios` for Xcode. See the [mobile release guide](mobile/README.md) for the complete prerequisites and release steps.
