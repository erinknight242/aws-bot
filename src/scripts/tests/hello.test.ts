import { whoRegex, helloRegex } from "../hello";

describe("hello script", () => {
  it("regex detects Who are you?", () => {
    expect(whoRegex.test("Who are you?")).toBe(true);
    expect(whoRegex.test("Who aren't you?")).toBe(false);
  });

  it("regex detects Hello", () => {
    expect(helloRegex.test("It should find hello in here")).toBe(true);
    expect(helloRegex.test("oh hell o")).toBe(false);
  });
});
