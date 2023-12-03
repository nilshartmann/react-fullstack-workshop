// Typesafety of loader functions: https://github.com/remix-run/remix/blob/40a4d7d5e25eb5edc9a622278ab111d881c7c155/decisions/0003-infer-types-for-useloaderdata-and-useactiondata-from-loader-and-action-via-generics.md
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { queryClient } from "../query-client.ts";
import { getBlogTeaserList } from "../shared/api/backend-queries.ts";
import { BlogPost, BlogPostTeaser } from "../shared/api/types.ts";
import PostTeaser from "./PostTeaser.tsx";

export const blogListPageLoader: LoaderFunction = async () => {
  return queryClient.fetchQuery({
    queryKey: ["blog-list"],
    queryFn: () => getBlogTeaserList(),
  });
};

export default function BlogListPage() {
  const posts = useLoaderData() as { posts: BlogPostTeaser[] };

  // - blogListPageLoader implementieren
  // - blogListPageLoader als Loader-Funktion fuer die Route "/blog" registrieren
  // - Daten hier verwenden um die Liste der <PostTeaser>-Komponenten zu rendern
  return (
    <div className={"space-y-4"}>
      {posts.posts.map((p) => (
        <PostTeaser key={p.id} post={p} />
      ))}
      {/* Zeige jeden gelesenen Blog-Teaser mit <PostTeaser /> an */}
    </div>
  );
}
