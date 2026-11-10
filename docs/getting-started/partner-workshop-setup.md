---
title: Partner Workshop Setup
description: Set up the GitHub Copilot app for the HVE partner workshop
sidebar_position: 8
author: Microsoft
ms.date: 2026-11-11
ms.topic: tutorial
keywords:
  - GitHub Copilot app
  - agent sessions
  - custom agents
  - Customize
  - workshop setup
estimated_reading_time: 8
---

## Workshop Agenda

| Step | Activity                                                                                    | Time   |
|------|---------------------------------------------------------------------------------------------|--------|
| 1    | [Workshop Overview](partner-workshop.md)                                                    | 30 min |
| 2    | [**Set up the GitHub Copilot app**](partner-workshop-setup.md)                              | 30 min |
| 3    | [Plan, Envision, Experience, Architecture Design, Backlog](partner-workshop-role-tracks.md) | 90 min |
| 4    | [Validation & Solution](partner-workshop-solution.md)                                       | 30 min |
| 5    | [Microsoft Marketplace and Copilot Agent Store readiness](partner-workshop-publishing.md)   | 60 min |
| 6    | [Handoff to Implementation & Commercialization](partner-workshop-implementation.md)         | 30 min |

The workshop runs in the [GitHub Copilot app](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app) on Windows, macOS, or Linux. The HVE Core agents and skills load from this repository, so you do not install a separate extension.

## Prerequisites

Before the workshop, confirm that you have:

