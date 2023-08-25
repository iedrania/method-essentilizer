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
    return areasOfConcern.map((areaOfConcern) => {
      return (
        <div key={areaOfConcern.id} className="flex items-center mr-4">
          <input
            type="checkbox"
            value={areaOfConcern.id}
            checked={element.areasOfConcern.includes(areaOfConcern.id.toString())}
            onChange={handleAreaOfConcernChange}
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            key={areaOfConcern.id}
            className="ml-2 text-sm font-medium text-gray-600"
          >
            {areaOfConcern.name}
          </label>
        </div>
      );
    });
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <h3 className="text-black my-4 text-xl">
        {element.name}
      </h3>

      <div className="flex flex-col gap-3">
        <h4>Area of Concern:</h4>
        {renderAreaOfConcern()}
      </div>
    </div>
  );
};

export default AreaList;
