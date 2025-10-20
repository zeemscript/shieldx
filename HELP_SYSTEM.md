# 🎯 ShieldX Help System & Aliases

Complete guide to the enhanced help system and command aliases in ShieldX v2.0.

## ✨ New Features

### 1. **Beautiful Help Output**

- 🎨 Color-coded and formatted
- 📚 Examples included in every help screen
- 💡 Tips and best practices
- 🔗 Documentation links

### 2. **Command Aliases**

- ⚡ Short aliases for all commands
- 📝 Multiple aliases for some commands
- 🚀 Faster workflow

### 3. **Command-Specific Help**

- 🎯 Detailed help for each command
- 📋 Usage examples
- 🔧 All available options

---

## 📖 Using Help

### Main Help

```bash
shieldx --help
shieldx -h
```

**Output includes:**

- All available commands with descriptions
- Command aliases shown inline
- Common usage examples
- Tips for getting started
- Documentation links

### Command-Specific Help

```bash
shieldx <command> --help
shieldx <alias> --help
```

**Examples:**

```bash
shieldx scan --help
shieldx s --help          # Same using alias
shieldx init --help
shieldx i --help          # Same using alias
```

---

## 🎯 Complete Alias Reference

| Full Command | Aliases      | Quick Example                 |
| ------------ | ------------ | ----------------------------- |
| `init`       | `i`          | `shieldx i`                   |
| `scan`       | `s`          | `shieldx s .`                 |
| `diff`       | `d`          | `shieldx d .env .env.prod`    |
| `compare`    | `c`          | `shieldx c .env .env.example` |
| `generate`   | `g`, `gen`   | `shieldx g .env`              |
| `validate`   | `v`, `check` | `shieldx v .env`              |
| `fix`        | `f`          | `shieldx f ./src`             |

---

## 📚 Detailed Command Help

### `shieldx init` / `shieldx i`

**Description:** Initialize ShieldX in your project (interactive)

**Options:**

- `-f, --force` - Force reinitialize even if files exist
- `-h, --help` - Show help

**Examples:**

```bash
shieldx init              # Interactive setup
shieldx i                 # Same using alias
shieldx init --force      # Reinitialize existing project
```

---

### `shieldx scan` / `shieldx s`

**Description:** Scan codebase for hardcoded secrets (with progress)

**Options:**

- `-j, --json` - Output results in JSON format
- `-v, --verbose` - Show detailed output including skipped files
- `-q, --quiet` - Suppress non-error output
- `-h, --help` - Show help

**Examples:**

```bash
shieldx scan ./src                       # Scan directory
shieldx s .                              # Scan current dir (alias)
shieldx scan ./src --json                # JSON output for CI/CD
shieldx scan ./src --quiet               # Minimal output
shieldx scan ./src --verbose             # Show all details
```

**Tips:**

- Create `.shieldxignore` to skip files
- Create `.shieldxallow` to whitelist known safe patterns
- Comments are automatically skipped (no false positives!)

---

### `shieldx diff` / `shieldx d`

**Description:** Show visual diff between two .env files (table view)

**Options:**

- `-j, --json` - Output results in JSON format
- `-h, --help` - Show help

**Examples:**

```bash
shieldx diff .env .env.prod              # Beautiful table diff
shieldx d .env .env.example              # Same using alias
shieldx diff .env .env.staging --json    # JSON output
```

**Tip:** Use `diff` for visual comparison, `compare` for simple text output

---

### `shieldx compare` / `shieldx c`

**Description:** Compare two .env files and show differences

**Options:**

- `-j, --json` - Output results in JSON format
- `-v, --verbose` - Show detailed output
- `-h, --help` - Show help

**Examples:**

```bash
shieldx compare .env .env.prod           # Compare files
shieldx c .env .env.example              # Same using alias
shieldx compare .env .env.prod --json    # JSON output
```

---

### `shieldx generate` / `shieldx g` / `shieldx gen`

**Description:** Generate a .env.example file from an existing .env

**Options:**

- `-o, --output <file>` - Output file path (default: .env.example)
- `-f, --force` - Overwrite existing file without confirmation
- `-j, --json` - Output results in JSON format
- `-v, --verbose` - Show detailed output
- `-h, --help` - Show help

**Examples:**

```bash
shieldx generate .env                    # Create .env.example
shieldx g .env                           # Same using alias
shieldx gen .env                         # Alternative alias
shieldx generate .env -o .env.template   # Custom output
shieldx generate .env --force            # Overwrite existing
shieldx generate .env --verbose          # Show all keys
```

