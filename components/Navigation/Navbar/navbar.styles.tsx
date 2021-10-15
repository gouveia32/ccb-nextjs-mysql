import styled from "styled-components";
import { device } from "../../../resources/styles/utils/media-query-utils";

const NavTop = styled.nav`
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(gray, 0.5);
  display: flex;
  align-items: center;
  color: #fff;

  background-color: #f5b500;

  @media only screen and ${device.mobileL} {
    padding: 0.2rem 0;
  }
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;

  h2 {
    margin-bottom: 0 !important;
    font-weight: bolder;
    color: #fff;
  }
  svg {
    border: 2px solid white;
    border-radius: 0.5rem;
    width: 40px;
    height: 40px;

    @media only screen and ${device.mobileL} {
      height: 35px;
      width: 35px;
    }
  }
`;

const NavDoctor = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  text-align: right;
  margin-right: 1rem;
  h6 {
    @media only screen and ${device.mobileL} {
      font-size: 1rem;
      margin: 0 0.5rem 0 0.3rem !important;
    }
  }
`;

interface NavDoctorImageInterface {
  imageUrl?: any;
}

const NavDoctorImage = styled.div<NavDoctorImageInterface>`
  height: 30px;
  width: 30px;
  background-size: cover;
  border-radius: 50%;
  overflow: hidden;

  background: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "#fff"};

  @media only screen and ${device.mobileL} {
    height: 20px;
    width: 20px;
  }
`;

const NavContent = styled.main`
  display: flex;
  height: calc(100vh - 64px);
`;

interface NavLeftInterface {
  open: boolean;
}

const NavLeft = styled.aside<NavLeftInterface>`
  width: ${(props) => (props.open ? "200px" : "50px")};
  padding-right: 0.1rem;
  overflow-y: auto;

  transition: 1s all;

  @media only screen and ${device.tablet} {
    width: ${(props) => (props.open ? "160px" : "50px")};
  }

  @media only screen and ${device.mobileL} {
    position: fixed;
    height: 100%;
    z-index: 20;
    background-color: #fff;
    box-shadow: 0.1rem 0 0.5rem rgba(0, 0, 0, 0.2);
  }
`;

const NavRight = styled.div`
  flex: 1;
  padding: 1rem 2rem;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  @media only screen and ${device.tablet} {
    padding: 1rem;
  }

  @media only screen and ${device.mobileL} {
    padding: 0 0 0 50px;
  }
`;

  // Just some styles
  const NavDrop: { [name: string]: React.CSSProperties } = {
    container: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    select: {
      padding: 5,
      width: 200,
    },
    result: {
      marginTop: 30,
    },
  };

export {
  NavTop,
  NavLogo,
  NavDoctor,
  NavLeft,
  NavContent,
  NavRight,
  NavDoctorImage,
  NavDrop,
};
