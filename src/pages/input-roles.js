import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';

const InsertRoleForm = () => {
  const { roles, addRole } = useContext(MappingContext);
  const [roleName, setRoleName] = useState('');

  const handleAddRole = () => {
    if (roleName) {
      addRole({ name: roleName });
      setRoleName('');
    }
  };

  return (
    <div>
      <h2>Insert Roles</h2>
      <input
        type="text"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      />
      <button onClick={handleAddRole}>Add Role</button>

      <h3>Roles:</h3>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>{role.name}</li>
        ))}
      </ul>
      <Link href="/input-result">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default InsertRoleForm;
