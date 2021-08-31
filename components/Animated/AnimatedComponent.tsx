import { useEffect, useState } from "react";

import AOS from "aos";
import VisibilitySensor from "react-visibility-sensor";

interface AnimatedComponentProps {}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.refreshHard();
  }, [isVisible]);

  return (
    <VisibilitySensor onChange={(isVisible) => setIsVisible(isVisible)}>
      {children}
    </VisibilitySensor>
  );
};

export default AnimatedComponent;
