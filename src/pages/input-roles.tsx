import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import Role from '@/components/role/Role';

const InputRoles = () => {
  const { methodId, roles, addRole, deleteRole, changeRoleName } = useContext(MappingContext);

  const handleAddRole = () => {
    addRole({ id: roles.length + 1, name: '', performedTasks: [], assignedWorkProducts: [] });
  };

  const handleDeleteRole = (roleId) => {
    deleteRole(roleId);
  };
  
  const handleRoleNameChange = (roleId, roleName) => {
    changeRoleName(roleId, roleName);
  };

  return (
    <div>
      <h2>Insert Roles</h2>

      {roles.map((role) => (
        <Role key={role.id} role={role} handleDeleteRole={handleDeleteRole} handleRoleNameChange={handleRoleNameChange} />
      ))}

      <button onClick={handleAddRole}>Add Role</button>

      {/* TODO ask for related task/work product */}

      <Link href="/input-result">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default InputRoles;
