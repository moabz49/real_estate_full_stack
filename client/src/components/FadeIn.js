import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView}  from 'framer-motion';


const FadeIn = ({ children, delay = 0.2, direction = "right"}) => {
    const ref = useRef(null);
    
    const isInView = useInView(ref, {once: true});
    const controls = useAnimation();
    
    useEffect(() => {
        if (isInView) {
        controls.start("visible")
        }
    }, [isInView, controls]);

    return (
    <motion.div
      ref={ref}
      variants={{
        visible: {
          opacity: 1,
          x: 0,
          y:0,
          transition: {
            duration: 1.25,
            delay,
            ease: [0.25, 0.25, 0.25, 0.25],
            // reduces default spring affect.
            // type: "tween",
          },
        },
        hidden: {
          opacity: 0,
          x: direction === "right" ? -100 : direction === "left" ? 100 : 0,
          y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        },
      }}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
