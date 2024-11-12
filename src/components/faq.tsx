import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQ() {
  const faqs = [
    {
      question: "How does iWantSeats work?",
      answer:
        "Select your route, choose your schedule, and book your seats online.",
    },
    {
      question: "How much is the fee to book your bus ticket on iWantSeats?",
      answer: "Booking fees vary depending on the route and operator.",
    },
    {
      question: "When should I pay for my transaction?",
      answer:
        "Payment should be made immediately after booking to secure your seats.",
    },
    {
      question: "Can I refund or cancel my booking?",
      answer: "Refund and cancellation policies vary by operator.",
    },
    {
      question: "How early should I be at the terminal?",
      answer: "We recommend arriving at least 30 minutes before departure.",
    },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-8">F.A.Q</h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQ;
