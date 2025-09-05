import { parseEnv } from "../utils/parseEnv.js";

export default function compare(file1, file2) {
  try {
    const env1 = parseEnv(file1);
    const env2 = parseEnv(file2);

    const keys1 = new Set(Object.keys(env1));
    const keys2 = new Set(Object.keys(env2));

    const missing = [...keys1].filter((k) => !keys2.has(k));
    const extra = [...keys2].filter((k) => !keys1.has(k));

    if (missing.length === 0 && extra.length === 0) {
      console.log("✅ Both files are in sync!");
    } else {
      if (missing.length > 0) {
        console.log("❌ Missing in", file2 + ":", missing.join(", "));
      }
      if (extra.length > 0) {
        console.log("⚠️ Extra in", file2 + ":", extra.join(", "));
      }
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}
