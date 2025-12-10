Tic-Tac-Toe

Live demo: https://m-icky.github.io/Tic-Tac-Toe/

A lightweight, browser-based two-player Tic-Tac-Toe game built with React, Vite, and reactbits. Play locally in the browser with a friend — no backend required.

Features

Two-player mode (local)

Clean and responsive UI

Win and draw detection

Game restart functionality

Modern frontend tooling (React + Vite)

Tech Stack

React – UI framework

Vite – Modern dev environment and build tool

reactbits – Utility UI components and helpers

CSS for styling

Demo
https://m-icky.github.io/Tic-Tac-Toe/

Run Locally
1. Clone the repository
git clone https://github.com/m-icky/Tic-Tac-Toe.git
cd Tic-Tac-Toe

2. Install dependencies
npm install
# or
yarn
# or
pnpm install

3. Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev


Open the URL that Vite prints in your terminal (typically http://localhost:5173).

Build for Production
npm run build
# or
yarn build
# or
pnpm build


Build output will be located in the dist/ folder.

Deployment (GitHub Pages)

To deploy, ensure you set the correct base path in vite.config.js:

export default defineConfig({
  base: '/Tic-Tac-Toe/',
  plugins: [react()],
})


Push your dist/ output to the gh-pages branch or use GitHub Pages settings.

How to Play

Player 1 uses X, Player 2 uses O.

Players alternate selecting available cells.

First player to align three symbols (row, column, diagonal) wins.

If the grid fills without a winner, the game ends in a draw.

Use Restart to begin a new round at any time.
