import Card from "../../../shared/components/Card.tsx";
import { H2 } from "../../../shared/components/Heading.tsx";
import { Comment } from "../../../shared/api/types.ts";
import { useAsyncValue } from "react-router-dom";

export default function CommentList() {
  const comments = useAsyncValue() as Comment[] | null;

  if (!comments?.length) {
    return <p>No comments for this post.</p>;
  }

  return (
    <Card>
      <H2 style={"primary"}>Comments</H2>
      <div className={"space-y-4"}>
        {comments.map((c) => (
          <div key={c.id}>
            <span className={"font-bold"}>{c.username}:</span> {c.comment}
          </div>
        ))}
      </div>
    </Card>
  );
}
