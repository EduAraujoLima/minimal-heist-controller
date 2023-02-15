import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import { StatusCodes } from 'http-status-codes';
import { targetRouter } from './routes';

const app = new Koa();

const routerOpen = new Router();

app.use(logger());
app.use(cors({ maxAge: 86400 }));
app.use(bodyParser());

routerOpen.get('/api/version', (ctx) => {
  ctx.status = StatusCodes.OK;
  ctx.body = { version: '1.0.0', status: 'OK' };
});

app.use(routerOpen.routes());
app.use(targetRouter.routes());

app.use((ctx) => {
  ctx.status = StatusCodes.NOT_FOUND;
  ctx.body = { status: 'Not found' };
});

export default app;
