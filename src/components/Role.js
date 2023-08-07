import React, { useContext } from 'react';
import { MappingContext } from '../context/context';

const Role = ({ role }) => {
  const { changeRoleName, tasks, deleteRole, updatePerformedTasks, updateAssignedWorkProducts } = useContext(MappingContext);

  const handleDelete = () => {
    deleteRole(role.id);
  };

  const setRoleName = (newName) => {
    changeRoleName(role.id, newName);
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

  const renderTasks = () => {
    return tasks.map((task) => (
      <label key={task.id}>
        <input type="checkbox" value={task.id} checked={role.performedTasks.includes(task.id.toString())} onChange={handleTaskChange} />
        {task.name}
      </label>
    ));
  };

  const renderWorkProducts = () => {
    // TODO P3 add task category
    return tasks.map((task) =>
      task.workProducts.map((workProduct) => (
        <label key={workProduct.id}>
          <input type="checkbox" value={[task.id, workProduct.id]} checked={role.assignedWorkProducts.some((arr) => JSON.stringify(arr) === JSON.stringify([task.id.toString(), workProduct.id.toString()]))} onChange={handleWorkProductChange} />
          {workProduct.name}
        </label>
      ))
    );
  };

  return (
    <div>
      <input type="text" value={role.name} onChange={(e) => setRoleName(e.target.value)} />

      <h4>Does this role perform any task?</h4>
      {renderTasks()}

      <h4>Is this role responsible for any work product?</h4>
      {renderWorkProducts()}

      <button onClick={handleDelete}>Delete Role</button>
    </div>
  );
};

export default Role;
