# How to Start the Project

> **Documentation**: This guide was generated by Claude and edited by Alex.

This guide provides step-by-step instructions for setting up and running the Rock Paper Scissors Lizard Spock game in development and production environments.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

## 🚀 Quick Start (Development)

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

### 3. Set Up Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
RANDOM_SERVICE_URL=https://your-random-service.com/api
PRODUCTION_URL=https://your-production-url.com
```

### 4. Start Development Servers
```bash
npm run dev
```
This starts both backend (port 5000) and frontend (port 3003) simultaneously.

**Access the application:**
- Frontend: http://localhost:3003
- Backend API: http://localhost:5000

## 🛠️ Available Scripts

### Root Level Commands
- `npm run install:all` - Install dependencies for all projects
- `npm run dev` - Start both backend and frontend in development mode
- `npm run dev:backend` - Start only backend server
- `npm run dev:frontend` - Start only frontend server
- `npm run build` - Build frontend for production
- `npm run start` - Start backend in production mode
- `npm run preview` - Preview production build
- `npm run clean` - Clean all node_modules and package-lock.json files
- `npm run refresh` - Clean and reinstall all dependencies

### Backend-Specific Commands
```bash
cd backend
npm start          # Start production server
npm run dev        # Start with nodemon (auto-restart)
```

### Frontend-Specific Commands
```bash
cd frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🏗️ Development Workflow

### Starting Development
1. Run `npm run dev` from the root directory
2. Backend will start on http://localhost:5000
3. Frontend will start on http://localhost:3003
4. Both servers will auto-reload on file changes

### Making Changes
- **Backend changes**: Server restarts automatically (nodemon)
- **Frontend changes**: Browser auto-refreshes (Vite HMR)
- **Dependencies**: Re-run `npm run install:all` if you add new packages

### Testing the API
You can test the backend API endpoints directly:
```bash
# Get all choices
curl http://localhost:5000/choices

# Play a round
curl -X POST http://localhost:5000/play -H "Content-Type: application/json" -d '{"player": 1}'

# Get game stats
curl http://localhost:5000/stats
```

## 🚢 Production Deployment

### Building for Production
```bash
npm run build
```
This creates optimized frontend files in `frontend/dist/`.

### Starting Production Server
```bash
npm run start
```
This starts only the backend server. You'll need to serve the frontend build files separately (e.g., with nginx, Apache, or a static hosting service).

### Environment Setup
1. Set `NODE_ENV=production` in your production environment
2. Configure `PRODUCTION_URL` in your `.env` file
3. Set up your external random service URL
4. Configure your web server to serve static files and proxy API requests

## 🔧 Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use different ports in your .env files
```

**Dependencies Issues:**
```bash
# Clean and reinstall everything
npm run refresh
```

**CORS Issues:**
- Check that frontend URL is in backend's CORS configuration
- Verify environment variables are set correctly

**API Connection Issues:**
- Ensure backend is running on port 5000
- Check that API_BASE_URL in frontend matches backend URL
- Verify no firewall is blocking the connection

### Development Tips

1. **Use Browser Developer Tools**: Check Network tab for API calls
2. **Check Console Logs**: Both frontend and backend log useful information
3. **API Testing**: Use curl or Postman to test backend endpoints
4. **Database**: Game history is stored in memory and resets on server restart

## 📁 Project Structure After Setup

```
rpsls-game/
├── backend/
│   ├── node_modules/
│   ├── src/
│   └── package.json
├── frontend/
│   ├── node_modules/
│   ├── src/
│   ├── dist/ (after build)
│   └── package.json
├── node_modules/
└── package.json
```

---

## 📞 Need Help?

If you encounter issues:
1. Check the console logs (both browser and terminal)
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Try the refresh command: `npm run refresh`

Happy coding! 🎮