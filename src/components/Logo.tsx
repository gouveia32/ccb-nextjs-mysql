import { Image, Link, Text } from '@chakra-ui/react'
import { motion } from "framer-motion";

export function Logo() {
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
                <Image src="./assets/PF_Logo.png" alt="Ponto Fino" width={50} height={50} />
                

            </motion.div>
        </Link>

    );
};