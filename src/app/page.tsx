import AddMemeries from "@/components/add-memeries";

export default function Home() {
  // If no Memeries exist, show a welcome message
  // Otherwise, display the Memeries

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-lg font-bold">Welcome!</h1>
        <p>You have no Memeries. Add them here to get started:</p>
      </div>
      <AddMemeries />
    </div>
  );
}
