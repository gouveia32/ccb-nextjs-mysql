import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { IconButton, TextField } from "@material-ui/core";
import PacientesModal, { PacientesModalProps } from "./pacientes-modal.component";
import { PacienteObject } from "../../models/Paciente";
import PacienteModalItem from "./PacienteModalItem/paciente-modal-item.component";

describe("PacientesModal component", () => {
  let wrapper: ShallowWrapper;
  let mockOnChange: any;
  let mockOnAddPaciente: any;
  let mockOnUpdatePaciente: any;
  let mockOnDeletePaciente: any;

  beforeEach(() => {
    mockOnChange = jest.fn();
    mockOnAddPaciente = jest.fn();
    mockOnUpdatePaciente = jest.fn();
    mockOnDeletePaciente = jest.fn();

    const mockProps: PacientesModalProps = {
      newPaciente: PacienteObject,
      pacientes: [],
      pacientesLoading: false,
      onChange: mockOnChange,
      onAddPaciente: mockOnAddPaciente,
      onUpdatePaciente: mockOnUpdatePaciente,
      onDeletePaciente: mockOnDeletePaciente,
    };

    wrapper = shallow(<PacientesModal {...mockProps} />);
  });

  it("should render PacientesModal component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onChange on TextField component", () => {
    wrapper.find(TextField).simulate("change", { target: { value: "" } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should call onAddPaciente when IconButton component is clicked", () => {
    wrapper.find(IconButton).simulate("click");
    expect(mockOnAddPaciente).toHaveBeenCalled();
  });

  it("should render PacienteModalItem components when pacientes array is not empty and pacientes are not loading", () => {
    const mockProps: PacientesModalProps = {
      newPaciente: PacienteObject,
      pacientes: [PacienteObject, PacienteObject],
      pacientesLoading: false,
      onChange: mockOnChange,
      onAddPaciente: mockOnAddPaciente,
      onUpdatePaciente: mockOnUpdatePaciente,
      onDeletePaciente: mockOnDeletePaciente,
    };

    wrapper = shallow(<PacientesModal {...mockProps} />);

    const pacientesItems = wrapper.find(PacienteModalItem);

    expect(pacientesItems).toHaveLength(2);
  });
});
