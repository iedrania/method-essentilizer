import React, { useContext } from 'react';
import Link from 'next/link';
import { MappingContext } from '../context/context';
import { customerActivitySpaces, solutionActivitySpaces, workActivitySpaces, customerAlphas, solutionAlphas, workAlphas, competencies } from '@/components/data';

const MapResult = () => {
  const { activities, rolesPattern } = useContext(MappingContext);

  const handleNextClick = () => {
    // TODO database or json
  };

  return (
    <div>
      <h2>Mapping Result</h2>

      <h3>Activities:</h3>
      <ul>
        {activities.map((activity) => (
          <div key={activity.id}>
            <li>{activity.name}</li>
            <h4>Activity Spaces:</h4>
            <ul>
              {activity.activitySpaces.map((activitySpace, index) => (
                <li key={index}>{customerActivitySpaces.concat(solutionActivitySpaces).concat(workActivitySpaces).find(spaceObj => spaceObj.id.toString() === activitySpace)?.name || activitySpace}</li>
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
                      <li key={index}>{customerAlphas.concat(solutionAlphas).concat(workAlphas).find(alphaObj => alphaObj.id.toString() === alpha)?.name || alpha}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </ul>

      <h3>Roles:</h3>
      <ul>
        {rolesPattern.map((role) => (
          <div key={role.id}>
            <li>{role.name}</li>
            <h4>Competencies:</h4>
            <ul>
              {role.competencies.map((competency) => (
                <li key={competency.id}>{competencies.find(compObj => compObj.id.toString() === competency)?.name || competency}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>

      <Link href="/">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default MapResult;
