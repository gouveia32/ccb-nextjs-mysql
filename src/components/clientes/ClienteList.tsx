import Cliente from "./Cliente";

export default function ClienteList({ clientes }) {
  return (
    <section className="p-6">
      <h3 className="text-gray-600 text-2xl font-medium font-serif">
        Newest clientes
      </h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {clientes
          ? clientes
              .filter((cliente, idx) => idx < 4)
              .map((cliente) => <Cliente key={cliente.id} cliente={cliente} />)
          : "no-data"}
      </div>
    </section>
  );
}
