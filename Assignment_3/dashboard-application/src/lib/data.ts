import { Item } from "./types";

export function generateItems(count: number): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    type: i % 2 === 0 ? "Asset" : "Certificate",
    status: i % 3 === 0 ? "Inactive" : "Active",
    lastUpdated: new Date().toISOString(),
  }));
}

export function getItemById(id: number): Item | null {
  if (id < 1 || id > 50000) return null;

  return {
    id,
    name: `Item ${id}`,
    type: id % 2 === 0 ? "Asset" : "Certificate",
    status: id % 3 === 0 ? "Inactive" : "Active",
    lastUpdated: new Date().toISOString(),
  };
}
