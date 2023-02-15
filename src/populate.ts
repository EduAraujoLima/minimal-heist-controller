import { prisma } from './database/prisma';

async () => {
  await prisma.targetType.create({
    data: {
      name: 'Primary',
    },
  });

  await prisma.targetType.create({
    data: {
      name: 'Secondary',
    },
  });
};
