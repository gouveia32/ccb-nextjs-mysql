import styled from "styled-components";


const HeaderLeft = styled.div`
width: 100%;
padding: 0.5rem 0;
border-bottom: 1px solid rgba(gray, 0.5);
display: flex;
align-items: center;
padding-left: 1.0rem;
color: #fff;

background-color: #f5b500;
`;


const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  text-align: right;
  margin-right: 1rem;
  h6 {
  }
`;

const FootLeft = styled.div`
width: 100%;
border-top: 1px solid #000;
margin-top: 0.5rem;
padding-top: 0.6rem;
display: flex;
align-items: center;
color: #fff;
`;


const ButtonRec = styled.button`
  background: #6fef1a6b;
  border-radius: 1rem;
  border-color: green;
`;

const ButtonDelete = styled.button`
  background: #f74a2b66;
  border-radius: 1rem;
  border-color: red;
`;

const ButtonNew = styled.button`
  background: #eadedca6;
  border-radius: 1rem;
  border-color: black;
`;

export {
  HeaderLeft,
  HeaderRight,
  FootLeft,
  ButtonRec,
  ButtonDelete,
  ButtonNew,
};
