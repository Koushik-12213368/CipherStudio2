import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, File } from '../types';

interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  activeFile: string | null;
  setActiveFile: (fileId: string | null) => void;
  saveProject: () => Promise<void>;
  loadProject: (projectId: string) => Promise<void>;
  createFile: (name: string, content?: string) => void;
  deleteFile: (fileId: string) => void;
  updateFile: (fileId: string, content: string) => void;
  renameFile: (fileId: string, newName: string) => void;
  isLoading: boolean;
  error: string | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProject = async () => {
    if (!currentProject) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const projectData = {
        ...currentProject,
        files,
        lastModified: new Date().toISOString(),
      };
      
      // Save to localStorage as backup
      localStorage.setItem(`cipherstudio-project-${currentProject.id}`, JSON.stringify(projectData));
      
      // Save to backend (if available)
      try {
        const response = await fetch(`/api/projects/${currentProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to save project to server');
        }
      } catch (err) {
        console.warn('Failed to save to server, using localStorage only:', err);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  const loadProject = async (projectId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to load from localStorage first
      const localData = localStorage.getItem(`cipherstudio-project-${projectId}`);
      if (localData) {
        const projectData = JSON.parse(localData);
        setCurrentProject(projectData);
        setFiles(projectData.files || []);
        if (projectData.files && projectData.files.length > 0) {
          setActiveFile(projectData.files[0].id);
        }
        setIsLoading(false);
        return;
      }
      
      // Try to load from backend
      const response = await fetch(`/api/projects/${projectId}`);
      if (response.ok) {
        const projectData = await response.json();
        setCurrentProject(projectData);
        setFiles(projectData.files || []);
        if (projectData.files && projectData.files.length > 0) {
          setActiveFile(projectData.files[0].id);
        }
        
        // Save to localStorage as backup
        localStorage.setItem(`cipherstudio-project-${projectId}`, JSON.stringify(projectData));
      } else {
        throw new Error('Project not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  const createFile = (name: string, content: string = '') => {
    const newFile: File = {
      id: Date.now().toString(),
      name,
      content,
      type: name.endsWith('.tsx') || name.endsWith('.jsx') ? 'component' : 
            name.endsWith('.css') ? 'style' : 
            name.endsWith('.json') ? 'config' : 'other',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };
    
    setFiles(prev => [...prev, newFile]);
    setActiveFile(newFile.id);
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    if (activeFile === fileId) {
      const remainingFiles = files.filter(file => file.id !== fileId);
      setActiveFile(remainingFiles.length > 0 ? remainingFiles[0].id : null);
    }
  };

  const updateFile = (fileId: string, content: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, content, modifiedAt: new Date().toISOString() }
        : file
    ));
  };

  const renameFile = (fileId: string, newName: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { 
            ...file, 
            name: newName,
            type: newName.endsWith('.tsx') || newName.endsWith('.jsx') ? 'component' : 
                  newName.endsWith('.css') ? 'style' : 
                  newName.endsWith('.json') ? 'config' : 'other',
            modifiedAt: new Date().toISOString() 
          }
        : file
    ));
  };

  const value = {
    currentProject,
    setCurrentProject,
    files,
    setFiles,
    activeFile,
    setActiveFile,
    saveProject,
    loadProject,
    createFile,
    deleteFile,
    updateFile,
    renameFile,
    isLoading,
    error,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
