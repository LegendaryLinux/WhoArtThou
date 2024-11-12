import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.scss';

export const LandingPage = () => (
  <div id="landing-page">
    <div id="landing-page-logo">
      <img id="logo" src="/static/WhoArtThou.jpg" alt="Wo art thou logo"/>
    </div>

    <div id="intro" className="text-content">
      <h1>Who Art Thou? is a game where you try to guess your opponent's card by asking them questions.</h1>

      <h2>How do I play?</h2>
      <ol>
        <li>
          <Link to="/sets/create">Create</Link> a set or <Link to="/sets/upload">Upload</Link> a card set file.
        </li>
        <li>If you need to send a card set you created to your friend, you can download your set file on
          the <Link to="/sets">My Sets</Link> page.</li>
        <li>Visit the <Link to="/play">Play</Link> page and choose a set to play with!</li>
      </ol>
    </div>
  </div>
);