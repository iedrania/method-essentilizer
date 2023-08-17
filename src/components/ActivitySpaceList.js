import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const ActivitySpaceList = ({ activity, activitySpaces }) => {
  const { updateActivitySpaces } = useContext(MappingContext);

  const handleActivitySpaceChange = (event) => {
    const activitySpaceId = event.target.value;
    const isChecked = event.target.checked;
    updateActivitySpaces(activity.id, activitySpaceId, isChecked);
  };

  const renderActivitySpaces = () => {
    return activitySpaces.map((activitySpace) => {
      return (
        <div key={activitySpace.id} className="flex items-center mr-4">
          <input
            type="checkbox"
            value={activitySpace.id}
            checked={activity.activitySpaces.includes(activitySpace.id.toString())}
            onChange={handleActivitySpaceChange}
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            className="ml-2 text-sm font-medium text-gray-600"
          >
            {activitySpace.name}
          </label>
        </div>
      );
    });
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <h3 className="text-black my-4 text-xl">
        {activity.name}
      </h3>

      <div className="flex flex-col gap-3">
        <h4>Activity Spaces:</h4>
        {/* TODO P2 add area of concern category and show other categories */}
        {/* activity.areasOfConcern.map((area) => (
          <div key={area}>
            <p>{areasOfConcern.find(areaObj => areaObj.id.toString() === area)?.name || ''}</p>
            {renderActivitySpaces(area)}
          </div>
        ))} */}
        {renderActivitySpaces()}
      </div>
    </div>
  );
};

export default ActivitySpaceList;
