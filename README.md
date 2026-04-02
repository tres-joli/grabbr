# Grabbr

Grabbr is a desktop multimedia downloader built with Electron, React, and TypeScript. It is focused on a fast local workflow for downloading audio or video from supported URLs with `yt-dlp`, bundled media tools, saved preferences, and platform-specific desktop builds.

## Features

- Desktop-first downloader for YouTube and Instagram links
- Audio and video download modes with persistent preferences
- Audio presets plus custom output controls for FLAC, ALAC, WAV, OPUS, M4A, MP3, and VORBIS
- Video presets plus custom quality selection from 144p up to 4320p and MP4 or MKV output
- Video sorting preferences for prioritizing H.264 or H.265 sources before other selection rules
- Optional post-download video re-encoding with configurable encoder and codec choices
- Optional metadata and chapter embedding
- Download location modes for asking every time or using a saved folder
- Theme switching plus resettable saved options
- Native folder and file pickers, cancelable downloads, and "Show in Folder" actions
- In-app `yt-dlp` version checking and updating
- Packaged app auto-update support through `electron-updater`
- Experimental `cookies.txt` support for rate-limited downloads, with cleanup after use

## Tech Stack

- Electron 41
- React 19
- TypeScript 6
- electron-vite
- Tailwind CSS 4
- Bun
- electron-builder
- electron-store

## Project Structure

```text
grabbr/
├── build/                 # App icons and macOS entitlements
├── scripts/               # Local setup utilities
├── src/
│   ├── main/              # Electron main process, IPC, updater, yt-dlp services
│   ├── preload/           # Safe renderer bridge
│   └── renderer/          # React UI
├── electron-builder.yml   # Packaging config
├── electron.vite.config.ts
└── package.json
```

`resources/bin/` is created locally by the binary download script and contains the platform-specific `yt-dlp`, `ffmpeg`, and `ffprobe` executables used by the app.

## Prerequisites

- [Bun](https://bun.sh/)
- Windows, macOS, or Linux

## Getting Started

### Install dependencies

```bash
bun install
```

### Download required binaries

```bash
bun run down
```

This downloads platform-specific copies of `yt-dlp`, `ffmpeg`, and `ffprobe` into `resources/bin`.

### Start development

```bash
bun run dev
```

### Preview the built app

```bash
bun run start
```

## Build

### Typecheck and bundle

```bash
bun run build
```

`bun run build` runs the repo typechecks before bundling the Electron app.

### Package for a platform

```bash
bun run build:win
bun run build:mac
bun run build:linux
```

These commands create platform-specific packages using the current project build output.

### Create an unpacked build

```bash
bun run build:unpack
```

Packaged output is written to `dist/`.

## Available Scripts

- `bun run dev` starts Electron and the renderer in development mode
- `bun run start` previews the current built app
- `bun run build` runs both TypeScript checks and builds the app
- `bun run build:win` creates a Windows package
- `bun run build:mac` creates a macOS package
- `bun run build:linux` creates Linux packages
- `bun run build:unpack` creates an unpacked desktop build
- `bun run typecheck` runs both Node and renderer TypeScript checks
- `bun run lint` runs `oxlint`
- `bun run format` formats the repo with `oxfmt`
- `bun run down` downloads required media binaries
- `bun run clean` removes dependencies and build artifacts

## Download Options

### Audio

- `Best` preset for fast highest-quality audio downloads
- `Custom` preset with selectable format and quality controls
- Optional metadata and chapter embedding

### Video

- `Best` preset for fast highest-quality MP4 downloads
- `Custom` preset with selectable resolution and container
- Optional sorting rules to prefer H.264 or H.265 compatible sources
- Optional metadata and chapter embedding

### Sorting

- Prefer H.264 or H.265 formats before the usual quality selection logic
- Useful when you want better compatibility without enabling re-encoding

### Encoding

- Optional re-encoding for downloaded video
- Configurable encoder and output codec selections
- Best described as an advanced workflow because it can be slow and resource-intensive

### General

- System, light, and dark themes
- Ask every time or reuse a selected download folder
- Reset saved options back to defaults

### Updates

- Show installed `yt-dlp` version
- Update `yt-dlp` directly from the app
- Receive packaged app updates when running production builds

### Experimental

- Select a `cookies.txt` file for cases where rate limits block downloads
- Treat this feature carefully because the file may contain sensitive account data
- Grabbr deletes the selected `cookies.txt` file after a download flow, so do not point it at your only copy

## Releases

GitHub Actions builds draft releases for Windows, macOS, and Linux when version tags matching `v*.*.*` are pushed.
