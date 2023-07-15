import React, { useState } from 'react';

const Role = ({ role, handleDeleteRole, handleRoleNameChange }) => { //, addPerformedTask, deletePerformedTask, addAssignedWorkProduct, deleteAssignedWorkProduct
  const handleDelete = () => {
    handleDeleteRole(role.id);
  };

  const setRoleName = (newName) => {
    handleRoleNameChange(role.id, newName);
  };

  return (
    <div>
      <input type="text" value={role.name} onChange={(e) => setRoleName(e.target.value)} />
      <button onClick={handleDelete}>Delete Role</button>
    </div>
  );
};

export default Role;
