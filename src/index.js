import { Command } from "commander";
import chalk from "chalk";
import compare from "./commands/compare.js";
import generate from "./commands/generate.js";
import { scanCode } from "./commands/scan.js";
import validate from "./commands/validate.js";
import init from "./commands/init.js";
import diff from "./commands/diff.js";
import fix from "./commands/fix.js";

const program = new Command();

// Custom help configuration
program.configureHelp({
  sortSubcommands: false,
  sortOptions: false,
});

// Custom help header
program.addHelpText("beforeAll", () => {
  return `
${chalk.bold.cyan("🛡️  ShieldX v2.0")}
${chalk.gray("━".repeat(50))}
${chalk.bold("Secure, compare, and validate .env files with ease")}
`;
});

// Custom help footer
program.addHelpText("after", () => {
  return `
${chalk.cyan("📚 Examples:")}
  ${chalk.gray("# Quick setup")}
  $ ${chalk.green("shieldx init")}                    ${chalk.gray(
    "Interactive project setup"
  )}
  $ ${chalk.green("shieldx i")}                       ${chalk.gray(
    "(alias for init)"
  )}

  ${chalk.gray("# Scan for secrets")}
  $ ${chalk.green("shieldx scan ./src")}              ${chalk.gray(
    "Scan directory"
  )}
  $ ${chalk.green("shieldx s .")}                     ${chalk.gray(
    "(alias, scan current dir)"
  )}
  $ ${chalk.green("shieldx scan . --json")}           ${chalk.gray(
    "JSON output for CI/CD"
  )}

  ${chalk.gray("# Compare & diff")}
  $ ${chalk.green("shieldx diff .env .env.prod")}     ${chalk.gray(
    "Visual table diff"
  )}
  $ ${chalk.green("shieldx d .env .env.prod")}        ${chalk.gray(
    "(alias for diff)"
  )}
  $ ${chalk.green("shieldx compare .env .env.prod")}  ${chalk.gray(
    "Simple comparison"
  )}

  ${chalk.gray("# Generate & validate")}
  $ ${chalk.green("shieldx generate .env")}           ${chalk.gray(
    "Create .env.example"
  )}
  $ ${chalk.green("shieldx g .env")}                  ${chalk.gray(
    "(alias for generate)"
  )}
  $ ${chalk.green('shieldx validate .env --keys "API_KEY,SECRET"')}

  ${chalk.gray("# Fix secrets")}
  $ ${chalk.green("shieldx fix ./src")}               ${chalk.gray(
    "Interactive secret fixing"
  )}
  $ ${chalk.green("shieldx fix ./src --auto")}        ${chalk.gray(
    "Auto-fix critical secrets"
  )}

${chalk.cyan("💡 Tips:")}
  • Use ${chalk.green("--help")} with any command for detailed options
  • Add ${chalk.green("--json")} to commands for CI/CD integration
  • Create ${chalk.yellow(".shieldxallow")} to whitelist known safe patterns
  • Run ${chalk.green("shieldx init")} to get started quickly

${chalk.cyan("📖 Documentation:")}
  • Full guide: ${chalk.blue("https://github.com/zeemscript/shieldx")}
  • Report issues: ${chalk.blue("https://github.com/zeemscript/shieldx/issues")}

${chalk.gray("━".repeat(50))}
${chalk.gray("Made with ❤️  for developers who care about security")}
`;
});

program
  .name("shieldx")
  .description(
    "🛡️  A powerful CLI tool to secure, compare, and validate .env files"
  )
  .version("2.0.0", "-v, --version", "Show version number")
  .helpOption("-h, --help", "Show help information");

// Init command - Interactive setup
program
  .command("init")
  .alias("i")
  .description("🚀 Initialize ShieldX in your project (interactive)")
  .option("-f, --force", "Force reinitialize even if files exist")
  .addHelpText(
    "after",
    `
${chalk.cyan("Examples:")}
  $ shieldx init              ${chalk.gray("# Interactive setup")}
  $ shieldx i                 ${chalk.gray("# Same using alias")}
  $ shieldx init --force      ${chalk.gray("# Reinitialize existing project")}
  `
  )
  .action((options) => init(options));

// Compare command
program
  .command("compare <file1> <file2>")
  .alias("c")
  .description("📊 Compare two .env files and show differences")
  .option("-j, --json", "Output results in JSON format")
  .option("-v, --verbose", "Show detailed output")
  .addHelpText(
    "after",
    `
${chalk.cyan("Examples:")}
  $ shieldx compare .env .env.prod           ${chalk.gray("# Compare files")}
  $ shieldx c .env .env.example              ${chalk.gray("# Same using alias")}
  $ shieldx compare .env .env.prod --json    ${chalk.gray("# JSON output")}
  `
  )
  .action((file1, file2, options) => compare(file1, file2, options));

