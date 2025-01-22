export function proxyURL(req) {
  if (req.headers.get("X-Forward-To")) {
    return req.headers.get("X-Forward-To")
  }
  return process.env?.PROXY_URL
}