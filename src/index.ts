#!/usr/bin/env node
import inquirer from "inquirer";
import { Command } from "commander";
import { execSync } from "child_process";

const program = new Command();

const typeMap: Record<string, string> = {
  feat: "✨",
  fix: "🐛",
  docs: "📝",
  style: "🎨",
  refactor: "♻️",
  test: "✅",
  chore: "🔧",
  perf: "⚡️",
  ci: "👷",
};

// Example common scopes (customize for your project)
const suggestedScopes = [
  "ui",
  "api",
  "auth",
  "db",
  "build",
  "deps",
  "tests",
  "config",
  "styles",
  "docs",
  "core",
  "cli",
  "hooks",
];

function generateAutoDescription(): string {
  try {
    const diff = execSync("git diff --cached --name-status", {
      encoding: "utf-8",
    });

    const lines = diff
      .trim()
      .split("\n")
      .map((line) => {
        const [status, file] = line.trim().split(/\s+/, 2);
        const fileName = file?.split("/").pop();
        switch (status) {
          case "A":
            return `added ${fileName}`;
          case "M":
            return `modified ${fileName}`;
          case "D":
            return `deleted ${fileName}`;
          default:
            return `updated ${fileName}`;
        }
      });

    if (!lines.length) return "";
    const last = lines.pop();
    return lines.length ? `${lines.join(", ")}, and ${last}` : last || "";
  } catch {
    return "";
  }
}

program
  .name("git-commit-helper")
  .description("Interactive commit CLI with auto description")
  .version("1.0.0")
  .option("-t, --type <type>", "Commit type")
  .option("-s, --scope <scope>", "Commit scope")
  .option("-d, --description <description>", "Commit description");

program.parse(process.argv);

const options = program.opts();

(async () => {
  const autoDesc = generateAutoDescription();
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Commit type:",
      when: () => !options.type,
      choices: Object.keys(typeMap).map((key) => ({
        name: `${typeMap[key]} ${key}`,
        value: key,
      })),
    },
    {
      type: "select",
      name: "scope",
      message: "Scope:",
      default: "ui",
      when: () => !options.scope,
      choices: suggestedScopes.map((scope) => ({
        name: scope,
        value: scope,
      })),
    },
    {
      type: "input",
      name: "description",
      message: "Description:",
      default: autoDesc,
      when: () => !options.description,
      validate: (input: string) =>
        input.trim().length < 3 ? "Description is too short" : true,
    },
  ]); // When called directly (not through git.cmd), we may have the "commit" argument
  // but we don't need to check for it when called through git.cmd
  // as we don't pass any arguments there

  const type = options.type || answers.type;
  const scope = options.scope || answers.scope;
  const description = options.description || answers.description;
  const emoji = typeMap[type];

  const scopeStr = scope ? `(${scope})` : "";
  const message = `${emoji} ${type}${scopeStr}: ${description}`;
  execSync(`git commit -m "${message}"`, { stdio: "inherit" });
})();
