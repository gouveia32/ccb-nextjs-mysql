import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const useGreaterThan = (screenWidth: number) => {
  const [isGreaterThan, setIsGreaterThan] = useState(true);
  const [isLargerThan] = useMediaQuery(`(min-width: ${screenWidth}px)`);

  useEffect(() => {
    setIsGreaterThan(isLargerThan);
  }, [isLargerThan]);

  return isGreaterThan;
};

export default useGreaterThan;
