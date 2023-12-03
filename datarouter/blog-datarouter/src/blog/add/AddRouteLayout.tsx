import React from "react";
import PageHeader from "../../shared/components/PageHeader.tsx";
import AppLink from "../../shared/components/AppLink.tsx";
import { FullWidthLayout } from "../../shared/components/Layout.tsx";
import { Outlet } from "react-router-dom";

export default function AddRouteLayout() {
  return (
    <>
      <PageHeader
        actionButton={
          <AppLink variant={"button"} href={"/blog"}>
            Cancel
          </AppLink>
        }
      >
        Add Post
      </PageHeader>
      <FullWidthLayout>
        <Outlet />
      </FullWidthLayout>
    </>
  );
}
