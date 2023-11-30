import { test, expect } from "@playwright/experimental-ct-react";
import CommentList from "./CommentList";
import { GetBlogPostResponse } from "@/app/shared/api/types.ts";
import BlogPostPage from "@/app/shared/blog/BlogPostPage.tsx";

test("should work", async ({ mount, page }) => {
  const getBlogPostResponse: GetBlogPostResponse = {
    post: {
      id: "123",
      bodyMarkdown: "**Is there anybody out there?**",
      title: "Hello World",
      date: "2023-10-13T14:38:49.993Z",
    },
  };

  page.route("http://localhost:7002/posts/123", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(getBlogPostResponse),
    });
  });
  page.route("http://localhost:7002/posts/123/comments", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        comments: [
          { id: "1", postId: "1", username: "Susi", comment: "Great post" },
        ],
      }),
    });
  });
  const component = await mount(<BlogPostPage postId={"123"} />);
  await expect(component).toContainText("Hello World");
  await expect(component).toContainText("Is there anybody out there?");
  await expect(component).toContainText("Susi");
  await expect(component).toContainText("Great post");
});
