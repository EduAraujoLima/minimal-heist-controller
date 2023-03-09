import Router from 'koa-router';
import { createMemberService, getMembersService } from '../services/MemberService';

const memberRouter = new Router({
  prefix: '/api/member',
});

memberRouter.post('/', createMemberService).get('/', getMembersService);

export default memberRouter;
