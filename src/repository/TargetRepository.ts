import { Target } from '@prisma/client';
import { prisma } from '../database/prisma';
import { CreateTarget } from '../schemas/targetSchemas';

export const createTarget = async (target: CreateTarget) =>
  await prisma.target.create({
    data: {
      ...target,
    },
  });
