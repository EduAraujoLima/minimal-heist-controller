import { StatusCodes } from 'http-status-codes';
import Router from 'koa-router';
import { createTarget } from '../repository/target';
import { CreateTarget } from '../schemas/targetSchemas';

const targetRouter = new Router({
  prefix: '/api/target',
});

targetRouter.post('/', async (ctx) => {
  const target = ctx.body as CreateTarget;
  try {
    const newTarget = await createTarget(target);
    ctx.status = StatusCodes.CREATED;
    ctx.body = newTarget;
  } catch (err) {
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { status: 'Bad request', message: err };
  }
});

export default targetRouter;
