import useBlogSearchParams from "./useBlogSearchParams.tsx";
import { Suspense } from "react";
import LoadingIndicator from "../../shared/components/LoadingIndicator.tsx";
import BlogListPage from "./BlogListPage.tsx";

export default function BlogListRoute() {
  const { currentOrderBy } = useBlogSearchParams();
  console.log("Render /blog");

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <BlogListPage orderBy={currentOrderBy} />
    </Suspense>
  );
}
