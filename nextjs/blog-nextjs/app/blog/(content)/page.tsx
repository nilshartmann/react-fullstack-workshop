import { getBlogTeaserList } from "@/app/shared/api/backend-queries";
import PostTeaser from "@/app/shared/blog/PostTeaser";
import OrderByButton from "@/app/shared/blog/OrderByButton";
import { OrderBy } from "@/app/shared/api/types";
import {cookies, headers} from "next/headers";

type SearchParams = {
  order_by?: OrderBy;
  filter?: string;
};

type BlogListRouteProps = {
  searchParams: SearchParams;
};

// Hier mit kann die ganze Route "dynamisch" gemacht werden,
//  d.h. das Caching wird augeschaltet.
//  (auch das Caching jeglicher fetch-Requests, die beim Rendern
//   durchgeführt werden).
//
//  ACHTUNG! Nachdem einschalten von 'force-dynamic' kann es sein
//    dass noch gecachte Informationen (auch im Browser!) vorliegen.
//    Deswegen mit dev:clean starten und im Browser auch Cache leeren!
// Und selbst dann: mal funktioniert es, mal wird trotzdem gecached
// Möglicherweise ist der "Router Cache" (https://nextjs.org/docs/app/building-your-application/caching#router-cache)
//  schuld an dem Verhalten
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default async function BlogListPage({
  searchParams,
}: BlogListRouteProps) {
  const orderBy = searchParams.order_by || "desc";
  const filter = searchParams.filter || undefined;

  console.log("Render /blog");
  const response = await getBlogTeaserList({ orderBy, filter });

  return (
    <div className={"space-y-4"}>
      <div className={"flex justify-end gap-x-4"}>
        <OrderByButton orderBy={"desc"} />
        <OrderByButton orderBy={"asc"} />
      </div>
      {response.posts.map((p) => (
        <PostTeaser key={p.id} post={p} />
      ))}
    </div>
  );
}
