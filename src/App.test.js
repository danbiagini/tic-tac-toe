import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MenuForm from './MenuForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MenuForm />, div);
});
