---
title: Classical Parking Occupancy Detection
domain: Robotics and Computer Vision
order: 2
tier: featured
summary: "Classical OpenCV pipeline detecting 95.1% of parking spots and classifying occupancy (74.2% F1) at ~120 ms per image, with no training data."
stack: [Python, OpenCV]
headline: "95.1%"
headline_label: "parking spots detected (328 of 345)"
abstract:
  - label: Problem
    text: "Detect parking spots and classify each as occupied or empty from aerial drone images, with no training data."
  - label: Approach
    text: "A classical OpenCV pipeline. Image difficulty picks the method: template matching, Hough lines with DBSCAN, or rotated rectangles."
  - label: Result
    text: "95.1% of spots detected (328 of 345), 74.2% occupancy F1, about 120 ms per image on an Apple M2 with no GPU. Medium and hard layouts need manual zones."
---
EE551 Embedded Image Processing course project, University of Galway.
[Code and report](https://github.com/akshitharsola/Classical-Parking-Spot-Detection-and-Occupancy-Classification-Using-Image-Processing)

## Problem
Detect parking spots and classify each as occupied or empty from aerial drone images. The pipeline is classical (non-ML): it needs no training data and every decision can be inspected.

## Pipeline
Image difficulty sets the method. The three tiers are:

- **Easy (regular grids):** template matching with normalised cross-correlation, spots placed on a grid from the matches. Occupancy comes from edge density and intensity variance.
- **Medium (partly occluded zones):** a manually defined zone, Gaussian blur, Canny edges, probabilistic Hough lines, then DBSCAN to group collinear lines into spot corners.
- **Hard (angled spots, 0° to 45°):** manual zones per image, relaxed Hough parameters, rotated rectangles (`cv2.minAreaRect`), and a five-feature occupancy score with thresholds learned per zone from the first 2-3 detections.

{% include diagrams/edge-tiers.html %}


## Evaluation and constraints

{% include diagrams/edge-results.html %}

10 aerial test images (4 easy, 3 medium, 3 hard), 345 ground-truth spots. Measured on an Apple M2 with no GPU.

- **Spot detection:** 95.1% overall (328 of 345). Easy 78/78, medium 95/95, hard 155/172 (90.1%).
- **Occupancy classification (F1):** 74.2% overall. Easy 100%, medium 52.7%, hard 71.0%.
- **Latency:** about 45 / 120 / 200 ms per image for easy / medium / hard, averaging about 120 ms (9 fps).
- **Memory:** 50-80 MB per image.

### Constraints and trade-offs

| Difficulty Tier | Test Images | Spot Detection Rate | Occupancy (F1) | Latency per Image |
| :--- | :--- | :--- | :--- | :--- |
| **Easy** | 4 | 100% (78/78) | 100% | ~45 ms |
| **Medium** | 3 | 100% (95/95) | 52.7% | ~120 ms |
| **Hard** | 3 | 90.1% (155/172) | 71.0% | ~200 ms |
| **Overall / Average** | **10** | **95.1% (328/345)** | **74.2%** | **~120 ms (9 fps)** |

Memory: 50-80 MB per image (the report gives one range, not a per-tier figure).

**Trade-offs:** the classical approach needs no labelled training data and its decisions can be inspected. The price is lower occupancy accuracy on medium images (52.7% F1) and manually defined zones on medium and hard layouts. The report also sketches a hypothetical YOLOv8 comparison (not a measurement): it would need 10,000+ labelled images and a GPU.

## Limits
- **Manual zones:** medium and hard images need the parking zones defined by hand (7 zones for the largest image).
- **Medium images:** occupancy F1 was only 52.7%. The report names shadows creating false line detections, decorative markings such as trees and bollards, and DBSCAN occasionally merging neighbouring spots.
- **Hard images:** on one image only 8 of 25 spots were detected (32%), though occupancy on those 8 was correct.
- **Generalisation:** thresholds are fixed per image set, and there is no temporal analysis for video.
- **Platform:** the report calls the pipeline suitable for a Jetson Nano. It was not run on one. Jetson optimisation is future work, with DBSCAN as the bottleneck.

## What I'd do next
- Fully automated line detection to remove the manual zones (the report suggests LoG edge detection with adaptive thresholds).
- Inverse perspective mapping for heavily angled images.
- Jetson Nano optimisation, starting with DBSCAN.
