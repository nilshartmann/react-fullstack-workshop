import { Suspense } from "react";
import LoadingIndicator from "../shared/components/LoadingIndicator.tsx";
import BlogListPage from "./BlogListPage.tsx";

export default function BlogListRoute() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <BlogListPage />
    </Suspense>
  );
}
