import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const LevelOfDetailItem = ({ index, workProductId, levelOfDetailItem }) => {
  const { changeLevelOfDetailItem, deleteLevelOfDetailItem } = useContext(MappingContext);

  const handleLevelOfDetailItemDelete = () => {
    deleteLevelOfDetailItem(workProductId, index);
  };

  const setLevelOfDetailItem = (newName) => {
    changeLevelOfDetailItem(workProductId, index, newName);
  };

  return (
    <div className="flex justify-center items-center">
      <input
        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
        type="text"
        placeholder="Level of Detail Item"
        value={levelOfDetailItem}
        onChange={(e) => setLevelOfDetailItem(e.target.value)}
      />

      <button
        onClick={handleLevelOfDetailItemDelete}
        className="flex items-center justify-center mt-4 ml-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-10 bg-red-700 text-white rounded-lg hover:bg-red-800 p-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};

export default LevelOfDetailItem;
