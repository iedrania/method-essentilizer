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
  const { tasks, roles, fillRoleAreasFromRelated } = useContext(MappingContext);

  const filteredRoles = roles.filter(
    (role) => role.assignedWorkProducts?.length === 0 && role.performedTasks?.length === 0
  );

  const handleClick = () => {
    fillRoleAreasFromRelated()
    Router.push('/map-work-products');
  }

  return (
    <div>
      <h2>Choose Area of Concern</h2>

      <h3>Activities:</h3>
      <ul>
        {tasks.map((activity) => (
          <AreaList key={activity.id} element={activity} elementType={1} areasOfConcern={areas} />
        ))}
      </ul>

      <h3>Roles:</h3>
      {filteredRoles.length > 0 ? (
        <ul>
          {filteredRoles.map((role) => (
            <AreaList key={role.id} element={role} elementType={2} areasOfConcern={areas} />
          ))}
        </ul>
      ) : <p>No roles to choose area of concern for.</p>}

      {/* <ul>
        {subAlphas.map((subAlpha) => (
          <AreaList key={subAlpha.id} element={subAlpha} elementType={3} areasOfConcern={areas} />
        ))}
      </ul> */}

      <button onClick={handleClick}>Next</button>
    </div>
  );
};

export default MapAreas;
