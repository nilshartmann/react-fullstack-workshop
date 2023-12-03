import PostTeaser from "./PostTeaser.tsx";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getBlogTeaserList } from "../shared/api/backend-queries.ts";

export default function BlogListPage() {
  const { isFetching, data } = useSuspenseQuery({
    queryFn: () => getBlogTeaserList(),
    queryKey: ["post-list"],
  });

  // todo: Posts mit useQuery lesen
  // die Posts dann mit der PostTeaser-Komponente rendern

  return (
    <div className={"space-y-4"}>
      {isFetching && <p>(Refreshing list...)</p>}
      {data.posts.map((p) => (
        <PostTeaser key={p.id} post={p} />
      ))}
      {/* Jeden gelesenen Post mit <PostTeaser /> rendern */}
    </div>
  );
}
