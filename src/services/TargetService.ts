import { Target, TargetType } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { Context } from 'koa';
import { getTargetTypeByCuid, targetRepository } from '../repository';
import {
  CreateTarget,
  createTargetSchema,
  UpdateTarget,
  updateTargetSchema,
} from '../schemas/targetSchemas';
import { simpleActionMiddleware } from '../utils/Middlewares';
import { joinZodIssues } from '../utils/ZodUtils';

const repository = targetRepository();

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

    const newTarget = await repository.create(target);
    ctx.status = StatusCodes.CREATED;
    ctx.body = newTarget;
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = { message: error };
  }
};

export const getTargetsService = async (ctx: Context) => {
  try {
    ctx.body = await repository.getAll();
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

  return simpleActionMiddleware<UpdateTarget, Target>(repository.update)(ctx);
};

export const getTargetByCuidService = simpleActionMiddleware<
  string,
  | (Target & {
      type: TargetType;
    })
  | null
>(repository.getByCuid);


export const deleteTargetService = simpleActionMiddleware<string, Target>(repository.remove);
