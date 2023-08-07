import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const AlphaStateList = ({ activity, alphas }) => {
  const { subAlphas, updateEntryAlpha, updateEntryCriterions, updateCompletionAlpha, updateCompletionCriterions } = useContext(MappingContext);

  const handleEntryAlphaChange = (event, stateId) => {
    const alphaId = event.target.value;
    updateEntryAlpha(activity.id, alphaId, stateId);
  };

  const handleCompletionAlphaChange = (event, stateId) => {
    const alphaId = event.target.value;
    updateCompletionAlpha(activity.id, alphaId, stateId);
  };

  const handleEntryStateChange = (event, alphaId) => {
    const stateId = event.target.value;
    updateEntryCriterions(activity.id, alphaId, stateId);
  };

  const handleCompletionStateChange = (event, alphaId) => {
    const stateId = event.target.value;
    updateCompletionCriterions(activity.id, alphaId, stateId);
  };

  const renderEntryCriterions = () => {
    return (
      <div>
        <h4>Entry Criteria</h4>
        {alphas.concat(subAlphas).map((alpha) => (
          <label key={alpha.id}>
            <input
              type="checkbox"
              name="entryCriteria"
              value={alpha.id}
              checked={activity.entryCriterions.some((entryCriterion) => entryCriterion.startsWith(`${alpha.id}.`))}
              onChange={(e) => handleEntryAlphaChange(e, alpha.states[0].id)}
            />
            {alpha.name}
            {activity.entryCriterions.some((entryCriterion) => entryCriterion.startsWith(`${alpha.id}.`)) && (
              <div>
                <p>States of {alpha.name}</p>
                <select name={`entryCriterion-${alpha.id}`} onChange={(e) => handleEntryStateChange(e, alpha.id)}>
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
  
  const renderCompletionCriterions = () => {
    return (
      <div>
        <h4>Completion Criteria</h4>
        {alphas.concat(subAlphas).map((alpha) => (
          <label key={alpha.id}>
            <input
              type="checkbox"
              name="completionCriteria"
              value={alpha.id}
              checked={activity.completionCriterions.some((completionCriterion) => completionCriterion.startsWith(`${alpha.id}.`))}
              onChange={(e) => handleCompletionAlphaChange(e, alpha.states[alpha.states.length-1].id)}
            />
            {alpha.name}
            {activity.completionCriterions.some((completionCriterion) => completionCriterion.startsWith(`${alpha.id}.`)) && (
              <div>
                <p>States of {alpha.name}</p>
                <select name={`completionCriterion-${alpha.id}`} onChange={(e) => handleCompletionStateChange(e, alpha.id)}>
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
    <li>
      <h3>Criterions for {activity.name}</h3>

      <p>Choose Entry and Completion Criterias from Alpha States:</p>
      {renderEntryCriterions()}
      {renderCompletionCriterions()}
    </li>
  );
};

export default AlphaStateList;
