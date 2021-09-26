import styled from "styled-components";

export const AddNotaCheckItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const AddNotaCheckItemText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
  }
  input {
    width: 100%;
    border: none;
    outline: none;
    border-radius: 0.5rem;
    background-color: transparent;
  }
`;
