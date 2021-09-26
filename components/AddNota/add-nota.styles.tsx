import styled from "styled-components";
import { device } from "../../resources/styles/utils/media-query-utils";
import { motion } from "framer-motion";
import { tipoNotaEnum } from "../../models/Nota";

interface AddNotaInputInterface {
  open: boolean;
  edit?: boolean;
  controles?: number;
  type?: tipoNotaEnum;
}

export const AddNotaInput = styled.div<AddNotaInputInterface>`
  height: ${(props) =>
    props.edit
      ? "max-content"
      : props.open
      ? props.type === tipoNotaEnum.CHECK &&
        props.controles &&
        props.controles <= 3
        ? `${props.controles * 38 + 162}px`
        : props.type === tipoNotaEnum.CHECK
        ? "276px"
        : "235px"
      : "45px"};
  width: ${(props) => (props.edit ? "100%" : "500px")};
  padding: 0.6rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 7px rgb(128 128 128);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;

  transition: 0.5s all;

  @media only screen and ${device.mobileL} {
    width: 100%;
  }
`;

export const AddNotaInputNameInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  border-radius: 0.5rem;
  font-weight: bold;

  &:focus {
    border-bottom: 1px solid gray;
  }
`;

export const AddNotaInputErrorMessage = styled.span`
  position: absolute;
  color: red;
  bottom: 5rem;
`;

export const AddNotaInputContentWrapper = styled(motion.div)`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AddNotaInputContent = styled.textarea`
  margin-top: 1rem;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  resize: none;
  background-color: transparent;

  &:focus {
    border-bottom: 1px solid gray;
  }
`;

export const AddNotaInputPacientes = styled.div`
  flex: 1;
  display: flex;
  overflow-x: auto;
  padding: 0.3rem 0;

  &::-webkit-scrollbar {
    height: 5px;
  }
`;

export const AddNotaInputMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const AddNotaInputContentSwitch = styled.div`
  padding: 0 0.3rem;
  border-left: 1px solid lightgray;

  svg {
    cursor: pointer;
    transition: 0.3s transform;
  }
  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
`;

interface AddNotaInputCheckPointsInterface {
  edit: boolean;
}

export const AddNotaInputCheckPoints = styled.div<
  AddNotaInputCheckPointsInterface
>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  max-height: ${(props) => (props.edit ? "300px" : "114px")};
  overflow-y: auto;
`;

export const AddNotaInputAddCheckPoint = styled.div`
  margin: 0.2rem 0;
  cursor: pointer;

  &:hover {
    svg {
      color: #f5b500;
    }
  }

  svg {
    transition: 0.3s all;
  }
`;

interface AddNotaInputPacienteInterface {
  chosen?: boolean;
}

export const AddNotaInputPaciente = styled.div<AddNotaInputPacienteInterface>`
  margin: 0 0.1rem;
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;

  display: flex;
  align-items: center;

  transition: all 0.3s;

  ${(props) => props.chosen && "background-color: #a5a5a5; color: white;"}

  &:hover {
    background-color: #a5a5a5;
    color: white;
  }
`;
