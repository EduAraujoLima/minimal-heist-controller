import { Target, TargetType } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { Context } from 'koa';
import { getTargetTypeByCuid } from '../repository';
import { createTarget, deleteTarget, getTargetByCuid, getTargets, updateTarget } from '../repository/TargetRepository';
import {
  CreateTarget,
  createTargetSchema,
  UpdateTarget,
  updateTargetSchema,
} from '../schemas/targetSchemas';
import { simpleActionMiddleware } from '../utils/Middlewares';
import { cuidSchema, joinZodIssues } from '../utils/ZodUtils';

export const createTargetService = async (ctx: Context) => {
  const target = ctx.request.body as CreateTarget;

  const parseResult = createTargetSchema.safeParse(target);

  if (!parseResult.success) {
    const invalidInputMessage = joinZodIssues(parseResult.error.errors);
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { status: 'Bad request', message: invalidInputMessage };
    return;
  }

  try {
    const targetTypeExists = await getTargetTypeByCuid(target.targetTypeId);

    if (!targetTypeExists) {
      const invalidInputMessage = 'Target type does not exist';
      ctx.status = StatusCodes.BAD_REQUEST;
      ctx.body = { status: 'Bad request', message: invalidInputMessage };
      return;
    }

    const newTarget = await createTarget(target);
    ctx.status = StatusCodes.CREATED;
    ctx.body = newTarget;
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = { message: error };
  }
};

export const getTargetsService = async (ctx: Context) => {
  try {
    ctx.body = await getTargets();
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = { message: error };
  }
};
export const updateTargetService = (ctx: Context) => {
  const updateTargetParseResult = updateTargetSchema.safeParse(ctx.request.body);

  if (!updateTargetParseResult.success) {
    const invalidInputMessage = joinZodIssues(updateTargetParseResult.error.errors);
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { status: 'Bad request', message: invalidInputMessage };
    return;
  }

  return simpleActionMiddleware<UpdateTarget, Target>(updateTarget)(ctx);
};

export const getTargetByCuidService = simpleActionMiddleware<
  string,
  | (Target & {
      type: TargetType;
    })
  | null
>(getTargetByCuid);


export const deleteTargetService = simpleActionMiddleware<string, Target>(deleteTarget);
