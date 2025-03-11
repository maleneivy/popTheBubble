![GitHub Repo stars](https://img.shields.io/github/stars/maleneivy/popthebubble?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/maleneivy/popthebubble)
![GitHub license](https://img.shields.io/badge/license-CC%20BY--NC%204.0-lightgrey)
[![Netlify Status](https://api.netlify.com/api/v1/badges/35b9c474-4df1-45fc-9485-8bf8f9c14ec1/deploy-status)](https://app.netlify.com/sites/popth3bubble/deploys)

📖 This document is available in [Norwegian](README.md).

# 🫧 Pop The Bubble 🫧  

### 🌍 Live Demo
[🎮 Play Pop The Bubble here!](https://popth3bubble.netlify.app/)

**Pop The Bubble** is a fun and interactive browser game where the goal is to pop as many bubbles as possible before time runs out! But be careful – some bubbles give negative points!  

![Pop The Bubble Gameplay](/src/assets/img/game.png)

## 🎮 Game Rules  
- Pop blue bubbles to earn points.  
- Avoid the red bubbles – they will deduct points!  
- The game lasts **20 seconds** – how many points can you get?  
- Choose between **different difficulty levels** and **game modes**:  
  - **Easy, Medium, Hard** (bubble speed)  
  - **Calm or Chaos** (movement pattern)  

## ✨ Features  
✔️ **Dynamic bubbles** with varying sizes and point values.  
✔️ **Red penalty bubbles** add an extra challenge.  
✔️ **Countdown and visual effects** for the last seconds.  
✔️ **Responsive design** – play on both desktop and mobile.  
✔️ **Easy to extend** – simple TypeScript-based codebase.  

## 🛠️ Technologies  
**Pop The Bubble** is built with the following technologies:  
- **HTML, CSS, TypeScript**  
- **DOM manipulation for dynamic bubbles**  
- **CSS animations for bubble movement**  

## 📂 Project Structure  
```
pop-the-bubble/   
├── src/ # Source Code 
│   ├── app.ts #Main game logic
│   ├── styles.css # SGame design and layout
│   ├── index.html # Main HTML structure 
├── assets/ # Images, icons 
│   ├── icons/ # Icons
|   |── img/ # Images
├── dist/ # Built version (for distrubution)
├── .github/workflows/ # CI/CD workflows
├── README.md # Documentation in Norwegian
├── README.en.md # Documentation in English
├── LICENSE # Project license (CC BY-NC 4.0 – Non-commercial use only)
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── eslint.config.js # ESLint configuration for code linting
```

## 🚀 Getting Started  
### 1️⃣ Install dependencies  
```sh
npm install
```

### 2️⃣ Run the game locally
```sh
npm run watch
```
This starts a live server so you can test the game in your browser.

### 3️⃣ Build the project
```sh
npm run build
```
This compiles the TypeScript code and copies necessary files to the dist/ folder.

## 🎨 Future Development
Want to contribute or expand the game? Here are some ideas:

- 🎨 **More bubble types** (e.g., power-ups or frozen bubbles).
- 🔊 **Different sound effects** based on bubble size.
- 🏆 **High score storage** using LocalStorage or a database.

## 🤝 Contributing
This project is open for learning and experimentation! If you want to contribute:

1. Fork the repository to your own GitHub account.
2. Create a new branch for your changes:
   ```sh
   git checkout -b feature-name
   ```
3. Make changes, commit, and push your branch:
   ```sh
   git commit -m "Added a new feature"
   git push origin feature-name
   ```
4. Open a Pull Request to the main branch.

## 🔒 Contribution Rules
- All changes must be made via Pull Requests – direct push to main is not allowed.
- Code must follow TypeScript standards, and linting/build checks must pass before merging.
- Keep the code clean and add descriptions of what has been changed.

## 📜 License
This project is licensed under CC BY-NC 4.0.
- 🔹 You can use, modify, and share the code.
- ❌ However, you may not use it commercially without permission.

This means you are free to use and distribute the code, but you cannot use it in a commercial app or service without explicit permission.

For more details: CC BY-NC 4.0