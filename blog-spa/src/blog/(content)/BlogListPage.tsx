import { OrderBy } from "../../shared/api/types.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBlogTeaserList } from "../../shared/api/backend-queries.ts";
import OrderByButton from "./OrderByButton.tsx";
import PostTeaser from "./PostTeaser.tsx";

type BlogListPageProps = {
  orderBy: OrderBy;
};
export default function BlogListPage({ orderBy }: BlogListPageProps) {
  console.log("Render /blog", orderBy);
  const { data } = useSuspenseQuery({
    queryKey: ["blog-list", orderBy],
    queryFn: () => getBlogTeaserList(orderBy),
  });

  return (
    <div className={"space-y-4"}>
      <div className={"flex justify-end gap-x-4"}>
        <OrderByButton orderBy={"desc"} />
        <OrderByButton orderBy={"asc"} />
      </div>
      {data.posts.map((p) => (
        <PostTeaser key={p.id} post={p} />
      ))}
    </div>
  );
}
