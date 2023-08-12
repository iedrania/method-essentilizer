import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const LevelOfDetailItem = ({ index, activityId, workProductId, levelOfDetailItem }) => {
  const { changeLevelOfDetailItem, deleteLevelOfDetailItem } = useContext(MappingContext);

  const handleLevelOfDetailItemDelete = () => {
    deleteLevelOfDetailItem(activityId, workProductId, index);
  };

  const setLevelOfDetailItem = (newName) => {
    changeLevelOfDetailItem(activityId, workProductId, index, newName);
  };

  return (
    <div>
      <input type="text" value={levelOfDetailItem} onChange={(e) => setLevelOfDetailItem(e.target.value)} />

      <button onClick={handleLevelOfDetailItemDelete}>Delete Item</button>
    </div>
  );
};

export default LevelOfDetailItem;
