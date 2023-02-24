import { StatusCodes } from 'http-status-codes';
import { Next } from 'koa';
import Router from 'koa-router';
import { Context } from 'vm';
import { createTargetMiddleware } from '../middlewares/TargetMiddleware';
import { createTarget } from '../repository/TargetRepository';
import { CreateTarget } from '../schemas/targetSchemas';

const targetRouter = new Router({
  prefix: '/api/target',
});

targetRouter.post('/', createTargetMiddleware, async (ctx: Context) => {
  const target = ctx.body as CreateTarget;
  const newTarget = await createTarget(target);
    ctx.status = StatusCodes.CREATED;
    ctx.body = newTarget;
});

export default targetRouter;
