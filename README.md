# @webship/workspace-drupal-modules

The **Drupal modules** workspace of the [Webship Workspace](https://github.com/webship/workspace) dashboard:
the `modules/` folder (type `code`), its settings file (`core/config/workspace.modules.settings.yml`),
its commands and its docs, as a plugin.

## Use it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require github:webship/workspace-drupal-modules
bash core/scripts/plugins.sh --activate drupal-modules     # puts `modules` on the workspaces list of settings.yml
bash core/scripts/plugins.sh --install drupal-modules      # the folder, its settings file (once), its commands, its docs (once)
```

The settings file and the docs are placed once and never overwritten: they hold what you put there.
`--deactivate` takes the workspace off the list; the folder and its content stay.

## The commands

| Command |
| --- |
| `cmd-tool-backup-module.sh` |
| `cmd-tool-git-change-filemode-to-false.sh` |
| `cmd-tool-git-clone-all-modules.sh` |
| `cmd-tools-checks.sh` |
| `cmd-tools-gitlab-ci-local.sh` |
| `cmd-tools-graphify.sh` |
| `cmd-tools-obsidian.sh` |
| `cmd-tools-ragify.sh` |
| `cmd-tools-reclaim.sh` |

The bash functions these commands call live in the dashboard's `core/scripts/functions`.
