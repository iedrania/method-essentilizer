import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const AlphaStateList = ({ activity, alphas }) => {
  const { updateEntryCriterions, updateCompletionCriterions } = useContext(MappingContext);

  const handleEntryAlphaChange = (event) => {
    const alphaId = event.target.value;
    updateEntryCriterions(activity.id, alphaId);
  };

  const handleCompletionAlphaChange = (event) => {
    const alphaId = event.target.value;
    updateCompletionCriterions(activity.id, alphaId);
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
        <p>Entry Criteria</p>
        {alphas.map((alpha) => (
          <label key={alpha.id}>
            <input
              type="checkbox"
              name="entryCriteria"
              value={alpha.id}
              onChange={(e) => handleEntryAlphaChange(e)}
            />
            {alpha.name}
            {activity.entryCriterions.some((entryCriterion) => entryCriterion.startsWith(`${alpha.id}.`)) && (
              <div>
                <p>States of {alpha.name}</p>
                <select name={`entryCriterion-${alpha.id}`} onChange={(e) => handleEntryStateChange(e, alpha.id)}>
                  {alpha.states.length && (
                    <option value={alpha.states[alpha.states.length - 1].id}>{alpha.states[alpha.states.length - 1].name}</option>
                  )}
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
        <p>Completion Criteria</p>
        {alphas.map((alpha) => (
          <label key={alpha.id}>
            <input
              type="checkbox"
              name="completionCriteria"
              value={alpha.id}
              onChange={(e) => handleCompletionAlphaChange(e)}
            />
            {alpha.name}
            {activity.completionCriterions.some((completionCriterion) => completionCriterion.startsWith(`${alpha.id}.`)) && (
              <div>
                <p>States of {alpha.name}</p>
                <select name={`completionCriterion-${alpha.id}`} onChange={(e) => handleCompletionStateChange(e, alpha.id)}>
                  {alpha.states.length && (
                    <option value={alpha.states[alpha.states.length - 1].id}>{alpha.states[alpha.states.length - 1].name}</option>
                  )}
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

      <h4>Choose Entry and Completion Criterias from Alpha States:</h4>
      {renderEntryCriterions()}
      {renderCompletionCriterions()}
    </li>
  );
};

export default AlphaStateList;
