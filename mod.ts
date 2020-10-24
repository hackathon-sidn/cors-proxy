import { serve } from "https://deno.land/std@0.74.0/http/server.ts";

const port = 3000;

const server = serve({ port });
console.log(`CORS proxy server listening at port ${port}`);

const CORS_ROUTE_PREFIX = "/cors/";
for await (const req of server) {
  try {
    if (req.url.startsWith(CORS_ROUTE_PREFIX)) {
      const url = req.url.slice(CORS_ROUTE_PREFIX.length);
      // TODO: rules for allowed urls
      const response = await fetch(url);
      const text = await response.text();
      const headers = new Headers();
      headers.set("Access-Control-Allow-Origin", "*"); // TODO: configure allowed origins
      req.respond({ body: text, headers });
    } else {
      req.respond({ status: 404, body: "404 Not Found" });
    }
  } catch {
    req.respond({ status: 500, body: "500 Internal Server Error" });
  }
}
