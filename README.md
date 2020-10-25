# cors-proxy

```console
$ deno run --allow-net https://deno.land/x/cors_proxy/mod.ts
```

## Configuration

You can configure the port, allowed URLs and allowed origins of the server via these arguments:

```console
$ deno run https://deno.land/x/cors_proxy/mod.ts --help
This CORS proxy fetches remote URLs and adds CORS headers so that blocked Cross-Origin requests belong to the past.

You can adjust the following settings when using this module:
  -p, --port
    Port - set the port for your server (number)
    Default: 3000

  -u, --allowed-urls
    URLs to serve - set URLs you want to be able to forward (comma separated list)
    Default: "" (all URLs are allowed)

  -o, --allowed-origins
    Value for Access-Control-Allow-Origin header
    Default: "*" (all origins are allowed)
```

## Example usage

```console
$ deno run --allow-net https://deno.land/x/cors_proxy/mod.ts \
    --port 1337 \
    --allowed-urls https://duck.com,https://firefox.com \
    --allowed-origins https://my-webapp.example.com
```
