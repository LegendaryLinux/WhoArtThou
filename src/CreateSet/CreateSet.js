import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {CardSets} from '../classes/CardSets';
import {CardDisplay} from '../global/CardDisplay';
import './CreateSet.scss';

export const CreateSet = () => {
  const cardSets = new CardSets();
  const [cardCount, setCardCount] = useState(24);
  const [activeCardNumber, setActiveCardNumber] = useState(null);
  const [activeName, setActiveName] = useState(null);
  const [activeUrl, setActiveUrl] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);
  const [forceNavigate, setForceNavigate] = useState(null);

  const handleCardCountChange = (evt) => {
    setCardCount(parseInt(evt.target.value, 10));
    setActiveCardNumber(null);
    setActiveName(null);
    setActiveUrl(null);
  };

  const updateActiveCard = (evt) => {
    const cardId = evt.target.getAttribute('data-card-id');
    setActiveCardNumber(parseInt(cardId, 10));
    setActiveName(document.querySelector(`#name${cardId}`).value || null);
    setActiveUrl(document.querySelector(`#url${cardId}`).value || null);
  };

  const createCardSet = () => {
    const setName = document.querySelector('#name-input').value;
    if (!setName) {
      setWarningMessage('You must enter a name for this set!');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const images = [];
    for (let i=0; i<cardCount; ++i){
      images.push({
        name: document.querySelector(`#name${i}`).value || null,
        url: document.querySelector(`#url${i}`).value || null,
      });
    }
    const setId = cardSets.createCardSet(setName, cardCount, images);
    setForceNavigate(`/sets/${setId}`);
  };

  if (forceNavigate) {
    return <Navigate to={forceNavigate} />;
  }

  return (
    <div id="create-set" className="text-content">
      {
        (cardSets.getCardSetCount() >= 16) ? (
          <div className="user-banner warning">
            You already have sixteen (16) card sets! You'll need to delete one before you can make another.
          </div>
        ) : null
      }

      {warningMessage ? <div className="user-banner warning">{warningMessage}</div> : null}

      <div id="steps-wrapper">
        <div id="steps">
          <h1>Create a Card Set</h1>

          <h3>1. Give this set a name.</h3>
          <p className="hint">
            You'll use this when choosing which set to play with and when sharing decks with your friends.
            64 characters max.
          </p>
          <input id="name-input" maxLength={64} placeholder="Dagon's Danger Noodles" />

          <h3>2. Decide how many cards you want in this set.</h3>
          <p className="hint">
            You should probably stick to 24 unless you want your games to last forever.
          </p>
          <div className="range-container">
            <input type="range" min="16" max="128" step="8" defaultValue={cardCount} onChange={handleCardCountChange}/>
            <span>{cardCount}</span>
          </div>

          <h3>3. Provide links and names for your cards.</h3>
          <p className="hint">
            When you enter a name or URL, the example image on the right will update so you can see what the card
            will look like when you play!
          </p>
          {
            Array(cardCount).fill(null).map((value, index) => (
              <div className="card-input-container" key={`cic${index}`}>
                <h4>Card {index + 1}</h4>
                <div className="card-input-grid">
                  <label htmlFor={`name${index}`}>Name:</label>
                  <input
                    id={`name${index}`}
                    maxLength="128"
                    onInput={updateActiveCard}
                    onFocus={updateActiveCard}
                    data-card-id={index}
                    placeholder="Card Name"
                  />

                  <label htmlFor={`url${index}`}>URL:</label>
                  <input
                    id={`url${index}`}
                    maxLength="1024"
                    onInput={updateActiveCard}
                    onFocus={updateActiveCard}
                    data-card-id={index}
                    placeholder="Image URL"
                  />
                </div>
              </div>
            ))
          }
        </div>
        <div id="example-card">
          <div id="example-identifier">
            {
              (activeCardNumber !== null) ?
                `Card ${activeCardNumber + 1}` :
                'Click a Card Input'
            }
          </div>
          <CardDisplay name={activeName} url={activeUrl} mayToggle={false} />
        </div>
      </div>
      <button id="save-button" onClick={createCardSet}>
        Save it!
      </button>
    </div>
  );
};