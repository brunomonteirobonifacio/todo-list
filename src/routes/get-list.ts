import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma.js";

export async function getList(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/lists/:listId', {
      schema: {
        params: z.object({
          listId: z.string().uuid()
        })
      }
    },
    async (request) => {
      const { listId } = request.params

      const list = await prisma.list.findUnique({
        select: {
          id: true,
          owner_name: true,
          owner_email: true
        },
        where: { id: listId }
      })

      if (!list) {
        throw new Error('List not found.')
      }

      return { list }
    }
  )
}