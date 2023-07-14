import React, { useState } from 'react';

const ActivitySpaceList = ({ activity, activitySpaces }) => {
  const [selectedActivitySpaces, setSelectedActivitySpaces] = useState([]);

  const handleActivitySpaceChange = (event) => {
    const activitySpaceId = event.target.value;
    if (selectedActivitySpaces.includes(activitySpaceId)) {
      setSelectedActivitySpaces(selectedActivitySpaces.filter((spaceId) => spaceId !== activitySpaceId));
      activity.activitySpaces = activity.activitySpaces.filter((spaceId) => spaceId !== activitySpaceId);
    } else {
      setSelectedActivitySpaces([...selectedActivitySpaces, activitySpaceId]);
      activity.activitySpaces = [...activity.activitySpaces, activitySpaceId];
    }
    // TODO Update the activity state using a proper state management technique
    // const updatedActivitySpaces = [...activity.activitySpaces, activitySpaceId];
    // activity.setActivitySpaces(updatedActivitySpaces);
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
      {/* TODO add area of concern category
      {activity.areasOfConcern.map((area) => (
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
