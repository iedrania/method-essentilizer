import prisma from '../lib/prisma';
import React, { useContext } from 'react';
import { GetStaticProps } from "next"
import Link from 'next/link';
import { MappingContext } from '../context/context';
import CompetencyList from '@/components/CompetencyList';

export const getStaticProps: GetStaticProps = async () => {
  const competencies = await prisma.competency.findMany();
  return {
    props: { competencies },
    revalidate: 10,
  };
};

const MapRoles: React.FC = ({competencies}) => {
  const { rolesPattern } = useContext(MappingContext);

  return (
    <div>
      <h2>Map Roles</h2>

      <ul>
        {rolesPattern.map((role) => (
          <CompetencyList key={role.id} role={role} competencies={competencies}/>
        ))}
      </ul>

      {/* TODO filter competencies by related task/work product, if none, display all */}

      <Link href="/map-result">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapRoles;
