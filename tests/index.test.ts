import { getInput } from '../src/index';

describe('testing index file', () => {
  test('empty string should result in zero', () => {
    expect(getInput('')).toBe(0);
  });
});