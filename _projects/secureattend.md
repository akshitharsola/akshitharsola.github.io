---
title: "SecureAttend: multi-factor attendance"
domain: AI Systems
order: 3
tier: more
summary: "Attendance system that checks a dynamic QR code, on-device face authentication and Bluetooth proximity before recording presence."
stack: [Python, FastAPI, PostgreSQL, Kotlin, BLE]
repo: "https://github.com/akshitharsola/SecureAttend-Backend"
abstract:
  - label: Problem
    text: "Roll calls, smart cards and static codes let students mark attendance for each other."
  - label: Approach
    text: "A FastAPI backend and a native Kotlin Android app that require three factors together: a dynamic session QR code, on-device face authentication and Bluetooth Low Energy proximity to the instructor's device."
  - label: Result
    text: "A complete verification pipeline that requires physical presence before attendance is recorded."
---
Personal project. [Backend code](https://github.com/akshitharsola/SecureAttend-Backend)

## Problem
Proxy attendance is easy when a single static check is enough. SecureAttend asks for three independent signals so that copying one of them is not enough.

## What I built
- **Backend:** FastAPI with SQLAlchemy and PostgreSQL, JWT authentication and a REST endpoint that accepts all factors in one request.
- **Android client:** QR scanning, Google ML Kit face verification, and BLE broadcasting and scanning for proximity.
- **Protocol:** attendance is recorded only when the submitted factors all pass.

## What it shows
- A full stack design connecting an asynchronous Python backend to a native Android app.
- On-device vision with Google ML Kit.
- Short range sensing with Bluetooth Low Energy.

## Limits
- No classroom trial results are reported, so there are no accuracy or usage figures.
- How the face check is matched (on-device or against a stored template) is not stated here.
- The Android client is in a [separate repository](https://github.com/akshitharsola/SecureAttend-Frontend-Android).
