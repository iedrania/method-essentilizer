import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const ChecklistItem = ({ index, subAlphaId, stateId, checklistItem }) => {
  const { changeChecklistItem, deleteChecklistItem } = useContext(MappingContext);

  const handleChecklistItemDelete = () => {
    deleteChecklistItem(subAlphaId, stateId, index);
  };

  const setChecklistItem = (newName) => {
    changeChecklistItem(subAlphaId, stateId, index, newName);
  };

  return (
    <div>
      <input type="text" value={checklistItem} onChange={(e) => setChecklistItem(e.target.value)} />

      <button onClick={handleChecklistItemDelete}>Delete Checklist Item</button>
    </div>
  );
};

export default ChecklistItem;
