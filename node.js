import http from 'http'
import { handleRequest } from './reverse-proxy.js'
import { proxyURL } from './url.js'


const server = http.createServer(async (req, res) => {
  console.log(`Incoming request: ${req.method} ${req.url}`)
  if (req.url.startsWith("/src:")) {
    // for some reason, was getting some infinite loop, this stops it...
    return
  }
  try {
    // console.log(req)
    // console.log("request.url:", req.url)
    // console.log(req.headers)
    let rurl = req.url
    if (!rurl.startsWith("https://")) {
      // need to add a host or new Request will fail
      rurl = "https://localhost:8080" + req.url
    }
    console.log(rurl)

    // request.url = rurl
    let ropts = {
      method: req.method,
      headers: req.headers,
      duplex: "half",
    }
    if (req.method == "POST") {
      ropts.body = req
    }
    let preq = new Request(rurl, ropts)

    let r = await handleRequest(preq)
    console.log("R:", r.status, r)
    res.writeHead(r.status, { 'Content-Type': r.headers.get('content-type') })
    res.end(await r.text())
  } catch (e) {
    console.error(e)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: { message: 'Internal Server Error' } }))
  }

})

const PORT = process.env.PORT || 80 // Port for the reverse proxy
server.listen(PORT, () => {
  console.log(`Reverse proxy listening on port ${PORT}`)
})