* A GitHub account with a Copilot plan, or credentials for your own model provider
* [Git](https://git-scm.com/downloads) installed on your computer
* Access to the workshop repository at [https://github.com/asiapartners/hve-innovation](https://github.com/asiapartners/hve-innovation)

> [!NOTE]
> Copilot Business and Copilot Enterprise users need the **GitHub Copilot app** policy enabled by their organization or enterprise. This policy is separate from the Copilot CLI policy.

## Install And Sign In

1. Download and install the app from [the GitHub Copilot app page](https://github.com/features/ai/github-app).
2. Open the app, select **Sign in to GitHub**, and follow the prompts.
3. Complete onboarding. You can skip repository selection and connect the workshop repository in the next step.

## Connect The Workshop Repository

1. In the sidebar, next to **Sessions**, select **+**.
2. Select **Add GitHub repository** to clone `asiapartners/hve-innovation` from GitHub. If you already cloned it, select **Open local folder** instead.
3. If the app shows a repository trust card, trust the repository only when you recognize the repository and facilitator. Repository-defined MCP servers load only after you trust the repository.

## Start A Workshop Session

1. In the sidebar, next to **Sessions**, select **+**, then select the workshop repository under **Start session in**.
2. Below the prompt box, set **Environment** to **This computer** and **Workspace** to **Current checkout**. Every workshop session then reads and writes the same files, including the `.copilot-tracking/` artifacts that later stages build on.
3. If the technical lead published a team branch, such as `workshop/<team-name>`, choose it as the branch.
4. Select **Interactive** mode so the agent waits for your input before it proceeds.
5. Select the mode below the prompt box, hover over **Tool permissions**, and select **Ask every time** or **Assisted** so you review potentially risky actions. Avoid **Approve all** during the workshop.

> [!NOTE]
> Sessions that use **Current checkout** share one working copy and branch, so run one workshop session at a time. A **New worktree** session gets its own copy and branch, but it does not see files that earlier sessions left uncommitted.

## Choose A Model

Select a model and reasoning effort from the dropdowns below the prompt box. You can change both at any time. To let the app choose the models for each task, select **Fusion** in the model picker, then an effort level.

To use local or self-hosted models, open the app settings, select **Model providers**, then select **Add provider**. Supported providers include Foundry Local, Ollama, LM Studio, Microsoft Foundry, and Azure OpenAI, and their models then appear in the model picker. Windows PCs with an NVIDIA GPU and enough memory can also install MAI Code 1.1 Flash locally from the app. Bring-your-own-model support is in public preview. See [Adding LLM models to the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/add-llm-models).

## Open The Workshop Guide

Type `/partner-workshop` in the prompt box and send it. The skill checks the workshop sources and opens the interactive guide as a canvas in the right side panel. Progress you mark in the guide is personal and does not count as human review or approval.

If the command does not appear, start a new session so the app loads the repository's skills. See [Working with canvas extensions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions).

## Verify The Environment

Complete these steps in your workshop session:

1. Open the agent picker in the prompt box, or type `/agent`.
2. Confirm that agents such as **RPI Agent**, **BRD Builder**, **UX UI Designer**, and **System Architecture Reviewer** are listed.
3. Type `/` in the prompt box.
4. Confirm that the RPI skills, such as `/rpi-research` and `/rpi-plan`, appear.
5. Choose **RPI Agent** and send this prompt:

```text
Review the repository and identify the most relevant HVE Core assets for a
partner workshop scenario. Summarize the likely workflow, likely agents, and
any prerequisites before the team begins the role exercises.
```

If the expected agents or commands are missing:

1. Confirm that the session runs in the workshop repository and that you trusted the repository.
2. Select **Customize** in the sidebar, then select **Installed**, and confirm that the HVE agents and skills are listed.
3. If the `hve-core` plugin is also installed, turn off its toggle in **Installed** while you work in this repository so each agent appears once.
4. Start a new session so the app reloads its customizations.
5. See [Customizing the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app) if the problem remains.

## Prepare The Workshop Workspace

Ask the technical lead to complete these manual steps:

* Confirm that each participant's workshop sessions use the team's workshop branch.
* Prepare the team member roles, known facts, constraints, and approved source material for the first role exercise.
* Before any later agent acts, provide the session-context artifact path and ask the agent to read the topic from it. Do not repeat or redefine the topic in downstream prompts.
* For workshop case, place synthetic or public source material in a manually managed `.copilot-tracking/research/workshop-input/` folder. Keep policies, SOPs, diagrams, and supporting files there by file type.
* For an actual production case, keep sensitive evidence in its approved source system or secure evidence workspace. Use a trusted path or controlled link for research instead of copying files into the repository.
* Set the session topic, then create a session-context artifact under `.copilot-tracking/research/` before any role agent starts work. Treat that artifact as the source of truth for the topic, evidence location, and production output roots.

Use this prompt to create the shared session context:

```text
Use the RPI Agent. Create a session-context artifact before starting
research or drafting requirements.

Session name: [short name for this workshop]
Topic: [topic or use case]
Evidence location: [approved path, controlled link, or source system]
Date: [YYYY-MM-DD]

Create the artifact at
`.copilot-tracking/research/[YYYY-MM-DD]/[session-name]-session-context.md`.
Record the session name, topic, evidence location, date, evidence boundary,
and production output roots. Make this artifact the required context for
every later agent. Mark it as draft for human review. Do not start research,
create a BRD or PRD, create backlog items, or copy sensitive evidence into
the repository.
```

Example:

```text
Use the RPI Agent. Create the session context only.

Session name: relationship-manager-fsi
Topic: Relationship Manager Intelligence Assistant for FSI
Evidence location: .copilot-tracking/research/workshop-input/
Date: 2026-09-09
```

Throughout the workshop:

* Keep credentials, personal data, customer secrets, and production content out of prompts and files unless the approved environment explicitly permits that evidence and its access controls are confirmed.
* Select **Changes** above the prompt box to review each diff, and commit only reviewed workshop outputs to the team branch.

> [!TIP]
> The agents create workflow artifacts under `.copilot-tracking/` and `docs/planning/adrs/` when their workflows run. Keep generated content marked as draft until a responsible human reviews it.

## Learn The Interaction Pattern

In the next step, we will use the same pattern in every role exercise:

1. Choose the named agent in the agent picker (or type `/agent`), or invoke the named skill with `/`.
2. Provide the scenario, known facts, constraints, and requested output path. Add files to the prompt with `@`.
3. Ask for a first draft.
4. Review and revise the result. Select **Changes** to inspect the files the agent wrote.
5. Save the reviewed result to its production artifact directory.
6. Hand the artifact to the next role.

Proceed to the [role guide](partner-workshop-role-tracks.md).

---

<!-- markdownlint-disable MD036 -->
*🤖 Crafted with precision by ✨Copilot following brilliant human instruction,
then carefully refined by our team of discerning human reviewers.*
<!-- markdownlint-enable MD036 -->
