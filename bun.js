import { handleRequest } from "./reverse-proxy.js"
import { proxyURL } from "./url.js"

Bun.serve({
  async fetch(req) {

    return await handleRequest(req)
  },
})