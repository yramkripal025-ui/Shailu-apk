# Shailu Bhai — Daily Collection

Android app packaging of the existing Daily Collection web application using Capacitor.

## Build on GitHub

1. Create a new GitHub repository.
2. Upload all files from this project to the repository root.
3. Commit to the `main` branch.
4. Open **Actions → Build Android APK**.
5. Run it (or push another commit).
6. Open the completed workflow run and download the artifact named **shailu-bhai-daily-collection-debug-apk**.

The workflow installs dependencies, locally bundles the XLSX library, validates the existing app functions and JavaScript syntax, creates the Android project with Capacitor, syncs the `www/` app into Android, and builds the debug APK.

## Important

- The existing HTML application remains the app UI/logic; it is not rewritten into a different framework.
- The XLSX library is bundled locally during the build instead of being loaded from a CDN at runtime.
- The generated `android/` folder is intentionally not committed; GitHub Actions creates it from the pinned Capacitor version. This keeps the repository reproducible.
- This workflow produces a **debug APK for device testing**. A signed release APK/AAB for Google Play requires a signing key and release workflow later.

## Local build

Requires Node 22+, Java 21 and Android SDK/Android Studio. Then:

```bash
npm install --no-audit --no-fund
npm run validate
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```
