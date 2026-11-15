---
name: modules-workflow
description: How work is done in the `modules/` folder of the Webship Workspace — what a module is there (a git checkout of a Drupal module's project), how its code-quality checks are run, how its GitLab CI pipeline is run on this machine before a push, how a checkout is backed up, which command of the folder must not be run unasked, with the flags of each command and the settings keys of the folder. Use when asked to "run the checks of this module", "run the pipeline locally", "back up the module", "which modules does the folder list", or when a command of `modules/` is about to be run.
argument-hint: '[what you are about to do in modules]'
---

# modules-workflow

`~/workspace/modules` is the Modules folder of a Webship Workspace (container-based, DDEV by default).
Modules are Drupal contrib and private modules, checked out to work on: each one a git checkout of its project. It comes with the Modules plugin (`@webship.co/workspace-drupal-modules`), which places the commands below in the folder. Every command finds the workspace from its own path; run it from the folder, and read `bash <command> --help` before quoting a flag.

## The order of work

1. **See what the module declares**: `bash cmd-tools-checks.sh mymodule --list`. It runs nothing.
2. **Work on a branch** of the checkout, `~/workspace/modules/mymodule`.
3. **Run the checks**: `bash cmd-tools-checks.sh mymodule`, or some with `--only`.
4. **Run the pipeline on this machine**: `bash cmd-tools-gitlab-ci-local.sh mymodule --doctor`
   once, then `bash cmd-tools-gitlab-ci-local.sh mymodule` (or `--slim`).
5. **Push when it is green**, and gate on the remote pipeline what could not run here.

## Commands

| Command | What it does | Flags |
| --- | --- | --- |
| `cmd-tool-backup-module.sh` | An item as an archive, into `backups/modules/` | none |
| `cmd-tool-git-change-filemode-to-false.sh` | Sets `core.fileMode` to false in every checkout of the folder; takes no argument | none |
| `cmd-tool-git-clone-all-modules.sh` | **Removes** the folder of every module on the `modules` list with `sudo`, then clones each one again over SSH. Work that is not pushed is lost: never run it unasked | none |
| `cmd-tools-checks.sh` | Runs the code-quality checks an item's `package.json` declares; `--list` prints the plan and runs nothing | `--browser` `--e2e` `--fail-fast` `--install` `--list` `--only` `--runner` `--skip` |
| `cmd-tools-gitlab-ci-local.sh` | Runs an item's GitLab CI pipeline on this machine, before a push | `--doctor` `--list` `--slim` `--variable` |
| `cmd-tools-reclaim.sh` | Disk held by projects whose folder is gone: a dry run unless `--apply` | `--apply` `--keep-days` `--list-protected` `--only` |

## Settings

| Key | File | What it says |
| --- | --- | --- |
| `doc.name` | `core/config/workspace.modules.settings.yml` | The folder under the workspace root: `modules` |
| `type` | `core/config/workspace.modules.settings.yml` | `code`: the rows of the page are packages and repositories, with the Build, Backup, Remove and Checks actions |
| `composer` | `core/config/workspace.modules.settings.yml` | `manifest`: the COMPOSER menu only adds to `composer.json` here, and never installs |
| `modules` | `core/config/workspace.modules.settings.yml` | The modules the folder is filled with, by project name: the list `cmd-tool-git-clone-all-modules.sh` reads |
| `assistant.name`, `assistant.placeholder` | `core/config/workspace.modules.settings.yml` | What the assistant is called on this page; `default` takes the workspace's |
| `workspaces` | `core/config/settings.yml` | The active folders; `modules` is on it once the plugin is activated |

## Rules

- **A module here is a git checkout somebody works in.** Never delete or re-clone one; work on a
  branch, and back the checkout up (`bash cmd-tool-backup-module.sh <name>`) before a risky change.
- **Never run `cmd-tool-git-clone-all-modules.sh` unasked.** It removes the folder of every module
  on the `modules` list with `sudo` and clones each one again over SSH: work that is not pushed
  is lost. For one module, `git clone` it by hand.
- **Green before a push.** The checks the module declares, then its pipeline on this machine. A red
  job is fixed, never hidden.
- **Containers only** (DDEV by default): a module is tried on a site of a sites folder, in that
  site's container; never `composer`, `drush` or `php` on the host.
- `bash cmd-tools-reclaim.sh` is a report until `--apply` is added: never add it unasked.

The Modules plugin places these beside this one, each in the workspace folder of its kind: the agent `modules-maintainer` (`ai-agents/`), the command `/modules-check` (`ai-commands/`) and the prompt `modules-green-gate` (`ai-prompts/`).
