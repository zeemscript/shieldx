import fs from "fs";

export function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const env = {};
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue; // skip comments
    const [key, ...rest] = line.split("=");
    env[key.trim()] = rest.join("=").trim();
  }

  return env;
}
