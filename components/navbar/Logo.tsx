import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  logoColor?: "YELLOW" | "BLUE";
}

const logoPath = (color?: "YELLOW" | "BLUE") => {
  if (!color) {
    return "/logo-red.png";
  }

  if (color === "YELLOW") {
    return "/logo-red.png";
  } else {
    return "/logo-blue.png";
  }
};

const Logo: React.FC<LogoProps> = ({ logoColor }) => {
  return (
    <Link href="/">
      <motion.div
        whileHover={{
          scale: [1, 1.2, 1],
          transition: {
            repeatType: "reverse",
            repeat: Infinity,
          },
        }}
        whileTap={{
          scale: 0.5,
        }}
      >
        <Image src={logoPath(logoColor)} width={50} height={50} />
      </motion.div>
    </Link>
   
  );
};

export default Logo;
