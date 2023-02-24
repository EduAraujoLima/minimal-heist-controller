import { StatusCodes } from 'http-status-codes';
import { Context, Next } from 'koa';
import { prisma } from '../database/prisma';
import { CreateTarget, createTargetSchema } from '../schemas/targetSchemas';
import { joinZodIssues } from '../utils/ZodUtils';

export const createTargetMiddleware = async (ctx: Context) => {
  const target = ctx.request.body as CreateTarget;

  const isValidTargetInput = createTargetSchema.safeParse(target);

  if (!isValidTargetInput.success) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { status: 'Bad request', message: joinZodIssues(isValidTargetInput.error.errors) };
    return;
  }

  const targetTypeExists = await prisma.targetType.findUnique({
    where: {
      id: target.targetTypeId,
    },
  });

  if (!targetTypeExists) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { status: 'Bad request', message: 'Target type does not exist' };
  }
};
