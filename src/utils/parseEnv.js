import fs from "fs";
import path from "path";

export function parseEnv(filePath) {
  if (!filePath) {
    throw new Error("File path is required");
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const stat = fs.statSync(filePath);
  if (!stat.isFile()) {
    throw new Error(`Path is not a file: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const env = {};
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue; // skip comments

    // Handle lines with = sign
    if (!line.includes("=")) continue;

    const [key, ...rest] = line.split("=");
    const trimmedKey = key.trim();

    // Validate key name (should be valid env var name)
    if (trimmedKey && /^[A-Za-z_][A-Za-z0-9_]*$/.test(trimmedKey)) {
      env[trimmedKey] = rest.join("=").trim();
    }
  }

  return env;
}

export function validateEnvFile(filePath, requiredKeys = []) {
  const env = parseEnv(filePath);
  const missing = requiredKeys.filter((key) => !env.hasOwnProperty(key));
  const present = requiredKeys.filter((key) => env.hasOwnProperty(key));

  return {
    valid: missing.length === 0,
    missing,
    present,
    allKeys: Object.keys(env),
  };
}
