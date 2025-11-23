Note: This file provides context for Claude AI agents working on this project.

# Critical Velocity Calculator

Client-side calculator for the Critical Velocity Test, used by runners to calculate and plan their training.

Project Goal:
Mobile-first, feature-rich, static website hosted on Github Pages that calculates Critical Velocity values through various tests and settings, then provides downstream applications like 5-zone running pace calculation.

Tech Stack:
- React + Vite + Tailwind CSS
- DevContainer for local development
- GitHub Pages for hosting

Architecture:
Purely client-side application with no backend. All calculations occur in the browser.

Build Commands:
- npm install - Install dependencies
- npm run dev - Start development server
- npm run build - Build for production (output to dist/)
- npm run preview - Preview production build

Deployment:
Static build deployed to GitHub Pages via GitHub Actions or manual deployment using gh-pages package.
