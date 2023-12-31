import React from "react";
import { motion } from "framer-motion";

export const Container = ({ children, title = "" }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-3 py-6 mx-auto lg:py-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full rounded-lg shadow border md:mt-0 xl:p-0 bg-gray-100 border-gray-200 mb-4">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-slate-900 p-5">
          {title}
        </h1>
        <div className="px-5 py-6 md:py-3">{children}</div>
      </div>
    </motion.div>
  );
};
 