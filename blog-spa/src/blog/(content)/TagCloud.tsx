import { tagCloud as createTagCloud } from "tag-cloud";
import { GetTagsResponse } from "../../shared/api/types.ts";
import { H2 } from "../../shared/components/Heading.tsx";
import { timeString } from "../../shared/components/date-formatter.ts";
import "./TagCloud.css";
type TagCloudProps = {
  tags: GetTagsResponse;
};
export default function TagCloud({ tags }: TagCloudProps) {
  const tc = createTagCloud(
    tags.tags.map((t) => ({
      tagName: t.name,
      count: t.count,
    })),
    (err: unknown, data: unknown) => data,
    { numBuckets: 4, classPrefix: "TagCloud--tag-" },
  );

  return (
    <div className={"space-y-4 text-center"}>
      <H2>Tags</H2>
      <div
        className={"TagCloud"}
        dangerouslySetInnerHTML={{
          __html: tc,
        }}
      />
      <p>(generated at {timeString(tags.generatedAt)})</p>
    </div>
  );
}
