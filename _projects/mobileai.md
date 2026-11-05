---
title: "MobileAI: an on-device LLM server for Android"
domain: AI Systems
order: 1
tier: featured
summary: "An Android phone turned into a local inference node: LiteRT-LM model runtime, an OpenAI-compatible HTTP API and a Telegram bot, all on the device."
stack: [Kotlin, Jetpack Compose, Ktor]
abstract:
  - label: Problem
    text: "On-device language models usually live inside a single foreground chat window, with no way for other software to call them."
  - label: Approach
    text: "Forked the open-source MLCChat app, replaced its execution engine with Google LiteRT-LM, and added a background service, an embedded Ktor HTTP server and a Telegram bot worker."
  - label: Result
    text: "A phone that serves OpenAI-compatible completion requests and Telegram prompts with inference running fully on the device. No throughput figures are claimed here."
---
MobileAI is a fork of the Apache 2.0 licensed MLCChat Android app. [Code](https://github.com/akshitharsola/MobileAI)

## Problem
Language model apps on phones are built for one person typing into one screen. I wanted the phone itself to act as an inference node that other programs and chat clients can reach, without sending prompts to a cloud service.

## What came from upstream, and what I built
- **From MLCChat:** the proof-of-concept chat interface and the TVM/MLC compilation scripts.
- **Engine migration:** removed the MLC artifacts and wrapped Google LiteRT-LM in `LiteRtLmEngine.kt` with load, unload and streaming response calls.
- **Background service:** a foreground inference service keeps the model running without the app in focus.
- **Network API:** an embedded Ktor server exposes `/v1/chat/completions`, `/v1/models/load` and a health endpoint, with streaming responses and a loopback self-test.
- **Telegram bot:** a polling worker forwards prompts to the local model.
- **Model management:** models download with Hugging Face token authentication, and a thermal governor limits sustained load.

## What it shows
- Deploying and swapping a model runtime on constrained mobile hardware.
- Long-running Android background services and their memory and thermal limits.
- Designing a streaming API that existing OpenAI-style clients can use.

## Limits
Generation speed, thermal behaviour and battery use under continuous serving have not been measured, so this page makes no performance claim.
