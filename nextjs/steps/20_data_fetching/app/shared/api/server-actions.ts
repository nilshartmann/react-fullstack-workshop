"use server";
import { revalidateTag } from "next/cache";
import { AddPostResponse } from "@/app/shared/api/types";

// ---------------------------------------------------------------------------------------------------
// -- Simulate slowness
// ---------------------------------------------------------------------------------------------------
const addPostSlowdown = ``; // `?slowDown=2400`

type ActionErrorResponse = {
  status: "error";
  err: string;
};

type ActionSuccessResponse = {
  status: "success";
};

export type ActionResponse = ActionErrorResponse | ActionSuccessResponse;

/**
 * Saves the given post to the backend
 *
 * If saving was successful, it returns the new blog post object
 * Otherwise an Error is raised
 */
async function savePostToBackend(title: string, body: string) {
  const response = await fetch(
    `http://localhost:7002/posts${addPostSlowdown}`,
    {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "content-type": "application/json" },
    },
  );

  if (!response.ok) {
    const err = await response.json();
    console.error("addPost failed", err);
    const msg = err.error || "Unknown error";

    throw new Error(msg);
  }

  const json = await response.json();

  const newPost = AddPostResponse.parse(json);

  return newPost;
}

// TODO: Fuege hier die Server Action zum Speichern eines Posts hinzu
//   Das richtige Speichern des Posts im Blog-Backend kannst Du an die
//   Methode savePostToBackend delegieren
