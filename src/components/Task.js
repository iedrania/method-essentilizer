import React, { useContext, useState } from 'react';
import { MappingContext } from '../context/context';
import WorkProduct from '@/components/WorkProduct';

const Task = ({ task }) => {
  const { changeTaskName, changeTaskDescription, deleteTask, addWorkProductToTask } = useContext(MappingContext);

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
    addWorkProductToTask(task.id, [{
      id: task.workProducts.length + 1,
      name: '',
      alphas: [],
      subAlphas: [],
      levelOfDetails: []
    }]);
  };

  return (
    <div>
      <label htmlFor="title">Name:</label>
      <input type="text" id="title" value={task.name} onChange={(e) => setTaskName(e.target.value)} />

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
        <WorkProduct key={workProduct.id} taskId={task.id} workProduct={workProduct} />
      ))}

      <button onClick={handleAddWorkProduct}>Add Work Product</button>

      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default Task;
