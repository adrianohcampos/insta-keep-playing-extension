# InstaKeepPlaying

[![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-Manifest_v3-4285F4?style=flat-square&logo=googlechrome&logoColor=white)](#)
[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> Chrome extension that stops Instagram from pausing videos, Reels, and Stories when you switch tabs or minimize the window.

---

## Introduction

Instagram uses the **Page Visibility API** and focus events (`visibilitychange`, `blur`, `pagehide`) to pause media when the tab is no longer visible. **InstaKeepPlaying** injects a script at `document_start` in the **MAIN world**, so the page thinks the tab is always visible.

## Requirements

- Google Chrome (or Chromium) with Manifest V3 support
- An Instagram account (web)

## Installation

### Developer mode (unpacked folder)

1. Clone or download this repository.
2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked**.
5. Select the project folder (`insta-keep-playing-extension`).
6. Open or reload `https://www.instagram.com` and switch tabs while a Reel/Story is playing.

## Usage

1. Click the extension icon to **enable/disable** (green dot = on, gray = off).
2. Open Instagram and play a video/Reel/Story.
3. Switch tabs or minimize the window — with the option on, media keeps playing.

Toggling reloads Instagram tabs so the new state applies. Scope: `*://*.instagram.com/*`.

## How It Works

At `document_start` (before Instagram's JS):

1. `document.hidden` / `webkitHidden` → always `false`
2. `document.visibilityState` → always `'visible'`
3. Blocks `visibilitychange`, `blur`, and `pagehide` (capture phase + `stopImmediatePropagation`)

Main files:

| File | Role |
|------|------|
| `manifest.json` | Manifest V3 and permissions |
| `background.js` | Icon toggle + green/gray badge |
| `content.js` | Injects `inject.js` only when enabled |
| `inject.js` | Visibility API override and event blocking |

## Contributing

PRs are welcome. Keep the scope limited to Instagram and avoid extra permissions.

## Changelog

### 1.1.0

- Click the icon to enable/disable
- Green/gray badge on the icon showing the current state

### 1.0.0

- Page Visibility API override
- Blocks `visibilitychange`, `blur`, and `pagehide`
- MAIN world injection at `document_start`
