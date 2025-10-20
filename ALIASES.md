# 🎯 ShieldX Command Aliases

Quick reference for all available command aliases.

## Command Aliases

| Command    | Aliases      | Description                         |
| ---------- | ------------ | ----------------------------------- |
| `init`     | `i`          | Initialize ShieldX in your project  |
| `scan`     | `s`          | Scan codebase for hardcoded secrets |
| `diff`     | `d`          | Show visual diff between files      |
| `compare`  | `c`          | Compare two files                   |
| `generate` | `g`, `gen`   | Generate .env.example               |
| `validate` | `v`, `check` | Validate required variables         |
| `fix`      | `f`          | Auto-fix hardcoded secrets          |

## Examples

### Using Full Commands

```bash
shieldx init
shieldx scan ./src
shieldx diff .env .env.prod
shieldx compare .env .env.example
shieldx generate .env
shieldx validate .env --keys "API_KEY"
shieldx fix ./src
```

### Using Aliases (Faster!)

```bash
shieldx i              # init
shieldx s .            # scan current directory
shieldx d .env .env.prod   # diff
shieldx c .env .env.example  # compare
shieldx g .env         # generate
shieldx gen .env       # generate (alternative)
shieldx v .env --keys "API_KEY"  # validate
shieldx check .env     # validate (alternative)
shieldx f ./src        # fix
```

## Global Options

All commands support these global flags:

- `-h, --help` - Show help
- `-v, --version` - Show version
- `-j, --json` - JSON output (where applicable)
- `--verbose` - Verbose output (where applicable)
- `--quiet` - Quiet mode (where applicable)

## Getting Help

### Main Help

```bash
shieldx --help
shieldx -h
```

### Command-Specific Help

```bash
shieldx init --help
shieldx scan --help
shieldx diff --help
# etc.
```

### Using Aliases for Help

```bash
shieldx i --help       # init help
shieldx s --help       # scan help
shieldx d --help       # diff help
```

## Pro Tips

1. **Save Keystrokes**: Use single-letter aliases for frequently used commands

   ```bash
   shieldx s .        # Instead of: shieldx scan .
   shieldx i          # Instead of: shieldx init
   ```

2. **Combine with Options**: Aliases work with all options

   ```bash
   shieldx s . --json        # Scan with JSON output
   shieldx g .env --verbose  # Generate with verbose
   ```

3. **Script-Friendly**: Use full names in scripts for clarity

   ```bash
   # In CI/CD - use full names
   shieldx scan ./src --quiet
   shieldx validate .env --keys "REQUIRED_VARS"

   # Interactive - use aliases
   shieldx s .
   shieldx v .env
   ```

## All Available Commands

Run `shieldx --help` to see the complete list with examples and tips!

```bash
shieldx --help
```

---

**Made with ❤️ for developers who care about security**
