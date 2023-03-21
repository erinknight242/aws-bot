import { regex } from '../magic8';

describe('magic8 script', () => {
  it("regex detects 'will' questions", () => {
    expect(regex.test('where is something?')).toBe(false);
    expect(regex.test('will it rain today?')).toBe(true);
    expect(regex.test('will i find my keys')).toBe(false);
  });
});
