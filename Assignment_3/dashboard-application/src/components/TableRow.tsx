import React from "react";
import Link from "next/link";
import { Item } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Props = {
  item: Item;
  style: React.CSSProperties;
};

function Row({ item, style }: Props) {
  return (
    <div
      role="row"
      style={style}
      className="grid grid-cols-5 px-4 h-12.5 items-center border-b text-left"
    >
      <div role="cell">{item.id}</div>

      <div role="cell">
        <Link href={`/details/${item.id}`} className="text-blue-600 underline">
          {item.name}
        </Link>
      </div>

      <div role="cell">{item.type}</div>
      <div role="cell">{item.status}</div>
      <div role="cell">{formatDate(item.lastUpdated)}</div>
    </div>
  );
}

export default React.memo(Row);
