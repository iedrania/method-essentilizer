import React, { useContext, useState } from 'react';
import { MappingContext } from '../context/context';
import StateItem from '@/components/StateItem';
import { v4 as uuidv4 } from 'uuid';

const SubAlpha = ({ subAlpha, alphas }) => {
  const { subAlphas, changeSubAlphaName, changeSubAlphaDescription, deleteSubAlpha, updateAlphaOfSubAlpha, addState } = useContext(MappingContext);

  const [showDescription, setShowDescription] = useState(false);
  const [showStates, setShowStates] = useState(false);

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
    const selectedAlpha = alphas.concat(subAlphas).find((alpha) => alpha.id == alphaId);
    const updatedStates = selectedAlpha?.states.map((state, index) => ({
      ...state,
      id: uuidv4(),
    })) || [];

    updateAlphaOfSubAlpha(subAlpha.id, alphaId, updatedStates, selectedAlpha.areaOfConcernId);
    console.log(updatedStates)
  };

  const handleAddState = () => {
    addState(subAlpha.id, [{
      id: uuidv4(),
      name: '',
      description: '',
      checklist: []
    }]);
  };

  const toggleStatesVisibility = () => {
    setShowStates((prev) => !prev);
  };

  const toggleDescriptionVisibility = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <input
        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
        type="text"
        placeholder="Sub-Alpha Name"
        value={subAlpha.name}
        onChange={(e) => setSubAlphaName(e.target.value)}
      />
      
      {showDescription && (
        <div>
          <input
            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
            type="text"
            placeholder="Sub-Alpha Description"
            value={subAlpha.description}
            onChange={(e) => setSubAlphaDescription(e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4 mb-4">
        <button
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={toggleDescriptionVisibility}
        >
          {showDescription ? 'Hide Description' : 'Show Description'}
        </button>
      </div>

      <h4>What is the Alpha for this Sub-Alpha?</h4>
      <select value={subAlpha.alpha} onChange={handleAlphaChange}>
        {alphas.concat(subAlphas).map((alpha) => {
          if (alpha.id !== subAlpha.id) {
            return (
              <option key={alpha.id} value={alpha.id}>
                {alpha.name}
              </option>
            );
          }
          return null;
        })}
      </select>

      {showStates && (
        <div>
          <h4>States for this Sub-Alpha:</h4>
          {subAlpha.states.map((state) => (
            <StateItem key={state.id} subAlphaId={subAlpha.id} state={state} />
          ))}
          <button
            className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md bg-black hover:bg-gray-800 text-white outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
            onClick={handleAddState}
          >
            Add State
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4">
        <button
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md bg-black hover:bg-gray-800 text-white outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={toggleStatesVisibility}
        >
          {showStates ? 'Hide States' : 'Show States'}
        </button>

        <button
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={handleDelete}
        >
          Delete Sub-Alpha
        </button>
      </div>
    </div>
  );
};

export default SubAlpha;
