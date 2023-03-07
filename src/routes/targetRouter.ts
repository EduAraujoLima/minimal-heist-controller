import Router from 'koa-router';
import { createTargetService, deleteTargetService, getTargetByCuidService, getTargetsService, updateTargetService } from '../services/TargetService';


const targetRouter = new Router({
  prefix: '/api/target',
});

targetRouter.post('/', createTargetService);
targetRouter.get('/', getTargetsService);
targetRouter.get('/:id', getTargetByCuidService)
targetRouter.put('/:id', updateTargetService);
targetRouter.delete('/:id', deleteTargetService);

export default targetRouter;
