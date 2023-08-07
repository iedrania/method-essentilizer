import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const AreaList = ({ element, elementType, areasOfConcern }) => {
  const { updateAreas } = useContext(MappingContext);

  const handleAreaOfConcernChange = (event) => {
    const areaId = event.target.value;
    const isChecked = event.target.checked;
    updateAreas(element.id, areaId, isChecked, elementType);
  };

  const renderAreaOfConcern = () => {
    return areasOfConcern.map((areaOfConcern) => (
      <label key={areaOfConcern.id}>
        <input type="checkbox" value={areaOfConcern.id} checked={element.areasOfConcern.includes(areaOfConcern.id.toString())} onChange={handleAreaOfConcernChange} />
        {areaOfConcern.name}
      </label>
    ));
  };

  return (
    <li>
      <h3>{element.name}</h3>

      <h4>Area of Concern:</h4>
      {renderAreaOfConcern()}
    </li>
  );
};

export default AreaList;
