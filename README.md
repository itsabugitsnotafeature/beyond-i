# Project Yatagarasu 🐦‍⬛

> *Guided by Yatagarasu. Built for Web, iOS, and Android.*

```
        .---.
       /|6 6|\
      ( | ^ | )    Project Yatagarasu
       \  v  /     One codebase. Three platforms.
       /|   |\
      ( |   | )
       '-'-'-'
        | | |
        ' ' '
```

A cross-platform boilerplate built with **Expo** and **TypeScript**.  
Write your code once — run it on Web, iOS, and Android with a single codebase.

Ships with **HelloFullStack**, a working todo app that proves the stack works
across all three platforms on day one.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Cold Setup / Installation](#cold-setup--installation)
3. [Run on Each Platform](#run-on-each-platform)
4. [Test on a Real Device](#test-on-a-real-device)
5. [Build a Standalone APK (EAS Build)](#build-a-standalone-apk-eas-build)
6. [Build for iOS (EAS)](#build-for-ios-eas)
7. [Submit to Stores](#submit-to-stores)
8. [Project Structure](#project-structure)
9. [Tech Stack](#tech-stack)
10. [HelloFullStack Demo App](#hellofullstack-demo-app)
11. [Debugging Tips](#debugging-tips)
12. [Philosophy](#philosophy)
13. [The Name](#the-name)
14. [License](#license)

---

## Prerequisites

Before you can run all three platforms, you need the right tools installed.
This is a one-time cold setup. Skip any platform you don't need.

### Everyone needs this

| Tool | Version | Install |
|------|---------|---------|
| Node.js | v18+ | [nodejs.org](https://nodejs.org) |
| npm | v9+ | Comes with Node |

---

### Web (easiest, works out of the box)

No additional installs required. Just a browser. The app runs at:

```
http://localhost:8081
```

---

### iOS (macOS only)

**Step 1: Install Xcode**

Download Xcode from the Mac App Store. It's large (~10 GB), go make lunch.

**Step 2: Download an iOS Simulator**

1. Open Xcode
2. Go to `Xcode > Settings > Platforms`
3. Download **iOS 26.4.1** (or the latest available)
4. Wait for the download to complete

**Step 3: Accept Xcode license**

```bash
sudo xcodebuild -license accept
```

That's it. Press `i` from the Metro bundler and it will boot the simulator automatically.

---

### Android

**Step 1: Install Android Studio**

Download **Android Studio Quail 1** (or latest stable) from
[developer.android.com/studio](https://developer.android.com/studio).

Run the installer. When the setup wizard launches, let it install the
Android SDK automatically. Don't skip this step.

**Step 2: Set environment variables**

Add these lines to your `~/.zshrc` (or `~/.bashrc`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Then reload your shell:

```bash
source ~/.zshrc
```

**Step 3: Create a virtual device (AVD)**

1. Open Android Studio
2. Open **Device Manager** (right panel or `Tools > Device Manager`)
3. Click **Create Virtual Device**
4. Pick any **Pixel** model
5. Select the latest Android version and download it
6. Click Finish, then hit the **play button** to boot the emulator

The emulator must be running before you press `a` in Metro.

---

## Cold Setup / Installation

```bash
git clone https://github.com/yourusername/project-yatagarasu.git
cd project-yatagarasu
npm install
```

That's it. No native config, no pod installs, no Gradle fiddling. Expo's managed
workflow handles all of that.

---

## Run on Each Platform

The main command is:

```bash
npm start
```

This launches the Metro bundler. From there, press a key to open any platform:

| Key | Platform | Where it opens |
|-----|----------|----------------|
| `w` | Web | http://localhost:8081 in your browser |
| `i` | iOS | iOS Simulator (auto-boots) |
| `a` | Android | Android Emulator (must be running first) |

The platform badge in the top-right corner of the app tells you which
platform you're currently on. That's the whole point. 🎯

### Port already in use?

If `8081` is taken, kill it first:

```bash
lsof -ti:8081 | xargs kill
```

Then run `npm start` again.

---

## Test on a Real Device

You have two options depending on what you need.

### Option 1: Expo Go (wireless, easiest)

**What it is:** Expo Go is a free app that connects to your running Metro bundler
over WiFi. No build step, no cables. Great for quick testing.

**Setup:**

1. Install **Expo Go** from the App Store (iOS) or Play Store (Android)
2. Make sure your phone and Mac are on the **same WiFi network**
3. Run `npm start` on your Mac
4. Scan the QR code shown in the Metro terminal with your phone's camera (iOS)
   or with the Expo Go app directly (Android)

**Important:** The app only works while Metro is running on your Mac. The moment
you stop `npm start`, the app on your phone goes dark. For a permanent installable
app, see the EAS Build section below.

---

### Option 2: USB (Android)

This runs your dev build directly on a plugged-in Android device.

**Setup:**

1. On your Android phone, go to `Settings > About Phone`
2. Tap **Build Number** 7 times until you see "Developer mode enabled"
3. Go back to `Settings > Developer Options`
4. Enable **USB Debugging**
5. Plug your phone into your Mac via USB and allow the connection when prompted
6. Run `npm start`, then press `a`

Metro will detect the connected device and install the app directly.

---

## Build a Standalone APK (EAS Build)

EAS Build lets you produce a real, installable APK file that lives on your
phone permanently. No Mac, no Metro, no cables needed after install.

**Step 1: Install EAS CLI**

```bash
npm install -g eas-cli
```

**Step 2: Create a free Expo account**

Go to [expo.dev](https://expo.dev) and sign up. Free tier is enough.

**Step 3: Log in**

```bash
eas login
```

**Step 4: Configure EAS in your project**

From inside the project directory:

```bash
eas build:configure
```

This creates an `eas.json` file and writes your personal EAS project ID into `app.json`
under `extra.eas.projectId`. If you forked this repo, you must run this step yourself
to replace the existing project ID with your own. Builds will fail otherwise.

**Step 5: Build the APK**

```bash
eas build --platform android --profile preview
```

This kicks off a cloud build on Expo's servers. Takes about 5 to 10 minutes.
You'll get a link when it's done.

**Step 6: Install on your phone**

Download the APK from the link Expo provides. When you open it on your phone,
Android will ask you to allow installation from unknown sources. Allow it, and
the app installs like any other app.

### Build profiles at a glance

| Profile | Output | Use case |
|---------|--------|----------|
| `preview` | `.apk` | Install directly on your phone |
| `production` | `.aab` | Upload to Google Play Store |

---

## Build for iOS (EAS)

```bash
eas build --platform ios --profile preview
```

**Important:** Building for a real iOS device requires an **Apple Developer
account** ($99/year). Without one, you can only build for the simulator.

For a simulator build (no Apple account needed):

```bash
eas build --platform ios --profile development
```

---

## Submit to Stores

Once you have a production build, EAS can handle submission too.

### Android (Google Play)

```bash
eas submit --platform android
```

Requires a Google Play Console account. You'll need to create the app listing
manually in the console first, then EAS handles the upload.

### iOS (App Store)

```bash
eas submit --platform ios
```

Requires an Apple Developer account. Same deal: create the app record in
App Store Connect first, then run this command to submit the build.

---

## Project Structure

```
project-yatagarasu/
├── src/
│   ├── components/       # Shared UI components
│   │   └── TodoItem.tsx
│   ├── hooks/            # Business logic as hooks
│   │   └── useTodos.ts
│   └── types/            # TypeScript interfaces
│       └── index.ts
├── assets/               # Icons, splash, favicon
├── App.tsx               # Root component — start here
├── app.json              # Expo config
└── tsconfig.json         # TypeScript config
```

---

## Tech Stack

- **Expo SDK 56** — managed workflow, zero native config needed
- **React Native 0.85** — powers iOS and Android
- **React Native Web** — same components, runs in browser
- **TypeScript** — strict mode enabled
- **React 19** — latest concurrent features

---

## HelloFullStack Demo App

The bundled demo is a simple todo list with:

- Add items
- Tap to edit inline
- Toggle complete / incomplete
- Tap to delete
- Live item counter
- Platform indicator badge (Web / iOS / Android)

The same `<TodoItem />` component renders natively on all three platforms.
No platform-specific forks. No conditional rendering hacks.

---

## Debugging Tips

### Web

Open browser DevTools with `F12` (or `Cmd+Option+I` on Mac). Console logs,
network requests, and the React component tree are all there.

### iOS and Android

Shake the device or simulator to open the **Expo dev menu**. From there you
can reload, toggle performance overlays, or open the JS debugger.

Press `r` in the Metro terminal at any time to trigger a full reload.

### Metro terminal

All `console.log` output from your app appears directly in the Metro terminal.
It's the fastest way to trace what's happening during development.

### Advanced debugging

- **React Native Debugger**: a standalone app that wraps Chrome DevTools with
  React and Redux panels. Connects to your running Metro instance.
- **Flipper**: Meta's desktop debugger for React Native. Supports network
  inspection, layout inspection, and plugin extensions.

---

## Philosophy

> LinkedIn engineers don't write three apps. They write one, and deploy everywhere.

Project Yatagarasu is designed around that principle: shared business logic, shared
components, shared types. Platform differences are handled by React Native's bridge,
not by you.

Build your feature once. Ship it everywhere.

---

## The Name

**Yatagarasu** (八咫烏) is a three-legged crow from Japanese mythology, a guide
that leads people across uncertain terrain. The three legs represent the three
platforms this stack runs on: Web, iOS, and Android.

### How do you say it?

> **Yah-tah-GAH-rah-soo**

| Syllable | Sounds like |
|----------|-------------|
| Yah      | "yah sure"  |
| tah      | "ta-da" minus the da |
| **GAH**  | "got" — this is the one you lean into |
| rah      | "ra" in ramen |
| soo      | "sue"       |

Say it fast and it flows like music. Say it slow and you sound like you're casting a spell.
Either way you're right. 🐦‍⬛

---

## License

MIT — fork it, star it, build something great with it.
