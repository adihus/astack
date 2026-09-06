---
name: adikanby-task-refinement
description: Refine AdiKanban tasks into verifiable work packages.
version: 0.1.0
author: Adi (adihus), Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [kanban, specification, acceptance-criteria, workflow]
---

# AdiKanby Task Refinement

Turn an ambiguous, consequential, or multi-session AdiKanban task into a
source-grounded work package before implementation begins. This adapts the
outcome discipline of astack's `spec` workflow to Hermes's native Kanban,
source-inspection, memory, delegation, and verification tools.

The board remains the control surface for priority and status. The task package
is the outcome surface for scope, acceptance claims, evidence, and decisions.
This skill does not replace an implementation plan or move a task merely because
its specification is ready.

## When to Use

Use this skill when:

- an AdiKanban card is ambiguous, high-consequence, or likely to span sessions;
- multiple agents need one stable definition of done;
- supplied repositories, URLs, documents, or other sources must constrain scope;
- acceptance would otherwise depend on a subjective claim such as "looks good";
- Adi asks to refine, specify, scope, or make a task executable.

Do not use it for a routine one-step task, a generic board status update, or a
request that already has complete and measurable acceptance criteria. Use the
`plan` skill later for implementation sequencing.

## Prerequisites

- Load `kanban-board-operations` before reading or mutating AdiKanban.
- Resolve typed AdiKanban MCP tools with `tool_search` and `tool_describe`; never
  infer their write schemas.
- Inspect every directly supplied source before relying on session history.
- If the task package is public, keep credentials, health information, personal
  identifiers, exact private travel details, and other sensitive facts out of it.

## Procedure

### 1. Refresh and frame the task

Refresh the canonical board, fetch the exact stable task ID, and check for true
duplicates or an existing package. Record:

- **Why now:** the concrete pain, risk, opportunity, or dependency;
- **Actor:** who experiences the problem or consumes the result;
- **Observable outcome:** what becomes possible or measurably different;
- current column, owner, dependencies, and existing handoff.

Do agent-executable discovery first. Preserve Adi's agency: recommend a default
and ask only for consequential unresolved decisions that change scope, risk,
cost, or an irreversible action.

**Complete when:** the task's purpose and observable outcome are explicit and
match the refreshed canonical card.

### 2. Inspect source evidence

Open every supplied repository, URL, document, screenshot, or task artifact.
Separate:

- verified facts supported by source evidence;
- working assumptions that need later validation;
- unknowns that block acceptance or safe execution.

Prefer the original source over a conversational summary. Preserve identifiers
and quoted requirements exactly. Do not copy secrets from source material;
replace them with `[REDACTED]` in any report.

**Complete when:** each scope-shaping claim is either cited to inspected evidence
or visibly labeled as an assumption or unknown.

### 3. Lock scope and boundaries

Define the smallest complete deliverable:

- **In scope:** user-visible or operational outcomes required now;
- **Non-goals:** attractive adjacent work deliberately excluded;
- **Constraints:** privacy, compatibility, licensing, safety, cost, and timing;
- **Dependencies:** external decisions, credentials, source access, or upstream
  work required before completion;
- **Rollback:** how to restore the prior state for any stateful integration.

Apply astack's reuse ladder before proposing new machinery: existing project
pattern, standard library, native platform feature, then an already-installed
dependency. Build only what remains.

**Complete when:** the boundary is narrow enough to execute yet complete enough
to produce the stated outcome without hidden follow-up work.

### 4. Draft measurable acceptance claims

Write binary, measurable acceptance claims. Each claim must identify:

1. the behavior or artifact that must exist;
2. the verification method or command;
3. the evidence to retain;
4. the actor responsible for the final gate.

Include happy path, relevant error path, regression protection, documentation,
and read-back verification for external writes. Do not accept "tests pass" as
proof of a UI or deployment claim; exercise the real surface when one exists.

Use `templates/task-spec.md` as the package structure. Keep implementation steps
out of the outcome contract unless sequence itself is a requirement.

**Complete when:** a reviewer unfamiliar with the conversation can decide every
claim as pass or fail using the named evidence.

### 5. Publish and verify the work package

Write the specification into the task's canonical package. Keep the board card
concise; update its handoff to link the artifact and name the smallest next
action. Do not change column, priority, due date, or ownership unless Adi asked
for that mutation.

For Git-backed public artifacts:

1. review the exact diff for privacy and scope;
2. commit and push only the intended files;
3. verify the remote artifact by reading it back;
4. refresh the canonical task and verify the link and handoff landed.

Serialize Git-backed board mutations. If a mutation response is interrupted,
refresh before retrying so the action cannot be duplicated.

**Complete when:** the remote artifact and refreshed task agree, and the retained
evidence proves both writes.

### 6. Hand off to delivery

Once Adi accepts the outcome contract:

- use `plan` for implementation sequencing when the change is non-trivial;
- use `test-driven-development` for code or behavior changes;
- use `requesting-code-review` for independent pre-commit verification;
- use `dogfood` for browser-visible behavior;
- use `github-pr-workflow` or `github-issue-to-pr` for a verified pull request;
- use `sdlc-review` when available, or another independent reviewer, to
  reconcile the delivered evidence with the task claims.

Specification readiness is not implementation completion. Keep the task in its
truthful column until the normal board workflow authorizes movement.

## Pitfalls

- **Interviewing instead of preparing:** inspect sources and draft defaults before
  asking Adi to do work the agent can perform.
- **Task-package sprawl:** use this extra artifact only when complexity warrants
  it; a routine card should remain board-only.
- **Subjective acceptance:** replace "good," "clean," and "works" with observable
  behavior and evidence.
- **Status leakage:** a completed specification does not make the implementation
  Complete or Shipped.
- **Public-data leakage:** chat context is not permission to publish private data.
- **Framework transplant:** adapt astack's gates to Hermes tools; do not import its
  hooks, browser daemon, telemetry, auto-update, or giant generated skill bodies.

## Verification

Before reporting the refinement complete, confirm:

- the board was refreshed in this turn;
- the exact task ID and title are preserved;
- every supplied source was inspected or a limitation was stated;
- Why now and the observable outcome are explicit;
- In scope, Non-goals, constraints, dependencies, and rollback are present;
- measurable acceptance claims name verification evidence;
- private material is absent from any public artifact;
- the remote artifact was read back;
- the refreshed task links to the artifact and remains in the truthful column.

## Provenance

This is an MIT-licensed adaptation inspired by the `spec` and reuse-discipline
ideas in [garrytan/gstack](https://github.com/garrytan/gstack), maintained for
AdiKanby's workflow in [adihus/astack](https://github.com/adihus/astack).
It is a selective rewrite for Hermes, not a copy of the full gstack runtime.
