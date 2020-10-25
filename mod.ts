import { parse } from "https://deno.land/std@0.74.0/flags/mod.ts";
import { getValueFromArgs, getValueFromEnv } from "./helpers/conf-helper.ts";
import { config } from "./config.ts";
import { showHelpMessage } from "./helpers/help-helper.ts";
import { run } from "./server.ts";

const args = parse(Deno.args);

if (args.help) {
  showHelpMessage();
  Deno.exit();
}

const port = Number(
  getValueFromArgs(args, [config.port.argsLong, config.port.argsShort]) ||
    getValueFromEnv(config.port.env) || config.port.default,
);
const corsRoutePrefix =
  getValueFromArgs(args, [config.route.argsLong, config.route.argsShort]) ||
  getValueFromEnv(config.route.env) || config.route.default;
const allowedUrls =
  getValueFromArgs(
    args,
    [config.allowedUrls.argsLong, config.allowedUrls.argsShort],
  ) ||
  getValueFromEnv(config.allowedUrls.env) ||
  config.allowedUrls.default;
const allowedOrigins =
  getValueFromArgs(
    args,
    [config.allowedOrigins.argsLong, config.allowedOrigins.argsShort],
  ) ||
  getValueFromEnv(config.allowedOrigins.env) ||
  config.allowedOrigins.default;

run(port, corsRoutePrefix, allowedUrls, allowedOrigins);
