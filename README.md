# 🛡️ ShieldX

**ShieldX** is a blazing-fast CLI tool to **compare, sync, validate, and scan** your environment/config files.
It helps developers avoid missing variables, catch hardcoded secrets in code, and keep configs consistent across environments.

> Short. Secure. Smart. — That’s ShieldX.

---

## 🚀 Features

* 🔍 **Compare**: Check differences between `.env` files (e.g., `.env` vs `.env.production`)
* ⚡ **Generate**: Create a `.env.example` automatically from an existing `.env`
* 🛡️ **Scan**: Detect **hardcoded secrets** (API keys, tokens, DB URLs) in your source code
* 📦 Lightweight: Zero bloat, under 5KB
* 🌍 Future-proof: AI-powered suggestions coming in v2

---

## 📦 Installation

Use it instantly with **npx** (no install required):

```bash
npx shieldx compare .env .env.example
```

Or install globally:

```bash
npm install -g shieldx
```

---

## 🖥️ Usage

### 1. Compare two `.env` files

```bash
shieldx compare .env .env.production
```

✅ Lists missing and extra variables.

---

### 2. Generate `.env.example`

```bash
shieldx generate .env
```

✅ Creates `.env.example` with keys only (no values).

---

### 3. Scan project for hardcoded secrets

```bash
shieldx scan ./src
```

✅ Flags hardcoded API keys, tokens, and other sensitive strings.

---

## 📅 Roadmap

* [x] Compare `.env` files
* [x] Generate `.env.example`
* [x] Scan for secrets
* [ ] AI-powered fix suggestions (v2)
* [ ] Sync configs across environments
* [ ] VSCode plugin integration

---

## 🛠️ Development

Clone and run locally:

```bash
git clone https://github.com/zeemscript/shieldx.git
cd shieldx
npm install
npm link
```

Now you can run:

```bash
shieldx compare .env .env.example
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check [issues](https://github.com/zeemscript/shieldx/issues).

---

## 📜 License

[MIT](./LICENSE) © 2025 [zeemscript](https://github.com/zeemscript)

---
