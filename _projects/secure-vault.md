---
title: "SecureVault: offline password manager"
domain: Mobile, Desktop and Developer Tools
order: 1
tier: more
summary: "Offline Android password manager with Keystore-backed AES-256-GCM, biometric unlock and post-quantum hybrid backups."
stack: [Kotlin, Jetpack Compose, Room, Android Keystore]
repo: "https://github.com/akshitharsola/Secure-Vault"
abstract:
  - label: Problem
    text: "Mobile credential stores can be extracted by software attacks, and encrypted backups face long term risk from future quantum computers."
  - label: Approach
    text: "A Kotlin app with AES-256-GCM backed by the Android Keystore, biometric authentication, and an ML-KEM-768 plus X25519 hybrid scheme for encrypted backups."
  - label: Result
    text: "Credential storage with no network access, local tamper detection, and atomic backup restore with rollback."
---
Personal project. [Code and releases](https://github.com/akshitharsola/Secure-Vault)

## Problem
A password manager should work offline and keep secrets safe even if a backup file leaks later. SecureVault keeps everything on the device and protects exports with a hybrid post-quantum scheme.

## What I built
- **Storage:** Room and SQLite with transactional writes.
- **Keys:** AES-256-GCM with the key held by the Android Keystore, and biometric unlock through BiometricPrompt.
- **Backups:** ML-KEM-768 and X25519 key encapsulation with AES-256-GCM, restored atomically with rollback.

## What it shows
- Modern Android development with Kotlin, Jetpack Compose and clean architecture.
- Hardware-backed key storage and hybrid post-quantum key encapsulation.
- Offline-first persistence with transactional safety.

## Limits
- Backup encryption has not been benchmarked here, so there are no timing figures.
- The project has not had an independent security audit.
