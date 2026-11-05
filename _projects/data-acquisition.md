---
title: "Freelance: Sensor Data Acquisition and Client Apps"
domain: Data and Analytics
order: 1
tier: featured
summary: "Freelance: found why a client's Power BI request had no data, built the acquisition layer, API and live dashboards, plus LaTeX and mobile work."
stack: [C++, Python, Power BI, Kotlin, Swift, LaTeX]
headline: "Scope redirected to data acquisition"
abstract:
  - label: Problem
    text: "A client asked for a Power BI dashboard, but the sensor data it needed was not being captured."
  - label: Approach
    text: "Built a C++ and Python acquisition layer for the legacy sensors and exposed the readings through an API. Power BI connects to it with live updates and automated failure alerts."
  - label: Result
    text: "Scope moved from reporting to data acquisition. Alongside it: LaTeX paper formatting cut from 2+ days to 5 to 6 hours, and Kotlin and Swift apps for several clients, the final two shipped. Confidential work, no client names."
---
Confidential freelance work, 2024 to 2025. No client names or data are shown here.

## Problem
A client asked for a Power BI dashboard, but the sensor data it needed was not being captured. Finding that out redirected the scope from reporting to data acquisition.

## Pipeline
Each layer is shown with the tools used for it.

{% include diagrams/data-flow.html %}

<ol class="layers">
  <li><strong>Legacy sensors to readings.</strong> A C++ and Python acquisition layer supports the legacy sensors.
    <ul class="stack"><li>{% include tech-chip.html name="C++" %}</li><li>{% include tech-chip.html name="Python" %}</li></ul></li>
  <li><strong>Readings to API.</strong> The acquisition layer exposes the readings through an API.
    <ul class="stack"><li>{% include tech-chip.html name="Python" %}</li></ul></li>
  <li><strong>API to dashboards.</strong> Power BI dashboards connect to the API with live updates and automated failure alerts.
    <ul class="stack"><li>{% include tech-chip.html name="Power BI" %}</li></ul></li>
</ol>

## Other client work
<ol class="layers">
  <li><strong>Research-paper formatting.</strong> Automated LaTeX formatting of client research papers, cutting a task of 2+ days to 5-6 hours.
    <ul class="stack"><li>{% include tech-chip.html name="LaTeX" %}</li></ul></li>
  <li><strong>Mobile apps.</strong> Android apps in Kotlin and iOS apps in Swift/SwiftUI for several clients. The final two were shipped and delivered.
    <ul class="stack"><li>{% include tech-chip.html name="Kotlin" %}</li><li>{% include tech-chip.html name="Swift" %}</li></ul></li>
</ol>
