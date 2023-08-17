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
    return alphas.concat(subAlphas).filter((alpha) => alpha.states.length).map((alpha) => (
      <div key={alpha.id}>
        <div className="flex items-center mr-4">
          <input
            type="checkbox"
            name="completionCriteria"
            value={alpha.id}
            checked={activity.completionCriterions.alphas.some((completionCriterion) => completionCriterion.startsWith(`${alpha.id}.`))}
            onChange={(e) => handleCompletionAlphaChange(e, alpha.states[alpha.states.length-1].id)}
          />
          <label className="ml-2 text-sm font-medium text-gray-600">
            {alpha.name}
          </label>
        </div>

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
      </div>
    ));
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <div className="flex flex-col gap-3">
        <p>Choose Completion Criterias from Alpha States:</p>
        {renderCompletionCriterions()}
      </div>
    </div>
  );
};

export default CompletionStateList;
