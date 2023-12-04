import invariant from "tiny-invariant";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { queryClient } from "../../../query-client.ts";
import {
  getBlogPost,
  getComments,
} from "../../../shared/api/backend-queries.ts";
import { BlogPost, Comment } from "../../../shared/api/types.ts";
import Post from "./Post.tsx";
import CommentList from "./CommentList.tsx";

export const blogPageLoader: LoaderFunction = async ({ params }) => {
  // implementiere diese Funktion:
  // sowohl der Post als auch die Kommentare sollen "deferred" werden
  const { postId } = params;
  invariant(postId, "Param 'postId' missing in loader.");

  return {
    post: await queryClient.fetchQuery({
      queryKey: ["blogpost", postId],
      queryFn: () => getBlogPost(postId),
    }),
    comments: await queryClient.fetchQuery({
      queryKey: ["blogpost", postId, "comments"],
      queryFn: () => getComments(postId),
    }),
  };
};

export default function BlogPostPage() {
  const { post, comments } = useLoaderData() as {
    post: BlogPost;
    comments: Comment[];
  };

  return (
    <div className={"space-y-4"}>
      {post ? <Post post={post} /> : <h1>Not found :-(</h1>}
      <CommentList comments={comments} />
    </div>
  );
}
