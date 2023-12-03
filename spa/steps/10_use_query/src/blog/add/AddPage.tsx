import React from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "../../shared/components/PageHeader.tsx";
import AppLink from "../../shared/components/AppLink.tsx";
import { FullWidthLayout } from "../../shared/components/Layout.tsx";
import PostEditor from "./PostEditor.tsx";

export default function AddPage() {
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
        <PostEditor />
      </FullWidthLayout>
    </>
  );
}
