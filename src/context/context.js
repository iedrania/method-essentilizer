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

  const deleteRole = (roleId) => {
    setRoles((prevRoles) =>
      prevRoles
        .filter((role) => role.id !== roleId)
        .map((role) => {
          return role.id > roleId ? { ...role, id: role.id - 1 } : role;
        })
    );
  };

  const changeRoleName = (roleId, newRoleName) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId ? { ...role, name: newRoleName } : role
      )
    );
  };

  const updatePerformedTasks = (roleId, taskId, isChecked) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          let updatedPerformedTasks;

          if (isChecked) {
            updatedPerformedTasks = [...(role.performedTasks || []), taskId];
          } else {
            updatedPerformedTasks = (role.performedTasks || []).filter((id) => id !== taskId);
          }

          return { ...role, performedTasks: updatedPerformedTasks };
        }

        return role;
      })
    );
  };

  const updateAssignedWorkProducts = (roleId, workProductId, isChecked) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          let updatedAssignedWorkProducts;

          if (isChecked) {
            updatedAssignedWorkProducts = [...(role.assignedWorkProducts || []), workProductId];
          } else {
            updatedAssignedWorkProducts = (role.assignedWorkProducts || []).filter((id) => id !== workProductId);
          }

          return { ...role, assignedWorkProducts: updatedAssignedWorkProducts };
        }

        return role;
      })
    );
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

  const updateAreas = (elementId, areaId, isChecked, elementType) => {
    if (elementType === 1) { // activity
      setActivities((prevActivities) =>
        prevActivities.map((activity) => {
          if (activity.id === elementId) {
            let updatedAreas;

            if (isChecked) {
              updatedAreas = [...(activity.areasOfConcern || []), areaId];
            } else {
              updatedAreas = (activity.areasOfConcern || []).filter((id) => id !== areaId);
            }

            return { ...activity, areasOfConcern: updatedAreas };
          }

          return activity;
        })
      );
    } else if (elementType === 2) { // role
      setRolesPattern((prevRoles) =>
        prevRoles.map((role) => {
          if (role.id === elementId) {
            let updatedAreas;

            if (isChecked) {
              updatedAreas = [...(role.areasOfConcern || []), areaId];
            } else {
              updatedAreas = (role.areasOfConcern || []).filter((id) => id !== areaId);
            }

            return { ...role, areasOfConcern: updatedAreas };
          }

          return role;
        })
      );
    } else {
      console.error("elementType unknown");
    }
  };

  const fillRoleAreasFromRelated = () => {
    setRolesPattern((prevRoles) =>
      prevRoles.map((role) => {
        if (!role.areasOfConcern.length) {
          const relatedAreasOfConcern = [];

          console.log(role.performedTasks, "length adalah", role.performedTasks.length)
          if (role.performedTasks.length) {
            console.log('ada performed task')
            activities.forEach((activity) => {
              console.log(activity);
              if (role.performedTasks.includes(activity.id)) {
                relatedAreasOfConcern.push(...activity.areasOfConcern);
                console.log('area of concern yg ditambah dari activity', activity.areasOfConcern)
              }
            });
          }

          if (role.assignedWorkProducts.length) {
            console.log('ada assigned work product')
            const allWorkProducts = tasks.reduce((result, task) => {
              return result.concat(task.workProducts);
            }, []);
            console.log("all work products", allWorkProducts)

            allWorkProducts.forEach((workProduct) => {
              console.log("if",role.assignedWorkProducts, "includes", (workProduct.id))
              if (role.assignedWorkProducts.includes(workProduct.id)) {
                relatedAreasOfConcern.push(...activities.find((activity) => activity.workProducts.find((wp) => wp.id === workProduct.id)).areasOfConcern);
                console.log('area of concern yg ditambah dari product', activities.find((activity) => activity.workProducts.find((wp) => wp.id === workProduct.id)).areasOfConcern)
              }
            });
          }

          console.log("relatedArea", relatedAreasOfConcern)

          const uniqueAreasOfConcern = Array.from(new Set(relatedAreasOfConcern));
          console.log(uniqueAreasOfConcern)

          return { ...role, areasOfConcern: uniqueAreasOfConcern }
        }

        return role;
      })
    );
  };

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
    deleteRole,
    changeRoleName,
    updatePerformedTasks,
    updateAssignedWorkProducts,
    addWorkProductToTask,
    mapTasksToActivities,
    mapRolesToPattern,
    updateAreas,
    fillRoleAreasFromRelated,
  };

  return <MappingContext.Provider value={contextValue}>{children}</MappingContext.Provider>;
};

export { MappingContext, MappingProvider };
