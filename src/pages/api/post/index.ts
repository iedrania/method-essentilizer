import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { methodId, name, description, tasks, roles } = req.body;

  try {
    const result = await prisma.method.create({
      data: {
        id: methodId,
        name: name,
        description: description,
        tasks: {
          create: tasks.map((task) => ({
            id: methodId + "-task-" + task.id,
            name: task.name,
            areasOfConcern: { connect: task.areasOfConcern.map((areaId) => ({ id: Number(areaId) })) },
            activitySpaces: {
              connect: task.activitySpaces.map((spaceId) => ({ id: Number(spaceId) }))
            },
            workProducts: {
              create: task.workProducts.map((workProduct) => ({
                id: methodId + "-task-" + task.id + "-wp-" + workProduct.id,
                name: workProduct.name,
                areasOfConcern: { connect: task.areasOfConcern.map((areaId) => ({ id: Number(areaId) })) },
                alphas: { connect: workProduct.alphas.map((alphaId) => ({ id: Number(alphaId) })) },
              })),
            },
          })),
        },
        roles: {
          create: roles.map((role) => ({
            id: methodId + "-role-" + role.id,
            name: role.name,
            areasOfConcern: { connect: role.areasOfConcern.map((areaId) => ({ id: Number(areaId) })) },
            competencies: { connect: role.competencies.map((competencyId) => ({ id: Number(competencyId) })) },
            performedTasks: { connect: role.performedTasks.map((taskId) => ({ id: `${methodId}-task-${taskId}` })) },
            assignedWorkProducts: { connect: role.assignedWorkProducts.map((idTuple) => ({ id: `${methodId}-task-${idTuple[0]}-wp-${idTuple[1]}` })) },
          }))
        },
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
  }
}
