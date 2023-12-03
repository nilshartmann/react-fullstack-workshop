import invariant from "tiny-invariant";
import { Await, defer, LoaderFunction, useLoaderData } from "react-router-dom";
import { queryClient } from "../../../query-client.ts";
import {
  getBlogPost,
  getComments,
} from "../../../shared/api/backend-queries.ts";
import { BlogPost, Comment } from "../../../shared/api/types.ts";
import Post from "./Post.tsx";
import CommentList from "./CommentList.tsx";
import { Suspense } from "react";
import LoadingIndicator from "../../../shared/components/LoadingIndicator.tsx";

export const blogPageLoader: LoaderFunction = ({ params }) => {
  // implementiere diese Funktion:
  // sowohl der Post als auch die Kommentare sollen "deferred" werden
  const { postId } = params;
  invariant(postId, "Param 'postId' missing in loader.");

  return defer({
    postPromise: queryClient.fetchQuery({
      queryKey: ["blogpost", postId],
      queryFn: () => getBlogPost(postId),
    }),
    commentsPromise: queryClient.fetchQuery({
      queryKey: ["blogpost", postId, "comments"],
      queryFn: () => getComments(postId),
    }),
  });
};

export default function BlogPostPage() {
  const { postPromise, commentsPromise } = useLoaderData() as {
    postPromise: Promise<BlogPost>;
    commentsPromise: Promise<Comment[] | null>;
  };

  return (
    <div className={"space-y-4"}>
      <Await resolve={postPromise}>
        {(post) => (post ? <Post post={post} /> : <h1>Not found :-(</h1>)}
      </Await>
      <Suspense fallback={<LoadingIndicator />}>
        <Await resolve={commentsPromise}>
          <CommentList />
        </Await>
      </Suspense>
    </div>
  );
}
