import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";

export async function createList(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/lists', {
      schema: {
        body: z.object({
          owner_name: z.string().min(4),
          owner_email: z.string().email()
        })
      }
    },
    async (request) => {
      const { owner_name, owner_email } = request.body

      const list = await prisma.list.create({
        data: {
          owner_name,
          owner_email
        }
      })

      return { listId: list.id }
    })
}