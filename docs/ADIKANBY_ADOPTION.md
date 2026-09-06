# AdiKanby adoption of astack

This document records the first selective integration from
[`garrytan/gstack`](https://github.com/garrytan/gstack) through Adi's fork,
[`adihus/astack`](https://github.com/adihus/astack). The goal is to improve the
AdiKanby development workflow without importing a second, conflicting agent
runtime.

## Reviewed baseline

- Fork revision: `c24121663732644c56280474a1720475dbe53127`
- Upstream relationship: `adihus/astack` is a public fork of `garrytan/gstack`.
- Package version: `1.80.0`
- Runtime used for the audit: Bun `1.4.2`
- `bun.lock` SHA-256:
  `fe86806af6a1636488519ac95410df17fb991e30587a5ddc8e16a05c1501be4d`
- License: MIT
- Isolated render command:
  `bun run scripts/gen-skill-docs.ts --host hermes --out-dir /tmp/astack-hermes-render`
- Isolated render result: 54 Hermes `SKILL.md` files, 2,802,797 bytes and
  46,441 lines. The generator estimated roughly 694,000 tokens in aggregate.
- Largest generated artifact: `gstack-ship/SKILL.md`, 174,961 bytes and 2,635
  lines, exceeding the generator's own 160,000-byte ceiling.

These measurements make a complete Hermes import unjustifiable for the pilot.
Several generated skills also expect gstack runtime binaries, state, hooks, or
browser infrastructure that an output-only render does not install.

## Adoption matrix

### Adopt directly

| Idea | AdiKanby use | Reason |
|---|---|---|
| Search-before-building reuse ladder | Check repository patterns, standard library, native platform capabilities, then installed dependencies before adding machinery. | Small, host-neutral, and compatible with Hermes's existing inspection discipline. |
| User sovereignty | Agents prepare defaults and evidence; Adi decides consequential scope, cost, risk, and irreversible actions. | Matches the existing AdiKanby approval model. |
| Evidence-backed completion | Require commands, real-surface exercises, external read-back, and retained evidence for acceptance claims. | Strengthens the boundary between plausible completion and verified delivery. |

### Adapt for AdiKanby

| astack component | Adaptation | Pilot state |
|---|---|---|
| `spec` | `adikanby-task-refinement`: source-first task framing, scope and non-goals, measurable acceptance claims, evidence targets, rollback, and a verified Kanban handoff. | Implemented in `skills/adikanby-task-refinement/`. |
| `office-hours` and `plan-ceo-review` | A shorter outcome/premise review that prepares a recommendation before asking Adi; no six-question interview by default. | Candidate after the task-refinement pilot. |
| `retro` and `learn` | Capture only durable lessons that will save future work; use Hermes skills for procedures and memory for stable context. | Existing Hermes behavior is close; evaluate after several pilot tasks. |
| `cso` | Route security-sensitive changes through a bounded threat review tied to the exact diff and acceptance claims. | Defer implementation until a security-sensitive AdiKanby change needs it. |

### Already covered

| astack component | Existing AdiKanby/Hermes capability |
|---|---|
| `plan-eng-review`, `autoplan` | `plan`, repository inspection, and task-specific delegation |
| `investigate` | `systematic-debugging` |
| `review` and cross-model review | `requesting-code-review`, `github-code-review`, `revision-integrity-code-review`, and independent `delegate_task` reviewers |
| `qa` / `qa-only` | `dogfood`, Hermes browser tools, screenshots, and regression tests |
| `ship` | `github-issue-to-pr` and `github-pr-workflow` |
| `document-release` | `repository-documentation-maintenance` plus normal PR verification |
| design review and mockups | `sketch`, `claude-design`, `popular-web-designs`, `design-md`, and browser QA |
| diagrams and documents | `excalidraw`, `architecture-diagram`, `pdf`, `docx`, and `powerpoint` |
| parallel workstreams | `delegate_task`, background processes, and Hermes Git worktrees |
| checkpoints and rollback | Hermes checkpoints plus Git branches/worktrees |

### Defer

| Component | Reason |
|---|---|
| `canary` and `land-and-deploy` | Valuable only when a repository has a concrete deployment target, health signal, and rollback procedure. Generic automation would create false confidence. |
| iOS QA/design skills | No active AdiKanby iOS delivery need justified the device and simulator machinery. |
| `devex-review` | Useful for a future public API, CLI, or SDK; not needed for the first board-to-delivery pilot. |
| gstack browser pairing | Hermes already has browser and computer-use paths. Reconsider only if shared authenticated-tab control becomes a recurring need. |
| model benchmarking and plan tuning | Interesting but not necessary to validate whether the workflow improves delivered software. |

### Reject

| Component or behavior | Reason |
|---|---|
| Installing all generated Hermes skills | Roughly 694,000 aggregate tokens, large overlap, conflicting instructions, and runtime dependencies that output-only generation does not provide. |
| Global astack hooks or automatic updates | Behavior would change outside reviewed revisions and expand the blast radius across projects. |
| Automatic merge or deployment | External side effects remain explicit approval gates in AdiKanby. |
| gstack telemetry and GBrain state for this pilot | Not required for task refinement and introduces additional state, privacy, and failure modes. |
| Importing gstack's browser daemon and cookie tooling by default | Authenticated-browser control is a separate security decision, not a prerequisite for adopting workflow ideas. |
| `careful`, `guard`, `freeze`, and `unfreeze` as duplicate skills | Hermes already supplies authorization checks, task scope, checkpoints, and rollback primitives. |

## Selected pilot

The first integration is the installable Hermes skill at:

`skills/adikanby-task-refinement/SKILL.md`

It includes a reusable outcome-contract template at:

`skills/adikanby-task-refinement/templates/task-spec.md`

The pilot deliberately ends at a verified task package and truthful board
handoff. It does not implement the task, move its status, merge code, deploy,
start astack's browser, add hooks, or enable telemetry.

## How Adi and Kanby use it

After this branch is merged, inspect the third-party skill before installation:

```bash
hermes skills inspect adihus/astack/skills/adikanby-task-refinement
```

Install it through Hermes's native scanner and provenance tracking:

```bash
hermes skills install adihus/astack/skills/adikanby-task-refinement
```

Start a fresh Hermes session so the skill catalog is rebuilt. Then invoke it
explicitly when a task needs a durable definition of done:

```text
/adikanby-task-refinement refine TASK-80 before implementation
```

Natural-language requests such as “make this task executable” may also trigger
it. Routine one-step cards should remain board-only.

Rollback is one command:

```bash
hermes skills uninstall adikanby-task-refinement
```

The uninstall removes the hub-installed skill; it does not alter AdiKanban task
packages already created with it. Those remain ordinary reviewable repository
artifacts.

## Pilot evaluation

Exercise the skill on three substantial tasks. For each one, record:

1. unanswered scope questions discovered before implementation;
2. acceptance claims established before coding;
3. defects or missing evidence caught at review;
4. user decisions required;
5. specification time versus rework avoided;
6. whether the artifact remained useful in a later session.

Promote further astack adaptations only when this evidence shows a real gain.
The next candidate is a compact `office-hours`/`plan-ceo-review` premise check;
the full generated suite remains out of scope.
