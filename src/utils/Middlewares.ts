import { StatusCodes } from 'http-status-codes';
import { Context } from 'koa';
import { cuidSchema, joinZodIssues } from './ZodUtils';

type SimpleMiddlewareAction<SchemaType, ReturnType> = (cuid: string, data: SchemaType) => Promise<ReturnType>;

export const simpleActionMiddleware =
  <SchemaType, ReturnType>(action: SimpleMiddlewareAction<SchemaType, ReturnType>) =>
  async (ctx: Context) => {
    const cuid = ctx.params.id as string;
    const parseResult = cuidSchema.safeParse(cuid);

    if (!parseResult.success) {
      ctx.status = StatusCodes.BAD_REQUEST;
      ctx.body = { status: 'Bad request', message: joinZodIssues(parseResult.error.errors) };
      return;
    }

    try {
      const result = await action(cuid, ctx.request.body as SchemaType);
      ctx.body = result as ReturnType;
    } catch (error) {
      ctx.status = StatusCodes.NOT_FOUND;
      ctx.body = { message: 'Target not found' };
    }
  };
