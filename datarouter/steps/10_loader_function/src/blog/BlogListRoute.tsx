import { Suspense } from "react";
import LoadingIndicator from "../shared/components/LoadingIndicator.tsx";
import BlogListPage from "./BlogListPage.tsx";

export default function BlogListRoute() {
  console.log("Render /blog");

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <BlogListPage />
    </Suspense>
  );
}
