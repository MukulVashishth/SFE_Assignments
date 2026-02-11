import { getItemById } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailPage({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (isNaN(id)) {
    return <p>Invalid ID</p>;
  }

  const item = getItemById(id);

  if (!item) {
    return <p>Item not found</p>;
  }

  return (
    <main>
      <h1 className="text-xl font-bold mb-4">{item.name}</h1>
      <p>
        <strong>ID:</strong> {item.id}
      </p>
      <p>
        <strong>Status:</strong> {item.status}
      </p>
      <p>
        <strong>Type:</strong> {item.type}
      </p>
      <p>
        <strong>Last Updated:</strong> {item.lastUpdated}
      </p>
    </main>
  );
}
