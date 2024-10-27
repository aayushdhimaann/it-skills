import React from "react";
import { motion } from "framer-motion";
const MotionButton = ({ children }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionButton;
