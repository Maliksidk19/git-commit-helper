# git-commit-helper

Interactive CLI tool to create consistent, emoji-enhanced Git commit messages with type and scope autocomplete and optional automatic message generation.

---

## Features

- Interactive prompts for commit **type**, **scope** (with autocomplete), and **message**
- Emoji icons associated with commit types for better readability
- Optionally generate a commit message automatically from `git diff`
- Support CLI options for scripting or shortcuts
- Easy to integrate with git aliases or hooks

---

## Installation

Install globally via npm:

```bash
npm install -g github:Maliksidk19/git-commit-helper
```

<!-- For detailed installation instructions including GitHub Packages authentication, see the [INSTALLATION.md](INSTALLATION.md) file. -->

---

## Usage

Run the CLI tool:

```bash
git-commit-helper
```

You will be prompted to select a commit type, choose or enter a scope, and write a commit message.

Alternatively, pass options directly:

```bash
git-commit-helper -t fix -s api -d "fix login bug"
```

---

## Overriding Git Commit

For advanced instructions on how to completely override the default Git commit functionality with git-commit-helper, see the [OVERRIDING_GIT_COMMIT.md](OVERRIDING_GIT_COMMIT.md) file.

---

## Git Alias Setup

Create a convenient git alias to replace `git commit` with the tool:

```bash
git config --global alias.cm '!git-commit-helper commit'
```

Then commit with:

```bash
git cm
```

---

## Commit Types and Emojis

| Type     | Emoji | Description                    |
| -------- | ----- | ------------------------------ |
| feat     | ✨    | New feature                    |
| fix      | 🐛    | Bug fix                        |
| docs     | 📝    | Documentation updates          |
| style    | 🎨    | Code style or formatting       |
| refactor | ♻️    | Code refactoring               |
| test     | ✅    | Adding or fixing tests         |
| chore    | 🔧    | Maintenance tasks              |
| perf     | ⚡️   | Performance improvements       |
| ci       | 👷    | Continuous integration changes |

---

## Scopes

Common scopes include:

- `ui`, `api`, `auth`, `db`, `build`, `deps`, `tests`, `config`, `styles`, `docs`, `core`, `cli`, `hooks`

You can also enter a custom scope.

---

## Development

Clone the repo and install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Install locally for testing:

```bash
npm install -g .
```

Run locally:

```bash
npm run start
```

---

## Preview

<video width="100%" controls>
  <source src="./git-commit-helper.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

_Note: If the video doesn't play in the README, you can download the file and view it locally._

## License

MIT License

---

_Created with ❤️ by Saad_
