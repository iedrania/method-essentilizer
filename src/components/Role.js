import React, { useContext, useState } from "react";
import { MappingContext } from "../context/context";

const Role = ({ role }) => {
  const {
    changeRoleName,
    changeRoleDescription,
    tasks,
    deleteRole,
    updatePerformedTasks,
    updateAssignedWorkProducts,
  } = useContext(MappingContext);

  const [showDescription, setShowDescription] = useState(false);

  const handleDelete = () => {
    deleteRole(role.id);
  };

  const setRoleName = (newName) => {
    changeRoleName(role.id, newName);
  };

  const setRoleDescription = (newDescription) => {
    changeRoleDescription(role.id, newDescription);
  };

  const toggleDescriptionVisibility = () => {
    setShowDescription((prev) => !prev);
  };

  const handleTaskChange = (event) => {
    const taskId = event.target.value;
    const isChecked = event.target.checked;
    updatePerformedTasks(role.id, taskId, isChecked);
  };

  const handleWorkProductChange = (event) => {
    const taskId = event.target.value[0];
    const workProductId = event.target.value[2];
    const isChecked = event.target.checked;
    updateAssignedWorkProducts(role.id, taskId, workProductId, isChecked);
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const renderTasks = () => {
    return tasks.map((task) => {
      const randomNumber = getRandomNumber(1, 1000);
      return (
        <div key={task.id} className="flex items-center mr-4">
          <input
            id={`${task.id + randomNumber}-checkbox`}
            type="checkbox"
            value={task.id}
            checked={role.performedTasks.includes(task.id.toString())}
            onChange={handleTaskChange}
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            className="ml-2 text-sm font-medium text-gray-600 "
          >
            {task.name}
          </label>
        </div>
      );
    });
  };

  const renderWorkProducts = () => {
    // TODO P3 add task category
    return tasks.map((task) =>
      task.workProducts.map((workProduct) => {
        const randomNumber = getRandomNumber(1001, 2000);
        return (
          <div key={workProduct.id} className="flex items-center mr-4">
            <input
              id={`${workProduct.id + randomNumber}-checkbox`}
              type="checkbox"
              value={[task.id, workProduct.id]}
              checked={role.assignedWorkProducts.some((arr) => JSON.stringify(arr) === JSON.stringify([task.id.toString(), workProduct.id.toString()]))}
              onChange={handleWorkProductChange}
              className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              className="ml-2 text-sm font-medium text-gray-600 "
            >
              {workProduct.name}
            </label>
          </div>
        );
      })
    );
  };

  return (
    <div className="px-5 pb-5 bg-white rounded-lg shadow">
      <input
        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
        type="text"
        placeholder="Role Name"
        value={role.name}
        onChange={(e) => setRoleName(e.target.value)}
      />

      {showDescription && (
        <div>
          <input
            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-200 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-1 ring-gray-200"
            type="text"
            placeholder="Role Description"
            value={role.description}
            onChange={(e) => setRoleDescription(e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4 mb-4">
        <button
          onClick={toggleDescriptionVisibility}
          className="relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
        >
          {showDescription ? 'Hide Description' : 'Show Description'}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <h4>Does this role perform any task?</h4>
        {renderTasks()}

        <h4>Is this role responsible for any work product?</h4>
        {renderWorkProducts()}

        <button
          className="mt-2 relative w-full flex justify-center items-center py-2 text-sm  tracking-wide capitalize  rounded-md hover:bg-gray-100 text-black outline-1 border-2 border-gray-800 outline-black  transition duration-300 transform active:scale-95 ease-in-out"
          onClick={handleDelete}
        >
          Delete Role
        </button>
      </div>
    </div>
  );
};

export default Role;
