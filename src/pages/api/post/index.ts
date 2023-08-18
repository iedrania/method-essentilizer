import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { methodId, name, creator, description, tasks, workProducts, roles, subAlphas, patterns } = req.body;

  try {
    const result = await prisma.method.create({
      data: {
        nameId: methodId,
        name: name,
        creator: creator,
        description: description,
        activities: {
          create: tasks.map((task) => ({
            nameId: methodId + "Activity" + task.id,
            name: task.name,
            description: task.description || "No description",
            completionCriterions: {
              alphas: task.completionCriterions.alphas.map((criterion) => {
                return `${Number(criterion[0]) ? (methodId + "Sub" + criterion[0]) : criterion[0]}.${Number(criterion[1]) ? (methodId + "Sub" + criterion[0] + "State" + criterion[1]) : criterion[1]}`;
              }),
              workProducts: task.completionCriterions.workProducts.map((criterion) => {
                return `${methodId}WP${criterion[0]}.${criterion[1]}`;
              }),
            },
            entryCriterions: {
              alphas: task.entryCriterions.alphas.map((criterion) => {
                return `${Number(criterion[0]) ? (methodId + "Sub" + criterion[0]) : criterion[0]}.${Number(criterion[1]) ? (methodId + "Sub" + criterion[0] + "State" + criterion[1]) : criterion[1]}`;
              }),
              workProducts: task.entryCriterions.workProducts.map((criterion) => {
                return `${methodId}WP${criterion[0]}.${criterion[1]}`;
              }),
            },
            areasOfConcern: { connect: task.areasOfConcern.map((areaId) => ({ id: areaId })) },
            activitySpaces: { connect: task.activitySpaces.map((spaceId) => ({ id: spaceId })) },
            workProducts: {
              create: workProducts
                .filter((workProduct) => workProduct.taskId === task.id)
                .map((workProduct) => ({
                  nameId: methodId + "WP" + workProduct.id,
                  name: workProduct.name,
                  description: workProduct.description || "No description",
                  levelOfDetails: workProduct.levelOfDetails,
                  areasOfConcern: { connect: workProduct.areasOfConcern.map((areaId) => ({ id: areaId })) },
                  alphas: { connect: workProduct.alphas.map((alphaId) => ({ id: alphaId })) },
                })),
            },
          })),
        },
        roles: {
          create: roles.map((role) => ({
            nameId: methodId + "Role" + role.id,
            name: role.name,
            description: role.description || "No description",
            competencies: { connect: role.competencies.map((competencyId) => ({ id: competencyId })) },
            areasOfConcern: { connect: role.areasOfConcern.map((areaId) => ({ id: areaId })) },
            performedTasks: { connect: role.performedTasks.map((taskId) => ({ nameId: `${methodId}Activity${taskId}` })) },
            assignedWorkProducts: { connect: role.assignedWorkProducts.map((id) => ({ nameId: `${methodId}WP${id}` })) },
          }))
        },
        patterns: {
          create: patterns.map((pattern) => ({
            nameId: methodId + "Pattern" + pattern.id,
            name: pattern.name,
            description: pattern.description || "No description",
            subPatternIds: pattern.subPatterns,
            competencies: { connect: pattern.competencies.map((competencyId) => ({ id: competencyId })) },
            activities: { connect: pattern.activities.map((activityId) => ({ nameId: methodId + "Activity" + activityId })) },
            alphas: { connect: pattern.alphas.map((alphaId) => ({ id: alphaId })) },
          }))
        },
        subAlphas: {
          create: subAlphas.map((subAlpha) => ({
            nameId: methodId + "Sub" + subAlpha.id,
            name: subAlpha.name,
            description: subAlpha.description || "No description",
            states: {
              create: subAlpha.states.map((state) => ({
                nameId: methodId + "Sub" + subAlpha.id + "State" + state.id,
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
