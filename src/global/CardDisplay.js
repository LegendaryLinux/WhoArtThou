import React from 'react';
import './CardDisplay.scss';

export const CardDisplay = ({name, url, mayToggle=true}) => {
  return (
    <div className="card-display">
      <img src={url || '/static/card-placeholder.jpg'} alt={`Image of ${name || 'Unnamed Card'}`}/>
      <div className="card-name">{name || 'Unnamed Card'}</div>
    </div>
  );
};