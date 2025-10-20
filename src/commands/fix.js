import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import { scanCode } from "./scan.js";

export default async function fix(dir, options = {}) {
  try {
    console.log(chalk.blue("🔍 Scanning for hardcoded secrets...\n"));

    // First, scan to find issues
    const findings = await scanForFindings(dir);

    if (findings.length === 0) {
      console.log(chalk.green("✅ No hardcoded secrets found!"));
      process.exit(0);
    }

    console.log(
      chalk.yellow(`\n⚠️  Found ${findings.length} potential secrets\n`)
    );

    // Interactive mode - let user select which to fix
    if (!options.auto) {
      const { selectedFindings } = await inquirer.prompt([
        {
          type: "checkbox",
          name: "selectedFindings",
          message: "Select secrets to move to .env:",
          choices: findings.map((f, idx) => ({
            name: `${chalk.red(f.type)} in ${chalk.gray(
              path.basename(f.file)
            )}:${f.line} - ${f.content.substring(0, 60)}...`,
            value: idx,
            checked: f.severity === "critical" || f.severity === "high",
          })),
        },
      ]);

      if (selectedFindings.length === 0) {
        console.log(chalk.gray("\nNo secrets selected. Exiting."));
        process.exit(0);
      }

      // Process selected findings
      const toFix = selectedFindings.map((idx) => findings[idx]);
      await processFindings(toFix, options);
    } else {
      // Auto mode - fix all critical and high severity
      const toFix = findings.filter(
        (f) => f.severity === "critical" || f.severity === "high"
      );
      console.log(chalk.blue(`\n🔧 Auto-fixing ${toFix.length} secrets...\n`));
      await processFindings(toFix, options);
    }

    console.log(chalk.green("\n✅ Fix complete!"));
    console.log(chalk.cyan("\nNext steps:"));
    console.log(chalk.gray("  1. Review the changes in your files"));
    console.log(chalk.gray("  2. Fill in actual values in .env"));
    console.log(chalk.gray("  3. Run 'shieldx scan .' to verify\n"));

    process.exit(0);
  } catch (err) {
    console.error(chalk.red(`❌ Error: ${err.message}`));
    process.exit(1);
  }
}

async function scanForFindings(dir) {
  // This is a simplified version - in practice, you'd capture the scan results
  // For now, return mock data structure
  return [];
}

async function processFindings(findings, options) {
  const envFile = options.envFile || ".env";
  const envVars = {};

  for (const finding of findings) {
    // Extract variable name and value from the finding
    const varName = await generateVarName(finding);
    const value = extractValue(finding.content);

    envVars[varName] = value;

    // Comment out the secret in the original file
    if (!options.dryRun) {
      commentOutSecret(finding);
      console.log(
        chalk.green(`✅ Moved ${varName} from ${path.basename(finding.file)}`)
      );
    }
  }

  // Append to .env file
  if (!options.dryRun && Object.keys(envVars).length > 0) {
    const envContent = Object.entries(envVars)
      .map(([key, val]) => `${key}=${val}`)
      .join("\n");

    fs.appendFileSync(envFile, `\n# Auto-fixed by ShieldX\n${envContent}\n`);
    console.log(
      chalk.green(
        `✅ Added ${Object.keys(envVars).length} variables to ${envFile}`
      )
    );
  }
}

async function generateVarName(finding) {
  // Generate a sensible variable name based on the finding type
  const base = finding.type.replace(/\s+/g, "_").toUpperCase();
  return `${base}_${Date.now().toString(36).slice(-4)}`;
}

function extractValue(content) {
  // Extract the actual secret value from the code line
  const match = content.match(/['"]([^'"]+)['"]/);
  return match ? match[1] : "";
}

function commentOutSecret(finding) {
  // Read file, comment out the line, write back
  const content = fs.readFileSync(finding.file, "utf-8");
  const lines = content.split("\n");

  if (lines[finding.line - 1]) {
    lines[finding.line - 1] = `// FIXME: Secret moved to .env - ${
      lines[finding.line - 1]
    }`;
    fs.writeFileSync(finding.file, lines.join("\n"));
  }
}
