import { getBlogPost, getComments } from "@/app/shared/api/backend-queries";
import CommentList from "@/app/shared/blog/CommentList";
import { notFound } from "next/navigation";
import Post from "@/app/shared/blog/Post";
import { Suspense } from "react";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator";

type PostPageProps = {
  params: { postId: string };
};
export default async function PostPage({ params }: PostPageProps) {
  const commentsPromise = getComments(params.postId);
  const post = await getBlogPost(params.postId);

  if (!post) {
    notFound();
  }

  return (
    <div className={"space-y-4"}>
      <Post post={post} />
      <Suspense
        fallback={<LoadingIndicator>Comments loading...</LoadingIndicator>}
      >
        <CommentList commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  );
}
