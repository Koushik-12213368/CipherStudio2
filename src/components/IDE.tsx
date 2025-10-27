import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../contexts/ProjectContext';
import { useTheme } from '../contexts/ThemeContext';
import MonacoEditor from '@monaco-editor/react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { 
  Save, 
  FolderPlus, 
  FileText, 
  Trash2, 
  Play, 
  Settings,
  Moon,
  Sun,
  Menu,
  X,
  Download,
  Upload
} from 'lucide-react';
import FileExplorer from './FileExplorer';
import Header from './Header';
import './IDE.css';

const IDE: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const {
    currentProject,
    files,
    activeFile,
    setActiveFile,
    saveProject,
    loadProject,
    createFile,
    deleteFile,
    updateFile,
    renameFile,
    isLoading,
    error
  } = useProject();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [autoSaveDelay] = useState(2000);
  const [isSaving, setIsSaving] = useState(false);

  // Load project on mount
  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId, loadProject]);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !currentProject) return;

    const timeoutId = setTimeout(() => {
      if (files.some(file => file.modifiedAt > currentProject.lastModified)) {
        handleSave();
      }
    }, autoSaveDelay);

    return () => clearTimeout(timeoutId);
  }, [files, autoSave, autoSaveDelay, currentProject]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    await saveProject();
    setIsSaving(false);
  }, [saveProject]);

  const handleFileChange = useCallback((value: string | undefined) => {
    if (activeFile && value !== undefined) {
      updateFile(activeFile, value);
    }
  }, [activeFile, updateFile]);

  const handleCreateFile = () => {
    const fileName = prompt('Enter file name (e.g., App.tsx):');
    if (fileName) {
      createFile(fileName);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      deleteFile(fileId);
    }
  };

  const handleRenameFile = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      const newName = prompt('Enter new file name:', file.name);
      if (newName && newName !== file.name) {
        renameFile(fileId, newName);
      }
    }
  };

  // Convert files to Sandpack format
  const sandpackFiles = files.reduce((acc, file) => {
    acc[`/${file.name}`] = {
      code: file.content,
    };
    return acc;
  }, {} as Record<string, { code: string }>);

  // Determine entry point
  const entryFile = files.find(file => 
    file.name === 'App.tsx' || 
    file.name === 'App.jsx' || 
    file.name === 'index.tsx' || 
    file.name === 'index.jsx'
  ) || files[0];

  const sandpackTemplate = {
    files: sandpackFiles,
    dependencies: {
      'react': '^18.0.0',
      'react-dom': '^18.0.0',
      'react-scripts': '^5.0.0',
    },
    entry: entryFile ? `/${entryFile.name}` : '/App.tsx',
  };

  if (isLoading) {
    return (
      <div className="ide-loading">
        <div className="loading-spinner"></div>
        <p>Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ide-error">
        <h2>Error loading project</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Projects
        </button>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="ide-error">
        <h2>Project not found</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Projects
        </button>
      </div>
    );
  }

  const activeFileData = files.find(file => file.id === activeFile);

  return (
    <div className="ide">
      <Header 
        project={currentProject}
        onSave={handleSave}
        isSaving={isSaving}
        autoSave={autoSave}
        onToggleAutoSave={() => setAutoSave(!autoSave)}
        onToggleTheme={toggleTheme}
        theme={theme}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onTogglePreview={() => setPreviewOpen(!previewOpen)}
        sidebarOpen={sidebarOpen}
        previewOpen={previewOpen}
      />

      <div className="ide-content">
        {sidebarOpen && (
          <div className="ide-sidebar">
            <div className="sidebar-header">
              <h3>Files</h3>
              <button 
                onClick={handleCreateFile}
                className="btn btn-sm btn-primary"
                title="Create new file"
              >
                <FolderPlus size={16} />
              </button>
            </div>
            
            <FileExplorer
              files={files}
              activeFile={activeFile}
              onFileSelect={setActiveFile}
              onFileDelete={handleDeleteFile}
              onFileRename={handleRenameFile}
            />
          </div>
        )}

        <div className="ide-main">
          <div className="editor-container">
            {activeFileData ? (
              <MonacoEditor
                height="100%"
                language={activeFileData.name.endsWith('.tsx') ? 'typescript' : 
                         activeFileData.name.endsWith('.jsx') ? 'javascript' :
                         activeFileData.name.endsWith('.css') ? 'css' :
                         activeFileData.name.endsWith('.json') ? 'json' : 'typescript'}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                value={activeFileData.content}
                onChange={handleFileChange}
                options={{
                  fontSize: 14,
                  tabSize: 2,
                  wordWrap: 'on',
                  minimap: { enabled: false },
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  renderWhitespace: 'selection',
                }}
              />
            ) : (
              <div className="no-file-selected">
                <FileText size={48} />
                <h3>No file selected</h3>
                <p>Select a file from the sidebar or create a new one</p>
                <button onClick={handleCreateFile} className="btn btn-primary">
                  <FolderPlus size={16} />
                  Create File
                </button>
              </div>
            )}
          </div>

          {previewOpen && (
            <div className="preview-container">
              <div className="preview-header">
                <h3>Live Preview</h3>
                <div className="preview-controls">
                  <button 
                    onClick={() => setPreviewOpen(false)}
                    className="btn btn-sm btn-secondary"
                    title="Close preview"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              
              <div className="preview-content">
                <Sandpack
                  template="react-ts"
                  files={sandpackFiles}
                  theme={theme === 'dark' ? 'dark' : 'light'}
                  options={{
                    showNavigator: false,
                    showRefreshButton: true,
                    showOpenInCodeSandbox: false,
                    editorHeight: '100%',
                    editorWidthPercentage: 100,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IDE;
