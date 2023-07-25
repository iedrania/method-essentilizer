import React, { useContext } from 'react';
import { MappingContext } from '../context/context';
import StateItem from '@/components/StateItem';

const SubAlpha = ({ subAlpha, alphas }) => {
  const { changeSubAlphaName, changeSubAlphaDescription, deleteSubAlpha, updateAlphaOfSubAlpha, addState } = useContext(MappingContext);

  const handleDelete = () => {
    deleteSubAlpha(subAlpha.id);
  };

  const setSubAlphaName = (newName) => {
    changeSubAlphaName(subAlpha.id, newName);
  };

  const setSubAlphaDescription = (newDescription) => {
    changeSubAlphaDescription(subAlpha.id, newDescription);
  };

  const handleAlphaChange = (event) => {
    const alphaId = event.target.value;
    updateAlphaOfSubAlpha(subAlpha.id, alphaId, alphas.find((alpha) => alpha.id == alphaId)?.states || []);
  };

  const handleAddState = () => {
    addState(subAlpha.id, [{ id: subAlpha.states.length + 1, name: '', description: '', checklists: [] }]);
  };

  return (
    <div>
      <label htmlFor="title">Name:</label>
      <input type="text" id="title" value={subAlpha.name} onChange={(e) => setSubAlphaName(e.target.value)} />
      
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" value={subAlpha.description} onChange={(e) => setSubAlphaDescription(e.target.value)} />

      <h4>What is the Alpha for this Sub-Alpha?</h4>
      <select value={subAlpha.alpha} onChange={handleAlphaChange}>
        {alphas.map((alpha) => (
          <option key={alpha.id} value={alpha.id}>
            {alpha.name}
          </option>
        ))}
      </select>

      {subAlpha.states.map((state) => (
        <StateItem key={state.id} subAlphaId={subAlpha.id} state={state} />
      ))}

      <button onClick={handleAddState}>Add State</button>

      <button onClick={handleDelete}>Delete Sub-Alpha</button>
    </div>
  );
};

export default SubAlpha;
