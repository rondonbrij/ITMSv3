"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

function FAQ() {
  const faqs = [
    {
      question: "How does PPLT Booking work?",
      answer:
        "Simply select your route, choose your preferred schedule, and book your seats online through our easy-to-use platform.",
    },
    {
      question: "What are the booking fees?",
      answer:
        "Booking fees vary depending on the route and transport operator. All fees will be clearly displayed before confirmation.",
    },
    {
      question: "When should I pay for my booking?",
      answer:
        "Payment should be made immediately after booking to secure your seats. We accept various payment methods for your convenience.",
    },
    {
      question: "What is the refund and cancellation policy?",
      answer:
        "Refund and cancellation policies vary by operator. Please check the specific terms when booking or contact our support team.",
    },
    {
      question: "How early should I arrive at the terminal?",
      answer:
        "We recommend arriving at least 30 minutes before your scheduled departure time to ensure a smooth check-in process.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Find answers to common questions about our booking service
          </p>
        </motion.div>
        <motion.div
          className="mx-auto max-w-3xl mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
