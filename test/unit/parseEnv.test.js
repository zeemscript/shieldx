import { parseEnv, validateEnvFile } from "../../src/utils/parseEnv.js";
import { describe, it, expect } from "@jest/globals";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("parseEnv", () => {
  it("should parse a valid .env file", () => {
    const testFile = path.join(__dirname, "../fixtures/test1.env");
    const result = parseEnv(testFile);

    expect(result).toHaveProperty("DATABASE_URL");
    expect(result).toHaveProperty("API_KEY");
    expect(result).toHaveProperty("SECRET_KEY");
    expect(result).toHaveProperty("PORT");
    expect(result.PORT).toBe("3000");
  });

  it("should throw error for non-existent file", () => {
    expect(() => parseEnv("nonexistent.env")).toThrow("File not found");
  });

  it("should throw error for empty file path", () => {
    expect(() => parseEnv("")).toThrow("File path is required");
  });

  it("should skip comments and empty lines", () => {
    const testFile = path.join(__dirname, "../fixtures/test1.env");
    const result = parseEnv(testFile);

    // Should not include comment lines
    expect(Object.keys(result).filter((k) => k.startsWith("#"))).toHaveLength(
      0
    );
  });
});

describe("validateEnvFile", () => {
  it("should validate required keys are present", () => {
    const testFile = path.join(__dirname, "../fixtures/test1.env");
    const result = validateEnvFile(testFile, ["DATABASE_URL", "API_KEY"]);

    expect(result.valid).toBe(true);
    expect(result.missing).toHaveLength(0);
    expect(result.present).toContain("DATABASE_URL");
    expect(result.present).toContain("API_KEY");
  });

  it("should detect missing keys", () => {
    const testFile = path.join(__dirname, "../fixtures/test1.env");
    const result = validateEnvFile(testFile, ["DATABASE_URL", "MISSING_KEY"]);

    expect(result.valid).toBe(false);
    expect(result.missing).toContain("MISSING_KEY");
  });

  it("should return all keys when no required keys specified", () => {
    const testFile = path.join(__dirname, "../fixtures/test1.env");
    const result = validateEnvFile(testFile, []);

    expect(result.valid).toBe(true);
    expect(result.allKeys.length).toBeGreaterThan(0);
  });
});
