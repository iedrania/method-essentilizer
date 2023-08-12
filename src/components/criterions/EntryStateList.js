import React, { useContext } from 'react';
import { MappingContext } from '../../context/context';

const EntryStateList = ({ activity, alphas }) => {
  const { subAlphas, updateEntryAlpha, updateEntryCriterions } = useContext(MappingContext);

  const handleEntryAlphaChange = (event, stateId) => {
    const alphaId = event.target.value;
    updateEntryAlpha(activity.id, alphaId, stateId);
  };

  const handleEntryStateChange = (event, alphaId) => {
    const stateId = event.target.value;
    updateEntryCriterions(activity.id, alphaId, stateId);
  };

  const renderEntryCriterions = () => {
    return (
      <div>
        {alphas.concat(subAlphas).map((alpha) => (
          <label key={alpha.id}>
            <input
              type="checkbox"
              name="entryCriteria"
              value={alpha.id}
              checked={activity.entryCriterions.alphas.some((entryCriterion) => entryCriterion.startsWith(`${alpha.id}.`))}
              onChange={(e) => handleEntryAlphaChange(e, alpha.states[0].id)}
            />
            {alpha.name}
            {activity.entryCriterions.alphas.some((entryCriterion) => entryCriterion.startsWith(`${alpha.id}.`)) && (
              <div>
                <p>States of {alpha.name}</p>
                <select
                  name={`entryCriterion-${alpha.id}`}
                  value={activity.entryCriterions.alphas.find((entryCriterion) =>
                    entryCriterion.startsWith(`${alpha.id}.`)
                  ).split(".")[1]}
                  onChange={(e) => handleEntryStateChange(e, alpha.id)}
                >
                  {alpha.states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </label>
        ))}
      </div>
    );
  };

  return (
    <div>
      <p>Choose Entry Criterias from Alpha States:</p>
      {renderEntryCriterions()}
    </div>
  );
};

export default EntryStateList;
