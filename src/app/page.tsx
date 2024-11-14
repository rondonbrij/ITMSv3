import HeroBanner from "@/components/hero-banner";
import BookingForm from "@/components/booking-form";
import Operators from "@/components/operators";
import About from "@/components/about";
import FAQ from "@/components/faq";
import Blog from "@/components/blog";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <div className=" -mt-24 w-full relative p-12 z-10 mb-12">
        <div className="container bg-background rounded-lg m-auto shadow-lg p-6">
          <BookingForm />
        </div>
      </div>
      {/* <div className="container mb-12">
        <BookingForm featured />
      </div> */}
      <Operators />
      <About />
      <FAQ />
      <Blog />
      <Contact />
    </>
  );
}
