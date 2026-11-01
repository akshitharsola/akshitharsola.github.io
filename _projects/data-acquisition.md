---
title: "Freelance: Sensor Data Acquisition and Client Apps"
domain: Systems Integration
order: 3
summary: "Freelance: found why a client's Power BI request had no data, built the acquisition layer, API and live dashboards, plus LaTeX and mobile work."
stack: [C++, Python, Power BI, Kotlin, Swift, LaTeX]
---
Confidential freelance work, 2024 to 2025. No client names or data are shown here.

## Problem
A client asked for a Power BI dashboard, but the sensor data it needed was not being captured. Finding that out redirected the scope from reporting to data acquisition.

## Pipeline
Each layer is shown with the tools used for it.

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
