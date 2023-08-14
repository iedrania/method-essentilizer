import React, { useContext } from 'react';
import { MappingContext } from '../../context/context';

const CompletionStateList = ({ activity, alphas }) => {
  const { subAlphas, updateCompletionAlpha, updateCompletionCriterions } = useContext(MappingContext);

  const handleCompletionAlphaChange = (event, stateId) => {
    const alphaId = event.target.value;
    updateCompletionAlpha(activity.id, alphaId, stateId);
  };

  const handleCompletionStateChange = (event, alphaId) => {
    const stateId = event.target.value;
    updateCompletionCriterions(activity.id, alphaId, stateId);
  };

  const renderCompletionCriterions = () => {
    return (
      <div>
        {alphas.concat(subAlphas).filter((alpha) => alpha.states.length).map((alpha) => (
          <label key={alpha.id}>
            <input
              type="checkbox"
              name="completionCriteria"
              value={alpha.id}
              checked={activity.completionCriterions.alphas.some((completionCriterion) => completionCriterion.startsWith(`${alpha.id}.`))}
              onChange={(e) => handleCompletionAlphaChange(e, alpha.states[alpha.states.length-1].id)}
            />
            {alpha.name}
            {activity.completionCriterions.alphas.some((completionCriterion) => completionCriterion.startsWith(`${alpha.id}.`)) && (
              <div>
                <p>States of {alpha.name}</p>
                <select
                  name={`completionCriterion-${alpha.id}`}
                  value={activity.completionCriterions.alphas.find((completionCriterion) =>
                    completionCriterion.startsWith(`${alpha.id}.`)
                  ).split(".")[1]}
                  onChange={(e) => handleCompletionStateChange(e, alpha.id)}
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
      <p>Choose Completion Criterias from Alpha States:</p>
      {renderCompletionCriterions()}
    </div>
  );
};

export default CompletionStateList;
