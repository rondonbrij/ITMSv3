import Image from "next/image";

function Operators() {
  return (
    <section className="py-12 bg-muted">
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-8">
          Trusted by established transport operators in the Philippines
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-32 h-12 relative">
              <Image
                src="/placeholder.svg"
                alt={`Operator ${i + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Operators;
