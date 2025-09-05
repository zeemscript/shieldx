import { Command } from "commander";
import compare from "./commands/compare.js";
import generate from "./commands/generate.js";
import { scanCode } from "./commands/scan.js";

const program = new Command();

program
  .name("shieldx")
  .description("A CLI tool to sync and validate .env files")
  .version("0.1.0");

program
  .command("compare <file1> <file2>")
  .description("Compare two .env files and show differences")
  .action(compare);

program
  .command("generate <file>")
  .description("Generate a .env.example file from an existing .env")
  .action(generate);

program
  .command("scan <dir>")
  .description("Scan codebase for hardcoded secrets")
  .action((dir) => scanCode(dir));

program.parse(process.argv);
