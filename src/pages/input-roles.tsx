import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import Role from '@/components/Role';

const InputRoles = () => {
  const { roles, addRole } = useContext(MappingContext);

  const handleAddRole = () => {
    addRole({
      id: roles.length + 1,
      name: '',
      description: '',
      performedTasks: [],
      assignedWorkProducts: [],
      areasOfConcern: [],
      competencies: [],
      competencyLevels: []
    });
  };

  return (
    <div>
      <h2>Insert Roles</h2>

      {roles.map((role) => (
        <Role key={role.id} role={role} />
      ))}

      <button onClick={handleAddRole}>Add Role</button>

      <Link href="/input-result">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default InputRoles;
