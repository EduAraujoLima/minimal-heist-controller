import { Target } from '@prisma/client';
import { prisma } from '../database/prisma';
import { CreateTarget, UpdateTarget } from '../schemas/targetSchemas';

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

export const updateTarget = async (cuid: string, target: UpdateTarget) =>
  await prisma.target.update({
    where: {
      id: cuid,
    },
    data: {
      ...target,
    },
  });

export const deleteTarget = async (cuid: string) =>
  await prisma.target.delete({
    where: {
      id: cuid,
    },
  });