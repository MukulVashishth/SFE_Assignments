"use client";

import { useCallback } from "react";

type Props = {
  filter: string;
  setFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
};

export default function Filters({
  filter,
  setFilter,
  statusFilter,
  setStatusFilter,
}: Props) {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
    },
    [setFilter],
  );

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setStatusFilter(e.target.value);
    },
    [setStatusFilter],
  );

  return (
    <div className="mb-4 flex items-center gap-4">
      <div>
        <label htmlFor="search" className="mr-2 font-medium">
          Search:
        </label>
        <input
          id="search"
          type="text"
          value={filter}
          onChange={handleSearchChange}
          className="border px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="status" className="mr-2 font-medium">
          Status:
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={handleStatusChange}
          className="border px-2 py-1"
        >
          <option value="all">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}
