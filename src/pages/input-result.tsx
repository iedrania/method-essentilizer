import React, { useContext } from 'react';
import Router from 'next/router'
import { MappingContext } from '../context/context';

const InputResult = () => {
  const { tasks, roles } = useContext(MappingContext);

  const allWorkProducts = tasks.reduce((result, task) => {
    return result.concat(task.workProducts);
  }, []);

  const handleClick = () => {
    Router.push('/map-areas');
  };

  const printConsole = () => {
    console.log(tasks, roles)
  }

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
          <div key={index}>
            <li>{role.name}</li>

            <h4>Performed Tasks:</h4>
            <ul>
              {role.performedTasks.map((taskId) => (
                <li key={taskId}>{tasks.find((item) => item.id === taskId).name}</li>
              ))}
            </ul>

            <h4>Assigned Work Products:</h4>
            <ul>
              {role.assignedWorkProducts.map((workProductId) => (
                <li key={workProductId}>{allWorkProducts.find((item) => item.id === workProductId).name}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>

      <button onClick={handleClick}>Next</button>
      <button onClick={printConsole}>Log</button>
    </div>
  );
};

export default InputResult;
