import { handleRequest } from "./reverse-proxy.js"

const server = Bun.serve({
  port: process.env.PORT || 80,
  async fetch(req) {
    return await handleRequest(req)
  },
})

console.log(`listening on ${server.port}`)