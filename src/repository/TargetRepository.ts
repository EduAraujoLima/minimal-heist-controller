import { prisma } from '../database/prisma';
import { CreateTarget, UpdateTarget } from '../schemas/targetSchemas';

export function targetRepository() {
  const create = async (target: CreateTarget) =>
    await prisma.target.create({
      data: {
        ...target,
      },
    });

  const getAll = async () => await prisma.target.findMany();

  const getByCuid = async (cuid: string) =>
    await prisma.target.findUnique({
      where: {
        id: cuid,
      },
      include: {
        type: true,
      },
    });

  const update = async (cuid: string, target: UpdateTarget) =>
    await prisma.target.update({
      where: {
        id: cuid,
      },
      data: {
        ...target,
      },
    });

  const remove = async (cuid: string) =>
    await prisma.target.delete({
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
