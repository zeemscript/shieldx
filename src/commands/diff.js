import { parseEnv } from "../utils/parseEnv.js";
import chalk from "chalk";
import Table from "cli-table3";

export default function diff(file1, file2, options = {}) {
  try {
    // Validate inputs
    if (!file1 || !file2) {
      console.error(chalk.red("❌ Error: Both file paths are required"));
      process.exit(1);
    }

    const env1 = parseEnv(file1);
    const env2 = parseEnv(file2);

    const allKeys = new Set([...Object.keys(env1), ...Object.keys(env2)]);
    const differences = [];

    allKeys.forEach((key) => {
      const val1 = env1[key];
      const val2 = env2[key];

      if (val1 === undefined) {
        differences.push({
          key,
          status: "added",
          file1: chalk.gray("(not set)"),
          file2: val2 || chalk.gray("(empty)"),
        });
      } else if (val2 === undefined) {
        differences.push({
          key,
          status: "removed",
          file1: val1 || chalk.gray("(empty)"),
          file2: chalk.gray("(not set)"),
        });
      } else if (val1 !== val2) {
        differences.push({
          key,
          status: "modified",
          file1: val1 || chalk.gray("(empty)"),
          file2: val2 || chalk.gray("(empty)"),
        });
      }
    });

    // JSON output
    if (options.json) {
      const result = {
        file1,
        file2,
        totalKeys: allKeys.size,
        differences: differences.map((d) => ({
          key: d.key,
          status: d.status,
          value1: env1[d.key],
          value2: env2[d.key],
        })),
        unchanged: allKeys.size - differences.length,
        stats: {
          added: differences.filter((d) => d.status === "added").length,
          removed: differences.filter((d) => d.status === "removed").length,
          modified: differences.filter((d) => d.status === "modified").length,
        },
      };
      console.log(JSON.stringify(result, null, 2));
      process.exit(differences.length > 0 ? 1 : 0);
    }

    // Visual diff output
    console.log(
      chalk.bold(`\n📊 Diff: ${chalk.cyan(file1)} ↔ ${chalk.cyan(file2)}\n`)
    );

    if (differences.length === 0) {
      console.log(chalk.green("✅ Files are identical!"));
      console.log(chalk.gray(`   ${allKeys.size} variables match\n`));
      process.exit(0);
    }

    // Create table
    const table = new Table({
      head: [
        chalk.bold("Key"),
        chalk.bold("Status"),
        chalk.bold(file1),
        chalk.bold(file2),
      ],
      colWidths: [25, 12, 30, 30],
      wordWrap: true,
      style: {
        head: [],
        border: ["gray"],
      },
    });

    differences.forEach((diff) => {
      let statusIcon, statusColor, row;

      switch (diff.status) {
        case "added":
          statusIcon = "+ Added";
          statusColor = chalk.green;
          row = [
            statusColor(diff.key),
            statusColor(statusIcon),
            diff.file1,
            statusColor(diff.file2),
          ];
          break;
        case "removed":
          statusIcon = "- Removed";
          statusColor = chalk.red;
          row = [
            statusColor(diff.key),
            statusColor(statusIcon),
            statusColor(diff.file1),
            diff.file2,
          ];
          break;
        case "modified":
          statusIcon = "~ Modified";
          statusColor = chalk.yellow;
          row = [
            statusColor(diff.key),
            statusColor(statusIcon),
            chalk.red(diff.file1),
            chalk.green(diff.file2),
          ];
          break;
      }

      table.push(row);
    });

    console.log(table.toString());

    // Summary
    const stats = {
      added: differences.filter((d) => d.status === "added").length,
      removed: differences.filter((d) => d.status === "removed").length,
      modified: differences.filter((d) => d.status === "modified").length,
    };

    console.log(chalk.bold("\n📈 Summary:"));
    if (stats.added > 0) console.log(chalk.green(`   + ${stats.added} added`));
    if (stats.removed > 0)
      console.log(chalk.red(`   - ${stats.removed} removed`));
    if (stats.modified > 0)
      console.log(chalk.yellow(`   ~ ${stats.modified} modified`));
    console.log(
      chalk.gray(`   = ${allKeys.size - differences.length} unchanged\n`)
    );

    process.exit(1);
  } catch (err) {
    console.error(chalk.red(`❌ Error: ${err.message}`));
    process.exit(1);
  }
}
