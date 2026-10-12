# Native build status

Validated on 12 October 2026 in the Linux cloud workspace.

## Android

`assembleDebug` completed successfully with 93 executed Gradle tasks. The generated APK contains the exact unchanged `www/index.html`, verified against the original upload.

Build tools used: Capacitor 8.5.3, Gradle 8.14.3, Android Gradle Plugin 8.13.0, Temurin JDK 21.0.12.1+1, Android API 36. Gradle also installed its default Android build-tools 35.0.0. Android SDK command-line tools were verified against the official repository checksum; the JDK was verified against the official release SHA-256. TLS verification remained enabled.

Cloud-specific setup needed a writable npm cache, Android SDK/user directories, and Gradle cache under `/workspace/scratch`. Java/Gradle needed the existing HTTPS proxy configured as JVM proxy properties and the system Java CA trust store. The preinstalled Java runtime lacked a compiler; a full JDK was installed locally. These are cloud runtime settings, not application source changes.

The testing APK is available at `downloads/soft-os-debug.apk` at the repository root. It is a debug build with a provisional application identifier and default artwork, not a signed production App Bundle for Google Play. No emulator or real-device test was performed.

## iOS

The Xcode project was generated and synchronized. Compilation, device testing, signing, archiving, and upload remain pending and require a Mac with Xcode and the appropriate developer account.

## Web smoke check

Phone viewport: 390 x 844. External HTTP requests were blocked for the test. The main screen and Tasks page loaded, a task was created, and the task survived a page reload. No JavaScript runtime errors were observed. This test does not validate Supabase accounts/sync, AI requests, or native file handling.

## GitHub

The original uploaded website was pushed as `index.html` to `henryvandenbroucke-cloud/codex` on `main`, commit `5165df28582fb8ff21392fbbd4be6cef989b5ed4`. The mobile starter is now published under `mobile/` in the same repository. Downloadable artifacts are under `downloads/`.
