import { useParams } from "react-router-dom";
import invariant from "tiny-invariant";
import { Suspense } from "react";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator.tsx";
import BlogPostPage from "@/app/shared/blog/BlogPostPage.tsx";

type BlogPostPageRouteParams = {
  postId: string;
};
export default function BlogPostPageRoute() {
  const { postId } = useParams<BlogPostPageRouteParams>();
  invariant(postId, "PostId param missing in url!");

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <BlogPostPage />
    </Suspense>
  );
}
