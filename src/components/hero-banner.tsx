function HeroBanner() {
  return (
    <section className="relative h-[600px] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/terminal.jpg/?height=600&width=1200')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container relative h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Irawan Land Transportation Terminal
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8">
          Official Terminal Website of Puerto Princesa City
        </p>
      </div>
    </section>
  );
}

export default HeroBanner;
