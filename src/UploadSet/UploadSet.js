import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {CardSets} from '../classes/CardSets';
import './UploadSet.scss';

export const UploadSet = () => {
  const cardSets = new CardSets();
  const [forceNavigate, setForceNavigate] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);

  const uploadSet = (evt) => {
    setWarningMessage(null);
    const file = evt?.target?.files[0];
    if (!file) {
      setWarningMessage('There was an error while uploading your file.');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (evt) => {
      try{
        const setData = JSON.parse(evt.target.result);
        cardSets.createCardSet(setData.name, setData.size, setData.images);
        setForceNavigate('/sets');
      }catch(err){
        setWarningMessage('There was an error parsing the JSON in your uploaded file.');
        setTimeout(() => setWarningMessage(null), 10000);
      }
    };
    fileReader.readAsText(file);
  };

  if (forceNavigate) {
    return <Navigate to={forceNavigate} />;
  }

  return (
    <div id="upload-set" className="text-content">
      {
        (cardSets.getCardSetCount() >= 16) ? (
          <div className="user-banner warning">
            You already have sixteen (16) card sets! You'll need to delete one before you can make another.
          </div>
        ) : null
      }

      {
        warningMessage ? (
          <div className="user-banner warning">{warningMessage}</div>
        ) : null
      }
      <h1>Upload a Card Set</h1>
      <p className="hint">
        Upload a set file here. It will be added to your <Link to="/sets">My Sets</Link> page.
      </p>
      <input type="file" onChange={uploadSet} accept="application/json" disabled={cardSets.getCardSetCount() >= 16} />
    </div>
  );
};