import React, { createContext, useState } from 'react';

const MappingContext = createContext();

const MappingProvider = ({ children }) => {
  const [inputExcel, setInputExcel] = useState(false);
  const [methodId, setMethodId] = useState('');
  const [name, setName] = useState('');
  const [creator, setCreator] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [workProducts, setWorkProducts] = useState([]);
  const [roles, setRoles] = useState([]);
  const [subAlphas, setSubAlphas] = useState([]);
  const [patterns, setPatterns] = useState([]);

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

  const changeTaskDescription = (taskId, newTaskDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, description: newTaskDescription } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    const deletedIds = [];
    workProducts.reduce((totalCount, workProduct) => {
      if (workProduct.taskId === taskId) {
        deletedIds.push(workProduct.id);
        return totalCount + 1;
      }
      return totalCount;
    }, 0);

    setTasks((prevTasks) =>
      prevTasks
        .filter((task) => task.id !== taskId)
    );

    setWorkProducts((prevWorkProducts) =>
      prevWorkProducts
        .filter((workProduct) => workProduct.taskId !== taskId)
    );

    setRoles((prevRoles) =>
      prevRoles.map((role) => ({
        ...role,
        performedTasks: role.performedTasks.filter((performedTaskId) => performedTaskId !== taskId),
        assignedWorkProducts: role.assignedWorkProducts.filter((assignedWorkProduct) => deletedIds.includes(assignedWorkProduct)),
      }))
    );

    setPatterns((prevPatterns) =>
      prevPatterns.map((pattern) => ({
        ...pattern,
        activities: pattern.activities.filter((activityId) => activityId !== taskId),
      }))
    );
  };

  const addWorkProduct = (workProduct) => {
    setWorkProducts((prevWorkProducts) =>[...prevWorkProducts, workProduct]);
  };

  const changeWorkProductName = (workProductId, newWorkProductName) => {
    setWorkProducts((prevWorkProducts) =>
      prevWorkProducts.map((workProduct) =>
        workProduct.id === workProductId ? { ...workProduct, name: newWorkProductName } : workProduct
      )
    );
  };

  const changeWorkProductDescription = (workProductId, newWorkProductDescription) => {
    setWorkProducts((prevWorkProducts) =>
      prevWorkProducts.map((workProduct) =>
        workProduct.id === workProductId ? { ...workProduct, description: newWorkProductDescription } : workProduct
      )
    );
  };

  const deleteWorkProduct = (workProductId) => {
    setWorkProducts((prevWorkProducts) =>
      prevWorkProducts
        .filter((workProduct) => workProduct.id !== workProductId)
    );

    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => ({
        ...subAlpha,
        workProducts: subAlpha.workProducts.filter((wpId) => wpId !== workProductId),
      }))
    );

    setRoles((prevRoles) =>
      prevRoles.map((role) => ({
        ...role,
        assignedWorkProducts: role.assignedWorkProducts.filter((assignedWorkProduct) => assignedWorkProduct !== workProductId),
      }))
    );
  };

  const addRole = (role) => {
    setRoles((prevRoles) => [...prevRoles, role]);
  };

  const deleteRole = (roleId) => {
    setRoles((prevRoles) =>
      prevRoles
        .filter((role) => role.id !== roleId)
    );
  };

  const changeRoleName = (roleId, newRoleName) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId ? { ...role, name: newRoleName } : role
      )
    );
  };

  const changeRoleDescription = (roleId, newRoleDescription) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId ? { ...role, description: newRoleDescription } : role
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
            updatedAssignedWorkProducts = [...role.assignedWorkProducts, workProductId];
          } else {
            updatedAssignedWorkProducts = role.assignedWorkProducts.filter((item) => item !== workProductId);
          }

          return { ...role, assignedWorkProducts: updatedAssignedWorkProducts };
        }

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

  const updateAlphas = (workProductId, alphaId, isChecked) => {
    setWorkProducts((prevWorkProducts) =>
      prevWorkProducts.map((workProduct) => {
        if (workProduct.id === workProductId) {
          let updatedSpaces;

          if (isChecked) {
            updatedSpaces = [...(workProduct.alphas || []), alphaId];
          } else {
            updatedSpaces = (workProduct.alphas || []).filter((id) => id !== alphaId);
          }

          return { ...workProduct, alphas: updatedSpaces };
        }

        return workProduct;
      })
    );
  };

  const updateSubAlphas = (workProductId, alphaId, isChecked) => {
    setWorkProducts((prevWorkProducts) =>
      prevWorkProducts.map((workProduct) => {
        if (workProduct.id === workProductId) {
          let updatedSpaces;

          if (isChecked) {
            updatedSpaces = [...(workProduct.subAlphas || []), alphaId];
          } else {
            updatedSpaces = (workProduct.subAlphas || []).filter((id) => id !== alphaId);
          }

          return { ...workProduct, subAlphas: updatedSpaces };
        }

        return workProduct;
      })
    );

    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (isChecked) {
          if (!subAlpha.workProducts.includes(workProductId)) {
            subAlpha.workProducts.push(workProductId);
          }
        } else {
          subAlpha.workProducts = subAlpha.workProducts.filter((id) => id !== workProductId);
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

  const updateCompetencyLevel = (roleId, competencyId, levelName, isChecked) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          let updatedLevels;

          if (isChecked) {
            if (role.competencyLevels.some((competencyLevel) => competencyLevel[0] === competencyId)) {
              updatedLevels = role.competencyLevels.map((competencyLevel) =>
                competencyLevel[0] === competencyId ? [competencyId, levelName] : competencyLevel
              );
            } else {
              updatedLevels = [...role.competencyLevels, [competencyId, levelName]];
            }
          } else {
            updatedLevels = role.competencyLevels.filter((competencyLevel) => competencyLevel[0] !== competencyId);
          }

          return { ...role, competencyLevels: updatedLevels };
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

      setWorkProducts((prevWorkProducts) =>
        prevWorkProducts.map((workProduct) => {
          if (workProduct.taskId === elementId) {
            let updatedAreas;

            if (isChecked) {
              updatedAreas = [...(workProduct.areasOfConcern || []), areaId];
            } else {
              updatedAreas = (workProduct.areasOfConcern || []).filter((id) => id !== areaId);
            }

            return { ...workProduct, areasOfConcern: updatedAreas };
          }

          return workProduct;
        })
      )

      setRoles((prevRoles) =>
        prevRoles.map((role) => {
          if (role.performedTasks.includes(elementId)) {
            if (!role.areasOfConcern.includes(areaId)) {
              role.areasOfConcern.push(areaId);
            }
          }          

          if (role.assignedWorkProducts.some(workProduct => workProduct.taskId === elementId)) {
            if (!role.areasOfConcern.includes(areaId)) {
              role.areasOfConcern.push(areaId);
            }
          }

          return role;
        })
      )
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
    const newAlpha = subAlphas.find((subAlpha) => subAlpha.id === subAlphaId).alpha
    subAlphas
      .filter((subAlpha) => subAlpha.alpha === subAlphaId)
      .forEach((subAlpha) => updateAlphaWithoutStates(subAlpha.id, newAlpha))

    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas
        .filter((subAlpha) => subAlpha.id !== subAlphaId)
    );

    setWorkProducts((prevWorkProducts) =>
      prevWorkProducts.map((workProduct) => ({
        ...workProduct,
        subAlphas: workProduct.subAlphas.filter((subId) => subId !== subAlphaId),
      }))
    );

    setPatterns((prevPatterns) =>
      prevPatterns.map((pattern) => ({
        ...pattern,
        subAlphas: pattern.alphas.filter((subId) => subId !== subAlphaId),
      }))
    );
  };

  const updateAlphaWithoutStates = (subAlphaId, selectedAlphaId) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (subAlpha.id === subAlphaId) {
          return {
            ...subAlpha,
            alpha: selectedAlphaId,
          };
        }

        return subAlpha;
      })
    );
  };

  const updateAlphaOfSubAlpha = (subAlphaId, selectedAlphaId, newStates, areaOfConcernId) => {
    setSubAlphas((prevSubAlphas) =>
      prevSubAlphas.map((subAlpha) => {
        if (subAlpha.id === subAlphaId) {
          return {
            ...subAlpha,
            alpha: selectedAlphaId,
            states: newStates.map((state) => ({...state, alphaId: subAlphaId})),
            areaOfConcernId: areaOfConcernId
          };
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
            // TODO pakai ini di level of details
          }),
        };
      })
    );
  };

  const deleteChecklistItem = (subAlphaId, stateId, index) => {
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
          states: subAlpha.states
            .filter((state) => state.id !== stateId)
        };
      })
    );

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        let updatedEntryAlphaCriterions;
        updatedEntryAlphaCriterions = task.entryCriterions.alphas.filter((entryCriterion) =>
          entryCriterion[0] !== subAlphaId);

        let updatedCompletionAlphaCriterions;
        updatedCompletionAlphaCriterions = task.completionCriterions.alphas.filter((completionCriterion) =>
          completionCriterion[0] !== subAlphaId);

        return {
          ...task,
          entryCriterions: { ...task.entryCriterions, alphas: updatedEntryAlphaCriterions },
          completionCriterions: { ...task.completionCriterions, alphas: updatedCompletionAlphaCriterions },
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
          let updatedAlphaCriterions;

          if (task.entryCriterions.alphas.some((entryCriterion) => entryCriterion[0] === alphaId)) {
            updatedAlphaCriterions = task.entryCriterions.alphas.filter((entryCriterion) => entryCriterion[0] !== alphaId);
          } else {
            updatedAlphaCriterions = [...task.entryCriterions.alphas, [alphaId, stateId]];
          }

          return { ...task, entryCriterions: { ...task.entryCriterions, alphas: updatedAlphaCriterions } };
        }
        return task;
      })
    );
  };

  const updateEntryCriterions = (taskId, alphaId, stateId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          let updatedAlphaCriterions;

          if (task.entryCriterions.alphas.some((entryCriterion) => entryCriterion[0] === alphaId)) {
            updatedAlphaCriterions = task.entryCriterions.alphas.map((entryCriterion) =>
              entryCriterion[0] === alphaId ? [alphaId, stateId] : entryCriterion
            );
          } else {
            updatedAlphaCriterions = [...task.entryCriterions.alphas, [alphaId, stateId]];
          }

          return { ...task, entryCriterions: {...task.entryCriterions, alphas: updatedAlphaCriterions} };
        }
        return task;
      })
    );
  };

  const updateCompletionAlpha = (taskId, alphaId, stateId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          let updatedAlphaCriterions;

          if (task.completionCriterions.alphas.some((completionCriterion) => completionCriterion[0] === alphaId)) {
            updatedAlphaCriterions = task.completionCriterions.alphas.filter((completionCriterion) => completionCriterion[0] !== alphaId);
          } else {
            updatedAlphaCriterions = [...task.completionCriterions.alphas, [alphaId, stateId]];
          }

          return { ...task, completionCriterions: {...task.completionCriterions, alphas: updatedAlphaCriterions} };
        }
        return task;
      })
    );
  };

  const updateCompletionCriterions = (taskId, alphaId, stateId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          let updatedAlphaCriterions;

          if (task.completionCriterions.alphas.some((completionCriterion) => completionCriterion[0] === alphaId)) {
            updatedAlphaCriterions = task.completionCriterions.alphas.map((completionCriterion) =>
              completionCriterion[0] === alphaId ? [alphaId, stateId] : completionCriterion
            );
          } else {
            updatedAlphaCriterions = [...task.completionCriterions.alphas, [alphaId, stateId]];
          }

          return { ...task, completionCriterions: {...task.completionCriterions, alphas: updatedAlphaCriterions} };
        }
        return task;
      })
    );
  };

  const addPattern = (pattern) => {
    setPatterns((prevPatterns) => [...prevPatterns, pattern]);
  };

  const changePatternName = (patternId, newPatternName) => {
    setPatterns((prevPatterns) =>
      prevPatterns.map((pattern) =>
        pattern.id === patternId ? { ...pattern, name: newPatternName } : pattern
      )
    );
  };

  const changePatternDescription = (patternId, newPatternDescription) => {
    setPatterns((prevPatterns) =>
      prevPatterns.map((pattern) =>
        pattern.id === patternId ? { ...pattern, description: newPatternDescription } : pattern
      )
    );
  };

  const deletePattern = (patternId) => {
    setPatterns((prevPatterns) =>
      prevPatterns
        .filter((pattern) => pattern.id !== patternId)
        .map((pattern) => ({
          ...pattern,
          subPatterns: pattern.subPatterns.filter((pattern) => pattern !== patternId),
        }))
    );
  };

  const updatePatternAlphas = (patternId, alphaId, isChecked) => {
    setPatterns((prevPatterns) =>
      prevPatterns.map((pattern) => {
        if (pattern.id === patternId) {
          let updatedAlphas;

          if (isChecked) {
            updatedAlphas = [...(pattern.alphas || []), alphaId];
          } else {
            updatedAlphas = (pattern.alphas || []).filter((id) => id !== alphaId);
          }

          return { ...pattern, alphas: updatedAlphas };
        }

        return pattern;
      })
    );
  };

  const updatePatternActivities = (patternId, activityId, isChecked) => {
    setPatterns((prevPatterns) =>
      prevPatterns.map((pattern) => {
        if (pattern.id === patternId) {
          let updatedActivities;

          if (isChecked) {
            updatedActivities = [...(pattern.activities || []), activityId];
          } else {
            updatedActivities = (pattern.activities || []).filter((id) => id !== activityId);
          }

          return { ...pattern, activities: updatedActivities };
        }

        return pattern;
      })
    );
  };

  const updatePatternCompetencies = (patternId, competencyId, isChecked) => {
    setPatterns((prevPatterns) =>
      prevPatterns.map((pattern) => {
        if (pattern.id === patternId) {
          let updatedCompetencies;

          if (isChecked) {
            updatedCompetencies = [...(pattern.competencies || []), competencyId];
          } else {
            updatedCompetencies = (pattern.competencies || []).filter((id) => id !== competencyId);
          }

          return { ...pattern, competencies: updatedCompetencies };
        }

        return pattern;
      })
    );
  };

  const updatePatternSubPatterns = (patternId, subPatternId, isChecked) => {
    setPatterns((prevPatterns) =>
      prevPatterns.map((pattern) => {
        if (pattern.id === patternId) {
          let updatedSubPatterns;

          if (isChecked) {
            updatedSubPatterns = [...(pattern.subPatterns || []), subPatternId];
          } else {
            updatedSubPatterns = (pattern.subPatterns || []).filter((id) => id !== subPatternId);
          }

          return { ...pattern, subPatterns: updatedSubPatterns };
        }

        return pattern;
      })
    );
  };

  const addLevelOfDetailItem = (workProductId) => {
    setWorkProducts((prevWorkProducts) =>
      prevWorkProducts.map((workProduct) =>
        workProduct.id === workProductId ? {
          ...workProduct,
          levelOfDetails: [...workProduct.levelOfDetails, '']
        } : workProduct
      )
    );
  };

  const changeLevelOfDetailItem = (workProductId, index, newValue) => {
    setWorkProducts((prevWorkProducts) =>
      prevWorkProducts.map((workProduct) =>
        workProduct.id === workProductId ? {
          ...workProduct,
          levelOfDetails: workProduct.levelOfDetails?.map((levelOfDetail, i) =>
            (i === index ? newValue : levelOfDetail)
          )
        } : workProduct
      )
    );
  };

  const deleteLevelOfDetailItem = (workProductId, index) => {
    setWorkProducts((prevWorkProducts) =>
      prevWorkProducts.map((workProduct) =>
        workProduct.id === workProductId ? {
          ...workProduct,
          levelOfDetails: workProduct.levelOfDetails.filter((_, i) => i !== index)
        } : workProduct
      )
    );

    setTasks((prevActivities) =>
      prevActivities.map((activity) => {
        let updatedEntryLevels;
        updatedEntryLevels = activity.entryCriterions.workProducts.filter((entryCriterion) => entryCriterion[0] !== workProductId);

        let updatedCompletionLevels;
        updatedCompletionLevels = activity.completionCriterions.workProducts.filter((completionCriterion) => completionCriterion[0] !== workProductId);

        return {
          ...activity,
          entryCriterions: { ...activity.entryCriterions, workProducts: updatedEntryLevels },
          completionCriterions: { ...activity.completionCriterions, workProducts: updatedCompletionLevels },
        };
      })
    );
  };

  const updateEntryLevel = (activityId, workProductId, levelName, isChecked) => {
    setTasks((prevActivities) =>
      prevActivities.map((activity) => {
        if (activity.id === activityId) {
          let updatedLevels;

          if (isChecked) {
            if (activity.entryCriterions.workProducts.some((entryCriterion) => entryCriterion[0] === workProductId)) {
              updatedLevels = activity.entryCriterions.workProducts.map((entryCriterion) =>
                entryCriterion[0] === workProductId ? [workProductId, levelName] : entryCriterion
              );
            } else {
              updatedLevels = [...activity.entryCriterions.workProducts, [workProductId, levelName]];
            }
          } else {
            updatedLevels = activity.entryCriterions.workProducts.filter((entryCriterion) => entryCriterion[0] !== workProductId);
          }

          return { ...activity, entryCriterions: { ...activity.entryCriterions, workProducts: updatedLevels } };
        }
        return activity;
      })
    );
  };

  const updateCompletionLevel = (activityId, workProductId, levelName, isChecked) => {
    setTasks((prevActivities) =>
      prevActivities.map((activity) => {
        if (activity.id === activityId) {
          let updatedLevels;

          if (isChecked) {
            if (activity.completionCriterions.workProducts.some((completionCriterion) => completionCriterion[0] === workProductId)) {
              updatedLevels = activity.completionCriterions.workProducts.map((completionCriterion) =>
                completionCriterion[0] === workProductId ? [workProductId, levelName] : completionCriterion
              );
            } else {
              updatedLevels = [...activity.completionCriterions.workProducts, [workProductId, levelName]];
            }
          } else {
            updatedLevels = activity.completionCriterions.workProducts.filter((completionCriterion) => completionCriterion[0] !== workProductId);
          }

          return { ...activity, completionCriterions: { ...activity.completionCriterions, workProducts: updatedLevels } };
        }
        return activity;
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
    workProducts,
    setWorkProducts,
    roles,
    setRoles,
    addTask,
    changeTaskName,
    changeTaskDescription,
    deleteTask,
    changeWorkProductName,
    changeWorkProductDescription,
    deleteWorkProduct,
    addRole,
    deleteRole,
    changeRoleName,
    changeRoleDescription,
    updatePerformedTasks,
    updateAssignedWorkProducts,
    addWorkProduct,
    updateAreas,
    updateActivitySpaces,
    updateAlphas,
    updateSubAlphas,
    updateCompetencies,
    updateCompetencyLevel,
    patterns,
    setPatterns,
    addPattern,
    changePatternName,
    changePatternDescription,
    deletePattern,
    updatePatternAlphas,
    updatePatternActivities,
    updatePatternCompetencies,
    updatePatternSubPatterns,
    addLevelOfDetailItem,
    changeLevelOfDetailItem,
    deleteLevelOfDetailItem,
    updateEntryLevel,
    updateCompletionLevel,
    inputExcel,
    setInputExcel,
  };

  return <MappingContext.Provider value={contextValue}>{children}</MappingContext.Provider>;
};

export { MappingContext, MappingProvider };
