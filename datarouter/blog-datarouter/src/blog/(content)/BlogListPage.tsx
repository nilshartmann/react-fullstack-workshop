// Typesafety of loader functions: https://github.com/remix-run/remix/blob/40a4d7d5e25eb5edc9a622278ab111d881c7c155/decisions/0003-infer-types-for-useloaderdata-and-useactiondata-from-loader-and-action-via-generics.md
import { Await, defer, LoaderFunction, useLoaderData } from "react-router-dom";
import { GetBlogTeaserListResponse, OrderBy } from "../../shared/api/types.ts";
import { queryClient } from "../../query-client.ts";
import { getBlogTeaserList } from "../../shared/api/backend-queries.ts";
import OrderByButton from "./OrderByButton.tsx";
import PostTeaser from "./PostTeaser.tsx";

export const blogListPageLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const orderBy = (url.searchParams.get("order_by") as OrderBy) || "desc";

  return defer({
    blogTeaserListPromise: queryClient.fetchQuery({
      queryKey: ["blog-list", orderBy],
      queryFn: () => getBlogTeaserList({ orderBy }),
    }),
  });
};

export function useBlogListPageLoaderData() {
  const data = useLoaderData();

  return data as { blogTeaserListPromise: Promise<GetBlogTeaserListResponse> };
}

type BlogListPageProps = {
  orderBy: OrderBy;
};

export default function BlogListPage({ orderBy }: BlogListPageProps) {
  console.log("Render /blog", orderBy);

  const { blogTeaserListPromise } = useBlogListPageLoaderData();

  return (
    <div className={"space-y-4"}>
      <div className={"flex justify-end gap-x-4"}>
        <OrderByButton orderBy={"desc"} />
        <OrderByButton orderBy={"asc"} />
      </div>
      <Await resolve={blogTeaserListPromise}>
        {/* hmmm... type safety? */}
        {(data: GetBlogTeaserListResponse) =>
          data.posts.map((p) => <PostTeaser key={p.id} post={p} />)
        }
      </Await>
    </div>
  );
}
