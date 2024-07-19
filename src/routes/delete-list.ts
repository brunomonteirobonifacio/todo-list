import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";

export async function deleteList(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/lists/:listId', {
      schema: {
        params: z.object({
          listId: z.string().uuid(),
        }),
      }
    },
    async (request) => {
      const { listId } = request.params

      const list = await prisma.list.findUnique({
        where: { id: listId }
      })

      if (!list) {
        throw new Error('List not found.')
      }

      await prisma.item.deleteMany({
        where: { list_id: listId }
      })

      await prisma.list.delete({
        where: { id: listId }
      })

      return
    })
}