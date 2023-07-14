import React, { createContext, useState } from 'react';

const MappingContext = React.createContext();

const MappingProvider = ({ children }) => {
  const [methodId, setMethodId] = useState(-1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
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
        areasOfConcern: [],
        competencies: [],
      };
    });
    setRolesPattern(patternData);
  };

  // TODO setActivityById, setWorkProductById, setRoleById

  const contextValue = {
    methodId,
    setMethodId,
    name,
    setName,
    description,
    setDescription,
    tasks,
    setTasks,
    roles,
    setRoles,
    activities,
    setActivities,
    rolesPattern,
    setRolesPattern,
    addTask,
    addRole,
    addWorkProductToTask,
    mapTasksToActivities,
    mapRolesToPattern,
  };

  return <MappingContext.Provider value={contextValue}>{children}</MappingContext.Provider>;
};

export { MappingContext, MappingProvider };
