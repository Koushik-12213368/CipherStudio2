# CipherStudio - Browser-Based React IDE

A modern, feature-rich browser-based React IDE that allows users to create, edit, and run React projects directly in the browser.

## 🚀 Features

### Core Features ✅
- **File Management**: Create, delete, and organize project files
- **Rich Code Editor**: Monaco Editor integration for syntax highlighting and IntelliSense
- **Live Preview**: Real-time React project execution using Sandpack
- **Save & Load**: Persistent project storage with MongoDB and localStorage
- **Modern UI**: Clean, intuitive interface with dark/light themes

### Bonus Features ✅
- **Theme Switcher**: Toggle between dark and light modes
- **Autosave**: Automatic project saving with toggle option
- **Responsive Design**: Optimized for desktop and tablet screens
- **File Renaming**: Rename files and folders
- **Project Management**: Multiple project support

## 🛠 Tech Stack

- **Frontend**: React with TypeScript
- **Code Execution**: Sandpack (CodeSandbox)
- **Editor**: Monaco Editor
- **Backend**: Node.js with Express
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 📁 Project Structure

```
cipherstudio/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── package.json
├── backend/           # Node.js backend API
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── utils/         # Utility functions
│   └── package.json
├── package.json       # Root package configuration
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cipherstudio
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   **Backend** (`backend/.env`):
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cipherstudio
   FRONTEND_URL=http://localhost:3000
   ```
   
   **Frontend** (`frontend/.env.local`):
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📝 Usage

1. **Create a new project** or load an existing one
2. **Add React files** using the file manager
3. **Write your React code** in the Monaco editor
4. **See live preview updates** in real-time
5. **Save your project** to continue later

## 🎨 Architecture

The application follows a modern full-stack architecture:

- **Frontend**: React SPA with component-based architecture
- **Backend**: RESTful API with Express.js
- **Database**: MongoDB for project persistence
- **Code Execution**: Sandpack for secure React code execution

## 🔧 API Endpoints

### Projects
- `GET /api/projects` - Get all public projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Health Check
- `GET /health` - Server health status

## 📦 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `REACT_APP_API_URL=https://your-backend-url.onrender.com`
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=your_mongodb_atlas_connection_string`
   - `FRONTEND_URL=https://your-frontend-domain.vercel.app`
3. Deploy automatically on push to main branch

### Database (MongoDB Atlas)
1. Create a free MongoDB Atlas cluster
2. Get your connection string
3. Update `MONGODB_URI` in your backend environment

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 🤝 Contributing

This is a demonstration project showcasing modern web development practices and React IDE capabilities.

## 📄 License

MIT License - feel free to use this project for learning and development purposes.

## 🎯 Future Enhancements

- User authentication and authorization
- Real-time collaboration
- Project sharing and forking
- Advanced file management (folders, drag & drop)
- Code snippets and templates
- Git integration
- Package management
- Custom themes
- Plugin system

## 🏆 Project Highlights

- **Modern Tech Stack**: React, TypeScript, Node.js, MongoDB
- **Professional UI/UX**: Clean, intuitive interface with dark/light themes
- **Real-time Code Execution**: Sandpack integration for live preview
- **Rich Code Editor**: Monaco Editor with syntax highlighting
- **Responsive Design**: Works on desktop and tablet
- **Project Persistence**: Save and load projects with MongoDB
- **Auto-save**: Automatic project saving with toggle
- **File Management**: Create, delete, rename files
- **Production Ready**: Deployed on Vercel and Render
