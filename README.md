# GSAP Scroll Animation with React & Tailwind CSS

This project is an exact conversion of a GSAP scroll-triggered animation from vanilla JavaScript to React with Tailwind CSS.

## Features

- **Scroll-triggered animations** using GSAP ScrollTrigger
- **Pin section** during scroll for immersive experience
- **Image scaling effect** with sine wave progression
- **Vertical scrolling** of image gallery
- **Fully responsive** with Tailwind CSS

## Animation Details

The animation includes:
1. A pinned section that stays in view during scroll
2. A vertical gallery of 4 images that scrolls upward
3. Each image scales from 0.65 to 1.0 using a smooth sine wave pattern
4. Smooth scrubbing tied to scroll position

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

- React 18
- GSAP 3.12+ with ScrollTrigger
- Tailwind CSS 3.4+
- Vite 5

## Project Structure

```
├── src/
│   ├── AnimationSection.jsx  # Main animation component
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind directives
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Animation Behavior

The animation preserves the exact behavior of the original:
- **Timeline duration**: 300% of viewport height
- **Pin**: Section is pinned during scroll
- **Right container**: Scrolls vertically by -75%
- **Images**: Scale from 0.65 to 1.0 with sine wave (0.65 + sin(progress * π) * 0.35)
- **Scrubbing**: Smooth scroll-linked animation

## Notes

The background image path `assest-images/03 1.png` should be placed in the `public` folder or updated to a valid image URL.
