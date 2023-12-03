import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout.tsx";
import LandingPage from "./LandingPage.tsx";
import AddRouteLayout from "./blog/add/AddRouteLayout.tsx";
import PostEditor, { addPostAction } from "./blog/add/PostEditor.tsx";
import BlogListRoute from "./blog/BlogListRoute.tsx";
import BlogPostPageRoute from "./blog/post/[postId]/BlogPostPageRoute.tsx";
import { blogPageLoader } from "./blog/post/[postId]/BlogPostPage.tsx";
import BlogContentLayout from "./blog/BlogContentLayout.tsx";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "blog",
        children: [
          {
            path: "add",
            element: <AddRouteLayout />,
            children: [
              { index: true, element: <PostEditor />, action: addPostAction },
            ],
          },
          {
            element: <BlogContentLayout />,
            children: [
              {
                index: true,
                element: <BlogListRoute />,
              },
              {
                path: "post/:postId",
                element: <BlogPostPageRoute />,
                loader: blogPageLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
