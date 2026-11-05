---
title: "Planning Intelligence: council data pipeline"
domain: Data and Analytics
order: 2
tier: more
summary: "Ingestion pipeline for Galway City and County planning data, with PostgreSQL, Alembic migrations and weekly scheduled runs."
stack: [Python, PostgreSQL, Alembic, Docker Compose]
repo: "https://github.com/akshitharsola/planning-intelligence"
abstract:
  - label: Problem
    text: "Planning records in Ireland sit on separate local authority portals, with no common extraction or structured store."
  - label: Approach
    text: "A modular Python ingestion pipeline for Galway City and Galway County, with PostgreSQL in Docker Compose, Alembic migrations and scheduled runs."
  - label: Result
    text: "A weekly ingestion pipeline that processes raw PDFs and persists them to the database."
---
Personal project. [Code](https://github.com/akshitharsola/planning-intelligence)

Built in a shared repository with collaborators.

## Problem
To compare planning applications across councils, the data first has to be collected and stored in one schema. This project builds that ingestion layer for Galway City and County.

## What I built
- **Ingestion:** a modular Python pipeline with one source module per council.
- **Storage:** PostgreSQL run through Docker Compose, with Alembic managing schema migrations.
- **Scheduling:** weekly runs on macOS through launchd.
- **Quality:** Pytest tests and pre-commit hooks in a shared repository.

## What it shows
- Backend data engineering and ETL design across different sources.
- Database migrations and containerised services.
- Scheduled pipelines and collaborative practice.

## Limits
- Record counts and data volumes are not reported here.
- The repository covers ingestion only. No search or map dashboard is claimed.
