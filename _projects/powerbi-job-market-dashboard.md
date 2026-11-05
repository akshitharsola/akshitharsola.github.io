---
title: "Job market dashboards in Power BI"
domain: Data and Analytics
order: 3
tier: more
summary: "Power BI dashboards on 2024 data job postings, built on a star schema with DAX measures and drill-through views."
stack: [Power BI, Power Query, DAX]
repo: "https://github.com/akshitharsola/powerbi-job-market-dashboard"
abstract:
  - label: Problem
    text: "Comparing pay and remote work across data roles needs irregular job listing data to be cleaned and structured first."
  - label: Approach
    text: "Power Query for cleaning, a star schema linking job posting facts to company and skill dimensions, and DAX measures for aggregation."
  - label: Result
    text: "Two dashboard editions with salary benchmarks, role distributions and drill-through job analysis."
---
Personal project. [Code and dashboards](https://github.com/akshitharsola/powerbi-job-market-dashboard)

## Problem
Job postings arrive as messy, inconsistent records. The project turns a public 2024 dataset into a model that dashboards can query reliably.

## What I built
- **Cleaning:** transformation and preparation in Power Query.
- **Model:** a star schema with a job postings fact table and company and skill dimensions.
- **Measures:** explicit and parameterised DAX measures.
- **Dashboards:** two editions, committed as `.pbix` files in the repository.

## What it shows
- Dimensional modelling with facts and dimensions.
- Business intelligence calculations in DAX.
- Data extraction and cleaning in Power Query.

## Limits
- The number of postings processed is not stated here.
- The dataset comes from datanerd.tech, as credited in the repository.
