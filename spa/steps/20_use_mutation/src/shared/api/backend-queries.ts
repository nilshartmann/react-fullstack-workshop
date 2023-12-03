import {
  BlogPost,
  Comment,
  GetBlogPostResponse,
  GetBlogTeaserListResponse,
  GetCommentsResponse,
  GetTagsResponse,
  OrderBy,
} from "./types";
import { micromark } from "micromark";

// ---------------------------------------------------------------------------------------------------
// -- Simulate slowness
// ---------------------------------------------------------------------------------------------------
const getBlogTeaserListSlowdown = ``; // `1600`
const getTagsSlowdown = ``; // `?slowDown=2400`;
const getBlogPostSlowdown = ``; // `?slowDown=2400`
const getCommentsSlowdown = ``; // `?slowDown=2400`

// ---------------------------------------------------------------------------------------------------
// -- getTags
// ---------------------------------------------------------------------------------------------------
export async function getTags(): Promise<GetTagsResponse> {
  console.log("Starting fetch tags from external backend service");
  const r = await fetch(`http://localhost:7002/tags${getTagsSlowdown}`);

  const json = await r.json();
  return GetTagsResponse.parse(json);
}

// ---------------------------------------------------------------------------------------------------
// -- getBlogTeaserList
// ---------------------------------------------------------------------------------------------------

type GetBlogTeaserListParams = {
  orderBy?: OrderBy;
  filter?: string;
};

export async function getBlogTeaserList({
  orderBy = "desc",
  filter,
}: GetBlogTeaserListParams = {}) {
  console.log("Starting fetch to external backend service");

  const searchParams = new URLSearchParams();
  searchParams.set("order_by", orderBy);
  if (filter) {
    searchParams.set("filter", filter);
  }

  if (getBlogTeaserListSlowdown) {
    searchParams.set("slowDown", getBlogTeaserListSlowdown);
  }

  const url = `http://localhost:7002/posts?teaser&${searchParams.toString()}`;
  console.log("Reading Teasers from", url);

  const r = await fetch(url);

  console.log(
    "Fetch request to external backend service returned timestamp",
    r.headers.get("x-backend-started-at"),
  );
  const json = await r.json();
  return GetBlogTeaserListResponse.parse(json);
}

// ---------------------------------------------------------------------------------------------------
// -- getBlogPost
// ---------------------------------------------------------------------------------------------------

export async function getBlogPost(postId: string): Promise<BlogPost | null> {
  console.log(`Starting backend request for blog post with id ${postId}`);

  const r = await fetch(
    `http://localhost:7002/posts/${postId}${getBlogPostSlowdown}`,
  );

  if (r.status === 404) {
    return null;
  }

  const json = await r.json();
  const post = GetBlogPostResponse.parse(json).post;
  const bodyHtml = micromark(post.bodyMarkdown);
  return { ...post, bodyHtml };
}

// ---------------------------------------------------------------------------------------------------
// -- getComments
// ---------------------------------------------------------------------------------------------------

export async function getComments(postId: string): Promise<Comment[] | null> {
  console.log(`Starting backend request for comments with postId ${postId}`);

  const r = await fetch(
    `http://localhost:7002/posts/${postId}/comments${getCommentsSlowdown}`,
  );

  if (r.status === 404) {
    return null;
  }

  const json = await r.json();
  const comments = GetCommentsResponse.parse(json).comments;
  return comments;
}
