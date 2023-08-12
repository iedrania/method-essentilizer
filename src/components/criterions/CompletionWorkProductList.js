import React, { useContext } from 'react';
import { MappingContext } from '../../context/context';

const CompletionWorkProductList = ({ activity, workProducts }) => {
  const { updateCompletionLevel } = useContext(MappingContext);

  const handleCompletionWorkProductChange = (event, levelOfDetail) => {
    const workProductId = event.target.value;
    const isChecked = event.target.checked;
    updateCompletionLevel(activity.id, workProductId, levelOfDetail, isChecked);
  };

  const handleCompletionLevelChange = (event, workProductId) => {
    const levelOfDetail = event.target.value;
    updateCompletionLevel(activity.id, workProductId, levelOfDetail, true);
  };

  const renderCompletionCriterions = () => {
    return (
      <div>
        {workProducts.map((workProduct) => (
          <label key={workProduct.id}>
            <input
              type="checkbox"
              value={workProduct.id}
              checked={activity.completionCriterions.workProducts.some((completionCriterion) => completionCriterion.startsWith(`${activity.id}-wp-${workProduct.id}.`))}
              onChange={(e) => handleCompletionWorkProductChange(e, workProduct.levelOfDetails[workProduct.levelOfDetails.length-1])}
            />
            {workProduct.name}
            {activity.completionCriterions.workProducts.some((completionCriterion) => completionCriterion.startsWith(`${activity.id}-wp-${workProduct.id}.`)) && (
              <div>
                <p>Levels of {workProduct.name}</p>
                <select
                  value={activity.completionCriterions.workProducts.find((completionCriterion) =>
                    completionCriterion.startsWith(`${activity.id}-wp-${workProduct.id}.`)
                  ).split(".")[1]}
                  onChange={(e) => handleCompletionLevelChange(e, workProduct.id)}
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
      <p>Choose Completion Criterias from Work Product Level of Details:</p>
      {renderCompletionCriterions()}
    </div>
  );
};

export default CompletionWorkProductList;
