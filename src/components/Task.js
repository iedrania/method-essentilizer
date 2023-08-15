import React, { useContext, useState } from "react";
import { MappingContext } from "../context/context";
import WorkProduct from "@/components/WorkProduct";

const Task = ({ task }) => {
  const { changeTaskName, deleteTask, addWorkProductToTask } =
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
    addWorkProductToTask(task.id, [
      {
        id: task.workProducts.length + 1,
        name: "",
        alphas: [],
        subAlphas: [],
        levelOfDetails: [],
      },
    ]);
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <label htmlFor="title">Name:</label>
      <input
        className=" text-black placeholder-gray-600 w-full pt-2 outline-none px-1 my-4 border-b border-gray-500 transition duration-200 ease-in-out transform border-transparent text-xl focus:bg-white  focus:outline-none focus:shadow-outline "
        type="text"
        id="title"
        placeholder="Task Name"
        value={task.name}
        onChange={(e) => setTaskName(e.target.value)}
      />

      {showDescription && (
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={task.description} onChange={(e) => setTaskDescription(e.target.value)} />
        </div>
      )}

      <button onClick={toggleDescriptionVisibility}>
        {showDescription ? 'Hide Description' : 'Show Description'}
      </button>

      <h4>Does this task results in any Work Product?</h4>
      {task.workProducts.map((workProduct) => (
        <WorkProduct
          key={workProduct.id}
          taskId={task.id}
          workProduct={workProduct}
        />
      ))}

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
