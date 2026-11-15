/**
 * The Drupal modules workspace for Webship Workspace: the `modules/` folder as a plugin.
 *
 * What the package carries is placed by the installer from the manifest (the folder's settings file,
 * its commands, its docs and its AI items, each in the folder of its kind) and listed by --activate; the dashboard draws the workspace from the
 * settings file like any other. Nothing to register at run time yet: this is where the folder's own
 * rail buttons, row menus or assistant context would go.
 */

import type { PluginApi } from '@webship.co/workspace-plugin-api';

export const WORKSPACE_KEY = 'modules';

/** The AI items the installer places, each in the workspace folder of its kind (ai/ in this package). */
export const AGENTS = ['modules-maintainer'];
export const SKILLS = ['modules-workflow'];
export const AI_COMMANDS = ['modules-check'];
export const PROMPTS = ['modules-green-gate'];

export function register(api: PluginApi): void {
  api.addAssistantContext(() => `The modules/ workspace is the Drupal modules workspace (a plugin, @webship.co/workspace-drupal-modules); its commands are the cmd-*.sh scripts in that folder. It comes with AI items for work in this folder: the agent \`modules-maintainer\` (ai-agents/), the skill \`modules-workflow\` (ai-skills/), the command \`/modules-check\` (ai-commands/) and the prompt \`modules-green-gate\` (ai-prompts/).`);
}
