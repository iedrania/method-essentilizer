import prisma from '../lib/prisma';
import React, { useContext } from 'react';
import Router from 'next/router';
import { GetStaticProps } from "next"
import { MappingContext } from '../context/context';

export const getStaticProps: GetStaticProps = async () => {
  const spaces = await prisma.activitySpace.findMany();
  const alphas = await prisma.alpha.findMany();
  const competencies = await prisma.competency.findMany();
  return {
    props: { spaces, alphas, competencies },
    revalidate: 10,
  };
};

const MapResult: React.FC = ({ spaces, alphas, competencies }) => {
  const { methodId, name, description, tasks, roles } = useContext(MappingContext);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO P2 choose db or json
    // TODO P2 validate methodId
    try {
      const body = { methodId, name, description, tasks, roles };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const printConsole = () => {
    console.log(methodId, name, description, tasks, roles)
    // TODO P3 ganti index jadi id
  }

  return (
    <div>
      <h2>Mapping Result</h2>

      <h3>Activities:</h3>
      {tasks.map((activity) => (
        <div key={activity.id}>
          <p>{activity.name}</p>
          <h4>Activity Spaces:</h4>
          <ul>
            {activity.activitySpaces.map((activitySpace, index) => (
              <li key={index}>{spaces.find(spaceObj => spaceObj.id.toString() === activitySpace)?.name || activitySpace}</li>
            ))}
          </ul>

          <h4>Work Products:</h4>
          <ul>
            {activity.workProducts.map((workProduct, index) => (
              <div key={index}>
                <li>{workProduct.name}</li>
                <h5>Alphas:</h5>
                <ul>
                  {workProduct.alphas.map((alpha, index) => (
                    <li key={index}>{alphas.find(alphaObj => alphaObj.id.toString() === alpha)?.name || alpha}</li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
      ))}

      <h3>Roles:</h3>
      {roles.map((role) => (
        <div key={role.id}>
          <p>{role.name}</p>
          <h4>Competencies:</h4>
          <ul>
            {role.competencies.map((competency) => (
              <li key={competency.id}>{competencies.find(compObj => compObj.id.toString() === competency)?.name || competency}</li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={submitData}>Save</button>
      <button onClick={printConsole}>Log</button>
    </div>
  );
};

export default MapResult;
