"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { OrderBy } from "@/app/shared/api/types";
import Button from "@/app/shared/components/Button";

// type BlogListPageProps = {
//   searchParams: { order_by?: OrderBy };
// };

type OrderByButtonProps = { orderBy: OrderBy };
export default function OrderByButton({ orderBy }: OrderByButtonProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("order_by", orderBy);
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return <Button onClick={handleClick}>Order by Date ({orderBy})</Button>;
}
