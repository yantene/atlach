import { HelloService } from "./HelloService.js";

describe("HelloService", () => {
  test("hello()", () => {
    const helloService = new HelloService("Sakura");

    const greeting = helloService.hello();

    expect(greeting).toBe("Hello, Sakura");
  });
});
