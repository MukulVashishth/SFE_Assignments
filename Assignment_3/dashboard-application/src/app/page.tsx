import { generateItems } from "@/lib/data";
import InventoryTable from "@/components/InventoryTable";

export default function Page() {
  const items = generateItems(50000);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Inventory Dashboard</h1>
      <InventoryTable items={items} />
    </main>
  );
}
