import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Plus, 
  FolderOpen, 
  Trash2, 
  Edit3, 
  Calendar,
  Clock,
  Moon,
  Sun,
  Code,
  Star
} from 'lucide-react';
import './ProjectList.css';

interface Project {
  id: string;
  name: string;
  description?: string;
  files: any[];
  createdAt: string;
  lastModified: string;
  isPublic?: boolean;
}

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      // Load from localStorage
      const savedProjects: Project[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('cipherstudio-project-')) {
          const projectData = JSON.parse(localStorage.getItem(key) || '{}');
          savedProjects.push(projectData);
        }
      }
      
      // Sort by last modified
      savedProjects.sort((a, b) => 
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      );
      
      setProjects(savedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      description: newProjectDescription.trim(),
      files: [
        {
          id: '1',
          name: 'App.tsx',
          content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CipherStudio!</h1>
        <p>
          Start editing <code>App.tsx</code> to see your changes.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;`,
          type: 'component',
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'App.css',
          content: `.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}

.App-link {
  color: #61dafb;
  text-decoration: none;
}

.App-link:hover {
  text-decoration: underline;
}

code {
  background-color: #f1f1f1;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}`,
          type: 'style',
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
        }
      ],
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem(`cipherstudio-project-${newProject.id}`, JSON.stringify(newProject));
    
    // Add to projects list
    setProjects(prev => [newProject, ...prev]);
    
    // Reset form
    setNewProjectName('');
    setNewProjectDescription('');
    setShowCreateModal(false);
    
    // Navigate to the new project
    navigate(`/ide/${newProject.id}`);
  };

  const deleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      localStorage.removeItem(`cipherstudio-project-${projectId}`);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) { // 7 days
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (isLoading) {
    return (
      <div className="project-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      <header className="project-list-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <Code size={32} />
              <h1>CipherStudio</h1>
            </div>
            <p className="tagline">Your browser-based React IDE</p>
          </div>
          
          <div className="header-right">
            <button 
              onClick={toggleTheme}
              className="btn btn-secondary"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              <Plus size={20} />
              New Project
            </button>
          </div>
        </div>
      </header>

      <main className="project-list-main">
        <div className="container">
          {projects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FolderOpen size={64} />
              </div>
              <h2>No projects yet</h2>
              <p>Create your first React project to get started with CipherStudio</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary btn-lg"
              >
                <Plus size={20} />
                Create Your First Project
              </button>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-card-header">
                    <div className="project-icon">
                      <Code size={20} />
                    </div>
                    <div className="project-actions">
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="btn btn-sm btn-danger"
                        title="Delete project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="project-card-body">
                    <h3 className="project-name">{project.name}</h3>
                    {project.description && (
                      <p className="project-description">{project.description}</p>
                    )}
                    
                    <div className="project-stats">
                      <span className="stat">
                        <FileText size={14} />
                        {project.files.length} files
                      </span>
                    </div>
                  </div>
                  
                  <div className="project-card-footer">
                    <div className="project-meta">
                      <span className="meta-item">
                        <Clock size={12} />
                        {formatDate(project.lastModified)}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => navigate(`/ide/${project.id}`)}
                      className="btn btn-primary btn-sm"
                    >
                      <FolderOpen size={14} />
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="btn btn-sm btn-secondary"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="project-name">Project Name</label>
                <input
                  id="project-name"
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="My React Project"
                  className="input"
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="project-description">Description (Optional)</label>
                <textarea
                  id="project-description"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="A brief description of your project..."
                  className="input"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={createProject}
                disabled={!newProjectName.trim()}
                className="btn btn-primary"
              >
                <Plus size={16} />
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
