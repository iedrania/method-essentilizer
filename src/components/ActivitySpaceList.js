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
    return activitySpaces.map((activitySpace) => (
      <label key={activitySpace.id}>
        <input type="checkbox" value={activitySpace.id} onChange={handleActivitySpaceChange} />
        {activitySpace.name}
      </label>
    ));
  };

  return (
    <li>
      <h3>{activity.name}</h3>

      <h4>Activity Spaces:</h4>
      {/* TODO P1 add area of concern category */}
      {/* activity.areasOfConcern.map((area) => (
        <div key={area}>
          <p>{areasOfConcern.find(areaObj => areaObj.id.toString() === area)?.name || ''}</p>
          {renderActivitySpaces(area)}
        </div>
      ))} */}
      {renderActivitySpaces()}
    </li>
  );
};

export default ActivitySpaceList;
