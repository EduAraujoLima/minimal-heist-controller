import { Target } from '@prisma/client';
import { prisma } from '../database/prisma';
import { CreateTarget } from '../schemas/targetSchemas';

export const createTarget = async (target: CreateTarget) =>
  await prisma.target.create({
    data: {
      ...target,
    },
  });

export const getTargets = async () => await prisma.target.findMany();

export const getTargetByCuid = async (cuid: string) =>
  await prisma.target.findUnique({
    where: {
      id: cuid,
    },
    include: {
      type: true,
    },
  });
