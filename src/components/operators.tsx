"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const operators = [
  { name: "Roro Bus Line", logo: "/images/operators/roro.png" },
  { name: "Cherry Bus", logo: "/images/operators/cherry.png" },
  { name: "Lexxus Shuttle", logo: "/images/operators/lexxus.png" },
  { name: "SBL Transit", logo: "/images/operators/sbl.png" },
  { name: "D'Rough Riders", logo: "/images/operators/rough.png" },
  { name: "Eulen Joy", logo: "/images/operators/eulen.png" },
  { name: "Puerto Express", logo: "/images/operators/express.png" },
];

function Operators() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our Transport Partners
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Trusted by established transport companies in Palawan
          </p>
        </div>
        <div className="mx-auto grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 items-center justify-items-center mt-12">
          {operators.map((operator, i) => (
            <motion.div
              key={operator.name}
              className="relative w-40 h-24 bg-white rounded-lg shadow-sm p-4 transition-shadow hover:shadow-md"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Image
                src={operator.logo}
                alt={operator.name}
                fill
                className="object-contain p-2"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Operators;
