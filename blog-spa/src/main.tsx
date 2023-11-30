import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout.tsx";
import LandingPage from "./LandingPage.tsx";
import AddRouteLayout from "./blog/add/AddRouteLayout.tsx";
import BlogListRoute from "./blog/(content)/BlogListRoute.tsx";
import BlogPostPageRoute from "./blog/(content)/post/[postId]/BlogPostPageRoute.tsx";
import PostEditor from "./blog/add/PostEditor.tsx";
import BlogContentLayout from "./blog/(content)/BlogContentLayout.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const queryClient = new QueryClient();

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
            children: [{ index: true, element: <PostEditor /> }],
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
