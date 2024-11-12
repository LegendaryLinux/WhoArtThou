import React from 'react';
import {Link} from 'react-router-dom';
import './HeaderBar.scss';

export const HeaderBar = () => (
  <header id="header-bar">
    <Link to="/">
      <img src="/static/WhoArtThou.jpg" alt="Who art thou logo" />
    </Link>

    <div className="spacer" />

    <Link to="/play">
      <button>Play</button>
    </Link>

    <Link to="/sets/create">
      <button>Create</button>
    </Link>

    <Link to="/sets/upload">
      <button>Upload</button>
    </Link>

    <Link to="/sets">
      <button>My Sets</button>
    </Link>
  </header>
);