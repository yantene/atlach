import { HelloService } from "./HelloService";

describe("HelloService", () => {
  test("hello()", () => {
    const helloService = new HelloService("Sakura");

    const greeting = helloService.hello();

    expect(greeting).toBe("Hello, Sakura");
  });
});
