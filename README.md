# reverse-proxy

A simple, modern JavaScript reverse-proxy that has no dependencies and only uses the JavaScript standard library.

Also works for all major JS platforms. 

## Set destination URL in environment

```
PROXY_URL=https://wherever.com
PROXY_KEY=SOME_SECRET_STRING
```

If you have the `PROXY_KEY` set (optional), then the request must include one of the following
that matches:

- `X-Proxy-Key` header
- `proxyKey` query param

## Node

```sh
node --env-file=.env node.js
```

## Bun

```sh
NODE_TLS_REJECT_UNAUTHORIZED=0 bun bun.js
```

## Cloudflare workers

TODO: make docs for this.

Use `worker.js`

## To run on a VPS and have it run forever

Install [pm2](https://github.com/Unitech/pm2):

```sh
npm install -g pm2
```

Then start this with:

```sh
pm2 start node.js
```

To run it with bun:

```sh
pm2 start --interpreter ~/.bun/bin/bun bun.js
```