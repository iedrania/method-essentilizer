export function downloadEssenceJson(filename, methodId, title, creator, description, tasks, roles, subAlphas, patterns, essSpaces, essAlphas, essCompetencies) {
  function getCompetenciesForRolesWithTaskId(roles, taskId) {
    const rolesWithTaskId = roles
      .filter((role) => role.performedTasks.includes(taskId.toString()));

    console.log(`roles for for task ${taskId}`, rolesWithTaskId)
    const competencies = rolesWithTaskId
      .flatMap((role) => role.competencyLevels);

    return competencies;
  }

  function groupActivitiesByActivitySpaces(tasks) {
    const groupedActivities = tasks.reduce((result, task) => {
      task.activitySpaces.forEach((spaceId) => {
        const activity = {
          nameId: methodId + "-task-" + task.id,
          name: task.name,
          description: task.description || "No description",
          completionCriterions: task.completionCriterions,
          entryCriterions: task.entryCriterions,
          competencies: getCompetenciesForRolesWithTaskId(roles, task.id)
        };

        if (!result[spaceId]) {
          result[spaceId] = {
            nameId: spaceId,
            name: essSpaces.find((space) => space.id == spaceId)?.name || "Activity Space Name Error",
            description: essSpaces.find((space) => space.id == spaceId)?.description || "No description", // TODO P1 add in db
            activities: [activity],
          };
        } else {
          result[spaceId].activities.push(activity);
        }
      });

      return result;
    }, {});

    const activitySpaces = Object.values(groupedActivities);

    return activitySpaces;
  };

  function getSubAlphaIdsByAlphaId(alphaId) {
    const subAlphaIds = subAlphas
      .filter((subAlpha) => subAlpha.alpha === alphaId)
      .map((subAlpha) => subAlpha.id);

    return subAlphaIds;
  }

  function restructureStates(states) {
    return states.map((state) => ({
      nameId: state.id,
      name: state.name,
      description: state.description,
      checklists: state.checklist,
    }));
  }

  function groupWorkProductsByAlphas(tasks, subAlphas) {
    const groupedWorkProducts = tasks.reduce((result, task) => {
      task.workProducts.forEach((workProduct) => {
        workProduct.alphas.forEach((alphaId) => {
          const wp = {
            nameId: methodId + "-task-" + task.id + "-wp-" + workProduct.id,
            name: workProduct.name,
            description: workProduct.description || "No description",
            levelOfDetails: [],
          };

          if (!result[alphaId]) {
            result[alphaId] = {
              nameId: alphaId,
              name: essAlphas.find((alpha) => alpha.id == alphaId)?.name || "Alpha Name Error",
              description: essAlphas.find((alpha) => alpha.id == alphaId)?.description || "No description", // TODO P1 add in db
              workProducts: [wp],
              states: restructureStates(essAlphas.find((alpha) => alpha.id == alphaId)?.states || []),
              subalphaIds: getSubAlphaIdsByAlphaId(alphaId),
            };
          } else {
            result[alphaId].workProducts.push(wp);
          }
        });
      });

      subAlphas.forEach((subAlpha) => {
        if (!result[subAlpha.alpha]) {
          result[subAlpha.alpha] = {
            nameId: subAlpha.alpha,
            name: essAlphas.find((alpha) => alpha.id == subAlpha.alpha)?.name || "Alpha Name Error",
            description: essAlphas.find((alpha) => alpha.id == subAlpha.alpha)?.description || "No description",
            workProducts: [],
            states: restructureStates(essAlphas.find((alpha) => alpha.id == subAlpha.alpha)?.states || []),
            subalphaIds: getSubAlphaIdsByAlphaId(subAlpha.alpha),
          };
        }
      });

      return result;
    }, {});

    const alphas = Object.values(groupedWorkProducts);

    return alphas;
  }

  function findWorkProductsById(tasks, workProductIds) {
    const result = tasks
      .flatMap((task) =>
        task.workProducts
          .filter((workProduct) => workProductIds.includes(methodId + "-task-" + task.id + "-wp-" + workProduct.id))
          .map((workProduct) => ({
            nameId: methodId + "-task-" + task.id + "-wp-" + workProduct.id,
            name: workProduct.name,
            description: workProduct.description || "No description",
            levelOfDetails: [],
          }))
      );
  
    return result;
  }

  function restructureSubAlphas(subAlphas) {
    return subAlphas.map((subAlpha) => ({
      nameId: subAlpha.id,
      name: subAlpha.name,
      description: subAlpha.description,
      workProducts: findWorkProductsById(tasks, subAlpha.workProducts),
      states: restructureStates(subAlpha.states),
      subalphaIds: [],
    }));
  }

  function combineAlphasWithSubAlphas(tasks, subAlphas) {
    const alphas = groupWorkProductsByAlphas(tasks, subAlphas);
    const restructuredSubAlphas = restructureSubAlphas(subAlphas);

    return [...alphas, ...restructuredSubAlphas];
  }

  function groupCompetenciesByRoles(roles) {
    const groupedCompetencies = roles.reduce((result, role) => {
      role.competencies.forEach((competencyId) => {
        if (!result[competencyId]) {
          result[competencyId] = {
            nameId: competencyId,
            name: essCompetencies.find((competency) => competency.id == competencyId)?.name || "Competency Name Error",
            description: essCompetencies.find((competency) => competency.id == competencyId)?.description || "No description", // TODO P1 add in db
            levels: essCompetencies.find((competency) => competency.id == competencyId)?.levels || [],
          };
        }
      });

      return result;
    }, {});

    const rolesWithGroupedCompetencies = Object.values(groupedCompetencies);

    return rolesWithGroupedCompetencies;
  }

  function createRolesPattern(roles) {
    const rolesPattern = {
      nameId: "roles",
      name: "Roles",
      description: `${title} Roles`,
      activities: [],
      alphas: [],
      competencies: [],
      subpatternIds: roles.map((role) => `role-${role.id}`),
    };
  
    return rolesPattern;
  }

  function createRolePattern(role) {
    const rolePattern = {
      nameId: `role-${role.id}`,
      name: role.name,
      description: role.description || "No description",
      activities: [],
      alphas: [],
      competencies: role.competencies || [],
      subpatternIds: [],
    };

    return rolePattern;
  }

  function restructurePatterns(patterns) {
    return patterns.map((pattern) => ({
      nameId: `pattern-${pattern.id}`,
      name: pattern.name,
      description: pattern.description,
      activities: pattern.activities,
      alphas: pattern.alphas,
      competencies: pattern.competencies,
      subpatternIds: pattern.subPatterns,
    }));
  }

  function combinePatternsWithRoles(patterns, roles) {
    const rolesPattern = createRolesPattern(roles);
    const rolePatterns = roles.map(createRolePattern);
    const restructuredPatterns = restructurePatterns(patterns);

    return [rolesPattern, ...rolePatterns, ...restructuredPatterns];
  }

  const data = {
    nameId: methodId.toString(),
    name: title,
    creator: creator,
    characteristics: [],
    description: description,
    activitySpaces: groupActivitiesByActivitySpaces(tasks),
    alphas: combineAlphasWithSubAlphas(tasks, subAlphas),
    competencies: groupCompetenciesByRoles(roles),
    patterns: combinePatternsWithRoles(patterns, roles),
  };

  const jsonString = JSON.stringify(data, null, 2);
  const file = new Blob([jsonString], { type: 'application/json' });
  const fileUrl = URL.createObjectURL(file);

  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = `${filename}.json`;
  link.click();
}
