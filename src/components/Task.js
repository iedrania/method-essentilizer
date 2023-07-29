import React, { useContext } from 'react';
import { MappingContext } from '../context/context';
import WorkProduct from '@/components/WorkProduct';

const Task = ({ task }) => {
  const { changeTaskName, deleteTask, addWorkProductToTask } = useContext(MappingContext);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const setTaskName = (newName) => {
    changeTaskName(task.id, newName);
  };

  const handleAddWorkProduct = () => {
    addWorkProductToTask(task.id, [{
      id: task.workProducts.length + 1,
      name: '',
      alphas: [],
      subAlphas: [],
    }]);
  };

  return (
    <div>
      <input type="text" value={task.name} onChange={(e) => setTaskName(e.target.value)} />

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
