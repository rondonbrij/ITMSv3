import Image from "next/image";

function About() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Who we are</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/images/Transport-term.jpg"
              alt="About us"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <p className="text-lg">
              PPLTBooking is the Palawan&apos;s best bus and van ticket
              booking service. Trusted by established transport vehicle operators. We provide convenient online
              booking for your travel needs.
            </p>
            <p className="text-lg">
              Beginning with popular routes of travel by van and bus from PPC to
              North and South, we safely and reliably transport travelers
              nationwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
