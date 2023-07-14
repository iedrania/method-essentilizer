import React, { useState } from 'react';

const AreaList = ({ activity, setActivities, areasOfConcern }) => {
  const [selectedAreaOfConcern, setSelectedAreaOfConcern] = useState([]);

  const handleAreaOfConcernChange = (event) => {
    const areaOfConcernId = event.target.value;
    if (selectedAreaOfConcern.includes(areaOfConcernId)) {
      setSelectedAreaOfConcern(selectedAreaOfConcern.filter((areaId) => areaId !== areaOfConcernId));
      activity.areasOfConcern = activity.areasOfConcern.filter((areaId) => areaId !== areaOfConcernId);
    } else {
      setSelectedAreaOfConcern([...selectedAreaOfConcern, areaOfConcernId]);
      activity.areasOfConcern = [...activity.areasOfConcern, areaOfConcernId];
    }
    // TODO Update the activity state using a proper state management technique
  };

  const renderAreaOfConcern = () => {
    return areasOfConcern.map((areaOfConcern) => (
      <label key={areaOfConcern.id}>
        <input type="checkbox" value={areaOfConcern.id} onChange={handleAreaOfConcernChange} />
        {areaOfConcern.name}
      </label>
    ));
  };

  return (
    <li>
      <h3>{activity.name}</h3>

      <h4>Area of Concern:</h4>
      {renderAreaOfConcern()}
    </li>
  );
};

export default AreaList;
