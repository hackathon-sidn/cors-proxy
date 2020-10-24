const DEFAULT_PORT = 3000;

export function getPortFromArgs(args: { [arg: string]: string | number }): number | undefined {
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
