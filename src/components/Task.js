import React, { useContext, useState } from "react";
import { MappingContext } from "../context/context";
import WorkProduct from "@/components/WorkProduct";

const Task = ({ task }) => {
  const { changeTaskName, changeTaskDescription, deleteTask, workProducts, addWorkProduct } =
    useContext(MappingContext);

  const [showDescription, setShowDescription] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const setTaskName = (newName) => {
    changeTaskName(task.id, newName);
  };

  const setTaskDescription = (newDescription) => {
    changeTaskDescription(task.id, newDescription);
  };

  const toggleDescriptionVisibility = () => {
    setShowDescription((prev) => !prev);
  };

  const handleAddWorkProduct = () => {
    addWorkProduct({
      id: workProducts.length + 1,
      name: "",
      description: "",
      alphas: [],
      subAlphas: [],
      levelOfDetails: [],
      taskId: task.id,
      areasOfConcern: [],
    });
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <input
        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
        type="text"
        placeholder="Task Name"
        value={task.name}
        onChange={(e) => setTaskName(e.target.value)}
      />

      {showDescription && (
        <div>
          <input
            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
            type="text"
            placeholder="Task Description"
            value={task.description}
            onChange={(e) => setTaskDescription(e.target.value)}
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

      <h4>Does this task results in any Work Product?</h4>
      {workProducts
        .filter((workProduct) => workProduct.taskId === task.id)
        .map((workProduct) => (
          <WorkProduct
            key={workProduct.id}
            workProduct={workProduct}
          />
        ))
      }

      <div className="flex flex-col gap-2 mt-4">
        <button
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md bg-black hover:bg-gray-800 text-white outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={handleAddWorkProduct}
        >
          Add Work Product
        </button>

        <button
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={handleDelete}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default Task;
