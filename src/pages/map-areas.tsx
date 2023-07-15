import prisma from '../lib/prisma';
import React, { useContext } from "react"
import { GetStaticProps } from "next"
import Router from 'next/router'
import { MappingContext } from '../context/context';
import AreaList from '@/components/AreaList';

export const getStaticProps: GetStaticProps = async () => {
  const areas = await prisma.areaOfConcern.findMany();
  return {
    props: { areas },
    revalidate: 10,
  };
};

const MapAreas: React.FC = ({ areas }) => {
  const { activities, rolesPattern, fillRoleAreasFromRelated } = useContext(MappingContext);

  const filteredRoles = rolesPattern.filter(
    (role) => role.assignedWorkProducts?.length === 0 && role.performedTasks?.length === 0
  );

  const handleClick = () => {
    fillRoleAreasFromRelated()
    Router.push('/map-tasks');
  }

  return (
    <div>
      <h2>Choose Area of Concern</h2>

      <h3>Activities:</h3>
      <ul>
        {activities.map((activity) => (
          <AreaList key={activity.id} element={activity} elementType={1} areasOfConcern={areas} />
        ))}
      </ul>

      <h3>Roles:</h3>
      <ul>
        {filteredRoles.map((role) => (
          <AreaList key={role.id} element={role} elementType={2} areasOfConcern={areas} />
        ))}
      </ul>

      <button onClick={handleClick}>Next</button>
    </div>
  );
};

export default MapAreas;
