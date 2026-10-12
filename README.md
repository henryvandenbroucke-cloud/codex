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
