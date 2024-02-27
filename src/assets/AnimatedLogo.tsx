import * as React from "react";
import { motion } from "framer-motion";
import { SVGProps } from "react";

// const draw = {
//   hidden: { pathLength: 0, opacity: 0 },
//   visible: (i) => {
//     const delay = 1 + i * 0.5;
//     return {
//       pathLength: 1,
//       opacity: 1,
//       transition: {
//         pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
//         opacity: { delay, duration: 0.01 },
//       },
//     };
//   },
// };

const AnimatedLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    // width={688}
    // height={644}
    viewBox="0 0 688 644"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <motion.g id="Logo" initial="hidden">
      <motion.g
        id="Linear"
        animate={{ x: [null, 100, 0], opacity: [0, 0, 1] }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <motion.rect
          id="Linear1"
          x={288.024}
          y={536.212}
          width={460}
          height={40}
          transform="rotate(-42.9949 288.024 536.212)"
          fill="#40B52D"
          //   variants={draw}
          //   custom={1}
        />
        <motion.rect
          id="Linear2"
          x={42.5278}
          y={272.903}
          width={40}
          height={400}
          transform="rotate(-42.9949 42.5278 272.903)"
          fill="#40B52D"
          //   variants={draw}
          //   custom={2}
        />
        <motion.rect
          id="Linear3"
          x={42.5278}
          y={272.903}
          width={400}
          height={40}
          transform="rotate(-42.9949 42.5278 272.903)"
          fill="#40B52D"
          //   variants={draw}
          //   custom={3}
        />
        <motion.rect
          id="Linear4"
          x={305.837}
          y={27.4072}
          width={40}
          height={400}
          transform="rotate(-42.9949 305.837 27.4072)"
          fill="#40B52D"
          //   variants={draw}
          //   custom={4}
        />
      </motion.g>
      <motion.g
        id="Vector_Box"
        animate={{ y: [null, 100, 0], opacity: [0, 0, 1] }}
        transition={{ ease: "easeOut", duration: 3 }}
      >
        <motion.g id="Vector">
          <rect
            id="Vector2"
            x={0.105835}
            y={312.455}
            width={40}
            height={453}
            transform="rotate(-42.9949 0.105835 312.455)"
            fill="#40B52D"
          />
          <rect
            id="Vector1"
            x={285.154}
            y={618.187}
            width={463}
            height={35}
            transform="rotate(-42.9949 285.154 618.187)"
            fill="#40B52D"
          />
        </motion.g>
        <motion.rect
          id="box"
          x={634.77}
          y={292.223}
          width={40}
          height={35}
          transform="rotate(-42.9949 634.77 292.223)"
          fill="#D4973B"
          //   animate={{ x: [0, 100, 0] }}
          transition={{ ease: "easeOut", duration: 4 }}
        />
      </motion.g>
    </motion.g>
  </svg>
);
export default AnimatedLogo;
