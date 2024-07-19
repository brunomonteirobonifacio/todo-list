import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod';
import { getItems } from "./routes/get-items.js";
import { createList } from "./routes/create-list.js";
import { createItem } from "./routes/create-item.js";
import { updateItem } from "./routes/update-item.js";
import { deleteItem } from "./routes/delete-item.js";
import { deleteList } from "./routes/delete-list.js";
import { getList } from "./routes/get-list.js";

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getItems)
app.register(createList)
app.register(createItem)
app.register(updateItem)
app.register(deleteItem)
app.register(deleteList)
app.register(getList)

app.listen({ port: 3333 }).then(() => {
  console.log('server running')
})