import { proxyURL } from "./url.js"

export async function handleRequest(req) {
  let rurl = req.url
  if (!(rurl.startsWith("https://") || rurl.startsWith("http://"))) {
    rurl = proxyURL() + req.url
  }
  console.log("rurl:", rurl)
  const url = new URL(rurl)
  const pathname = url.pathname
  const search = url.search
  const pathWithParams = pathname + search
  return await forwardRequest(req, pathWithParams)
}

async function forwardRequest(req, pathWithSearch) {
  const originRequest = new Request(req)
  // originRequest.headers.delete("cookie")
  let u = `${proxyURL()}${pathWithSearch}`
  console.log("proxying to:", u)
  let r = await fetch(u, originRequest)
  console.log("R:", r.status, r)
  return r
}
