import fastify from "fastify";

const server = fastify({ logger: true, requestIdHeader: true });

server.get("/problem", async (request, reply) => {
  request.log.error(request.id, "request id");
  return { success: true };
});

server.listen({ port: 3001 }).then(() => {
  console.log(`Server listening on port ${server.server.address().port}`);
});
