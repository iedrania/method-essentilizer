import React, { useContext } from 'react';
import Router from 'next/router'
import { MappingContext } from '../context/context';

const InputResult = () => {
  const { tasks, roles, mapTasksToActivities, mapRolesToPattern } = useContext(MappingContext);

  const handleClick = () => {
    mapTasksToActivities();
    mapRolesToPattern();
    Router.push('/map-areas');
  };

  return (
    <div>
      <h2>Insert Result</h2>

      <h3>Tasks:</h3>
      <ul>
        {tasks.map((task, index) => (
          <div key={index}>
            <li>{task.name}</li>
            <h4>Work Products:</h4>
            <ul>
              {task.workProducts.map((workProduct) => (
                <li key={workProduct.id}>{workProduct.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>

      <h3>Roles:</h3>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>{role.name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Next</button>
    </div>
  );
};

export default InputResult;
