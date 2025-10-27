export interface Project {
  id: string;
  name: string;
  description?: string;
  files: File[];
  createdAt: string;
  lastModified: string;
  isPublic?: boolean;
}

export interface File {
  id: string;
  name: string;
  content: string;
  type: 'component' | 'style' | 'config' | 'other';
  createdAt: string;
  modifiedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
  };
}

export interface EditorSettings {
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  autoSave: boolean;
  autoSaveDelay: number;
}

export interface SandpackFiles {
  [key: string]: {
    code: string;
    hidden?: boolean;
    active?: boolean;
    readOnly?: boolean;
  };
}

export interface SandpackTemplate {
  name: string;
  files: SandpackFiles;
  dependencies: Record<string, string>;
  entry: string;
}
