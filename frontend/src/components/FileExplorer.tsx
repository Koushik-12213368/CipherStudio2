import React from 'react';
import { FileText, Trash2, Edit3, Folder, FolderOpen } from 'lucide-react';
import { File } from '../types';
import './FileExplorer.css';

interface FileExplorerProps {
  files: File[];
  activeFile: string | null;
  onFileSelect: (fileId: string) => void;
  onFileDelete: (fileId: string) => void;
  onFileRename: (fileId: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFile,
  onFileSelect,
  onFileDelete,
  onFileRename,
}) => {
  const getFileIcon = (file: File) => {
    if (file.type === 'component') {
      return <FileText size={16} />;
    }
    return <FileText size={16} />;
  };

  const getFileTypeColor = (file: File) => {
    switch (file.type) {
      case 'component':
        return '#61dafb';
      case 'style':
        return '#1572b6';
      case 'config':
        return '#f7df1e';
      default:
        return 'var(--text-secondary)';
    }
  };

  const sortedFiles = [...files].sort((a, b) => {
    // Sort components first, then styles, then config, then others
    const typeOrder = { component: 0, style: 1, config: 2, other: 3 };
    const aOrder = typeOrder[a.type];
    const bOrder = typeOrder[b.type];
    
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
    
    // Then sort alphabetically
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="file-explorer">
      {sortedFiles.length === 0 ? (
        <div className="empty-state">
          <Folder size={32} />
          <p>No files yet</p>
          <small>Create your first file to get started</small>
        </div>
      ) : (
        <div className="file-list">
          {sortedFiles.map((file) => (
            <div
              key={file.id}
              className={`file-item ${activeFile === file.id ? 'active' : ''}`}
              onClick={() => onFileSelect(file.id)}
            >
              <div className="file-icon" style={{ color: getFileTypeColor(file) }}>
                {getFileIcon(file)}
              </div>
              
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-type">{file.type}</span>
              </div>
              
              <div className="file-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileRename(file.id);
                  }}
                  className="file-action-btn"
                  title="Rename file"
                >
                  <Edit3 size={14} />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileDelete(file.id);
                  }}
                  className="file-action-btn"
                  title="Delete file"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
