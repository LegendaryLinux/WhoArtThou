import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {CardSets} from '../classes/CardSets';
import './ViewSets.scss';

export const ViewSets = () => {
  const cardSets = new CardSets();
  const [cardSetArray, setCardSetArray] = useState([]);

  useEffect(() => {
    setCardSetArray(
      Object.keys(cardSets.getCardSets()).map((setId) => {
        return Object.assign({}, cardSets.getCardSet(setId), {
          setId,
        });
      })
    );
  }, []);

  const downloadSet = (evt) => {
    evt.preventDefault();
    const cardSet = cardSets.getCardSet(evt.target.getAttribute('data-set-id'));
    const blob = new Blob([JSON.stringify(cardSet)], {type: 'application/json'});
    const objectUrl = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = cardSet.name;
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(objectUrl);
  };

  const deleteSet = (evt) => {
    evt.preventDefault();
    cardSets.deleteCardSet(evt.target.getAttribute('data-set-id'));
    setCardSetArray(
      Object.keys(cardSets.getCardSets()).map((setId) => {
        return Object.assign({}, cardSets.getCardSet(setId), {
          setId,
        });
      })
    );
  };

  return (
    <div id="view-sets" className="text-content">
      {
        (cardSetArray.length === 0) ? (
          <div>
            <h1>You don't have any sets yet!</h1>
            <Link to="/sets/create">Create or upload a set now!</Link>
          </div>
        ) : (
          <div>
            <h1>Your Sets</h1>
            <p className="hint">
              View, download, or delete your sets. You can have up to sixteen (16) sets saved.
            </p>
            <table>
              <thead>
                <tr>
                  <th className="name-col">Set Name</th>
                  <th className="count-col">Cards</th>
                  <th className="download-col">Download</th>
                  <th className="delete-col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  cardSetArray.sort((a, b) => (a.name > b.name) ? 1 : 0).map((s) => (
                    <tr key={s.setId}>
                      <td className="name-col">
                        <Link to={`/sets/${s.setId}`}>{s.name}</Link>
                      </td>

                      <td className="count-col">
                        {s.size}
                      </td>

                      <td className="download-col">
                        <a href="#" onClick={downloadSet} data-set-id={s.setId}>💾</a>
                      </td>

                      <td className="delete-col">
                        <a href="#" onClick={deleteSet} data-set-id={s.setId}>❌</a>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};