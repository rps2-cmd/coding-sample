# How to test game

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

## 🚀 Quick Start

### 1. Clone and Navigate
```bash
git clone https://github.com/rps2-cmd/coding-sample.git
cd rpsls-game
```

### 2. Install All Dependencies
```bash
npm run install:all
```
This command installs dependencies for the root project, backend, and frontend.

### 3. Build and Start Development Servers
```bash
npm run start - Start backend in production mode
```
This starts backend (port 5000) in production mode.

Or

```bash
cd backend
npm start          # Start production server
npm run dev        # Start with nodemon (auto-restart)
```

**Access the application:**
- Backend API: http://localhost:5000

### 4. Test Game Server

1. Go to https://codechallenge.boohma.com/ page
2. In the input field designated for Step 1 ('Put your root URL here'), please enter the following URL: http://localhost:5000
3. Proceed with the remaining steps displayed on the page.
4. Enjoy the game


## 📞 Need Help?

If you encounter issues:
1. Try the refresh command: `npm run refresh`

Happy coding! 🎮