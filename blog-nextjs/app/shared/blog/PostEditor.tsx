"use client";
import { ChangeEvent, useState, useTransition } from "react";
import { addPost } from "@/app/shared/api/server-actions";
import { useRouter } from "next/navigation";
import Message from "@/app/shared/components/Message";
import Post from "@/app/shared/blog/Post";
import Card from "@/app/shared/components/Card";
import Button from "@/app/shared/components/Button";
import ButtonBar from "@/app/shared/components/ButtonBar";
import { H2 } from "@/app/shared/components/Heading";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator";

export default function PostEditor() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const clearDisabled = (!title && !body) || isPending;
  const saveButtonDisabled = !title || !body || isPending;

  function clear() {
    setError("");
    setTitle("");
    setBody("");
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    setError("");
  }

  function handleBodyChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
    setError("");
  }

  async function handleSave() {
    startTransition(async () => {
      const result = await addPost(title, body);
      if (result.status === "success") {
        router.push("/blog");
      }
    });
  }

  return (
    <>
      <div className={"space-y-4"}>
        <Card>
          <div className={"Container"}>
            <fieldset disabled={isPending}>
              <label className={"block"}>
                Title
                <input
                  className={"w-full rounded bg-grey-2 p-2 "}
                  value={title}
                  onChange={handleTitleChange}
                />
              </label>
              {title ? (
                title.length < 5 ? (
                  <Message
                    msg={`Please enter at lease ${
                      5 - title.length
                    } more characters`}
                  />
                ) : (
                  <Message type="info" msg="Title correctly filled" />
                )
              ) : (
                <Message type="error" msg="Please enter a title" />
              )}

              <label className={"block"}>
                Body
                <textarea
                  className={"w-full rounded bg-grey-2 p-2 "}
                  value={body}
                  onChange={handleBodyChange}
                />
              </label>
              {body ? (
                <Message type="info" msg="Body correctly filled" />
              ) : (
                <Message msg="Please enter a body" />
              )}
            </fieldset>
            <ButtonBar>
              <Button disabled={clearDisabled} onClick={clear}>
                Clear
              </Button>
              <Button onClick={() => router.push("/blog")}>Cancel</Button>
              <Button disabled={saveButtonDisabled} onClick={handleSave}>
                {isPending && <LoadingIndicator secondary />}
                {isPending || "Save Post"}
              </Button>
            </ButtonBar>
            {!!error && <Message msg={error} />}
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