// Diff command - Visual diff
program
  .command("diff <file1> <file2>")
  .alias("d")
  .description("🔍 Show visual diff between two .env files (table view)")
  .option("-j, --json", "Output results in JSON format")
  .addHelpText(
    "after",
    `
${chalk.cyan("Examples:")}
  $ shieldx diff .env .env.prod              ${chalk.gray(
    "# Beautiful table diff"
  )}
  $ shieldx d .env .env.example              ${chalk.gray("# Same using alias")}
  $ shieldx diff .env .env.staging --json    ${chalk.gray("# JSON output")}

${chalk.yellow("💡 Tip:")} Use ${chalk.green(
      "diff"
    )} for visual comparison, ${chalk.green("compare")} for simple text output
  `
  )
  .action((file1, file2, options) => diff(file1, file2, options));

// Generate command
program
  .command("generate <file>")
  .alias("g")
  .alias("gen")
  .description("⚡ Generate a .env.example file from an existing .env")
  .option("-o, --output <file>", "Output file path (default: .env.example)")
  .option("-f, --force", "Overwrite existing file without confirmation")
  .option("-j, --json", "Output results in JSON format")
  .option("-v, --verbose", "Show detailed output")
  .addHelpText(
    "after",
    `
${chalk.cyan("Examples:")}
  $ shieldx generate .env                    ${chalk.gray(
    "# Create .env.example"
  )}
  $ shieldx g .env                           ${chalk.gray("# Same using alias")}
  $ shieldx generate .env -o .env.template   ${chalk.gray("# Custom output")}
  $ shieldx generate .env --force            ${chalk.gray(
    "# Overwrite existing"
  )}
  $ shieldx generate .env --verbose          ${chalk.gray("# Show all keys")}
  `
  )
  .action((file, options) => generate(file, options));

// Scan command - Enhanced with progress
program
  .command("scan <dir>")
  .alias("s")
  .description("🛡️  Scan codebase for hardcoded secrets (with progress)")
  .option("-j, --json", "Output results in JSON format")
  .option("-v, --verbose", "Show detailed output including skipped files")
  .option("-q, --quiet", "Suppress non-error output")
  .addHelpText(
    "after",
    `
${chalk.cyan("Examples:")}
  $ shieldx scan ./src                       ${chalk.gray("# Scan directory")}
  $ shieldx s .                              ${chalk.gray(
    "# Scan current dir (alias)"
  )}
  $ shieldx scan ./src --json                ${chalk.gray(
    "# JSON output for CI/CD"
  )}
  $ shieldx scan ./src --quiet               ${chalk.gray("# Minimal output")}
  $ shieldx scan ./src --verbose             ${chalk.gray("# Show all details")}

${chalk.yellow("💡 Tips:")}
  • Create ${chalk.cyan(".shieldxignore")} to skip files
  • Create ${chalk.cyan(".shieldxallow")} to whitelist known safe patterns
  • Comments are automatically skipped (no false positives!)
  `
  )
  .action((dir, options) => scanCode(dir, options));

// Validate command
program
  .command("validate <file>")
  .alias("v")
  .alias("check")
  .description("✅ Validate .env file has required variables")
  .option("-k, --keys <keys>", "Comma-separated list of required keys")
  .option(
    "-c, --config <file>",
    "Path to file with required keys (one per line)"
  )
  .option("-j, --json", "Output results in JSON format")
  .option("--verbose", "Show detailed output")
  .addHelpText(
    "after",
    `
${chalk.cyan("Examples:")}
  $ shieldx validate .env --keys "API_KEY,SECRET"
  $ shieldx v .env --keys "DB_URL"           ${chalk.gray("# Using alias")}
  $ shieldx validate .env --config required.txt
  $ shieldx validate .env.prod --json        ${chalk.gray("# JSON output")}

${chalk.yellow("💡 Tip:")} Create a ${chalk.cyan(
      "required-keys.txt"
    )} file with required vars (one per line)
  `
  )
  .action((file, options) => validate(file, options));

// Fix command - Auto-fix secrets
program
  .command("fix <dir>")
  .alias("f")
  .description("🔧 Interactively move hardcoded secrets to .env")
  .option("--auto", "Auto-fix all critical and high severity secrets")
  .option("--dry-run", "Show what would be fixed without making changes")
  .option("--env-file <file>", "Target .env file (default: .env)")
  .addHelpText(
    "after",
    `
${chalk.cyan("Examples:")}
  $ shieldx fix ./src                        ${chalk.gray(
    "# Interactive fixing"
  )}
  $ shieldx f ./src                          ${chalk.gray("# Same using alias")}
  $ shieldx fix ./src --auto                 ${chalk.gray(
    "# Auto-fix critical secrets"
  )}
  $ shieldx fix ./src --dry-run              ${chalk.gray(
    "# Preview changes only"
  )}
  $ shieldx fix ./src --env-file .env.local  ${chalk.gray("# Custom .env file")}

${chalk.yellow(
  "💡 Note:"
)} This command modifies your code files! Use ${chalk.cyan("--dry-run")} first.
  `
  )
  .action((dir, options) => fix(dir, options));

program.parse(process.argv);
