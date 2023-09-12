import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { methodId, name, creator, description, tasks, workProducts, roles, subAlphas, patterns } = req.body;

  try {
    const allPatterns = [
      ...patterns.map((pattern) => ({
        id: pattern.id,
        name: pattern.name,
        description: pattern.description || "No description",
        role: false,
        subPatterns: pattern.subPatterns,
        competencies: pattern.competencies,
        activities: pattern.activities,
        alphas: pattern.alphas.filter((alphaId) => alphaId.length < 20),
        assignedWorkProducts: [],
        areasOfConcern: [],
        subAlphas: pattern.alphas.filter((alphaId) => alphaId.length >= 20),
      })),
      {
        id: methodId + "PatternRoles",
        name: `${name} Roles`,
        description: `${name} Roles`,
        role: false,
        subPatterns: roles.map((role) => role.id),
        competencies: [],
        activities: [],
        alphas: [],
        assignedWorkProducts: [],
        areasOfConcern: [],
        subAlphas: [],
      },
      ...roles.map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description || "No description",
        role: true,
        subPatterns: [],
        competencies: role.competencies,
        activities: role.performedTasks,
        alphas: [],
        assignedWorkProducts: role.assignedWorkProducts,
        areasOfConcern: role.areasOfConcern,
        subAlphas: [],
      })),
    ];

    const result = await prisma.method.create({
      data: {
        nameId: methodId,
        name: name,
        creator: creator,
        description: description,
        activities: {
          create: tasks.map((task) => ({
            nameId: task.id,
            name: task.name,
            description: task.description || "No description",
            completionCriterions: {
              alphas: task.completionCriterions.alphas.map((criterion) => {
                return `${criterion[0]}.${criterion[1]}`;
              }),
              workProducts: task.completionCriterions.workProducts.map((criterion) => {
                return `${criterion[0]}.${criterion[1]}`;
              }),
            },
            entryCriterions: {
              alphas: task.entryCriterions.alphas.map((criterion) => {
                return `${criterion[0]}.${criterion[1]}`;
              }),
              workProducts: task.entryCriterions.workProducts.map((criterion) => {
                return `${criterion[0]}.${criterion[1]}`;
              }),
            },
            areasOfConcern: { connect: task.areasOfConcern.map((areaId) => ({ id: areaId })) },
            activitySpaces: { connect: task.activitySpaces.map((spaceId) => ({ id: spaceId })) },
            workProducts: {
              create: workProducts
                .filter((workProduct) => workProduct.taskId === task.id)
                .map((workProduct) => ({
                  nameId: workProduct.id,
                  name: workProduct.name,
                  description: workProduct.description || "No description",
                  levelOfDetails: workProduct.levelOfDetails,
                  areasOfConcern: { connect: workProduct.areasOfConcern.map((areaId) => ({ id: areaId })) },
                  alphas: { connect: workProduct.alphas.filter((alphaId) => alphaId.length < 20).map((alphaId) => ({ id: alphaId })) },
                })),
            },
          })),
        },
        patterns: {
          create: allPatterns.map((pattern) => ({
            nameId: pattern.id,
            name: pattern.name,
            description: pattern.description || "No description",
            role: pattern.role,
            subPatternIds: pattern.subPatterns,
            competencies: { connect: pattern.competencies.map((competencyId) => ({ id: competencyId })) },
            activities: { connect: pattern.activities.map((activityId) => ({ nameId: activityId })) },
            alphas: { connect: pattern.alphas.filter((alphaId) => alphaId.length < 20).map((alphaId) => ({ id: alphaId })) },
            assignedWorkProducts: { connect: pattern.assignedWorkProducts.map((wpId) => ({ nameId: wpId })) },
            areasOfConcern: { connect: pattern.areasOfConcern.map((areaId) => ({ id: areaId })) },
            // subAlphas: { connect: pattern.subAlphas.map((alphaId) => ({ id: alphaId })) },
          }))
        },
        subAlphas: {
          create: subAlphas.map((subAlpha) => ({
            nameId: subAlpha.id,
            name: subAlpha.name,
            description: subAlpha.description || "No description",
            states: {
              create: subAlpha.states.map((state) => ({
                nameId: state.id,
                name: state.name,
                description: state.description,
                checklist: state.checklist,
              }))
            },
            alpha: { connect: { id: subAlpha.alpha } },
          }))
        },
      },
    });

    for (const subAlpha of subAlphas) {
      await prisma.alpha.update({
        where: { id: subAlpha.alpha },
        data: {
          subAlphaIds: {
            push: subAlpha.id,
          },
        },
      });
    }

    // for (const pattern of patterns) {
    //   await prisma.pattern.update({
    //     where: { nameId: pattern.id },
    //     data: {
    //       alphas: { connect: pattern.alphas.map((alphaId) => ({ id: alphaId })) },
    //     },
    //   });
    // }

    // for (const workProduct of workProducts) {
    //   await prisma.workProduct.update({
    //     where: { nameId: workProduct.id },
    //     data: {
    //       alphas: { connect: workProduct.alphas.map((alphaId) => ({ id: alphaId })) },
    //     },
    //   });
    // }

    res.json(result);
  } catch (error) {
    console.log(error);
  }
}
