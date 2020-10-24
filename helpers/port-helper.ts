import { parse } from "https://deno.land/std@0.74.0/flags/mod.ts";

const DEFAULT_PORT = 3000;

export function getPortFromArgs(): number | undefined {
  const args = parse(Deno.args);
  return Number(args.port) || Number(args.p) || undefined;
}

export function getPortFromEnv(): number | undefined {
  try {
    return Number(Deno.env.get("PORT"));
  } catch (err) {
    if (err.message === "access to environment variables, run again with the --allow-env flag") {
      console.warn(
        `No access to environment variables, run again with the --allow-env flag to use ` +
          `environment variable PORT instead of default port ${DEFAULT_PORT}.`
      );
      return undefined;
    }
    throw err;
  }
}

export function getDefaultPort(): number {
  return DEFAULT_PORT;
}
