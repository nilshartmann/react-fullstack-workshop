import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getComments } from "../../../../shared/api/backend-queries.ts";

export function usePreFetchComments(postId: string) {
  // https://github.com/TanStack/query/issues/6108#issuecomment-1750204876

  const queryClient = useQueryClient();
  queryClient.ensureQueryData({
    queryKey: ["blogpost", postId, "comments"],
    queryFn: () => getComments(postId),
  });
}

export function useFetchComments(postId: string) {
  return useSuspenseQuery({
    queryKey: ["blogpost", postId, "comments"],
    queryFn: () => getComments(postId),
  });
}
