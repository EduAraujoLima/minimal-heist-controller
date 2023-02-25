import { StatusCodes } from 'http-status-codes';
import { Context, Next } from 'koa';
import { getTargetTypeByCuid } from '../repository';
import { createTarget, getTargetByCuid, getTargets } from '../repository/TargetRepository';
import { CreateTarget, createTargetSchema, getTargetByUuidSchema } from '../schemas/targetSchemas';
import { joinZodIssues } from '../utils/ZodUtils';

export const createTargetMiddleware = async (ctx: Context) => {
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

export const getTargetsMiddleware = async (ctx: Context) => {
  try {
    ctx.body = await getTargets();
  } 
  catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = { message: error };
  }
};

export const getTargetByCuidMiddleware = async (ctx: Context, next: Next) => {
  const cuid = ctx.params.id;
  const parseResult = getTargetByUuidSchema.safeParse(cuid);

  if (!parseResult.success) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { status: 'Bad request', message: joinZodIssues(parseResult.error.errors) };
    return;
  }

  try {
    const target = await getTargetByCuid(ctx.params.id);
    ctx.body = target;
  } catch (error) {
    ctx.status = StatusCodes.NOT_FOUND;
    ctx.body = { message: 'Target not found' };
  }
};
