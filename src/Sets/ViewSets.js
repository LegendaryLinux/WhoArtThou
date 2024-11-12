import React from 'react';
import {Link} from 'react-router-dom';
import {CardSets} from '../classes/CardSets';
import './ViewSets.scss';

export const ViewSets = () => {
  const cardSets = new CardSets();

  return (
    <div id="view-sets" className="text-content">
      {
        (cardSets.length === 0) ? (
          <div>
            You don't have any sets yet!<br />
            <Link to="/sets/create">Create or upload a set now!</Link>
          </div>
        ) : (
          <div>
            <h2>Your Sets</h2>
            <table>
              <thead>
                <tr>
                  <th>Set Name</th>
                  <th>Card Count</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.values(cardSets.getCardSets()).sort((a, b) => (a > b) ? 1 : 0).map((s) => (
                    <tr>
                      <td>
                        <Link to={`/sets/${s.setId}`}>{s.name}</Link>
                      </td>
                      <td>
                        {s.size}
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