import fs from "fs";
import { parseEnv } from "../utils/parseEnv.js";

export default function generate(file) {
  try {
    const env = parseEnv(file);
    const keys = Object.keys(env);

    const exampleContent = keys.map((k) => `${k}=`).join("\n");

    fs.writeFileSync(".env.example", exampleContent);
    console.log(`✅ Generated .env.example with ${keys.length} keys`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
