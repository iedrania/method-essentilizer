import React, { useContext } from 'react';
import { MappingContext } from '../../context/context';

const EntryWorkProductList = ({ activity, workProducts }) => {
  const { updateEntryLevel } = useContext(MappingContext);

  const handleEntryWorkProductChange = (event, levelOfDetail) => {
    const workProductId = event.target.value;
    const isChecked = event.target.checked;
    updateEntryLevel(activity.id, workProductId, levelOfDetail, isChecked);
  };

  const handleEntryLevelChange = (event, workProductId) => {
    const levelOfDetail = event.target.value;
    updateEntryLevel(activity.id, workProductId, levelOfDetail, true);
  };

  const renderEntryCriterions = () => {
    return workProducts.filter((workProduct) => workProduct.levelOfDetails.length).map((workProduct) => (
      <div key={workProduct.id}>
        <div className="flex items-center mr-4">
          <input
            type="checkbox"
            value={workProduct.id}
            checked={activity.entryCriterions.workProducts.some((entryCriterion) => entryCriterion.startsWith(`${activity.id}-wp-${workProduct.id}.`))}
            onChange={(e) => handleEntryWorkProductChange(e, workProduct.levelOfDetails[0])}
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
          />
          <label key={workProduct.id} className="ml-2 text-sm font-medium text-gray-600">
            {workProduct.name}
          </label>
        </div>

        {activity.entryCriterions.workProducts.some((entryCriterion) => entryCriterion.startsWith(`${activity.id}-wp-${workProduct.id}.`)) && (
          <div>
            <p>Levels of {workProduct.name}</p>
            <select
              value={activity.entryCriterions.workProducts.find((entryCriterion) =>
                entryCriterion.startsWith(`${activity.id}-wp-${workProduct.id}.`)
              ).split(".")[1]}
              onChange={(e) => handleEntryLevelChange(e, workProduct.id)}
            >
              {workProduct.levelOfDetails.map((level, index) => (
                <option key={index} value={level}>
                  {level}
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
        <p>Choose Entry Criterias from Work Product Level of Details:</p>
        {renderEntryCriterions()}
      </div>
    </div>
  );
};

export default EntryWorkProductList;
