import React, { useContext, useState } from 'react';
import { MappingContext } from '../context/context';
import ChecklistItem from '@/components/ChecklistItem';

const StateItem = ({ subAlphaId, state }) => {
  const { changeStateName, changeStateDescription, deleteState, addChecklistItem } = useContext(MappingContext);

  const [showChecklist, setShowChecklist] = useState(false);

  const handleDelete = () => {
    deleteState(subAlphaId, state.id);
  };

  const setStateName = (newName) => {
    changeStateName(subAlphaId, state.id, newName);
  };

  const setStateDescription = (newDescription) => {
    changeStateDescription(subAlphaId, state.id, newDescription);
  };

  const handleAddChecklistItem = () => {
    addChecklistItem(subAlphaId, state.id);
  };

  const toggleChecklistVisibility = () => {
    setShowChecklist((prev) => !prev);
  };

  return (
    <div>
      <label htmlFor="title">Name:</label>
      <input type="text" id="title" value={state.name} onChange={(e) => setStateName(e.target.value)} />

      <label htmlFor="description">Description:</label>
      <input type="text" id="description" value={state.description} onChange={(e) => setStateDescription(e.target.value)} />

      <button onClick={toggleChecklistVisibility}>
        {showChecklist ? 'Hide Checklist' : 'Show Checklist'}
      </button>

      {showChecklist && (
        <div>
          {state.checklist?.map((checklist, index) => (
            <ChecklistItem
              key={index}
              index={index}
              subAlphaId={subAlphaId}
              stateId={state.id}
              checklistItem={checklist}
            />
          ))}
          <button onClick={handleAddChecklistItem}>Add Checklist Item</button>
        </div>
      )}

      <button onClick={handleDelete}>Delete State</button>
    </div>
  );
};

export default StateItem;
