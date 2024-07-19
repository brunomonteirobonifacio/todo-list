import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";

export async function deleteItem(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/lists/:listId/items/:itemId', {
      schema: {
        params: z.object({
          listId: z.string().uuid(),
          itemId: z.string().uuid()
        }),
      }
    },
    async (request) => {
      const { listId, itemId } = request.params

      const item = await prisma.item.findUnique({
        where: {
          id: itemId,
          list_id: listId
        }
      })

      if (!item) {
        throw new Error('Item not found.')
      }

      await prisma.item.delete({
        where: { id: itemId }
      })

      return
    })
}