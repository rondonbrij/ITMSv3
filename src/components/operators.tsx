import Image from "next/image";

function Operators() {
  return (
    <section className="py-12 w-full flex justify-center">
      <div className="container px-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Trusted by established transport companies in Palawan
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-32 h-12 relative">
              <Image
                src="/images/placeholder.svg"
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