---

### `shieldx validate` / `shieldx v` / `shieldx check`

**Description:** Validate .env file has required variables

**Options:**

- `-k, --keys <keys>` - Comma-separated list of required keys
- `-c, --config <file>` - Path to file with required keys (one per line)
- `-j, --json` - Output results in JSON format
- `--verbose` - Show detailed output
- `-h, --help` - Show help

**Examples:**

```bash
shieldx validate .env --keys "API_KEY,SECRET"
shieldx v .env --keys "DB_URL"           # Using alias
shieldx check .env --keys "API_KEY"      # Alternative alias
shieldx validate .env --config required.txt
shieldx validate .env.prod --json        # JSON output
```

**Tip:** Create a `required-keys.txt` file with required vars (one per line)

---

### `shieldx fix` / `shieldx f`

**Description:** Interactively move hardcoded secrets to .env

**Options:**

- `--auto` - Auto-fix all critical and high severity secrets
- `--dry-run` - Show what would be fixed without making changes
- `--env-file <file>` - Target .env file (default: .env)
- `-h, --help` - Show help

**Examples:**

```bash
shieldx fix ./src                        # Interactive fixing
shieldx f ./src                          # Same using alias
shieldx fix ./src --auto                 # Auto-fix critical secrets
shieldx fix ./src --dry-run              # Preview changes only
shieldx fix ./src --env-file .env.local  # Custom .env file
```

**Note:** This command modifies your code files! Use `--dry-run` first.

---

## 💡 Pro Tips

### 1. Use Aliases for Speed

```bash
# Slower
shieldx scan ./src
shieldx generate .env
shieldx validate .env

# Faster with aliases
shieldx s ./src
shieldx g .env
shieldx v .env
```

### 2. Get Help Anytime

```bash
# Works with full commands
shieldx scan --help

# Works with aliases too
shieldx s --help
```

### 3. Combine Aliases with Options

```bash
shieldx s . --json        # Scan current dir, JSON output
shieldx g .env --verbose  # Generate with verbose
shieldx v .env --keys "API_KEY,SECRET"
```

### 4. Use Full Names in Scripts

For clarity in CI/CD and scripts, use full command names:

```bash
# Good for scripts (clear)
shieldx scan ./src --quiet
shieldx validate .env --keys "REQUIRED_VARS"

# Good for interactive (fast)
shieldx s .
shieldx v .env
```

---

## 🎨 Help Output Features

### Color Coding

- 🟢 **Green** - Commands and actions
- 🔵 **Blue** - Links and documentation
- 🟡 **Yellow** - Tips and warnings
- ⚪ **Gray** - Comments and metadata
- 🔴 **Red** - Errors (when applicable)

### Structure

1. **Header** - ShieldX branding and tagline
2. **Usage** - Command syntax
3. **Description** - What the command does
4. **Options** - All available flags
5. **Examples** - Real-world usage
6. **Tips** - Best practices
7. **Footer** - Links and credits

---

## 📱 Quick Reference Card

```bash
# Get started
shieldx i                 # Initialize project

# Security
shieldx s .               # Scan for secrets
shieldx f ./src           # Fix secrets

# Environment management
shieldx d .env .env.prod  # Visual diff
shieldx c .env .env.prod  # Simple compare
shieldx g .env            # Generate example
shieldx v .env            # Validate vars

# Help
shieldx --help            # Main help
shieldx s --help          # Scan help
<command> --help          # Any command help
```

---

## 🎓 Learning Path

### Step 1: Explore Main Help

```bash
shieldx --help
```

See all available commands and examples.

### Step 2: Try a Command

```bash
shieldx i
```

Run the interactive init to set up.

### Step 3: Get Command-Specific Help

```bash
shieldx scan --help
```

Learn about specific command options.

### Step 4: Use Aliases

```bash
shieldx s .
```

Speed up your workflow with short aliases.

---

## 📖 Additional Resources

- **Full Documentation:** See `README.md`
- **Version 2 Features:** See `V2_FEATURES.md`
- **Quick Start:** See `QUICK_START_V2.md`
- **Aliases Reference:** See `ALIASES.md`
- **GitHub:** https://github.com/zeemscript/shieldx

---

**Made with ❤️ for developers who care about security**

Need help? Run `shieldx --help` or visit our [GitHub](https://github.com/zeemscript/shieldx/issues)
