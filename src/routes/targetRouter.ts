import Router from 'koa-router';
import { createTargetService, deleteTargetService, getTargetByCuidService, getTargetsService, updateTargetService } from '../services/TargetService';

const targetRouter = new Router({
  prefix: '/api/target',
});

targetRouter
  .post('/', createTargetService)
  .get('/', getTargetsService)
  .get('/:id', getTargetByCuidService)
  .put('/:id', updateTargetService)
  .delete('/:id', deleteTargetService);

export default targetRouter;
