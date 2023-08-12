import prisma from '../lib/prisma';
import React, { useContext } from 'react';
import Router from 'next/router';
import { GetStaticProps } from "next"
import { MappingContext } from '../context/context';
import { downloadEssenceJson } from '@/utils/utilsEssence';

export const getStaticProps: GetStaticProps = async () => {
  const spaces = await prisma.activitySpace.findMany();
  const alphas = await prisma.alpha.findMany({
    include: {
      states: true,
    }
  });
  const competencies = await prisma.competency.findMany();
  return {
    props: { spaces, alphas, competencies },
    revalidate: 10,
  };
};

const MapResult: React.FC = ({ spaces, alphas, competencies }) => {
  const { methodId, name, creator, description, tasks, roles, subAlphas, patterns } = useContext(MappingContext);

  const handleSaveClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO P2 validate methodId
    try {
      const body = { methodId, name, creator, description, tasks, roles, subAlphas };
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

  const handleJsonClick = () => {
    downloadEssenceJson(`${name} by ${creator} - Essentialized`, methodId, name, creator, description, tasks, roles, subAlphas, patterns, spaces, alphas, competencies);
  };

  const printConsole = () => {
    console.log(methodId, name, creator, description, tasks, roles, subAlphas, patterns)
    // TODO P3 ganti index jadi id
  }

  return (
    <div>
      <h1>{name}</h1>
      <p>Creator: {creator}</p>
      <p>Description: {description}</p>

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
                  {workProduct.subAlphas.map((alpha, index) => (
                    <li key={index}>{subAlphas.find(subAlpha => subAlpha.id === alpha)?.name || alpha}</li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>

          <h4>Entry Criterions:</h4>
          <ul>
            {activity.entryCriterions.alphas.map((criterion) => (
              <li key={criterion}>
                {alphas.find((alphaObj) => alphaObj.id.toString() === criterion.split(".")[0])?.name ||
                  subAlphas.find((alphaObj) => alphaObj.id.toString() === criterion.split(".")[0])?.name ||
                  criterion}::
                {alphas.find((alphaObj) => alphaObj.id.toString() === criterion.split(".")[0])
                  ?.states?.find((state) => state.id.toString() === criterion.split(".")[1])?.name ||
                  subAlphas.find((alphaObj) => alphaObj.id.toString() === criterion.split(".")[0])
                  ?.states.find((state) => state.id.toString() === criterion.split(".")[1])?.name ||
                  "State Not Found"}
                  {console.log(alphas.find((alphaObj) => alphaObj.id.toString() === criterion.split(".")[0]))}
              </li>            
            ))}
            {activity.entryCriterions.workProducts.map((criterion) => (
              <li key={criterion}>
                {tasks.find((task) => task.id.toString() === criterion.split("-")[0])?.
                  workProducts.find((workProduct) => workProduct.id.toString() === criterion.split(".")[0].split("-")[2])?.
                  name || criterion}::
                {criterion.split(".")[1] || "Level Not Found"}
              </li>            
            ))}
          </ul>

          <h4>Completion Criterions:</h4>
          <ul>
            {activity.completionCriterions.alphas.map((criterion, index) => (
              <li key={index}>
                {alphas.find((alphaObj) => alphaObj.id.toString() === criterion.split(".")[0])?.name ||
                  subAlphas.find((alphaObj) => alphaObj.id.toString() === criterion.split(".")[0])?.name ||
                  criterion}::
                {alphas.find((alphaObj) => alphaObj.id.toString() === criterion.split(".")[0])
                  ?.states?.find((state) => state.id.toString() === criterion.split(".")[1])?.name ||
                  subAlphas.find((alphaObj) => alphaObj.id.toString() === criterion.split(".")[0])
                  ?.states.find((state) => state.id.toString() === criterion.split(".")[1])?.name ||
                  "State Not Found"}
                  {console.log(alphas.find((alphaObj) => alphaObj.id.toString() === criterion.split(".")[0]))}
              </li>            
            ))}
            {activity.completionCriterions.workProducts.map((criterion) => (
              <li key={criterion}>
                {tasks.find((task) => task.id.toString() === criterion.split("-")[0])?.
                  workProducts.find((workProduct) => workProduct.id.toString() === criterion.split(".")[0].split("-")[2])?.
                  name || criterion}::
                {criterion.split(".")[1] || "Level Not Found"}
              </li>            
            ))}
          </ul>
        </div>
      ))}

      <h3>Patterns (Roles):</h3>
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

      <h3>Sub-Alphas:</h3>
      {subAlphas.map((subAlpha) => (
        <div key={subAlpha.id}>
          <h4>{subAlpha.name}</h4>
          <p>{subAlpha.description}</p>
          <p>Alpha: {alphas.find(alpha => alpha.id.toString() === subAlpha.alpha)?.name || subAlpha.alpha}</p>

          <h5>Work Products:</h5>
          <ul>
            {subAlpha.workProducts.map((workProduct, index) => (
              <li key={index}>{(tasks[Number(workProduct.split("-")[2])-1]).workProducts[Number(workProduct.split("-")[4]-1)].name}</li>
            ))}
          </ul>

          <h5>States:</h5>
          <ul>
            {subAlpha.states.map((state) => (
              <li key={state.id}>
                {state.name}
                <p>{state.description}</p>
                <ul>
                  {state.checklist.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={handleSaveClick}>Save to Database</button>
      <button onClick={handleJsonClick}>Download JSON</button>
      <button onClick={printConsole}>Log</button>
    </div>
  );
};

export default MapResult;
