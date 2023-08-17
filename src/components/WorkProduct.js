import React, { useContext, useState } from "react";
import { MappingContext } from "../context/context";

const WorkProduct = ({ taskId, workProduct }) => {
  const { changeWorkProductName, changeWorkProductDescription, deleteWorkProduct } =
    useContext(MappingContext);

  const [showDescription, setShowDescription] = useState(false);

  const handleDelete = () => {
    deleteWorkProduct(taskId, workProduct.id);
  };

  const setWorkProductName = (newName) => {
    changeWorkProductName(taskId, workProduct.id, newName);
  };

  const setWorkProductDescription = (newDescription) => {
    changeWorkProductDescription(taskId, workProduct.id, newDescription);
  };

  const toggleDescriptionVisibility = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <input
          className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
          type="text"
          placeholder="Work Product Name"
          value={workProduct.name}
          onChange={(event) => setWorkProductName(event.target.value)}
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

        <button
          onClick={handleDelete}
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

      {showDescription && (
        <div>
          <input
            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
            type="text"
            placeholder="Work Product Description"
            value={workProduct.description}
            onChange={(e) => setWorkProductDescription(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default WorkProduct;
