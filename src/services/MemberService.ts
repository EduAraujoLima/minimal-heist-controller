import { Member } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { Context } from 'koa';
import { memberRepository } from '../repository/MemberRepository';
import { CreateMember, createMemberSchema, UpdateMember, updateMemberSchema } from '../schemas/memberSchemas';
import { simpleActionMiddleware } from '../utils/Middlewares';
import { joinZodIssues } from '../utils/ZodUtils';

const repository = memberRepository();

export const createMemberService = async (ctx: Context) => {
  const member = ctx.request.body as CreateMember;

  const parseResult = createMemberSchema.safeParse(member);

  if (!parseResult.success) {
    const invalidInputMessage = joinZodIssues(parseResult.error.errors);
    ctx.status = StatusCodes.BAD_REQUEST;
    ctx.body = { status: 'Bad request', message: invalidInputMessage };
    return;
  }

  try {
    const newMember = await repository.create(member);
    ctx.status = StatusCodes.CREATED;
    ctx.body = newMember;
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = { message: error };
  }
};

export const getMembersService = async (ctx: Context) => {
  try {
    ctx.body = await repository.getAll();
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = { message: error };
  }
};

export const updateMemberService = (ctx: Context) => {
    const updateMemberParseResult = updateMemberSchema.safeParse(ctx.request.body);
    
    if (!updateMemberParseResult.success) {
        const invalidInputMessage = joinZodIssues(updateMemberParseResult.error.errors);
        ctx.status = StatusCodes.BAD_REQUEST;
        ctx.body = { status: 'Bad request', message: invalidInputMessage };
        return;
    }
    
    return simpleActionMiddleware<UpdateMember, Member>(repository.update)(ctx)
}
