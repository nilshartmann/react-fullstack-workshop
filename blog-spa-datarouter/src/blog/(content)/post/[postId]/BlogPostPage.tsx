import invariant from "tiny-invariant";
import { Await, defer, LoaderFunction, useLoaderData } from "react-router-dom";
import { queryClient } from "../../../../query-client.ts";
import {
  getBlogPost,
  getComments,
} from "../../../../shared/api/backend-queries.ts";
import { BlogPost } from "../../../../shared/api/types.ts";
import Post from "./Post.tsx";
import { Suspense } from "react";
import LoadingIndicator from "../../../../shared/components/LoadingIndicator.tsx";
import CommentList from "./CommentList.tsx";

export const blogPageLoader: LoaderFunction = ({ params }) => {
  const { postId } = params;
  invariant(postId, "Param 'postId' missing in loader.");

  return defer({
    blogPromise: queryClient.fetchQuery({
      queryKey: ["blogpost", postId],
      queryFn: () => getBlogPost(postId),
    }),
    commentsPromise: queryClient.fetchQuery({
      queryKey: ["blogpost", postId, "comments"],
      queryFn: () => getComments(postId),
    }),
  });
};

export function useBlogPageLoaderData() {
  const data = useLoaderData();

  return data as {
    blogPromise: Promise<BlogPost | null>;
    commentsPromise: Promise<Comment[] | null>;
  };
}

export default function BlogPostPage() {
  const { blogPromise, commentsPromise } = useBlogPageLoaderData();

  return (
    <div className={"space-y-4"}>
      <Await resolve={blogPromise}>
        {(post: BlogPost | null) =>
          post ? <Post post={post} /> : <h1>Not found :-(</h1>
        }
      </Await>

      <Suspense
        fallback={<LoadingIndicator>Comments loading...</LoadingIndicator>}
      >
        <Await resolve={commentsPromise}>
          <CommentList />
        </Await>
      </Suspense>
    </div>
  );
}
