import React, { useContext } from 'react';
import Router from 'next/router'
import { MappingContext } from '../context/context';
import { downloadJson } from '@/utils/utils';

const InputResult = () => {
  const { name, creator, description, tasks, roles } = useContext(MappingContext);

  const handleClick = () => {
    Router.push('/input-sub-alphas');
  };

  const handleJsonClick = () => {
    downloadJson(`${name} by ${creator}`, name, creator, description, tasks, roles);
  };

  const printConsole = () => {
    console.log(tasks, roles)
  }

  return (
    <div>
      <h1>{name}</h1>
      <p>Creator: {creator}</p>
      <p>Description: {description}</p>

      <h2>Insert Result</h2>

      <h3>Tasks:</h3>
      <ul>
        {tasks.map((task, index) => (
          <div key={index}>
            <li>{task.name}</li>

            {task.workProducts.length > 0 && (
              <div>
                <h4>Work Products:</h4>
                <ul>
                  {task.workProducts.map((workProduct) => (
                    <li key={workProduct.id}>{workProduct.name}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        ))}
      </ul>

      <h3>Roles:</h3>
      <ul>
        {roles.map((role, index) => (
          <div key={index}>
            <li>{role.name}</li>

            {role.performedTasks.length > 0 && (
              <div>
                <h4>Performed Tasks:</h4>
                <ul>
                  {role.performedTasks.map((taskId) => (
                    <li key={taskId}>{tasks.find((item) => item.id == taskId).name}</li>
                  ))}
                </ul>
              </div>
            )}

            {role.assignedWorkProducts.length > 0 && (
              <div>
                <h4>Assigned Work Products:</h4>
                <ul>
                  {role.assignedWorkProducts.map((idTuple) => {
                    const task = tasks.find((item) => item.id == idTuple[0]);
                    const workProduct = task?.workProducts.find((item) => item.id == idTuple[1]);
                    return (
                      <li key={`${idTuple[0]}-${idTuple[1]}`}>
                        {workProduct ? workProduct.name : "Work Product Not Found"}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ))}
      </ul>

      <button onClick={handleClick}>Next</button>
      <button onClick={handleJsonClick}>Download JSON</button>
      <button onClick={printConsole}>Log</button>
    </div>
  );
};

export default InputResult;
