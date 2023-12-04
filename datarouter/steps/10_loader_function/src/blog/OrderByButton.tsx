import { OrderBy } from "../shared/api/types.ts";
import { useTransition } from "react";
import useBlogSearchParams from "./useBlogSearchParams.tsx";
import Button from "../shared/components/Button.tsx";
import LoadingIndicator from "../shared/components/LoadingIndicator.tsx";

type OrderByButtonProps = {
  orderBy: OrderBy;
};

export default function OrderByButton({ orderBy }: OrderByButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { currentOrderBy, updateOrderBy } = useBlogSearchParams();

  const label = orderBy;

  function handleClick() {
    startTransition(() => {
      updateOrderBy(orderBy);
    });
  }

  return (
    <Button
      size={"sm"}
      disabled={currentOrderBy === orderBy}
      onClick={handleClick}
    >
      {isPending && <LoadingIndicator secondary />}
      {isPending || <>Order by date {label}</>}
    </Button>
  );
}
