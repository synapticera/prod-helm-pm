<!--
Local Menu Configuration
This file defines project-specific actions and links for the Synaptic MAX VS Code plugin.
Items defined here appear at the TOP of their respective menus in "Local Actions" and "Local Links" groups.

Place this file at: x-project/.app/local-menu.md

SECTIONS:
  #actions - Custom actions for this project (appears in Quick Actions panel)
  #links   - Custom links for this project (appears in Links panel)

ACTION FORMAT:
  - label: description                          - Claude command (runs via `claude "label"`)
  - label [action:type]: description            - Special action type
  - label [ccterm]: prompt="prompt text"        - Claude Code terminal with custom prompt
                                                  (terminal title = label, not the prompt)

ACTION TYPES:
  claude-cmd (default)    - Runs command in Claude Code terminal
  ccterm                  - Runs Claude with custom prompt
  new-session             - Opens new Claude Code session
  terminal:name:command   - Runs shell command in named terminal
  edit-file:path          - Opens file in VS Code editor

LINK FORMAT:
  - label [link:type]: url/path

LINK TYPES:
  external (default)      - Opens URL in external browser
  project-file            - Opens file in formatted webview panel
  edit-file               - Opens file in VS Code editor

EXAMPLES:
  Actions:
    - /custom-deploy: Deploy to staging server
    - build [action:terminal:Build:npm run build]: Run npm build
    - config [action:edit-file:.env]: Edit environment config
    - commit + push [ccterm]: prompt="commit all changes and push to main"
    - review PR [ccterm]: prompt="review the current PR and suggest improvements"

  Links:
    - API Docs [link:external]: https://api.example.com/docs
    - Config [link:edit-file]: config/settings.json
    - Project Plan [link:project-file]: docs/plan.md
-->

#actions
<!-- Add your project-specific actions below -->
<!-- Example: -->
<!-- - commit + push [ccterm]: prompt="commit all changes and push to main" -->

#links
<!-- Add your project-specific links below -->
<!-- Example: -->
<!-- - Project GitHub [link:external]: https://github.com/your-org/your-repo -->
