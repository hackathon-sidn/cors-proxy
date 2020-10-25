# cors-proxy

[![nest badge](https://nest.land/badge-large.svg)](https://nest.land/package/cors-proxy)

```console
$ deno run --allow-net https://deno.land/x/cors_proxy/mod.ts
```

Instead of fetching `https://duck.com` you can now fetch `http://localhost:3000/cors/https://duck.com`.

## Configuration

You can configure the port, allowed URLs and allowed origins of the server via these arguments:

```console
$ deno run https://deno.land/x/cors_proxy/mod.ts --help
This CORS proxy fetches remote URLs and adds CORS headers so that blocked Cross-Origin requests belong to the past.

You can adjust the following settings when using this module:
  -p, --port, env: PORT
    Port - set the port for your server (number)
    Default: 3000

  -r, --route, env: CORS_ROUTE_PREFIX
    Route to serve requests, i.e. <your-server-url>:<port><route><requested-url>
    e.g. https://cors-proxy.example.com/cors/https://duck.com
    Default: "/cors/"

  -u, --allowed-urls, env: ALLOWED_URLS
    URLs to serve - set URLs you want to be able to forward (comma separated list, e.g. "https://domain1.com,https://domain2.org")
    Default: "" ("" = all URLs are allowed)

  -o, --allowed-origins, env: ALLOWED_ORIGINS
    Value for Access-Control-Allow-Origin header
    Default: "*" ("*" = all origins are allowed)
```

## Example usage

```console
$ deno run --allow-net https://deno.land/x/cors_proxy/mod.ts \
    --port 1337 \
    --route / \
    --allowed-urls https://duck.com,https://firefox.com \
    --allowed-origins https://my-webapp.example.com
```
