# 🎉 Upgrade Guide: v1.0 → v2.0

## What Changed?

ShieldX v2.0 is a **massive upgrade** focused on ease of use and power. All your existing commands still work - we just made everything better!

## ✅ No Breaking Changes

**Good news:** Your existing workflows continue to work!

```bash
# All of these still work exactly the same
shieldx scan ./src
shieldx compare .env .env.prod
shieldx generate .env
shieldx validate .env --keys "API_KEY"
```

## 🆕 What's New

### 1. Interactive Init (New!)
```bash
# Instead of manual setup...
shieldx init  # Easy peasy! 🎉
```

### 2. Visual Diff (New!)
```bash
# Better than compare for visual diff
shieldx diff .env .env.prod
```

### 3. Auto-Fix Secrets (New!)
```bash
# Automatically move secrets to .env
shieldx fix ./src
```

### 4. Progress Indicators
Scan command now shows real-time progress:
```
⠹ Scanning 47/120 files...
```

### 5. Whitelist Support
Create `.shieldxallow` to reduce false positives.

### 6. No More Comment False Positives
Comments are now properly ignored! 🎊

## 📝 Recommended Actions

### Step 1: Update
```bash
npm install -g shieldx@latest
```

### Step 2: Reinitialize (Optional)
Get all the new goodies:
```bash
shieldx init --force
```

This creates:
- `.shieldxallow` - Whitelist file
- Updated `.shieldxignore`
- Pre-commit hooks (optional)

### Step 3: Try New Commands
```bash
# Visual diff
shieldx diff .env .env.example

# Fix secrets interactively
shieldx fix ./src
```

## 🔄 Command Mappings

| v1.0 | v2.0 (Better) | Why? |
|------|---------------|------|
| Manual setup | `shieldx init` | Interactive & faster |
| `compare` | `diff` | Beautiful table view |
| Manual fixes | `fix` | Automated workflow |
| Plain output | Progress spinners | Better UX |

## 💾 New Files You May See

- `.shieldxallow` - Whitelist for known safe patterns
- `.shieldxrc` - Config file (coming soon)
- Better `.shieldxignore` from init

## 🐛 Fixed Issues

1. ✅ Comments no longer flagged as secrets
2. ✅ Better progress feedback
3. ✅ Reduced false positives
4. ✅ Clearer error messages
5. ✅ Faster scanning with smart filtering

## 🎯 Quick Start for v2.0

```bash
# New project
shieldx init

# Scan with progress
shieldx scan ./src

# Fix found secrets
shieldx fix ./src

# Visual diff
shieldx diff .env .env.prod
```

## 📞 Need Help?

- [Full v2 Features](./V2_FEATURES.md)
- [GitHub Issues](https://github.com/zeemscript/shieldx/issues)
- [README](./README.md)

---

**Enjoy v2.0!** 🚀
