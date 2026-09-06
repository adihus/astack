import { describe, expect, test } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(import.meta.dir, '..');
const SKILL = path.join(ROOT, 'skills', 'adikanby-task-refinement', 'SKILL.md');
const TEMPLATE = path.join(ROOT, 'skills', 'adikanby-task-refinement', 'templates', 'task-spec.md');
const ADOPTION = path.join(ROOT, 'docs', 'ADIKANBY_ADOPTION.md');

describe('AdiKanby task refinement skill', () => {
  test('ships as an installable Hermes skill with compact frontmatter', () => {
    expect(fs.existsSync(SKILL)).toBe(true);

    const content = fs.readFileSync(SKILL, 'utf-8');
    expect(content.startsWith('---\n')).toBe(true);

    const name = content.match(/^name:\s*(.+)$/m)?.[1]?.trim();
    const description = content.match(/^description:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '');

    expect(name).toBe('adikanby-task-refinement');
    expect(description).toBeDefined();
    expect(description!.length).toBeLessThanOrEqual(60);
    expect(description!.endsWith('.')).toBe(true);
  });

  test('preserves the five spec gates without replacing Kanban control', () => {
    const content = fs.readFileSync(SKILL, 'utf-8');

    for (const required of [
      'Why now',
      'observable outcome',
      'source evidence',
      'Non-goals',
      'measurable acceptance claims',
      'verify the remote artifact',
      'The board remains the control surface',
    ]) {
      expect(content).toContain(required);
    }

    expect(content).toContain('ask only for consequential unresolved decisions');
    expect(content).not.toContain('force=true');
    expect(content).not.toContain('dangerously-skip-permissions');
    expect(content).not.toContain('git add -A');
  });

  test('includes a reusable evidence-oriented task specification template', () => {
    expect(fs.existsSync(TEMPLATE)).toBe(true);
    const content = fs.readFileSync(TEMPLATE, 'utf-8');

    for (const heading of [
      '## Outcome',
      '## Source evidence',
      '## Scope',
      '## Non-goals',
      '## Constraints',
      '## Dependencies',
      '## Acceptance claims',
      '## Verification evidence',
      '## Rollback',
      '## Decisions and unknowns',
    ]) {
      expect(content).toContain(heading);
    }

    expect(content).toContain('[REDACTED]');
    expect(content).toContain('| Claim | Verification | Evidence | Final gate |');
  });

  test('documents an explicit adoption matrix and reproducible pilot boundary', () => {
    expect(fs.existsSync(ADOPTION)).toBe(true);
    const content = fs.readFileSync(ADOPTION, 'utf-8');

    for (const disposition of ['Adopt directly', 'Adapt for AdiKanby', 'Defer', 'Reject']) {
      expect(content).toContain(disposition);
    }

    expect(content).toContain('c24121663732644c56280474a1720475dbe53127');
    expect(content).toContain('fe86806af6a1636488519ac95410df17fb991e30587a5ddc8e16a05c1501be4d');
    expect(content).toContain('hermes skills install adihus/astack/skills/adikanby-task-refinement');
    expect(content).toContain('hermes skills uninstall adikanby-task-refinement');
  });
});
