import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma.js";
import { ClientError } from "../error/client-error.js";

export async function getItems(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/lists/:listId/items', {
      schema: {
        params: z.object({
          listId: z.string().uuid()
        })
      }
    },
    async (request) => {
      const { listId } = request.params

      const list = await prisma.list.findUnique({
        where: { id: listId },
        include: {
          items: {
            select: {
              id: true,
              title: true,
              done: true
            }
          }
        }
      })

      if (!list) {
        throw new ClientError('List not found.')
      }

      return { items: list.items }
    }
  )
}