import { prisma } from '../database/prisma';

export const getTargetTypeByCuid = async (cuid: string) =>
  await prisma.targetType.findUnique({
    where: {
      id: cuid,
    },
  });
