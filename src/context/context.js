import React, { createContext, useState } from 'react';

const MappingContext = createContext();

const MappingProvider = ({ children }) => {
  const [methodId, setMethodId] = useState(-1);
  const [name, setName] = useState('');
  const [creator, setCreator] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [roles, setRoles] = useState([]);
  const [subAlphas, setSubAlphas] = useState([]);

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

  const updateSubAlphas = (activityId, workProductId, alphaId, isChecked) => {
    setTasks((prevActivities) =>
      prevActivities.map((activity) => {
        if (activity.id === activityId) {
          const updatedWorkProducts = activity.workProducts.map((workProduct) => {
            if (workProduct.id === workProductId) {
              let updatedAlphas;
  
              if (isChecked) {
                updatedAlphas = [...(workProduct.subAlphas || []), alphaId];
              } else {
                updatedAlphas = (workProduct.subAlphas || []).filter((id) => id !== alphaId);
              }
  
              return { ...workProduct, subAlphas: updatedAlphas };
            }
  
            return workProduct;
          });
  
          return { ...activity, workProducts: updatedWorkProducts };
        }
  
        return activity;
      })
    );

    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        const itemId = `${methodId}-task-${activityId}-wp-${workProductId}`
        if (isChecked) {
          if (!subAlpha.workProducts.includes(itemId)) {
            subAlpha.workProducts.push(itemId);
          }
        } else {
          subAlpha.workProducts = subAlpha.workProducts.filter((id) => id !== itemId);
        }

        return subAlpha;
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

  const addSubAlpha = (subAlpha) => {
    setSubAlphas((prevSubAlphas) => [...prevSubAlphas, subAlpha]);
  };

  const changeSubAlphaName = (subAlphaId, newSubAlphaName) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) =>
        subAlpha.id === subAlphaId ? { ...subAlpha, name: newSubAlphaName } : subAlpha
      )
    );
  };

  const changeSubAlphaDescription = (subAlphaId, newSubAlphaDescription) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) =>
        subAlpha.id === subAlphaId ? { ...subAlpha, description: newSubAlphaDescription } : subAlpha
      )
    );
  };

  const deleteSubAlpha = (subAlphaId) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas
        .filter((subAlpha) => subAlpha.id !== subAlphaId)
        .map((subAlpha) => {
          return subAlpha.id > subAlphaId ? { ...subAlpha, id: subAlpha.id - 1 } : subAlpha;
        })
    );
  };

  const updateAlphaOfSubAlpha = (subAlphaId, selectedAlphaId, newStates) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (subAlpha.id === subAlphaId) {
          return { ...subAlpha, alpha: selectedAlphaId, states: newStates };
        }

        return subAlpha;
      })
    );
  };

  const addState = (subAlphaId, newStateData) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (subAlpha.id !== subAlphaId) return subAlpha;

        return {
          ...subAlpha,
          states: [...subAlpha.states, ...newStateData],
        };
      })
    );
  };

  const changeChecklistItem = (subAlphaId, stateId, index, newValue) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (subAlpha.id !== subAlphaId) return subAlpha;

        return {
          ...subAlpha,
          states: subAlpha.states.map((state) => {
            if (state.id !== stateId) return state;

            return {
              ...state,
              checklist: state.checklist?.map((checklist, i) => (i === index ? newValue : checklist)),
            };
          }),
        };
      })
    );
  };

  const deleteChecklistItem = (subAlphaId, stateId, index) => {
    console.log(subAlphas)
    console.log(subAlphaId, stateId, index)
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (subAlpha.id !== subAlphaId) return subAlpha;

        return {
          ...subAlpha,
          states: subAlpha.states.map((state) => {
            if (state.id !== stateId) return state;

            return {
              ...state,
              checklist: state.checklist.filter((_, i) => i !== index),
            };
          }),
        };
      })
    );
  };

  const changeStateName = (subAlphaId, stateId, newName) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (subAlpha.id !== subAlphaId) return subAlpha;

        return {
          ...subAlpha,
          states: subAlpha.states.map((state) => {
            if (state.id !== stateId) return state;

            return {
              ...state,
              name: newName,
            };
          }),
        };
      })
    );
  };

  const changeStateDescription = (subAlphaId, stateId, newDescription) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (subAlpha.id !== subAlphaId) return subAlpha;

        return {
          ...subAlpha,
          states: subAlpha.states.map((state) => {
            if (state.id !== stateId) return state;

            return {
              ...state,
              description: newDescription,
            };
          }),
        };
      })
    );
  };

  const deleteState = (subAlphaId, stateId) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (subAlpha.id !== subAlphaId) return subAlpha;

        return {
          ...subAlpha,
          states: subAlpha.states.filter((state) => state.id !== stateId),
        };
      })
    );
  };
  
  const addChecklistItem = (subAlphaId, stateId) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (subAlpha.id !== subAlphaId) return subAlpha;

        return {
          ...subAlpha,
          states: subAlpha.states.map((state) => {
            if (state.id !== stateId) return state;

            return {
              ...state,
              checklist: [...state.checklist, ''],
            };
          }),
        };
      })
    );
  };

  const updateEntryAlpha = (taskId, alphaId, stateId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          let updatedCriterions;

          if (task.entryCriterions.some((entryCriterion) => entryCriterion.startsWith(`${alphaId}.`))) {
            updatedCriterions = task.entryCriterions.filter((entryCriterion) => !entryCriterion.startsWith(`${alphaId}.`));
          } else {
            updatedCriterions = [...task.entryCriterions, `${alphaId}.${stateId}`];
          }

          console.log(updatedCriterions);
          return { ...task, entryCriterions: updatedCriterions };
        }
        return task;
      })
    );
  };

  const updateEntryCriterions = (taskId, alphaId, stateId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          let updatedCriterions;

          if (task.entryCriterions.some((entryCriterion) => entryCriterion.startsWith(`${alphaId}.`))) {
            updatedCriterions = task.entryCriterions.map((entryCriterion) =>
              entryCriterion.startsWith(`${alphaId}.`) ? `${alphaId}.${stateId}` : entryCriterion
            );
          } else {
            updatedCriterions = [...task.entryCriterions, `${alphaId}.${stateId}`];
          }

          console.log(updatedCriterions);
          return { ...task, entryCriterions: updatedCriterions };
        }
        return task;
      })
    );
  };

  const updateCompletionAlpha = (taskId, alphaId, stateId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          let updatedCriterions;

          if (task.completionCriterions.some((completionCriterion) => completionCriterion.startsWith(`${alphaId}.`))) {
            updatedCriterions = task.completionCriterions.filter((completionCriterion) => !completionCriterion.startsWith(`${alphaId}.`));
          } else {
            updatedCriterions = [...task.completionCriterions, `${alphaId}.${stateId}`];
          }

          console.log(updatedCriterions);
          return { ...task, completionCriterions: updatedCriterions };
        }
        return task;
      })
    );
  };

  const updateCompletionCriterions = (taskId, alphaId, stateId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          let updatedCriterions;

          if (task.completionCriterions.some((completionCriterion) => completionCriterion.startsWith(`${alphaId}.`))) {
            updatedCriterions = task.completionCriterions.map((completionCriterion) =>
              completionCriterion.startsWith(`${alphaId}.`) ? `${alphaId}.${stateId}` : completionCriterion
            );
          } else {
            updatedCriterions = [...task.completionCriterions, `${alphaId}.${stateId}`];
          }

          console.log(updatedCriterions);
          return { ...task, completionCriterions: updatedCriterions };
        }
        return task;
      })
    );
  };

  const contextValue = {
    methodId,
    setMethodId,
    name,
    setName,
    creator,
    setCreator,
    description,
    setDescription,
    subAlphas,
    setSubAlphas,
    addSubAlpha,
    changeSubAlphaName,
    changeSubAlphaDescription,
    deleteSubAlpha,
    updateAlphaOfSubAlpha,
    addState,
    changeChecklistItem,
    deleteChecklistItem,
    changeStateName,
    changeStateDescription,
    deleteState,
    addChecklistItem,
    updateEntryAlpha,
    updateEntryCriterions,
    updateCompletionAlpha,
    updateCompletionCriterions,
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
    updateSubAlphas,
    updateCompetencies,
    fillRoleAreasFromRelated,
  };

  return <MappingContext.Provider value={contextValue}>{children}</MappingContext.Provider>;
};

export { MappingContext, MappingProvider };
