import React from 'react';
import Form from './example/Form';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img className="App-logo" src={logo} alt="react-logo" />
        <p>React Form Validation</p>
        <small>
          A simple and easiest way to validate your forms in React using Hooks.
        </small>
      </div>
      <Form />
    </div>
  );
}

export default App;
