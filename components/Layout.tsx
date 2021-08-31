import NavBar from "./navbar/NavBar";

import AOS from 'aos'
import { useEffect } from "react";


interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  useEffect(() => {
    const bodyElement = document.querySelector('.chakra-ui-light')
    console.log('bodyElement:',bodyElement)

    if(bodyElement) {

      bodyElement.classList.remove('chakra-ui-light')
    }

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);


  return (
    <div id="page-wrap">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
