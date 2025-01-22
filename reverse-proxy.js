import { proxyURL } from "./url.js"

export async function handleRequest(req) {
  let rurl = req.url
  if (!(rurl.startsWith("https://") || rurl.startsWith("http://"))) {
    rurl = proxyURL(req) + req.url
  }
  console.log("rurl:", rurl)
  const url = new URL(rurl)
  const pathname = url.pathname
  const search = url.search
  const pathWithParams = pathname + search
  return await forwardRequest(req, pathWithParams)
}

async function forwardRequest(req, pathWithSearch) {
  // let body = await req.text()
  // console.log("body:", body)
  let u = `${proxyURL(req)}${pathWithSearch}`
  // const originRequest = new Request(u, req)
  let ropts = {
    method: req.method,
    headers: stripHeaders(req.headers),
    // body: req.body,
    ...(req.duplex && { duplex: req.duplex }), // required for node
  }
  if (req.method == "POST") {
    ropts.body = req.body
  }
  let originRequest = new Request(u, ropts)
  // originRequest.headers.delete("cookie")
  console.log("proxying to:", u)
  console.log("req:", originRequest)
  let r = await fetch(u, originRequest)
  console.log("R:", r.status, r)
  if (!r.ok) {
    console.log(await r.text())
    throw new Error(`Request failed with status ${r.status}`)
  }
  return r
}

function stripHeaders(h) {
  const newHeaders = new Headers(h) // Create a copy to avoid modifying original headers

  // Headers to remove
  const headersToRemove = [
    'host',
    'cookie',
    'authorization',
    'x-forwarded-for',
    // Add other headers to remove here
  ]

  // Remove the specified headers
  headersToRemove.forEach(headerName => {
    newHeaders.delete(headerName)
  })

  // Headers to modify (optional)
  // Example: Set a custom header
  // newHeaders.set('x-proxy-by', 'MyProxy')

  return newHeaders
}