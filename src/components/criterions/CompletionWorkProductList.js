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
    updateCompletionLevel(activity.id, workProductId.toString(), levelOfDetail, true);
  };

  const renderCompletionCriterions = () => {
    return workProducts.filter((workProduct) => workProduct.levelOfDetails.length).map((workProduct, index) => (
      <div key={`${activity.id}-${index}`}>
        <div className="flex items-center mr-4">
          <input
            type="checkbox"
            value={workProduct.id}
            checked={activity.completionCriterions.workProducts.some((completionCriterion) => completionCriterion[0] === workProduct.id.toString())}
            onChange={(e) => handleCompletionWorkProductChange(e, workProduct.levelOfDetails[workProduct.levelOfDetails.length-1])}
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ml-2 text-sm font-medium text-gray-600">
            {workProduct.name}
          </label>
        </div>

        {activity.completionCriterions.workProducts.some((completionCriterion) => completionCriterion[0] === workProduct.id.toString()) && (
          <div>
            <p>Levels of {workProduct.name}</p>
            <select
              value={activity.completionCriterions.workProducts.find((completionCriterion) =>
                completionCriterion[0] === workProduct.id.toString()
              )[1]}
              onChange={(e) => handleCompletionLevelChange(e, workProduct.id)}
            >
              {workProduct.levelOfDetails.map((level, index) => (
                <option key={`${workProduct.taskId}-${workProduct.id}-${index}`} value={level}>
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
        <p>Choose Completion Criterias from Work Product Level of Details:</p>
        {renderCompletionCriterions()}
      </div>
    </div>
  );
};

export default CompletionWorkProductList;
