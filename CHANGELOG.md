# Changelog

All notable changes to ShieldX will be documented in this file.

## [1.0.0] - 2025-10-20

### 🎉 Major Release - Production Ready!

### Added

- ✅ **Validate command** - Check if .env files have required variables

  - Support for comma-separated keys via `--keys`
  - Support for config file via `--config`
  - JSON output option
  - Verbose mode to show all keys

- 📊 **JSON output** for all commands

  - `--json` flag for machine-readable output
  - Perfect for CI/CD pipelines
  - Structured error reporting

- 🎯 **Exit codes** for CI/CD integration

  - Exit code 0 on success
  - Exit code 1 on issues/failures
  - Enables pipeline automation

- 🚫 **`.shieldxignore` support**

  - Custom ignore patterns for scan command
  - Wildcard support
  - Comment support

- 🎨 **Enhanced output formatting**

  - Color-coded severity levels (CRITICAL, HIGH, MEDIUM, LOW)
  - Better visual hierarchy
  - More detailed statistics

- 🔧 **New command options**

  - `--verbose` flag for detailed output
  - `--quiet` flag for minimal output
  - `--force` flag for generate command
  - `--output` flag for custom file paths

- 🧪 **Test suite**

  - Jest testing framework
  - Unit tests for parseEnv utility
  - Test fixtures
  - Code coverage reporting

- 🔄 **GitHub Actions CI/CD**

  - Automated testing on multiple Node versions
  - Security scanning
  - Code coverage upload
  - NPM publish workflow

- 📄 **Documentation**
  - Comprehensive README with examples
  - CONTRIBUTING.md guide
  - MIT LICENSE
  - This CHANGELOG

### Enhanced

- 🛡️ **Scan command improvements**

  - 28+ secret patterns with severity levels
  - Named patterns (Stripe, AWS, GitHub, etc.)
  - Better false positive reduction
  - Support for more file types
  - Detailed security reports

- 🔍 **Compare command improvements**

  - Better visual output with counts
  - List format instead of comma-separated
  - Statistics summary
  - JSON output option

- ⚡ **Generate command improvements**

  - Add metadata comments (source, date)
  - File overwrite protection
  - Custom output paths
  - Verbose mode

- 🔐 **Better error handling**

  - Validate file existence
  - Check file types
  - More descriptive error messages
  - Proper error propagation

- 📦 **Package improvements**
  - Updated to version 1.0.0
  - Better description
  - Added keywords for discoverability

### Technical

- Improved parseEnv with env var name validation
- Added validateEnvFile utility function
- Severity-based secret categorization
- Comprehensive file type support in scanner
- Better directory exclusion logic

### Breaking Changes

None - fully backward compatible with 0.1.0

---

## [0.1.0] - Initial Release

### Added

- Basic compare command
- Basic generate command
- Basic scan command with regex patterns
- Commander.js CLI framework
- Chalk for colored output
- Simple .env parsing

---

## Unreleased Features (Roadmap)

### Planned for v1.1.0

- Auto-fix suggestions for detected secrets
- Interactive mode for file comparison
- Diff-style output for compare command

### Planned for v2.0.0

- AI-powered secret detection
- Sync configs across environments
- Encrypt/decrypt .env files
- VSCode plugin integration
- Config templates library

---

**Note:** Dates use YYYY-MM-DD format. Version follows [Semantic Versioning](https://semver.org/).
