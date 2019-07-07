import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';

it('Should render w/out crashing', () => {
  const div = document.createElement('div');

  render(<App />, div);
  unmountComponentAtNode(div);
});
