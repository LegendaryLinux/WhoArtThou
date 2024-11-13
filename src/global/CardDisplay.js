import React, {useState} from 'react';
import './CardDisplay.scss';

export const CardDisplay = ({name, url, mayToggle=true}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!mayToggle) { return; }
    setIsClicked(!isClicked);
  };

  return (
    <div className={`card-display ${mayToggle ? 'clickable' : null}`} onClick={handleClick}>
      <img
        src={url || '/static/card-placeholder.jpg'}
        alt={`Image of ${name || 'Unnamed Card'}`}
        className={`${isClicked ? 'clicked' : null}`}
      />
      <div className="card-name">{name || 'Unnamed Card'}</div>
    </div>
  );
};