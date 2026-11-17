---
title: Partner Workshop Setup
description: Shared Codespaces and local VS Code setup instructions for the HVE partner workshop
sidebar_position: 8
author: Microsoft
ms.date: 2026-11-15
ms.topic: tutorial
keywords:
  - GitHub Codespaces
  - Visual Studio Code
  - macOS
  - HVE Core All
  - workshop setup
estimated_reading_time: 8
---

## Workshop Agenda

| Step | Activity                                                                                    | Time   |
|------|---------------------------------------------------------------------------------------------|--------|
| 1    | [Workshop Overview](partner-workshop.md)                                                    | 30 min |
| 2    | [**Set up Codespaces or local VS Code**](partner-workshop-setup.md)                         | 30 min |
| 3    | [Plan, Envision, Experience, Architecture Design, Backlog](partner-workshop-role-tracks.md) | 90 min |
| 4    | [Validation & Solution](partner-workshop-solution.md)                                       | 30 min |
| 5    | [Microsoft Marketplace and Copilot Agent Store readiness](partner-workshop-publishing.md)   | 60 min |
| 6    | [Handoff to Implementation & Commercialization](partner-workshop-implementation.md)         | 30 min |

> [!NOTE]
> These instructions use **Visual Studio Code**. The HVE Core extension is a VS Code extension. The full Visual Studio IDE is not the workshop host. Visual Studio users can keep the IDE installed and use VS Code or GitHub Codespaces for the workshop activities.

## Choose Your Setup Path

Select the setup option that fits your environment, then follow the matching steps below.

* Use Option A if you want a browser-based VS Code experience in GitHub Codespaces.
* Use Option B if you want to run VS Code locally on Windows or macOS.

## Shared Prerequisites

Before you begin either option, complete these steps:

1. Sign in to your GitHub account with GitHub Copilot access.
2. Confirm your organization permits GitHub Copilot Chat.

## Option A: GitHub Codespaces

