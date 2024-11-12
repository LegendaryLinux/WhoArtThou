import React from 'react';
import {createRoot} from 'react-dom/client';
import {BaseRouter} from './BaseRouter';
import './globalStyles.scss';

window.addEventListener('load', () => {
  createRoot(document.querySelector('#app')).render(<BaseRouter />);
});
