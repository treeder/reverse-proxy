# reverse-proxy

A simple, modern JavaScript reverse-proxy that has no dependencies and only uses the JavaScript standard library.

Also works for all major JS platforms. 

## Node

```sh
node --env-file=.env node.js
```

## Bun

```sh
curl -fsSL https://bun.sh/install | bash
```

```sh
NODE_TLS_REJECT_UNAUTHORIZED=0 bun bun.js
```

## Cloudflare workers

TODO: make docs for this.

Use `worker.js`

