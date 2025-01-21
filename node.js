import http from 'http'
import { handleRequest } from './reverse-proxy.js'
import { proxyURL } from './url.js'


const server = http.createServer(async (req, res) => {
  console.log(`Incoming request: ${req.method} ${req.url}`)

  try {

    console.log("request.url:", req.url)
    console.log(req.headers)
    let rurl = req.url
    if (!rurl.startsWith("https://")) {
      rurl = proxyURL() + req.url
    }
    console.log(rurl)

    // request.url = rurl
    let preq = new Request(rurl, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    })

    let r = await handleRequest(preq)
    console.log("R:", r.status, r)
    res.writeHead(r.status, { 'Content-Type': r.headers.get('content-type') })
    res.end(await r.text())
  } catch (e) {
    console.error(e)
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Internal Server Error')
  }

})

const PORT = process.env.PORT || 3000 // Port for the reverse proxy
server.listen(PORT, () => {
  console.log(`Reverse proxy listening on port ${PORT}`)
})
