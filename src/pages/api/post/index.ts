import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { methodId, name, creator, description, tasks, roles, subAlphas } = req.body;

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
            description: "No description", //task.description,
            completionCriterions: task.completionCriterions,
            entryCriterions: task.entryCriterions,
            areasOfConcern: { connect: task.areasOfConcern.map((areaId) => ({ id: Number(areaId) })) },
            activitySpaces: {
              connect: task.activitySpaces.map((spaceId) => ({ id: Number(spaceId) }))
            },
            workProducts: {
              create: task.workProducts.map((workProduct) => ({
                nameId: methodId + "-task-" + task.id + "-wp-" + workProduct.id,
                name: workProduct.name,
                description: "No description", //workProduct.description,
                levelOfDetails: [],
                areasOfConcern: { connect: task.areasOfConcern.map((areaId) => ({ id: Number(areaId) })) },
                alphas: { connect: workProduct.alphas.map((alphaId) => ({ id: Number(alphaId) })) },
              })),
            },
          })),
        },
        patterns: {
          create: roles.map((role) => ({
            nameId: methodId + "-role-" + role.id,
            name: role.name,
            description: "No description", //role.description,
            competencies: { connect: role.competencies.map((competencyId) => ({ id: Number(competencyId) })) },
            role: true,
            areasOfConcern: { connect: role.areasOfConcern.map((areaId) => ({ id: Number(areaId) })) },
            performedTasks: { connect: role.performedTasks.map((taskId) => ({ nameId: `${methodId}-task-${taskId}` })) },
            assignedWorkProducts: { connect: role.assignedWorkProducts.map((idTuple) => ({ nameId: `${methodId}-task-${idTuple[0]}-wp-${idTuple[1]}` })) },
          }))
        },
        subAlphas: {
          create: subAlphas.map((subAlpha) => ({
            nameId: subAlpha.id,
            name: subAlpha.name,
            description: subAlpha.description,
            states: {
              create: subAlpha.states.map((state) => ({
                nameId: `${subAlpha.id}.${state.id}`,
                name: state.name,
                description: state.description,
                checklist: state.checklist,
              }))
            },
            workProducts: { connect: subAlpha.workProducts.map((workProductId) => ({ nameId: workProductId })) },
            // workProducts: { connect: subAlpha.workProducts.map((workProductId) => ({ nameId: `${methodId}-task-${task.id}-wp${workProduct.id}` })) },
          }))
        },
        // activitySpaces: { connect: task[0].activitySpaces.map((spaceId) => ({ id: Number(spaceId) })) },
        // alphas: { connect: workProduct[0].alphas.map((alphaId) => ({ id: Number(alphaId) })) },
        // competencies: { connect: role[0].competencies.map((competencyId) => ({ id: Number(competencyId) })) },
      },
    });

    for (const subAlpha of subAlphas) {
      await prisma.alpha.update({
        where: { id: Number(subAlpha.alpha) },
        data: {
          subAlphaIds: {
            push: subAlpha.id,
          },
        },
      });
    }

    res.json(result);
  } catch (error) {
    console.log(error);
  }
}
