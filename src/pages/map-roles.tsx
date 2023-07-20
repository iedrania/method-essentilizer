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
  const { roles } = useContext(MappingContext);

  return (
    <div>
      <h2>Map Roles</h2>

      <ul>
        {roles.map((role) => (
          <CompetencyList key={role.id} role={role} competencies={competencies.filter((item) => (role.areasOfConcern).includes(String(item.areaOfConcernId)))} />
        ))}
      </ul>

      <Link href="/map-result">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapRoles;
