import { expect, test } from "@playwright/experimental-ct-react";
import CommentList from "./CommentList";

test("should work", async ({ mount, page }) => {
  page.route("http://localhost:7002/posts/123/comments", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        comments: [
          { id: "1", postId: "1", username: "Susi", comment: "Hello" },
        ],
      }),
    });
  });
  const component = await mount(<CommentList postId={"123"} />);
  await expect(component).toContainText("Susi");
  await expect(component).toContainText("Hello");
});
