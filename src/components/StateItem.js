import React, { useContext } from 'react';
import { MappingContext } from '../context/context';
import ChecklistItem from '@/components/ChecklistItem';

const StateItem = ({ subAlphaId, state }) => {
  const { changeStateName, changeStateDescription, deleteState, addChecklistItem } = useContext(MappingContext);

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

  return (
    <div>
      <label htmlFor="title">Name:</label>
      <input type="text" id="title" value={state.name} onChange={(e) => setStateName(e.target.value)} />
      
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" value={state.description} onChange={(e) => setStateDescription(e.target.value)} />

      {state.checklists.map((checklist, index) => (
        <ChecklistItem key={index} index={index} subAlphaId={subAlphaId} stateId={state.id} checklistItem={checklist} />
      ))}

      <button onClick={handleAddChecklistItem}>Add Checklist Item</button>

      <button onClick={handleDelete}>Delete State</button>
    </div>
  );
};

export default StateItem;
