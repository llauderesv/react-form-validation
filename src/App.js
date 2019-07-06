import React from 'react';
import Form from './Form';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img className="App-logo" src={logo} alt="react-logo" />
        <p>React Form Validation using React Hooks.</p>
      </div>
      <Form />
    </div>
  );
}

export default App;
