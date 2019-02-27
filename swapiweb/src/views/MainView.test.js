import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './MainView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
