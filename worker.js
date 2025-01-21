export default {
  async fetch(req, env, ctx) {
    return handleRequest(req, ctx)
  }
}
