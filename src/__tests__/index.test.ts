import { packageStart } from "..";

jest.spyOn(global.console, "log");

describe("@liqtags/utils", () => {
  it("adds two numbers", () => {
    expect(packageStart()).toBe("PACKAGE_START");
  });
});
