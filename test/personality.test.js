import { describe, it, expect } from 'vitest';
import { goGetPType, getPTypeName } from '../src/lib/personality.js';

describe('personality', () => {
  it('goGetPType returns a 4-character string', () => {
    const pType = goGetPType();
    expect(pType).toBeTypeOf('string');
    expect(pType.length).toBe(4);
  });

  it('getPTypeName returns a string', () => {
    const pType = "INTJ";
    const pTypeName = getPTypeName(pType);
    expect(pTypeName).toBeTypeOf('string');
    expect(pTypeName).toBe('(Rational/Mastermind)');
  });

  it('getPTypeName returns a fallback string for unknown types', () => {
    const pType = "XXXX";
    const pTypeName = getPTypeName(pType);
    expect(pTypeName).toBeTypeOf('string');
    expect(pTypeName).toContain('Oops!');
  });
});
