import React, { useContext, useState } from 'react';
import { MappingContext } from '../context/context';
import ChecklistItem from '@/components/ChecklistItem';

const StateItem = ({ subAlphaId, state }) => {
  const { changeStateName, changeStateDescription, deleteState, addChecklistItem } = useContext(MappingContext);

  const [showDescription, setShowDescription] = useState(false);
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

  const toggleDescriptionVisibility = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <div className="px-5 pb-5 rounded-lg shadow">
      <div className="flex justify-center items-center">
        <input
          className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
          type="text"
          placeholder="State Name"
          value={state.name}
          onChange={(e) => setStateName(e.target.value)}
        />

        <button
          className="flex items-center justify-center mt-4 ml-3"
          onClick={toggleDescriptionVisibility}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-10 hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black rounded-lg p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"
            />
            <polygon
              points="18 2 22 6 12 16 8 16 8 12 18 2"
            />
          </svg>
        </button>
      </div>
      
      {showDescription && (
        <div>
          <input
            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
            type="text"
            placeholder="State Description"
            value={state.description}
            onChange={(e) => setStateDescription(e.target.value)}
          />
        </div>
      )}

      {/* <div className="flex flex-col gap-2 mt-4 mb-4">
        <button
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={toggleDescriptionVisibility}
        >
          {showDescription ? 'Hide Description' : 'Show Description'}
        </button>
      </div> */}

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
          <button
            className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md bg-black hover:bg-gray-800 text-white outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
            onClick={handleAddChecklistItem}
          >
            Add Checklist Item
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4">
        <button
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={toggleChecklistVisibility}
        >
          {showChecklist ? 'Hide Checklist' : 'Show Checklist'}
        </button>

        <button
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={handleDelete}
        >
          Delete State
        </button>
      </div>
    </div>
  );
};

export default StateItem;
