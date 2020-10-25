export function getValueFromArgs(args: { [arg: string]: string | number }, flags: string[]): string | undefined {
  for (const flag of flags) {
    if (args[flag]) {
      return args[flag].toString();
    }
  }
  return undefined;
}

let LOGGED_NO_ENV_PERMISSION_WARNING = false;
export function getValueFromEnv(arg: string): string | undefined {
  try {
    return String(Deno.env.get(arg));
  } catch (err) {
    if (err.message === "access to environment variables, run again with the --allow-env flag") {
      if (!LOGGED_NO_ENV_PERMISSION_WARNING) {
        console.warn(
          `No access to environment variables. Run again with the --allow-env flag to use environment variables instead of defaults.`
        );
        LOGGED_NO_ENV_PERMISSION_WARNING = true;
      }
      return undefined;
    }
    throw err;
  }
}
