---
title: Partner Workshop Setup
description: Shared Codespaces and local VS Code setup instructions for the HVE partner workshop
sidebar_position: 8
author: Microsoft
ms.date: 2026-09-07
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
6. Open the terminal in Codespaces and clone the workshop repository at [https://github.com/asiapartners/hypervelocity-innovation](https://github.com/asiapartners/hypervelocity-innovation) and open it in your chosen environment.
7. Create a branch for workshop activities before you start editing files. Use a name such as `workshop/<team-name>`.
8. Reload the window if VS Code asks you to do so.

## Option B: Local VS Code On Windows Or macOS

1. Install [Git](https://git-scm.com/downloads) and [Visual Studio Code](https://code.visualstudio.com/Download).
2. Open VS Code, open the Extensions view, and install **GitHub Copilot** and **GitHub Copilot Chat**.
3. Sign in with your GitHub account that has Copilot access.
4. Install [HVE Core All](https://marketplace.visualstudio.com/items?itemName=ise-hve-essentials.hve-core-all).
5. Open the Command Palette, run **Git: Clone** on [https://github.com/asiapartners/hypervelocity-innovation](https://github.com/asiapartners/hypervelocity-innovation), and open it.
6. Select **Open** when cloning finishes, and select **Trust** only when you recognize the repository and facilitator.
7. Create a branch for workshop activities before you start editing files. Use a name such as `workshop/<team-name>`.

If you have Foundry local models available in your environment, you may select them for local inference. Otherwise, select `MAI-Code-1-Flash` in GitHub Copilot Chat for a more cost-effective option. How to setup local models [https://devblogs.microsoft.com/foundry/ai-assisted-development-powered-by-local-models/](https://devblogs.microsoft.com/foundry/ai-assisted-development-powered-by-local-models/).

On macOS, use the same menus and buttons. Keyboard shortcuts that use `Ctrl` on Windows often use `Command` on macOS, so this workshop favors menu navigation.

## Verify The Environment

Complete these steps in either environment:

1. Open Copilot Chat from the Activity Bar.
2. Open the agent picker in the Chat view.
3. Confirm that agents such as **RPI Agent**, **BRD Builder**, **UX UI Designer**, and **System Architecture Reviewer** are visible.
4. Type `/` in Chat.
5. Confirm that RPI prompts appear.
6. Enter this prompt:

```text
Review the repository and identify the most relevant HVE Core assets for a partner workshop scenario. Summarize the likely workflow, likely agents, and any prerequisites before the team begins the role exercises.
```

If the expected agents are missing:

1. Open the Extensions view.
2. Disable **HVE Installer** if both extensions are installed.
3. Run **Developer: Reload Window** from the Command Palette.
4. Reopen Copilot Chat and check the agent picker again.
5. Use the [troubleshooting guide](troubleshooting.md) if the problem remains.

## Prepare The Workshop Workspace

Ask the technical lead to complete these manual steps:

* Confirm that the team is working on its workshop branch.
* Set the session topic, then create a session-context artifact under `.copilot-tracking/research/` before selecting an agent. Treat that artifact as the source of truth for the topic, evidence location, and production output roots.

Use this prompt to create the shared session context:

```text
Select the /RPI Agent. Create a session-context artifact before starting research or drafting requirements.

Session name: [short name for this workshop]
Topic: [topic or use case]
Evidence location: [approved path, controlled link, or source system]
Date: [YYYY-MM-DD]

Create the artifact at `.copilot-tracking/research/[YYYY-MM-DD]/[session-name]-session-context.md`. Record the session name, topic, evidence location, date, evidence boundary, and production output roots. Make this artifact the required context for every later agent. Mark it as draft for human review. Do not start research, create a BRD or PRD, create backlog items, or copy sensitive evidence into the repository.
```

Example:

```text
Select the /RPI Agent. Create the session context only.

Session name: relationship-manager-fsi
Topic: Relationship Manager Intelligence Assistant for FSI
Evidence location: docs/getting-started/samples/FSI/
Date: 2026-09-07
```

* Prepare the team member roles, known facts, constraints, and approved source material for the first role exercise.
* Before any later agent acts, provide the session-context artifact path and ask the agent to read the topic from it. Do not repeat or redefine the topic in downstream prompts.
* For workshop-only evidence, place synthetic or public source material in a manually managed `workshop-input/` folder. Keep policies, SOPs, diagrams, and supporting files there by evidence type.
* For an actual production case, keep sensitive evidence in its approved source system or secure evidence workspace. Use a trusted path or controlled link for research instead of copying files into the repository.
* Keep credentials, personal data, customer secrets, and production content out of prompts and files unless the approved environment explicitly permits that evidence and its access controls are confirmed.
* Commit only reviewed workshop outputs to the team branch.

> [!TIP]
> The agents create workflow artifacts under `.copilot-tracking/` and `docs/planning/adrs/` when their workflows run. Keep generated content marked as draft until a responsible human reviews it.

## Learn The Interaction Pattern

In the next step, we will use the same pattern in every role exercise:

1. Select the named agent or invoke the named skill.
2. Provide the scenario, known facts, constraints, and requested output path.
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
