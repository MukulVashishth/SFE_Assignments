"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Item } from "@/lib/types";
import Filters from "./Filters";
import Row from "./TableRow";
import TableSkeleton from "./TableSkeleton";

type Props = {
  items: Item[];
};

export default function InventoryTable({ items }: Props) {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<keyof Item>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [displayItems, setDisplayItems] = useState<Item[]>(items);

  const parentRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    let result = items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    );

    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter);
    }

    result = [...result].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [items, filter, statusFilter, sortKey, sortDirection]);

  const handleSort = (key: keyof Item) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  // Simulate async search
  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setDisplayItems(filteredItems);
      setIsLoading(false);
    }, 400); // simulate network delay

    return () => clearTimeout(timeout);
  }, [filteredItems]);

  const rowVirtualizer = useVirtualizer({
    count: displayItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <>
      <Filters
        filter={filter}
        setFilter={setFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div
        role="table"
        aria-label="Inventory table"
        className="mt-4 border rounded overflow-hidden"
      >
        <div
          role="row"
          className="grid grid-cols-5 border-b bg-gray-100 px-4 h-12.5 items-center text-left font-semibold"
        >
          <button onClick={() => handleSort("id")} className="text-left">
            ID {sortKey === "id" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
          </button>

          <button onClick={() => handleSort("name")} className="text-left">
            Name{" "}
            {sortKey === "name" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
          </button>

          <button onClick={() => handleSort("type")} className="text-left">
            Type{" "}
            {sortKey === "type" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
          </button>

          <button onClick={() => handleSort("status")} className="text-left">
            Status{" "}
            {sortKey === "status" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
          </button>

          <button
            onClick={() => handleSort("lastUpdated")}
            className="text-left"
          >
            Last Updated{" "}
            {sortKey === "lastUpdated"
              ? sortDirection === "asc"
                ? "↑"
                : "↓"
              : ""}
          </button>
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : displayItems.length === 0 ? (
          <div className="p-4 text-gray-500">No results found.</div>
        ) : (
          <div ref={parentRef} style={{ height: 600, overflow: "auto" }}>
            <div
              style={{
                height: rowVirtualizer.getTotalSize(),
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const item = displayItems[virtualRow.index];

                return (
                  <Row
                    key={item.id}
                    item={item}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