1. Open the **Code** dropdown, select the **Codespaces** tab, and create a Codespace.
2. Wait for the browser-based VS Code window to finish loading.
3. Confirm GitHub Copilot and GitHub Copilot Chat are enabled in the Codespace.
4. Open the Extensions view from the Activity Bar.
5. Search for **HVE Core All**, confirm the publisher is `ISE-HVE-ESSENTIALS`, and install it in the Codespace.
6. Open the terminal in Codespaces and clone the workshop repository at [https://github.com/asiapartners/hve-innovation](https://github.com/asiapartners/hve-innovation) and open it in your chosen environment.
7. Tech lead could create a branch for workshop activities before you start editing files. Use a name such as `workshop/<team-name>`.
8. Reload the window if VS Code asks you to do so.

## Option B: Local VS Code On Windows Or macOS

1. Install [Git](https://git-scm.com/downloads) and [Visual Studio Code](https://code.visualstudio.com/Download).
2. Open VS Code, open the Extensions view, and install **GitHub Copilot** and **GitHub Copilot Chat**.
3. Sign in with your GitHub account that has Copilot access.
4. Install [HVE Core All](https://marketplace.visualstudio.com/items?itemName=ise-hve-essentials.hve-core-all).
5. Open the Command Palette, run **Git: Clone** on [https://github.com/asiapartners/hve-innovation](https://github.com/asiapartners/hve-innovation), and open it.
6. Select **Open** when cloning finishes, and select **Trust** only when you recognize the repository and facilitator.
7. Tech lead could create a branch for workshop activities before you start editing files. Use a name such as `workshop/<team-name>`.

In GitHub Copilot Chat, open the model picker and select **Copilot Fusion** for
a balanced combination of task complexity and cost. For a lower-cost option,
select **MAI-Code-2-Flash** if it is available. If neither model nor another
suitable model is available:

* Verify that you are signed in to VS Code with the GitHub account that has
  Copilot access.
* Update GitHub Copilot and GitHub Copilot Chat in the Extensions view.
* Close and reopen the VS Code window to refresh updated configurations, then reopen Copilot Chat and the model picker.
* Confirm with your organization or facilitator that model selection is
  enabled and not restricted by policy.
* If a Foundry local model is available and appropriate for your environment,
  you may select it for local inference. Follow the Microsoft Foundry Toolkit
  guidance for
  [setting up local models](https://devblogs.microsoft.com/foundry/ai-assisted-development-powered-by-local-models/).

On macOS, use the same menus and buttons. Keyboard shortcuts that use `Ctrl` on Windows often use `Command` on macOS, so this workshop favors menu navigation.

## Verify The Environment

Complete these steps in either environment:

1. Open Copilot Chat from the Activity Bar.
2. Open the agent picker in the Chat view.
3. Confirm that agents such as **RPI Agent**, **BRD Builder**, **UX UI Designer**, and **System Architecture Reviewer** are visible.
4. Type `/` in Chat.
5. Confirm that RPI prompts appear. Select **RPI Agent**.
6. Enter this prompt:

```text
Review the repository and identify the most relevant HVE Core assets for a
partner workshop scenario. Summarize the likely workflow, likely agents, and
any prerequisites before the team begins the role exercises.
```

If the expected agents are missing:

1. Open the Extensions view.
2. Disable **HVE Installer** if both extensions are installed.
3. Run **Developer: Reload Window** from the Command Palette.
4. Reopen Copilot Chat and check the agent picker again.
5. Use the [troubleshooting guide](troubleshooting.md) if the problem remains.

## Prepare The Workshop Workspace

Ask the technical lead to complete these manual steps:

* Confirm that the team is working on its workshop branch or repository.
* Prepare team roles, known facts, constraints, and approved source material for the first role exercise.
* Place synthetic or public workshop evidence in `.copilot-tracking/research/workshop-input/`, organized by evidence type.

> [!IMPORTANT]
> For production cases, keep sensitive evidence in its approved source system or secure evidence workspace. Reference it through a trusted path or controlled link rather than copying or committing it to the repository. Include credentials, personal data, customer secrets, or production content in prompts or files only when the approved environment permits it and access controls are confirmed.

Start a new Copilot Chat session, select **RPI Agent**, and use this prompt to create the shared context before starting the role exercises:

```text
Create a session-context artifact only.

Session name: [short name for this workshop]
Topic: [topic or use case]
Evidence location: [approved path, controlled link, or source system]
Date: [YYYY-MM-DD]

Create the artifact at
`.copilot-tracking/research/[YYYY-MM-DD]/[session-name]-session-context.md`.
Record the session name, topic, evidence location, date, evidence boundary,
and production output roots. Mark it as draft for human review.
Do not start research, draft requirements, create backlog items, or copy
sensitive evidence into the repository.
```

Example values for the prompt, replace with your own use case.

```text
Session name: relationship-manager-fsi
Topic: Relationship Manager Intelligence Assistant for FSI
Evidence location: .copilot-tracking/research/workshop-input/
Date: 2026-11-15

Create the artifact at
`.copilot-tracking/research/[YYYY-MM-DD]/[session-name]-session-context.md`.
Record the session name, topic, evidence location, date, evidence boundary,
and production output roots. Mark it as draft for human review.
Do not start research, draft requirements, create backlog items, or copy
sensitive evidence into the repository.
```

Before any later agent acts, provide the session-context artifact path or ask the agent to find the latest session context and confirm it if ambiguous. Ask it to read the topic, evidence location, and production output roots from that artifact. Do not repeat or redefine the topic in downstream prompts.

> [!TIP]
> Agents create workflow artifacts under `.copilot-tracking/` and `docs/planning/adrs/`. Keep generated content marked as draft until a responsible human reviews it, and commit only reviewed workshop outputs to the team branch.

## Learn The Interaction Pattern

In the next step, we will use the same pattern in every role exercise:

1. Select the named agent or invoke the named skill.
2. Provide the session context or ask the agent to find it, along with role-specific facts, constraints, and the requested output.
3. Ask for a first draft.
4. Review and revise the result.
5. Save the reviewed result to its production artifact directory.
6. Hand the artifact to the next role.

Proceed to the [role guide](partner-workshop-role-tracks.md).

---

<!-- markdownlint-disable MD036 -->
*🤖 Crafted with precision by ✨Copilot following brilliant human instruction,
then carefully refined by our team of discerning human reviewers.*
<!-- markdownlint-enable MD036 -->
