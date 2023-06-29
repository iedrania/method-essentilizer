import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import CompetencyList from '@/components/MapRole';

const MapRoles = () => {
  const { rolesPattern } = useContext(MappingContext);

  return (
    <div>
      <h2>Map Roles</h2>

      <ul>
        {rolesPattern.map((role) => (
          <CompetencyList key={role.id} role={role} />
        ))}
      </ul>

      <Link href="/map-result">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapRoles;
