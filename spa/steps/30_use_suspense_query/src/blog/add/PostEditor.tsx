import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../../shared/api/server-actions.ts";
import { useState } from "react";
import { isApiError } from "../../shared/api/api-error.ts";
import Card from "../../shared/components/Card.tsx";
import Message from "../../shared/components/Message.tsx";
import ButtonBar from "../../shared/components/ButtonBar.tsx";
import Button from "../../shared/components/Button.tsx";
import LoadingIndicator from "../../shared/components/LoadingIndicator.tsx";
import { H2 } from "../../shared/components/Heading.tsx";
import Post from "../post/[postId]/Post.tsx";

type NewPost = {
  title: string;
  body: string;
};

function useSavePostMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ title, body }: NewPost) => {
      return addPost(title, body);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["post-list"],
      });
    },
  });
  return mutation;
}

export default function PostEditor() {
  const navigate = useNavigate();
  const mutation = useSavePostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const clearDisabled = !title && !body;
  const saveButtonDisabled = !title || !body;

  function clear() {
    setTitle("");
    setBody("");
  }

  function openPostList() {
    navigate("/blog");
  }

  async function handleSave() {
    const result = await mutation.mutateAsync({ title, body });

    if (result.status === "success") {
      openPostList();
    }
  }

  return (
    <>
      <div className={"space-y-4"}>
        <Card>
          <div className={"Container"}>
            <fieldset>
              <label className={"block"}>
                Title
                <input
                  className={"w-full rounded bg-grey-2 p-2 "}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.currentTarget.value);
                    mutation.reset();
                  }}
                />
              </label>

              <label className={"block"}>
                Body
                <textarea
                  className={"w-full rounded bg-grey-2 p-2 "}
                  value={body}
                  onChange={(e) => {
                    setBody(e.currentTarget.value);
                    mutation.reset();
                  }}
                />
              </label>
            </fieldset>
            <ButtonBar>
              <Button disabled={clearDisabled} onClick={clear}>
                Clear
              </Button>
              <Button onClick={openPostList}>Cancel</Button>
              <Button disabled={saveButtonDisabled} onClick={handleSave}>
                Save Post
              </Button>
            </ButtonBar>
            {mutation.isError && (
              <Message
                msg={"Saving failed :-( " + mutation.error}
                type={"error"}
              />
            )}
          </div>
        </Card>
        <Card>
          <H2 style={"primary"}>Preview: Your new Post</H2>
        </Card>
        {!!(title || body) && <Post post={{ title, bodyHtml: body }} />}
      </div>
    </>
  );
}
