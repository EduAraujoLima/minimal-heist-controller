import { prisma } from "../database/prisma";
import { CreateMember, UpdateMember } from "../schemas/memberSchemas";

export function memberRepository() {
  const create = async (member: CreateMember) =>
    await prisma.member.create({
      data: {
        ...member,
      },
    });

  const getAll = async () => await prisma.member.findMany();

  const getByCuid = async (cuid: string) =>
    await prisma.member.findUnique({
      where: {
        id: cuid,
      },
    });

  const update = async (cuid: string, member: UpdateMember) =>
    await prisma.member.update({
      where: {
        id: cuid,
      },
      data: {
        ...member,
      },
    });

  const remove = async (cuid: string) =>
    await prisma.member.delete({
      where: {
        id: cuid,
      },
    });

  return {
    create,
    getAll,
    getByCuid,
    update,
    remove,
  };
}