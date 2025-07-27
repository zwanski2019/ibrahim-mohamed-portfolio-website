import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from './sanitize';

describe('sanitizeHtml', () => {
  it('removes scripts and event handlers', () => {
    const input = '<img src="x" onerror="alert(1)">Safe<script>alert(2)</script>';
    const output = sanitizeHtml(input);
    expect(output).not.toMatch(/<script/);
    expect(output).not.toMatch(/onerror/);
    expect(output).toContain('Safe');
  });
});
