import React, { createContext, useState } from 'react';

const MappingContext = React.createContext();

const MappingProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [roles, setRoles] = useState([]);
  const [activities, setActivities] = useState([]);
  const [rolesPattern, setRolesPattern] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const addRole = (role) => {
    setRoles((prevRoles) => [...prevRoles, role]);
  };

  const addWorkProductToTask = (taskId, workProducts) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, workProducts: [...(task.workProducts || []), ...workProducts] };
        }
        return task;
      })
    );
  };

  const mapTasksToActivities = () => {
    const deepCopy = JSON.parse(JSON.stringify(tasks));
    const activitiesData = deepCopy.map((task) => {
      const mappedWorkProducts = task.workProducts.map((workProduct) => {
        return { ...workProduct, alphas: [] };
      });

      return {
        ...task,
        areasOfConcern: [],
        activitySpaces: [],
        workProducts: mappedWorkProducts,
      };
    });
    setActivities(activitiesData);
  };

  const mapRolesToPattern = () => {
    const deepCopy = JSON.parse(JSON.stringify(roles));
    const patternData = deepCopy.map((role) => {
      return {
        ...role,
        competencies: [],
      };
    });
    setRolesPattern(patternData);
  };

  const contextValue = {
    tasks,
    roles,
    activities,
    rolesPattern,
    addTask,
    addWorkProductToTask,
    addRole,
    mapTasksToActivities,
    mapRolesToPattern,
    setActivities,
  };

  return <MappingContext.Provider value={contextValue}>{children}</MappingContext.Provider>;
};

export { MappingContext, MappingProvider };
