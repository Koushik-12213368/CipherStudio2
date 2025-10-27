import React from 'react';
import './App.css';

function App() {
  return React.createElement('div', { className: 'App' },
    React.createElement('header', { className: 'App-header' },
      React.createElement('h1', null, 'CipherStudio'),
      React.createElement('p', null, 'React IDE Loading...')
    )
  );
}

export default App;
