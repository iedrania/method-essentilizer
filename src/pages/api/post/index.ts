import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { methodId, name, creator, description, tasks, roles, subAlphas, patterns } = req.body;

  try {
    const result = await prisma.method.create({
      data: {
        id: methodId,
        name: name,
        creator: creator,
        description: description,
        activities: {
          create: tasks.map((task) => ({
            nameId: methodId + "-task-" + task.id,
            name: task.name,
            description: task.description || "No description",
            completionCriterions: task.completionCriterions,
            entryCriterions: task.entryCriterions,
            areasOfConcern: { connect: task.areasOfConcern.map((areaId) => ({ id: areaId })) },
            activitySpaces: { connect: task.activitySpaces.map((spaceId) => ({ id: spaceId })) },
            workProducts: {
              create: task.workProducts.map((workProduct) => ({
                nameId: methodId + "-task-" + task.id + "-wp-" + workProduct.id,
                name: workProduct.name,
                description: workProduct.description || "No description",
                levelOfDetails: workProduct.levelOfDetails,
                areasOfConcern: { connect: task.areasOfConcern.map((areaId) => ({ id: areaId })) },
                alphas: { connect: workProduct.alphas.map((alphaId) => ({ id: alphaId })) },
              })),
            },
          })),
        },
        roles: {
          create: roles.map((role) => ({
            nameId: methodId + "-role-" + role.id,
            name: role.name,
            description: role.description || "No description",
            competencies: { connect: role.competencies.map((competencyId) => ({ id: competencyId })) },
            areasOfConcern: { connect: role.areasOfConcern.map((areaId) => ({ id: areaId })) },
            performedTasks: { connect: role.performedTasks.map((taskId) => ({ nameId: `${methodId}-task-${taskId}` })) },
            assignedWorkProducts: { connect: role.assignedWorkProducts.map((idTuple) => ({ nameId: `${methodId}-task-${idTuple[0]}-wp-${idTuple[1]}` })) },
          }))
        },
        patterns: {
          create: patterns.map((pattern) => ({
            nameId: methodId + "-pattern-" + pattern.id,
            name: pattern.name,
            description: pattern.description || "No description",
            subPatternIds: pattern.subPatterns,
            competencies: { connect: pattern.competencies.map((competencyId) => ({ id: competencyId })) },
            activities: { connect: pattern.activities.map((activityId) => ({ nameId: methodId + "-task-" + activityId })) },
            alphas: { connect: pattern.alphas.map((alphaId) => ({ id: alphaId })) },
          }))
        },
        subAlphas: {
          create: subAlphas.map((subAlpha) => ({
            nameId: methodId + "-sub-" + subAlpha.id,
            name: subAlpha.name,
            description: subAlpha.description || "No description",
            states: {
              create: subAlpha.states.map((state) => ({
                nameId: methodId + "-sub-" + subAlpha.id + "-state-" + state.id,
                name: state.name,
                description: state.description,
                checklist: state.checklist,
              }))
            },
          }))
        },
      },
    });

    for (const subAlpha of subAlphas) {
      await prisma.alpha.update({
        where: { id: subAlpha.alpha },
        data: {
          subAlphaIds: {
            push: methodId + "-sub-" + subAlpha.id,
          },
        },
      });
    }

    res.json(result);
  } catch (error) {
    console.log(error);
  }
}
