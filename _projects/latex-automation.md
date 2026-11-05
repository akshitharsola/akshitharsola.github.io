---
title: "Word to LaTeX paper converter"
domain: Mobile, Desktop and Developer Tools
order: 3
tier: more
summary: "Pipeline that converts academic Word documents into IEEE, ACM and Springer LaTeX templates."
stack: [Python, FastAPI, React, TypeScript, LaTeX]
repo: "https://github.com/akshitharsola/LaTeX-Automatic-Parsing-Python"
abstract:
  - label: Problem
    text: "Reformatting manuscripts from Word into publisher LaTeX templates is slow, repetitive and error prone."
  - label: Approach
    text: "A Python and FastAPI engine using docx2python, with a React and TypeScript interface, that parses document structure, formats author metadata and fills IEEE, ACM and Springer templates."
  - label: Result
    text: "An automated conversion workflow, the toolchain behind my freelance paper formatting work (2+ days cut to 5 to 6 hours)."
---
Personal project. [Converter code](https://github.com/akshitharsola/LaTeX-Automatic-Parsing-Python)

See also the [freelance page](/projects/data-acquisition/).

## Problem
Each publisher wants a different template, and moving a manuscript across by hand takes hours. This toolchain parses the Word file once and fills the right template.

## What I built
- **Parsing:** Python with docx2python to read document structure and author metadata.
- **API:** FastAPI backend serving the conversion.
- **Interface:** a drag and drop React and TypeScript front end that packages output with JSZip.
- **Templates:** IEEE, ACM and Springer formats.

## What it shows
- Document parsing and format conversion.
- A FastAPI and React web architecture.
- Automation that removes manual work from publishing workflows.

## Limits
- Client work is confidential, so no client names or documents appear here or in the public repositories.
- Whether equations and tables convert without review is not stated here.
- The interface is in a [second repository](https://github.com/akshitharsola/overleaf-automation).
