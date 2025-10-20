# ⚡ Quick Start - ShieldX v2.0

## 🎯 Get Started in 30 Seconds

### Step 1: Install
```bash
npm install -g shieldx
# or use npx
npx shieldx init
```

### Step 2: Initialize Your Project
```bash
shieldx init
```

This interactive command will:
- ✅ Create `.env` and `.env.example`
- ✅ Set up `.shieldxignore` with smart defaults
- ✅ Add `.env` to `.gitignore`
- ✅ Optional: Set up pre-commit hooks

### Step 3: Start Using
```bash
# Scan for hardcoded secrets
shieldx scan ./src

# Fix found secrets interactively
shieldx fix ./src

# Compare environment files visually
shieldx diff .env .env.example
```

## 🎓 Common Workflows

### New Project Setup
```bash
shieldx init
# Follow the prompts - done in 30 seconds!
```

### Security Audit
```bash
# Scan with progress
shieldx scan ./src

# If secrets found, fix them
shieldx fix ./src

# Verify no secrets remain
shieldx scan ./src --quiet
```

### Environment Management
```bash
# Visual diff
shieldx diff .env .env.production

# Validate required vars
shieldx validate .env.production --keys "DB_URL,API_KEY"

# Generate new example file
shieldx generate .env --force
```

### CI/CD Integration
```bash
# In your CI pipeline
shieldx scan ./src --quiet          # Fails if secrets found
shieldx validate .env --config required.txt
shieldx compare .env.example .env.production --json
```

## 📋 All Commands

```bash
shieldx init              # 🚀 Interactive setup
shieldx scan <dir>        # 🛡️  Scan for secrets
shieldx fix <dir>         # 🔧 Auto-fix secrets
shieldx diff <f1> <f2>    # 🔍 Visual diff
shieldx compare <f1> <f2> # 📊 Compare files
shieldx generate <file>   # ⚡ Generate .env.example
shieldx validate <file>   # ✅ Validate env vars
```

## 🎨 Useful Flags

```bash
--json       # JSON output for automation
--verbose    # Detailed output
--quiet      # Minimal output
--force      # Skip confirmations
--auto       # Auto-mode (fix command)
--dry-run    # Preview changes
```

## 💡 Pro Tips

1. **Start with init**: Always run `shieldx init` first
2. **Use whitelist**: Create `.shieldxallow` for known false positives
3. **Use diff over compare**: Table view is clearer
4. **Enable pre-commit**: Catch secrets before they're committed
5. **Use quiet in CI**: `--quiet` flag for pipelines

## 🚀 Next Steps

- Read [V2_FEATURES.md](./V2_FEATURES.md) for all features
- Check [UPGRADE.md](./UPGRADE.md) if migrating from v1
- See [README.md](./README.md) for complete documentation

## 🆘 Need Help?

```bash
shieldx --help
shieldx scan --help
shieldx init --help
```

---

**Get started now:** `shieldx init` 🛡️
