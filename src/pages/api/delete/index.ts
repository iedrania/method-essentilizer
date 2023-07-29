import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  try {
    await prisma.subAlphaState.deleteMany();
    await prisma.subAlpha.deleteMany();
    await prisma.workProduct.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.pattern.deleteMany();
    await prisma.method.deleteMany();

    await prisma.alpha.updateMany({
      data: {
        subAlphaIds: [],
      },
    });

    console.log('User data cleared successfully.');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}