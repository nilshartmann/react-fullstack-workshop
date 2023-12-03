import { useSuspenseQuery } from "@tanstack/react-query";
import { getTags } from "../../shared/api/backend-queries.ts";
import TagCloud from "./TagCloud.tsx";

export default function BlogContentLayoutSidebar() {
  const { data: tags } = useSuspenseQuery({
    queryKey: ["tags"],
    queryFn: () => getTags(),
  });

  return <TagCloud tags={tags} />;
}
