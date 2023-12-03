import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getBlogPost } from "../../../shared/api/backend-queries.ts";
import Post from "./Post.tsx";
import CommentList from "./CommentList.tsx";
import { Suspense } from "react";
import LoadingIndicator from "../../../shared/components/LoadingIndicator.tsx";

type BlogPostPageProps = {
  postId: string;
};

export default function BlogPostPage({ postId }: BlogPostPageProps) {
  const { data: post } = useSuspenseQuery({
    queryKey: ["blogpost", postId],
    queryFn: () => getBlogPost(postId),
  });

  if (!post) {
    return <h1>Not found :-(</h1>;
  }

  return (
    <div className={"space-y-4"}>
      <Post post={post} />
      <Suspense fallback={<LoadingIndicator />}>
        <CommentList postId={postId} />
      </Suspense>
    </div>
  );
}
