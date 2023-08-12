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
    <div>
      <h3>{workProduct.name}</h3>

      <h4>Levels of Detail:</h4>
      {showLevelOfDetails && (
        <div>
          {workProduct.levelOfDetails.map((levelOfDetail, index) => (
            <LevelOfDetailItem
              key={index}
              index={index}
              activityId={activityId}
              workProductId={workProduct.id}
              levelOfDetailItem={levelOfDetail}
            />
          ))}
          <button onClick={handleAddLevelOfDetailItem}>Add Level of Detail Item</button>
        </div>
      )}

      <button onClick={toggleLevelOfDetailsVisibility}>
        {showLevelOfDetails ? 'Hide Level of Details' : 'Show Level of Details'}
      </button>
    </div>
  );
};

export default LevelOfDetails;
