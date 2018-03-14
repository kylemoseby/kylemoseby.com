import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter
} from 'react-router-dom';
import './KyleMoseby.css';
import KyleMoseby from './KyleMoseby'

ReactDOM.render(
  <BrowserRouter>
    <KyleMoseby />
  </BrowserRouter>,
  document.getElementById('root')
);