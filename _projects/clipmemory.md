---
title: "ClipMemory: macOS clipboard manager"
domain: Mobile, Desktop and Developer Tools
order: 2
tier: more
summary: "Menu bar clipboard history for macOS with a global hotkey, direct paste injection and Keychain-backed encryption."
stack: [Swift, AppKit, Accessibility API, AES-256-GCM]
repo: "https://github.com/akshitharsola/clipmemory"
abstract:
  - label: Problem
    text: "macOS has no lightweight clipboard history with hotkey recall and direct paste."
  - label: Approach
    text: "A Swift and AppKit menu bar app using the Accessibility API for paste injection, with filter rules for transient clipboard content and AES-256-GCM encryption keyed through the Keychain."
  - label: Result
    text: "A menu bar app with no Dock icon, hotkey navigation and encrypted storage capped at 200 items."
---
Personal project. [Code](https://github.com/akshitharsola/clipmemory)

## Problem
Copying several things in a row loses the earlier ones. ClipMemory keeps a short history, opens from a hotkey and pastes the chosen item into the front app.

## What I built
- **Menu bar app:** Swift and AppKit, running without a Dock icon.
- **Paste injection:** synthetic paste through the macOS Accessibility API and global event monitors.
- **Storage:** snippets encrypted with AES-256-GCM, with the key in the Apple Keychain, capped at 200 items.

## What it shows
- Native macOS programming in Swift and AppKit.
- Accessibility API integration and global hotkeys.
- Secure local storage with Keychain and authenticated encryption.

## Limits
- Notarised or Homebrew distribution is not claimed. The repository ships a release DMG.
