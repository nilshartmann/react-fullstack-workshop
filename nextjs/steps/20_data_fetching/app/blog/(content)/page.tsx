import { getBlogTeaserList } from "@/app/shared/api/backend-queries";
import PostTeaser from "@/app/shared/blog/PostTeaser";

export default async function BlogListPage() {
  const response = await getBlogTeaserList();

  return (
    <div className={"space-y-4"}>
      {response.posts.map((p) => (
        <PostTeaser key={p.id} post={p} />
      ))}
    </div>
  );
}
