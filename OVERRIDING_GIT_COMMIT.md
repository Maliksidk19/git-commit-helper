# 🛠️ Overriding `git commit` with a Custom CLI Prompt

This guide walks you through overriding the default `git commit` behavior to launch a custom interactive CLI for better commit messages (like Conventional Commits with emojis).

---

## ✅ What You'll Achieve

- When you type `git commit`, a friendly CLI will:
  - Ask for commit `type`, `scope`, and `message`
  - Auto-generate and run the commit with emojis
- Works globally across any project (optional)

---

## 🧱 Requirements

- Node.js installed
- Your CLI script (e.g., `index.js` or `build/index.js`) built with TypeScript/JavaScript

---

## 🗂️ Step 1: Create Git Wrapper Folder

Create a folder to host your wrapper:

```bash
mkdir C:\git-wrapper
```

Place your CLI tool’s `index.js` or compiled TypeScript `build/index.js` here.

---

## 📝 Step 2: Create a `git.cmd` Wrapper

Create a file at `C:\git-wrapper\git.cmd` with the following content:

```cmd
@echo off
setlocal

:: Absolute path to real Git executable
set GIT_REAL="C:\Program Files\Git\cmd\git.exe"

:: Intercept 'git commit' with no -m or --message
if "%1"=="commit" (
  shift
  echo %* | findstr /R /C:"-m" /C:"--message" >nul
  if errorlevel 1 (
    node "C:\git-wrapper\build\index.js" %*
    exit /b %errorlevel%
  )
)

:: Fallback to real Git
%GIT_REAL% %*
endlocal
```

---

## 🌐 Step 3: Add `C:\git-wrapper` to System `PATH`

1. Open **System Environment Variables**
2. Add `C:\git-wrapper` to the **top** of both:
   - User `PATH`
   - System `PATH`
3. Click OK and **restart your terminal**.

---

## 🧪 Step 4: Test It

In any Git repo, run:

```bash
git commit
```

If no `-m` is provided, your custom CLI should launch.
Otherwise, standard commit behavior is preserved.

> **Note:** When using the git commit override, you cannot use the custom CLI options `-t`, `-s`, and `-d` directly with `git commit`. These options are only available when running the tool directly as `git-commit-helper`.

---

## 🧹 Optional Cleanup

To remove the override:

- Remove `C:\git-wrapper` from your `PATH`
- Or delete `git.cmd`

---

## 🗨 Example Commit Output

```bash
? Select commit type: feat
? Select scope: ui
? Write message: Add responsive button component

✅ Committing: ✨ feat(ui): Add responsive button component
```
