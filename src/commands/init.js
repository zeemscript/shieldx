import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";

export default async function init(options = {}) {
  try {
    console.log(chalk.bold.cyan("\n🛡️  ShieldX Project Setup\n"));

    // Check if already initialized
    const hasEnv = fs.existsSync(".env");
    const hasExample = fs.existsSync(".env.example");
    const hasIgnore = fs.existsSync(".shieldxignore");

    if (hasEnv && hasExample && hasIgnore && !options.force) {
      console.log(chalk.yellow("⚠️  Project already initialized!"));
      console.log(chalk.gray("   Use --force to reinitialize\n"));

      const { proceed } = await inquirer.prompt([
        {
          type: "confirm",
          name: "proceed",
          message: "Continue anyway?",
          default: false,
        },
      ]);

      if (!proceed) {
        process.exit(0);
      }
    }

    // Interactive setup
    const answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "createEnv",
        message: "Create .env file?",
        default: !hasEnv,
        when: () => !hasEnv,
      },
      {
        type: "confirm",
        name: "createExample",
        message: "Create .env.example file?",
        default: !hasExample,
        when: () => !hasExample,
      },
      {
        type: "confirm",
        name: "createIgnore",
        message: "Create .shieldxignore file?",
        default: !hasIgnore,
        when: () => !hasIgnore,
      },
      {
        type: "checkbox",
        name: "envVars",
        message: "Select common environment variables to include:",
        choices: [
          { name: "DATABASE_URL", checked: true },
          { name: "API_KEY", checked: true },
          { name: "SECRET_KEY", checked: true },
          { name: "PORT", checked: true },
          { name: "NODE_ENV", checked: true },
          { name: "JWT_SECRET" },
          { name: "REDIS_URL" },
          { name: "AWS_ACCESS_KEY_ID" },
          { name: "AWS_SECRET_ACCESS_KEY" },
          { name: "STRIPE_API_KEY" },
          { name: "SENDGRID_API_KEY" },
          { name: "GOOGLE_CLIENT_ID" },
          { name: "GOOGLE_CLIENT_SECRET" },
        ],
        when: (answers) => answers.createEnv || answers.createExample,
      },
      {
        type: "confirm",
        name: "setupGitignore",
        message: "Add .env to .gitignore?",
        default: true,
      },
      {
        type: "confirm",
        name: "setupPreCommit",
        message: "Set up pre-commit hook for scanning?",
        default: false,
      },
    ]);

    console.log(chalk.blue("\n📝 Setting up your project...\n"));

    // Create .env file
    if (answers.createEnv) {
      const envContent = answers.envVars.map((key) => `${key}=`).join("\n");
      fs.writeFileSync(".env", envContent);
      console.log(chalk.green("✅ Created .env"));
    }

    // Create .env.example
    if (answers.createExample) {
      const exampleContent = [
        "# Environment Variables",
        "# Copy this file to .env and fill in your values",
        "",
        ...answers.envVars.map((key) => `${key}=`),
      ].join("\n");
      fs.writeFileSync(".env.example", exampleContent);
      console.log(chalk.green("✅ Created .env.example"));
    }

    // Create .shieldxignore
    if (answers.createIgnore) {
      const ignoreContent = `# ShieldX Ignore Patterns
# Files and directories to skip during security scans

# Test files
**/test/**
**/tests/**
**/__tests__/**
*.test.js
*.test.ts
*.spec.js
*.spec.ts

# Documentation
*.md
docs/

# Example and sample files
*.example.*
*.sample.*
*.template.*

# Build output
dist/
build/
coverage/

# Dependencies
node_modules/
vendor/
`;
      fs.writeFileSync(".shieldxignore", ignoreContent);
      console.log(chalk.green("✅ Created .shieldxignore"));
    }

    // Update .gitignore
    if (answers.setupGitignore) {
      const gitignorePath = ".gitignore";
      let gitignoreContent = "";

      if (fs.existsSync(gitignorePath)) {
        gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
      }

      const envPatterns = [".env", ".env.local", ".env.*.local"];
      const missing = envPatterns.filter(
        (pattern) => !gitignoreContent.includes(pattern)
      );

      if (missing.length > 0) {
        const toAdd = [
          "",
          "# Environment files (added by ShieldX)",
          ...missing,
        ].join("\n");
        fs.appendFileSync(gitignorePath, toAdd);
        console.log(chalk.green("✅ Updated .gitignore"));
      } else {
        console.log(chalk.gray("   .gitignore already configured"));
      }
    }

    // Setup pre-commit hook
    if (answers.setupPreCommit) {
      const hooksDir = ".git/hooks";
      const preCommitPath = path.join(hooksDir, "pre-commit");

      if (!fs.existsSync(hooksDir)) {
        console.log(
          chalk.yellow("⚠️  Not a git repository. Skipping hook setup.")
        );
      } else {
        const hookContent = `#!/bin/bash
# ShieldX pre-commit hook
# Scan for secrets before committing

echo "🛡️  Running ShieldX security scan..."
npx shieldx scan . --quiet

if [ $? -ne 0 ]; then
  echo "❌ Security issues detected! Fix them before committing."
  echo "   Run 'shieldx scan .' to see details"
  exit 1
fi

echo "✅ No secrets detected!"
`;

        fs.writeFileSync(preCommitPath, hookContent, { mode: 0o755 });
        console.log(chalk.green("✅ Created pre-commit hook"));
      }
    }

    // Summary
    console.log(chalk.bold.green("\n✨ Project setup complete!\n"));
    console.log(chalk.cyan("Next steps:"));
    console.log(chalk.gray("  1. Fill in your .env file with actual values"));
    console.log(chalk.gray("  2. Run 'shieldx scan .' to check for secrets"));
    console.log(chalk.gray("  3. Run 'shieldx validate .env' to verify setup"));
    console.log(
      chalk.gray("  4. Commit .env.example (but never commit .env!)\n")
    );

    console.log(chalk.cyan("Useful commands:"));
    console.log(
      chalk.gray("  shieldx scan .          # Scan for hardcoded secrets")
    );
    console.log(chalk.gray("  shieldx compare .env .env.example"));
    console.log(
      chalk.gray('  shieldx validate .env --keys "DATABASE_URL,API_KEY"')
    );
    console.log();

    process.exit(0);
  } catch (err) {
    if (err.isTtyError) {
      console.error(
        chalk.red("❌ Error: Prompts cannot be rendered in this environment")
      );
    } else {
      console.error(chalk.red(`❌ Error: ${err.message}`));
    }
    process.exit(1);
  }
}
