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
            activitySpaces: {
              connect: task.activitySpaces.map((spaceId) => ({ id: Number(spaceId) }))
            },
            workProducts: {
              create: task.workProducts.map((workProduct) => ({
                id: workProduct.id,
                name: workProduct.name,
                alphas: { connect: workProduct.alphas.map((alphaId) => ({ id: Number(alphaId) })) },
                // assignRoles: [], // TODO P1 sudah ada di db, gaada di workProduct
              })),
            },
            // performRoles: [], // TODO P1 sudah ada di db, gaada di task
            // TODO P1.5 add task.areasOfConcern sudah ada di task, gaada di db
          })),
        },
        roles: {
          create: rolesPattern.map((role) => ({
            id: methodId + "-role-" + role.id,
            name: role.name,
            competencies: { connect: role.competencies.map((competencyId) => ({ id: Number(competencyId) })) },
            // performTasks: [], // { connect: role.performTasks.map((taskId) => ({ id: Number(taskId) })) }, // TODO P1 ada di db, gaada di roles
            // assignWorkProducts: [], // { connect: role.performTasks.map((taskId) => ({ id: Number(taskId) })) }, // TODO P1 ada di db, gaada di roles
            // TODO P1.5 add role.areasOfConcern sudah ada di roles, gaada di db
          }))
        },
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error)
  }
}
