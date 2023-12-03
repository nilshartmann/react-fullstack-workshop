import Card from "../../../shared/components/Card.tsx";
import { H2 } from "../../../shared/components/Heading.tsx";
import { getComments } from "../../../shared/api/backend-queries.ts";
import { useQuery } from "@tanstack/react-query";

type CommentListProps = {
  postId: string;
};
export default function CommentList({ postId }: CommentListProps) {
  const { data } = useQuery({
    queryKey: ["blogpost", postId, "comments"],
    queryFn: () => getComments(postId),
  });

  if (!data) {
    // Im echten Leben würde man sich hier mehr Mühe geben
    // und auf isError und isLoading etc. prüfen
    return <h1>Loading comments</h1>;
  }

  if (!data.length) {
    return <p>No comments for this post.</p>;
  }

  return (
    <Card>
      <H2 style={"primary"}>Comments</H2>
      <div className={"space-y-4"}>
        {data.map((c) => (
          <div key={c.id}>
            <span className={"font-bold"}>{c.username}:</span> {c.comment}
          </div>
        ))}
      </div>
    </Card>
  );
}
