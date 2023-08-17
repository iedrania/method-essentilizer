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
    return alphas.concat(subAlphas).filter((alpha) => alpha.states.length).map((alpha) => (
      <div key={alpha.id}>
        <div className="flex items-center mr-4">
          <input
            type="checkbox"
            name="entryCriteria"
            value={alpha.id}
            checked={activity.entryCriterions.alphas.some((entryCriterion) => entryCriterion.startsWith(`${alpha.id}.`))}
            onChange={(e) => handleEntryAlphaChange(e, alpha.states[0].id)}
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
          />
          <label key={alpha.id} className="ml-2 text-sm font-medium text-gray-600">
            {alpha.name}
          </label>
        </div>

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
      </div>
    ));
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <div className="flex flex-col gap-3">
        <p>Choose Entry Criterias from Alpha States:</p>
        {renderEntryCriterions()}
      </div>
    </div>
  );
};

export default EntryStateList;
