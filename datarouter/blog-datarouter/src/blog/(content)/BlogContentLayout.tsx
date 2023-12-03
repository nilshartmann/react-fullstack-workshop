import PageHeader from "../../shared/components/PageHeader.tsx";
import AppLink from "../../shared/components/AppLink.tsx";
import {
  Main,
  Sidebar,
  TwoColumnLayout,
} from "../../shared/components/Layout.tsx";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { H2 } from "../../shared/components/Heading.tsx";
import BlogContentLayoutSidebar from "./BlogContentLayoutSidebar.tsx";

export default function BlogContentLayout() {
  return (
    <>
      <PageHeader
        actionButton={
          <AppLink variant={"button"} href={"/blog/add"}>
            Create new Post
          </AppLink>
        }
      >
        <AppLink href={"/blog"}>Home</AppLink>
      </PageHeader>
      <TwoColumnLayout>
        <Main>
          <Outlet />
        </Main>
        <Sidebar>
          <Suspense fallback={<H2>Tag Cloud loading</H2>}>
            <BlogContentLayoutSidebar />
          </Suspense>
        </Sidebar>
      </TwoColumnLayout>
    </>
  );
}
