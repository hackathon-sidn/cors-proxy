import { serve } from "https://deno.land/std@0.74.0/http/server.ts";
import { parse } from "https://deno.land/std@0.74.0/flags/mod.ts";
import { getPortFromArgs, getPortFromEnv, getDefaultPort } from "./helpers/port-helper.ts";
import { isUrlAllowed } from "./helpers/allowed-urls-helper.ts";

const args = parse(Deno.args);
const port = getPortFromArgs(args) || getPortFromEnv() || getDefaultPort();

const server = serve({ port });
console.log(`CORS proxy server listening at port ${port}`);

const CORS_ROUTE_PREFIX = "/cors/";
for await (const req of server) {
  try {
    if (req.url.startsWith(CORS_ROUTE_PREFIX)) {
      const url = req.url.slice(CORS_ROUTE_PREFIX.length);
      if (!isUrlAllowed(url, (args["allowed-urls"] || args["u"] || "").toString())) {
        req.respond({ status: 403, body: "403 Forbidden" });
        continue;
      }
      const response = await fetch(url);
      const text = await response.text();
      const headers = new Headers();
      headers.set("Access-Control-Allow-Origin", (args["allowed-origins"] || args["o"] || "*").toString());
      req.respond({ body: text, headers });
    } else {
      req.respond({ status: 404, body: "404 Not Found" });
    }
  } catch {
    req.respond({ status: 500, body: "500 Internal Server Error" });
  }
}
