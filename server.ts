import { serve } from "https://deno.land/std@0.74.0/http/server.ts";
import { isUrlAllowed } from "./helpers/allowed-urls-helper.ts";

export async function run(
  port: number,
  route: string,
  allowedUrls: string,
  allowedOrigins: string,
) {
  const server = serve({ port });
  console.log(`CORS proxy server listening at port ${port}.`);

  for await (const req of server) {
    try {
      if (req.url.startsWith(route)) {
        const url = req.url.slice(route.length);
        if (!isUrlAllowed(url, allowedUrls)) {
          req.respond({ status: 403, body: "403 Forbidden" });
          continue;
        }
        const response = await fetch(url);
        const text = await response.text();
        const headers = new Headers();
        headers.set("Access-Control-Allow-Origin", allowedOrigins);
        req.respond({ body: text, headers });
      } else {
        req.respond({ status: 404, body: "404 Not Found" });
      }
    } catch {
      req.respond({ status: 500, body: "500 Internal Server Error" });
    }
  }
}
