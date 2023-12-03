import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout.tsx";
import LandingPage from "./LandingPage.tsx";
import AddPage from "./blog/add/AddPage.tsx";
import BlogListRoute from "./blog/BlogListRoute.tsx";
import BlogPostPageRoute from "./blog/post/[postId]/BlogPostPageRoute.tsx";
import PostEditor from "./blog/add/PostEditor.tsx";
import BlogContentLayout from "./blog/BlogContentLayout.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

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
            index: true,
            element: <AddPage />,
          },

          {
            element: <BlogContentLayout />,
            children: [
              { index: true, element: <BlogListRoute /> },
              { path: "post/:postId", element: <BlogPostPageRoute /> },
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
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
