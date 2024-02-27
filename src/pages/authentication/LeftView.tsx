import React from "react";
import { motion } from "framer-motion";
import AnimatedLogo from "../../assets/AnimatedLogo";

function LeftView() {
  return (
    <>
      <div className="lg:flex flex-col lg:w-[40%] ml-12 hidden items-center justify-center">
        <AnimatedLogo />

        <motion.div className="pt-3" initial="hidden">
          <motion.p
            animate={{ x: [100, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 4 }}
            className=" font-semibold text-[30px] capitalize"
          >
            verification made easy...
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}

export default LeftView;
