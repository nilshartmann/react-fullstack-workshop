import { useSearchParams } from "react-router-dom";
import { OrderBy } from "../../shared/api/types.ts";

export default function useBlogSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentOrderBy = (searchParams.get("order_by") || "desc") as OrderBy;

  const updateOrderBy = (newOrderBy: OrderBy) => {
    setSearchParams({ order_by: newOrderBy });
  };

  return { currentOrderBy, updateOrderBy } as const;
}
