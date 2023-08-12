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
    return (
      <div>
        {workProducts.map((workProduct) => (
          <label key={workProduct.id}>
            <input
              type="checkbox"
              value={workProduct.id}
              checked={activity.entryCriterions.workProducts.some((entryCriterion) => entryCriterion.startsWith(`${activity.id}-wp-${workProduct.id}.`))}
              onChange={(e) => handleEntryWorkProductChange(e, workProduct.levelOfDetails[0])}
            />
            {workProduct.name}
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
          </label>
        ))}
      </div>
    );
  };

  return (
    <div>
      <p>Choose Entry Criterias from Work Product Level of Details:</p>
      {renderEntryCriterions()}
    </div>
  );
};

export default EntryWorkProductList;
