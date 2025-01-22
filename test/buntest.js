let r = await fetch(process.env.URL)
console.log(r.status)
console.log(await r.text())