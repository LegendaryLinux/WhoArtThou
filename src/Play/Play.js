import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {CardDisplay} from '../global/CardDisplay';
import {CardSets} from '../classes/CardSets';
import './Play.scss';

export const Play = () => {
  const cardSets = new CardSets();
  const [cardSetId, setCardSetId] = useState(null);

  const handleCardSetChange = (evt) => setCardSetId(evt.target.value);

  if (!cardSetId) {
    return (
      <div id="play" className="choose-card-set text-content">
        {
          (cardSets.getCardSetCount() === 0) ? (
            <div className="user-banner warning">
              You don't have any card sets!&nbsp;
              <Link to="/sets/create">Create</Link> or <Link to="/sets/upload">Upload</Link> one now!
            </div>
          ) : null
        }

        <h1>Who Art Thou?</h1>
        <p className="hint">
          Choose a card set.
        </p>
        <select onChange={handleCardSetChange} defaultValue="0">
          <option value="0" hidden>Choose a Card Set...</option>
          {
            Object.keys(cardSets.getCardSets()).map((setId) => {
              const cardSet = cardSets.getCardSet(setId);
              let isIncomplete = false;
              for (const image of cardSet.images) {
                if (!image.name || !image.url) {
                  isIncomplete = true;
                  break;
                }
              }
              return (
                <option value={setId} key={setId} disabled={isIncomplete}>
                  {cardSets.getCardSet(setId).name} {isIncomplete ? '(Incomplete)' : null}
                </option>
              );
            })
          }
        </select>
      </div>
    );
  }

  const cardSet = cardSets.getCardSet(cardSetId);
  const yourCardIndex = Math.floor(Math.random() * ((cardSet.size -1) - 0 + 1) + 0);
  const yourCard = cardSet.images[yourCardIndex];

  return (
    <div id="play" className="game">
      <div className="instructions">
        <div id="your-card" className="text-content">
          <h3>Your card:</h3>
          <CardDisplay name={yourCard.name} url={yourCard.url} mayToggle={false}/>
        </div>

        <div className="text-content">
          <h3>How to play:</h3>
          <ul>
            <li>The goal of the game is to guess your opponent's card before they guess yours.</li>
            <li>You and your opponent take turns asking one question at a time.</li>
            <li>All questions must have yes or no answers.</li>
            <li>When you eliminate a card, click it to fade it out.</li>
            <li>All rules are optional.</li>
          </ul>
        </div>
      </div>

      <div className=" text-content card-board">
        {
          cardSets.getCardSet(cardSetId).images.map((img) => (
            <CardDisplay name={img.name} url={img.url} />
          ))
        }
      </div>
    </div>
  );
};