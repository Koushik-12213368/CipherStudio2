import React from 'react';
import { 
  Save, 
  Moon, 
  Sun, 
  Menu, 
  Eye, 
  EyeOff,
  Settings,
  Download,
  Upload
} from 'lucide-react';
import { Project } from '../types';
import './Header.css';

interface HeaderProps {
  project: Project;
  onSave: () => void;
  isSaving: boolean;
  autoSave: boolean;
  onToggleAutoSave: () => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
  onToggleSidebar: () => void;
  onTogglePreview: () => void;
  sidebarOpen: boolean;
  previewOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  project,
  onSave,
  isSaving,
  autoSave,
  onToggleAutoSave,
  onToggleTheme,
  theme,
  onToggleSidebar,
  onTogglePreview,
  sidebarOpen,
  previewOpen,
}) => {
  return (
    <header className="ide-header">
      <div className="header-left">
        <button 
          onClick={onToggleSidebar}
          className="btn btn-sm btn-secondary"
          title="Toggle sidebar"
        >
          <Menu size={16} />
        </button>
        
        <div className="project-info">
          <h1 className="project-title">{project.name}</h1>
          <span className="project-status">
            {isSaving ? 'Saving...' : 'Saved'}
          </span>
        </div>
      </div>

      <div className="header-center">
        <div className="header-controls">
          <button 
            onClick={onSave}
            disabled={isSaving}
            className="btn btn-sm btn-primary"
            title="Save project"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          
          <button 
            onClick={onTogglePreview}
            className={`btn btn-sm ${previewOpen ? 'btn-primary' : 'btn-secondary'}`}
            title={previewOpen ? 'Hide preview' : 'Show preview'}
          >
            {previewOpen ? <EyeOff size={16} /> : <Eye size={16} />}
            Preview
          </button>
        </div>
      </div>

      <div className="header-right">
        <div className="header-actions">
          <button 
            onClick={onToggleAutoSave}
            className={`btn btn-sm ${autoSave ? 'btn-primary' : 'btn-secondary'}`}
            title={autoSave ? 'Disable autosave' : 'Enable autosave'}
          >
            <Settings size={16} />
            Auto
          </button>
          
          <button 
            onClick={onToggleTheme}
            className="btn btn-sm btn-secondary"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
