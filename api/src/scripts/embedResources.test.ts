import { describe, expect, it } from 'vitest';
import { parseCsv, parsePgArray } from './embedResources.js';

describe('parseCsv', () => {
  it('parses headers and rows into objects', () => {
    const rows = parseCsv('name,category\nFoo,housing\nBar,legal\n');
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({ name: 'Foo', category: 'housing' });
  });

  it('handles quoted fields containing commas', () => {
    const rows = parseCsv('name,description\n"A, B","one, two, three"\n');
    expect(rows[0].name).toBe('A, B');
    expect(rows[0].description).toBe('one, two, three');
  });

  it('skips blank lines', () => {
    const rows = parseCsv('name\nFoo\n\n');
    expect(rows).toHaveLength(1);
  });
});

describe('parsePgArray', () => {
  it('parses {a,b} into a string array', () => {
    expect(parsePgArray('{CA,NY}')).toEqual(['CA', 'NY']);
  });
  it('returns [] for empty', () => {
    expect(parsePgArray('')).toEqual([]);
    expect(parsePgArray('{}')).toEqual([]);
  });
});
