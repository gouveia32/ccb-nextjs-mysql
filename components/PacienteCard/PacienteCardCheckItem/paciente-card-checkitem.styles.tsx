import styled from "styled-components";

export const PacienteCardCheckItemComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const PacienteCardCheckItemCheck = styled.div`
  //margin-right: 1rem;
`;

interface PacienteCardCheckItemTextInterface {
  checked: boolean;
}

export const PacienteCardCheckItemText = styled.span<
  PacienteCardCheckItemTextInterface
>`
  flex: 1;
  display: flex;
  align-items: center;
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
`;
