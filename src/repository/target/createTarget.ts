import { Target } from '@prisma/client';
import { prisma } from '../../database/prisma';
import { CreateTarget, targetSchema } from '../../schemas/targetSchemas';

export const createTarget = async (target: CreateTarget) => {
  const isValidTargetInput = targetSchema.safeParse(target);

  if (!isValidTargetInput.success) {
    throw new Error(isValidTargetInput.error.message);
  }

  const newTarget: Target = await prisma.target.create({
    data: {
      ...target
    },
  });

  return newTarget;
};
