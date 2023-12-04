import Card from "../../../shared/components/Card.tsx";
import { dateTimeString } from "../../../shared/components/date-formatter.ts";
import { H1 } from "../../../shared/components/Heading.tsx";

type PostProps = {
  post: {
    date?: string;
    title: string;
    bodyHtml: string;
  };
};
export default function Post({ post }: PostProps) {
  return (
    <Card renderAs={"article"}>
      {!!post.date && <p>{dateTimeString(post.date)}</p>}
      <H1 style={"primary"} className={" mb-4 "}>
        {post.title}
      </H1>
      <div dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
    </Card>
  );
}
