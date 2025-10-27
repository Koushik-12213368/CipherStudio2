import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProjectProvider } from './contexts/ProjectContext';
import IDE from './components/IDE';
import ProjectList from './components/ProjectList';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<ProjectList />} />
              <Route path="/ide/:projectId" element={<IDE />} />
            </Routes>
          </div>
        </Router>
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;
