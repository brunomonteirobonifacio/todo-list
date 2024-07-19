import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";

export async function updateItem(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/lists/:listId/items/:itemId', {
      schema: {
        params: z.object({
          listId: z.string().uuid(),
          itemId: z.string().uuid()
        }),
        body: z.object({
          title: z.string().min(4),
          done: z.coerce.boolean()
        })
      }
    },
    async (request, reply) => {
      const { title, done } = request.body
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

      await prisma.item.update({
        where: { id: itemId },
        data: {
          title,
          done
        }
      })

      return { itemId }
    })
}