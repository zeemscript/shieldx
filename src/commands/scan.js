import fs from "fs";
import path from "path";
import chalk from "chalk";

const SECRET_PATTERNS = [
  /sk_live_[0-9a-zA-Z]{20,}/, // Stripe live keys
  /sk_test_[0-9a-zA-Z]{20,}/, // Stripe test keys
  /AIza[0-9A-Za-z\-_]{35}/, // Google API keys
  /ghp_[0-9a-zA-Z]{36}/, // GitHub personal access tokens
  /(password\s*=\s*['"].+['"])/i, // Hardcoded passwords
  /(secret\s*=\s*['"].+['"])/i, // Hardcoded secrets
  /['"][A-Za-z0-9\-_]{32,}['"]/, // Generic long strings
];

/**
 * Recursively walk through files in a directory
 */
function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, filelist);
    } else if (/\.(js|ts|jsx|tsx|py|go|rb|java)$/.test(file)) {
      filelist.push(filepath);
    }
  });
  return filelist;
}

/**
 * Scan project files for hardcoded secrets
 */
export function scanCode(baseDir) {
  console.log(chalk.blue(`🔍 Scanning ${baseDir} for hardcoded secrets...\n`));

  const files = walk(baseDir);
  let issuesFound = 0;

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n");

    lines.forEach((line, idx) => {
      SECRET_PATTERNS.forEach((pattern) => {
        if (pattern.test(line)) {
          issuesFound++;
          console.log(
            chalk.red(`🚨 Secret detected in ${file}:${idx + 1}\n`) +
              chalk.yellow(`    ${line.trim()}\n`) +
              chalk.green(`👉 Suggestion: Move this value to your .env file\n`)
          );
        }
      });
    });
  });

  if (issuesFound === 0) {
    console.log(chalk.green("✅ No hardcoded secrets found! 🎉"));
  } else {
    console.log(chalk.red(`\n⚠️  Found ${issuesFound} potential issues.`));
  }
}
