import Image from "next/image";

function About() {
  return (
    <section className="py-12 bg-muted">
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-8">Who we are</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/placeholder.svg"
              alt="About us"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <p className="text-lg">
              iWantSeats is the Philippines&apos; first real-time bus ticket
              booking service. Trusted by established bus operators with
              hundreds of branches nationwide, we provide convenient online
              booking for your bus travel needs.
            </p>
            <p className="text-lg">
              Beginning with popular routes of travel by bus from Manila to
              Baguio and Sagada, we safely and reliably transport travelers
              nationwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
