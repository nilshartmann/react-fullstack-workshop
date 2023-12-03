import PostTeaser from "./PostTeaser.tsx";
import { useQuery } from "@tanstack/react-query";
import { getBlogTeaserList } from "../shared/api/backend-queries.ts";

export default function BlogListPage() {
  const { isLoading, isFetching, isSuccess, data, isError, error } = useQuery({
    queryFn: () => getBlogTeaserList(),
    queryKey: ["post-list"],
  });

  // todo: Posts mit useQuery lesen
  // die Posts dann mit der PostTeaser-Komponente rendern

  if (isLoading) {
    return <h1>Posts are loading...</h1>;
  }

  if (isError) {
    return <h1>Loading posts failed: {error.toString()}</h1>;
  }

  if (!isSuccess) {
    return null;
  }

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
