# Critical Velocity Calculator

A mobile-first web calculator for runners to determine their Critical Velocity (CV) and calculate training zones.

## What is Critical Velocity?

Critical Velocity is a key physiological metric for runners that represents the theoretical running speed that can be maintained indefinitely without fatigue. In practice, it approximates the speed at the lactate threshold and is highly useful for:

- Determining training intensities across different zones
- Planning interval workouts and tempo runs
- Predicting race performances
- Tracking fitness improvements over time

This calculator helps runners determine their CV through various testing protocols and then uses that value to calculate personalized 5-zone training paces.

## Features

- Multiple CV test protocols and calculation methods
- 5-zone training pace calculator based on CV results
- Mobile-first, responsive design
- Client-side only - no data sent to servers
- Fast and lightweight

## Tech Stack

- React
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Local Development

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd vcr
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Using DevContainer

If you're using VS Code with the Dev Containers extension:

1. Open the project in VS Code
2. Click "Reopen in Container" when prompted
3. Run `npm install` and `npm run dev` inside the container

## Building for Production

Build the static site:

```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## Deployment to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"
3. Push your changes to the main branch
4. The included GitHub Actions workflow will automatically build and deploy

### Option 2: Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to GitHub Pages using `gh-pages` or another deployment tool:
   ```bash
   npm install -g gh-pages
   gh-pages -d dist
   ```

## Contributing

This is a personal project and I generally won't be accepting any change requests, but feel free to open issues and discussions, as well as forking the project to modify if you find this project useful or interesting.
