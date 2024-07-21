import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import { ClientError } from "../error/client-error.js";

export async function createItem(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/lists/:listId/items', {
      schema: {
        params: z.object({
          listId: z.string().uuid()
        }),
        body: z.object({
          title: z.string().min(4)
        })
      }
    },
    async (request) => {
      const { title } = request.body
      const { listId } = request.params

      const list = prisma.list.findUnique({
        where: { id: listId }
      })

      if (!list) {
        throw new ClientError('List not found.')
      }

      const item = await prisma.item.create({
        data: {
          title,
          list_id: listId
        }
      })

      return { itemId: item.id }
    })
}