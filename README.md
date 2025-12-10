🎮 Tic-Tac-Toe
A simple and modern 2-player Tic-Tac-Toe game built with React + Vite

Live Demo: https://m-icky.github.io/Tic-Tac-Toe/

A lightweight, browser-based two-player Tic-Tac-Toe game built using React, Vite, and reactbits. Designed for quick, local gameplay with a clean and responsive UI — no backend required.

✨ Features

🎲 Two-player local mode

📱 Responsive and minimal UI

🏆 Win and draw detection

🔁 Restart / New Game button

⚡ Fast performance with Vite

🧩 Built with modern React components

🛠 Tech Stack
Technology	Purpose
React	UI framework
Vite	Dev server + build tool
reactbits	Utility components & hooks
CSS	Styling
🚀 Live Demo

Click below to play instantly:

https://m-icky.github.io/Tic-Tac-Toe/

💻 Run Locally
1️⃣ Clone the repository
git clone https://github.com/m-icky/Tic-Tac-Toe.git
cd Tic-Tac-Toe

2️⃣ Install dependencies
npm install
# or
yarn
# or
pnpm install

3️⃣ Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev


Now open the URL printed in the terminal, usually:

http://localhost:5173

📦 Build for Production
npm run build
# or
yarn build
# or
pnpm build


Production files will be inside the dist/ folder.

🌐 Deployment (GitHub Pages)

Ensure your vite.config.js contains the correct base URL:

export default defineConfig({
  base: '/Tic-Tac-Toe/',
  plugins: [react()],
});


Deploy either by:

Pushing dist/ to the gh-pages branch

Or enabling GitHub Pages from repository settings

🎯 **How to Play**

Player 1 is X, Player 2 is O

Players take turns clicking an empty cell

First player to align three symbols (row, column, diagonal) wins

If all cells are filled → Draw
