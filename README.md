# My Portfolio

A clean, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## Features

- **Hero section** – name, role, and call-to-action buttons
- **About section** – short bio with profile placeholder
- **Skills section** – icon grid of technologies
- **Projects section** – project cards with tech tags and links
- **Contact section** – client-side validated form and social links
- Sticky navigation with scroll-spy active-link highlighting
- Mobile-friendly hamburger menu
- Dark theme using CSS custom properties

## Getting Started

No build step required. Simply open `index.html` in a browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html
```

Or serve locally with any static server, e.g.:

```bash
npx serve .
```

## Project Structure

```
My_Portfolio/
├── index.html       # Main HTML page
├── css/
│   └── style.css    # All styles
├── js/
│   └── script.js    # Interactivity (nav, form, etc.)
└── README.md
```

## Customization

Update the placeholder content in `index.html` with your real information:
- Replace **Project One / Two / Three** with your actual projects and GitHub links
- Update the **About Me** paragraph with your own bio
- Replace the `href="#"` in social links with your real profile URLs
- Swap the avatar placeholder for an actual `<img>` tag pointing to your photo
