---
title: "AutoVision: semi-automated image annotation"
domain: Robotics and Computer Vision
order: 3
tier: more
summary: "Desktop tool that proposes bounding boxes with classical Canny edge detection to speed up dataset labelling."
stack: [Python, OpenCV, PyQt5]
repo: "https://github.com/akshitharsola/AutomationIMG"
abstract:
  - label: Problem
    text: "Manual bounding box annotation is slow and bottlenecks computer vision dataset work."
  - label: Approach
    text: "A PyQt5 interface with folder batching, image preprocessing and Canny edge detection that proposes object boundaries for review."
  - label: Result
    text: "A working desktop annotation tool built on classical image processing, with no trained model required."
---
Personal project. [Code](https://github.com/akshitharsola/AutomationIMG)

## Problem
Drawing bounding boxes by hand for a vision dataset is repetitive. The aim was to let classical image processing propose the boxes so a person only reviews and corrects them.

## What I built
- A PyQt5 graphical interface for opening and stepping through a directory of images.
- Preprocessing and Canny edge detection to propose candidate object boundaries.
- Packaging as an installable Python project.

## What it shows
- Practical image processing and boundary extraction with OpenCV.
- Desktop GUI engineering in Python with PyQt5.
- Tooling that prepares datasets for vision pipelines.

## Limits
- The repository description claims a 60% cut in annotation time. I have not re-measured that, so treat it as the repo's claim.
- Edge detection proposes boundaries well on clean backgrounds and needs review on cluttered scenes.
