import { test, expect } from "@playwright/experimental-ct-react";
import Message from "./Message.tsx";

test("should work", async ({ mount }) => {
  const component = await mount(<Message msg={"Hello Playwright"} />);
  await expect(component).toContainText("Hello Playwright");
});
