import { config } from "../config.ts";

const HELP_TEXT = `This CORS proxy fetches remote URLs and adds CORS headers so that blocked Cross-Origin requests belong to the past.

You can adjust the following settings when using this module:
  -${config.port.argsShort}, --${config.port.argsLong}, env: ${config.port.env}
    Port - set the port for your server (number)
    Default: ${config.port.default}

  -${config.route.argsShort}, --${config.route.argsLong}, env: ${config.route.env}
    Route to serve requests, i.e. <your-server-url>:<port><route><requested-url>
    e.g. https://cors-proxy.example.com/cors/https://duck.com
    Default: "${config.route.default}"

  -${config.allowedUrls.argsShort}, --${config.allowedUrls.argsLong}, env: ${config.allowedUrls.env}
    URLs to serve - set URLs you want to be able to forward (comma separated list, e.g. "https://domain1.com,https://domain2.org")
    Default: "${config.allowedUrls.default}" ("" = all URLs are allowed)

  -${config.allowedOrigins.argsShort}, --${config.allowedOrigins.argsLong}, env: ${config.allowedOrigins.env}
    Value for Access-Control-Allow-Origin header
    Default: "${config.allowedOrigins.default}" ("*" = all origins are allowed)
`;

export function showHelpMessage() {
  console.log(HELP_TEXT);
}
