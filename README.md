# Akshit Harsola: portfolio

Source for my portfolio site: a short technical dossier for Machine Learning, Robotics and Computer Vision work. Built with Jekyll for GitHub Pages. No Node build, no JS frameworks, no web fonts or trackers.

## What's on it
- **Home:** an AI-generated intro video of a robot arm (captioned as illustrative), key results, and the three project cards.
- **Projects** (`_projects/`):
  - Learning to pick with a LeRobot SO-101 arm (MSc major project).
  - Classical parking-spot occupancy detection with OpenCV.
  - Confidential freelance sensor data acquisition work (no client details).
- **CV:** `assets/cv-akshit-harsola.pdf`.

Every number on the site comes from the linked repos, reports or CV. Anything unverified is left out.

## Run locally
```bash
bundle install
bundle exec jekyll serve --livereload   # http://localhost:4000
```
Strict check used before each commit:
```bash
bundle exec jekyll build --strict_front_matter
```

## Layout
```
_config.yml       site config and the `projects` collection
_layouts/         default.html (shell), project.html
_includes/        intro loader, tech chips, Mermaid loader
_projects/        one Markdown file per project
assets/css/       main.css (plain CSS, custom properties)
assets/js/        intro.js (loader, typing lines, video, scroll reveals; vanilla JS)
assets/media/     hero video (mp4/webm), poster, portrait
.github/workflows CI: yamllint and a Jekyll build
```

## Behaviour notes
- The intro loader runs once per browser session. Visitors with `prefers-reduced-motion`, or with JavaScript off, get the poster frame and all content immediately.
- The page never waits on the video: scrolling works throughout and "Skip" is always available.
- Fonts are system fonts. Mermaid diagrams on project pages and the tech logo chips are the only external loads.

## Contact
[GitHub](https://github.com/akshitharsola) · [LinkedIn](https://www.linkedin.com/in/akshit-harsola/) · harsolaakshit@gmail.com
