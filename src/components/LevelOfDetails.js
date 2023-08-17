import React, { useContext, useState } from 'react';
import { MappingContext } from '../context/context';
import LevelOfDetailItem from '@/components/LevelOfDetailItem'

const LevelOfDetails = ({ activityId, workProduct }) => {
  const { addLevelOfDetailItem } = useContext(MappingContext);

  const [showLevelOfDetails, setShowLevelOfDetails] = useState(false);

  const handleAddLevelOfDetailItem = () => {
    addLevelOfDetailItem(activityId, workProduct.id);
  };

  const toggleLevelOfDetailsVisibility = () => {
    setShowLevelOfDetails((prev) => !prev);
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <h3 className="text-black my-4 text-xl">
        {workProduct.name}
      </h3>

      {showLevelOfDetails && (
        <div>
          <h4>Levels of Detail:</h4>
          {workProduct.levelOfDetails.map((levelOfDetail, index) => (
            <LevelOfDetailItem
              key={index}
              index={index}
              activityId={activityId}
              workProductId={workProduct.id}
              levelOfDetailItem={levelOfDetail}
            />
          ))}
          <button
            className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md bg-black hover:bg-gray-800 text-white outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
            onClick={handleAddLevelOfDetailItem}
          >
            Add Level of Detail Item
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4">
        <button
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md bg-black hover:bg-gray-800 text-white outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={toggleLevelOfDetailsVisibility}
        >
          {showLevelOfDetails ? 'Hide Level of Details' : 'Show Level of Details'}
        </button>
      </div>
    </div>
  );
};

export default LevelOfDetails;
