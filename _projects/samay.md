---
title: "Samay: AI session manager"
domain: AI Systems
order: 2
tier: more
summary: "Multi-agent platform that keeps authenticated browser sessions open across several web AI assistants."
stack: [Python, FastAPI, React, SeleniumBase]
repo: "https://github.com/akshitharsola/Samay"
abstract:
  - label: Problem
    text: "Web AI assistants need frequent re-authentication and have no unified way to manage several of them."
  - label: Approach
    text: "Six architecture iterations, from SeleniumBase automation with Gmail OTP retrieval to a Chrome Manifest V3 extension, FastAPI backend and React dashboard."
  - label: Result
    text: "Version 6 submits queries to several AI services, and version 3 keeps authenticated sessions across system restarts."
---
Personal project. [Code](https://github.com/akshitharsola/Samay)

## Problem
Each web AI assistant has its own login and session handling. Samay explores keeping those sessions alive and sending one query to several assistants from one place.

## What I built
- **Early versions:** SeleniumBase browser automation with automated Gmail OTP retrieval for sign-in.
- **Version 3:** persistence of authenticated sessions across system restarts.
- **Version 5 and 6:** a FastAPI backend, a React dashboard and a Chrome Manifest V3 extension that submits queries.

## What it shows
- Iterating a multi-tier architecture across six approaches.
- Browser automation, anti-bot handling and Chrome extension engineering.
- Asynchronous API design with FastAPI and automated authentication flows.

## Limits
- This is an exploratory project, and its maintenance status is not stated here.
- Automated response extraction is not claimed as finished.
