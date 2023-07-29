import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  try {
    await prisma.state.deleteMany();
    await prisma.alpha.deleteMany();
    await prisma.competency.deleteMany();
    await prisma.activitySpace.deleteMany();
    await prisma.areaOfConcern.deleteMany();

    console.log('Database cleared successfully.');
  } catch (error) {
    console.log('Error clearing database:', error);
  }
}