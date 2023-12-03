import { useQuery } from "@tanstack/react-query";
import { getBlogPost } from "../../../shared/api/backend-queries.ts";
import Post from "./Post.tsx";
import CommentList from "./CommentList.tsx";

type BlogPostPageProps = {
  postId: string;
};

export default function BlogPostPage({ postId }: BlogPostPageProps) {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogpost", postId],
    queryFn: () => getBlogPost(postId),
  });

  if (isLoading) {
    return <h1>Post is loading...</h1>;
  }

  if (isError) {
    return <h1>Post loading failed</h1>;
  }

  if (!post) {
    return <h1>Not found :-(</h1>;
  }

  return (
    <div className={"space-y-4"}>
      <Post post={post} />
      <CommentList postId={postId} />
    </div>
  );
}
