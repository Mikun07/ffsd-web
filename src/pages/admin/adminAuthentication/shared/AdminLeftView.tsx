import React from "react";
import { motion } from "framer-motion";
import AdminDP from "../../../../assets/AdminIMG.png"


const AdminLeftView = () => {
  return (
    <>
      <div className="lg:flex flex-col lg:w-[40%] ml-12 hidden items-center justify-center">
        <img src={AdminDP} alt="" />
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
};

export default AdminLeftView;
