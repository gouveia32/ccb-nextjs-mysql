import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedContactIconsProps {
  indx: number;
  minHeightPlaceholder?: number 
}

const item = {
  visible: (i: number) => ({
    opacity: 1,
    scale: [0.4, 1],
    color: ["#1a202c", "#ffd700", "#1a202c"],
    transition: {
      delay: i * 0.8,
    },
  }),
  hidden: { opacity: 0 },
};

const AnimatedContactIcons: React.FC<AnimatedContactIconsProps> = ({
  children,
  indx,
  minHeightPlaceholder
}) => {
  const controls = useAnimation();
  const { ref, inView, entry } = useInView({});

  useEffect(() => {
    controls.start("visible");
  }, [inView]);

  return (
    <div ref={ref}>
      {inView ? (
        <motion.div
          custom={indx}
          layout
          variants={item}
          initial="hidden"
          animate={controls}
        >
          {children}
        </motion.div>
      ) : <div style={{minHeight: minHeightPlaceholder}} />}
    </div>
  );
};

export default AnimatedContactIcons;
