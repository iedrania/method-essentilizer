import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { methodId, name, description, activities, rolesPattern } = req.body;

  try {
    const result = await prisma.method.create({
      data: {
        id: methodId,
        name: name,
        description: description,
        tasks: {
          create: activities.map((task) => ({
            id: task.id,
            name: task.name,
            areasOfConcern: { connect: task.areasOfConcern.map((areaId) => ({ id: Number(areaId) })) },
            activitySpaces: {
              connect: task.activitySpaces.map((spaceId) => ({ id: Number(spaceId) }))
            },
            workProducts: {
              create: task.workProducts.map((workProduct) => ({
                id: workProduct.id,
                name: workProduct.name,
                areasOfConcern: { connect: task.areasOfConcern.map((areaId) => ({ id: Number(areaId) })) },
                alphas: { connect: workProduct.alphas.map((alphaId) => ({ id: Number(alphaId) })) },
              })),
            },
          })),
        },
        roles: {
          create: rolesPattern.map((role) => ({
            id: methodId + "-role-" + role.id,
            name: role.name,
            areasOfConcern: { connect: role.areasOfConcern.map((areaId) => ({ id: Number(areaId) })) },
            competencies: { connect: role.competencies.map((competencyId) => ({ id: Number(competencyId) })) },
            performedTasks: { connect: role.performedTasks.map((taskId) => ({ id: taskId })) },
            assignedWorkProducts: { connect: role.assignedWorkProducts.map((wpId) => ({ id: wpId })) },
          }))
        },
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error)
  }
}
