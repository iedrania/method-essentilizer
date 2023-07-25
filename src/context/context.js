import React, { createContext, useState } from 'react';

const MappingContext = createContext();

const MappingProvider = ({ children }) => {
  const [methodId, setMethodId] = useState(-1);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [roles, setRoles] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const changeTaskName = (taskId, newTaskName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, name: newTaskName } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks
        .filter((task) => task.id !== taskId)
        .map((task) => {
          return task.id > taskId ? { ...task, id: task.id - 1 } : task;
        })
    );
    console.log(tasks)
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

  const changeWorkProductName = (taskId, workProductId, newWorkProductName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedWorkProducts = task.workProducts.map((workProduct) => {
            if (workProduct.id === workProductId) {
              return { ...workProduct, name: newWorkProductName };
            }
            return workProduct;
          });
          return { ...task, workProducts: updatedWorkProducts };
        }
        return task;
      })
    );
  };

  const deleteWorkProduct = (taskId, workProductId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedWorkProducts = task.workProducts
            .filter((workProduct) => workProduct.id !== workProductId)
            .map((workProduct) => {
              return workProduct.id > workProductId ? { ...workProduct, id: workProduct.id - 1 } : workProduct;
            });
          return { ...task, workProducts: updatedWorkProducts };
        }
        return task;
      })
    );
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

  const updateAssignedWorkProducts = (roleId, taskId, workProductId, isChecked) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          let updatedAssignedWorkProducts;

          if (isChecked) {
            updatedAssignedWorkProducts = [...role.assignedWorkProducts, [taskId, workProductId]];
          } else {
            updatedAssignedWorkProducts = role.assignedWorkProducts.filter((item) => item[0] !== taskId || item[1] !== workProductId);
          }
  
          return { ...role, assignedWorkProducts: updatedAssignedWorkProducts };
        }
        console.log(roles)

        return role;
      })
    );
  };  

  const updateActivitySpaces = (activityId, activitySpaceId, isChecked) => {
    setTasks((prevActivities) =>
      prevActivities.map((activity) => {
        if (activity.id === activityId) {
          let updatedSpaces;

          if (isChecked) {
            updatedSpaces = [...(activity.activitySpaces || []), activitySpaceId];
          } else {
            updatedSpaces = (activity.activitySpaces || []).filter((id) => id !== activitySpaceId);
          }

          return { ...activity, activitySpaces: updatedSpaces };
        }

        return activity;
      })
    );
  };

  const updateAlphas = (activityId, workProductId, alphaId, isChecked) => {
    setTasks((prevActivities) =>
      prevActivities.map((activity) => {
        if (activity.id === activityId) {
          const updatedWorkProducts = activity.workProducts.map((workProduct) => {
            if (workProduct.id === workProductId) {
              let updatedAlphas;
  
              if (isChecked) {
                updatedAlphas = [...(workProduct.alphas || []), alphaId];
              } else {
                updatedAlphas = (workProduct.alphas || []).filter((id) => id !== alphaId);
              }
  
              return { ...workProduct, alphas: updatedAlphas };
            }
  
            return workProduct;
          });
  
          return { ...activity, workProducts: updatedWorkProducts };
        }
  
        return activity;
      })
    );
  };

  const updateCompetencies = (roleId, competencyId, isChecked) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          let updatedCompetencies;

          if (isChecked) {
            updatedCompetencies = [...(role.competencies || []), competencyId];
          } else {
            updatedCompetencies = (role.competencies || []).filter((id) => id !== competencyId);
          }

          return { ...role, competencies: updatedCompetencies };
        }

        return role;
      })
    );
  };

  const updateAreas = (elementId, areaId, isChecked, elementType) => {
    if (elementType === 1) { // activity
      setTasks((prevActivities) =>
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
      setRoles((prevRoles) =>
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
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (!role.areasOfConcern.length) {
          const relatedAreasOfConcern = [];

          console.log(role.performedTasks, "length adalah", role.performedTasks.length)
          if (role.performedTasks.length) {
            console.log('ada performed task')
            tasks.forEach((activity) => {
              console.log(activity);
              if (role.performedTasks.includes(String(activity.id))) {
                relatedAreasOfConcern.push(...activity.areasOfConcern);
                console.log('area of concern yg ditambah dari activity', activity.areasOfConcern)
              }
            });
          }

          if (role.assignedWorkProducts.length) {
            role.assignedWorkProducts.forEach((idTuple) => {
              const task = tasks.find((item) => item.id == idTuple[0]);
              relatedAreasOfConcern.push(...task.areasOfConcern)
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
    author,
    setAuthor,
    description,
    setDescription,
    tasks,
    setTasks,
    roles,
    setRoles,
    addTask,
    changeTaskName,
    deleteTask,
    changeWorkProductName,
    deleteWorkProduct,
    addRole,
    deleteRole,
    changeRoleName,
    updatePerformedTasks,
    updateAssignedWorkProducts,
    addWorkProductToTask,
    updateAreas,
    updateActivitySpaces,
    updateAlphas,
    updateCompetencies,
    fillRoleAreasFromRelated,
  };

  return <MappingContext.Provider value={contextValue}>{children}</MappingContext.Provider>;
};

export { MappingContext, MappingProvider };
