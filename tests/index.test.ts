import { formPrompt } from '../src/utils/string_utils';
//const fp = require('../src/utils/string_utils')

describe('Testing string utility functions', () => {
  test('formPrompt should remove extra white spaces at the end and add a single whitespace', () => {
    expect(formPrompt('Who are you?   ')).toBe('Who are you? ');
  });
  test('formPrompt should allow optional parameter', () => {
    expect(formPrompt('')).toBe('');
  });
});