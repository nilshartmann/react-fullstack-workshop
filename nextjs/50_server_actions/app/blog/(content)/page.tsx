import { getBlogTeaserList } from "@/app/shared/api/backend-queries";
import PostTeaser from "@/app/shared/blog/PostTeaser";
import OrderByButton from "@/app/blog/(content)/OrderByButton";
import { OrderBy } from "@/app/shared/api/types";
import AppLink from "@/app/shared/components/AppLink";

type BlogListPageProps = {
  searchParams: { order_by?: OrderBy };
};

export default async function BlogListPage({
  searchParams,
}: BlogListPageProps) {
  const response = await getBlogTeaserList({ orderBy: searchParams.order_by });

  return (
    <div className={"space-y-4"}>
      <div>
        <OrderByButton orderBy={"asc"} />
        <OrderByButton orderBy={"desc"} />
        <AppLink variant={"button"} href={"/blog/add"}>
          New Post
        </AppLink>
      </div>

      {response.posts.map((p) => (
        <PostTeaser key={p.id} post={p} />
      ))}
    </div>
  );
}
