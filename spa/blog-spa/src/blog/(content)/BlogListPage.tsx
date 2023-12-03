import { OrderBy } from "../../shared/api/types.ts";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getBlogTeaserList } from "../../shared/api/backend-queries.ts";
import OrderByButton from "./OrderByButton.tsx";
import PostTeaser from "./PostTeaser.tsx";

type BlogListPageProps = {
  orderBy: OrderBy;
};
export default function BlogListPage({ orderBy }: BlogListPageProps) {
  console.log("Render /blog", orderBy);
  const { data, isFetching } = useSuspenseQuery({
    queryKey: ["blog-list", orderBy],
    queryFn: () => getBlogTeaserList({ orderBy }),
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

  return (
    <div className={"space-y-4"}>
      <div className={"flex items-center justify-between text-grey-3"}>
        <div className={"text-sm"}>
          {isFetching && "(Fetching in background)"}
        </div>
        <div className={"flex justify-end gap-x-4"}>
          <OrderByButton orderBy={"desc"} />
          <OrderByButton orderBy={"asc"} />
        </div>
      </div>
      {data.posts.map((p) => (
        <PostTeaser key={p.id} post={p} />
      ))}
    </div>
  );
}
