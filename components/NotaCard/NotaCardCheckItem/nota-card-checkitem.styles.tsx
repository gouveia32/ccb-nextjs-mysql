import styled from "styled-components";

export const NotaCardCheckItemComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const NotaCardCheckItemCheck = styled.div`
  //margin-right: 1rem;
`;

interface NotaCardCheckItemTextInterface {
  checked: boolean;
}

export const NotaCardCheckItemText = styled.span<
  NotaCardCheckItemTextInterface
>`
  flex: 1;
  display: flex;
  align-items: center;
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
`;
