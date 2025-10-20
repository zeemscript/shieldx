import { validateEnvFile, parseEnv } from "../utils/parseEnv.js";
import chalk from "chalk";
import fs from "fs";

export default function validate(file, options = {}) {
  try {
    // Validate input
    if (!file) {
      console.error(chalk.red("❌ Error: File path is required"));
      process.exit(1);
    }

    let requiredKeys = [];

    // Load required keys from config file
    if (options.config) {
      if (!fs.existsSync(options.config)) {
        console.error(
          chalk.red(`❌ Error: Config file not found: ${options.config}`)
        );
        process.exit(1);
      }
      const configContent = fs.readFileSync(options.config, "utf-8");
      requiredKeys = configContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"));
    }

    // Load required keys from CLI
    if (options.keys) {
      requiredKeys = options.keys.split(",").map((k) => k.trim());
    }

    const result = validateEnvFile(file, requiredKeys);

    // JSON output
    if (options.json) {
      console.log(
        JSON.stringify(
          {
            file,
            valid: result.valid,
            totalKeys: result.allKeys.length,
            requiredKeys: requiredKeys.length,
            missing: result.missing,
            present: result.present,
          },
          null,
          2
        )
      );
      process.exit(result.valid ? 0 : 1);
    }

    // Regular output
    console.log(chalk.bold(`\n🔍 Validating ${chalk.cyan(file)}\n`));

    if (requiredKeys.length === 0) {
      console.log(
        chalk.yellow(
          "⚠️  No required keys specified. Use --keys or --config to specify required variables."
        )
      );
      console.log(
        chalk.gray(`   Found ${result.allKeys.length} keys in ${file}`)
      );

      if (options.verbose) {
        console.log(chalk.gray("\nAll keys:"));
        result.allKeys.forEach((key) => console.log(chalk.gray(`  - ${key}`)));
      }
      process.exit(0);
    }

    if (result.valid) {
      console.log(
        chalk.green(
          `✅ All ${requiredKeys.length} required variables are present!`
        )
      );

      if (options.verbose) {
        console.log(chalk.gray("\nPresent keys:"));
        result.present.forEach((key) => console.log(chalk.green(`  ✓ ${key}`)));
      }
      process.exit(0);
    } else {
      console.log(
        chalk.red(`❌ Missing ${result.missing.length} required variable(s):\n`)
      );
      result.missing.forEach((key) => console.log(chalk.red(`  ✗ ${key}`)));

      if (options.verbose && result.present.length > 0) {
        console.log(chalk.gray(`\n✓ Present (${result.present.length}):`));
        result.present.forEach((key) => console.log(chalk.gray(`  - ${key}`)));
      }

      console.log(chalk.yellow(`\n💡 Add the missing variables to ${file}`));
      process.exit(1);
    }
  } catch (err) {
    console.error(chalk.red(`❌ Error: ${err.message}`));
    process.exit(1);
  }
}
