import styled from "styled-components";


const ModalHeader = styled.div`
width: 100%;
padding: 0.5rem 0;
border-bottom: 1px solid rgba(gray, 0.5);
display: flex;
align-items: center;
padding-left: 1.0rem;
color: #fff;

background-color: #f5b500;
`;


const ModalClose = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  text-align: right;
  margin-right: 1rem;
  h6 {
  }
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
  ModalHeader,
  ModalClose,
  ButtonRec,
  ButtonDelete,
  ButtonNew,
};
