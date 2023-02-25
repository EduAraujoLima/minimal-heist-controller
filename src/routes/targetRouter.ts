import Router from 'koa-router';
import { createTargetMiddleware, getTargetByCuidMiddleware, getTargetsMiddleware } from '../middlewares/TargetMiddleware';


const targetRouter = new Router({
  prefix: '/api/target',
});

targetRouter.post('/', createTargetMiddleware);
targetRouter.get('/', getTargetsMiddleware);
targetRouter.get('/:id', getTargetByCuidMiddleware)

export default targetRouter;
