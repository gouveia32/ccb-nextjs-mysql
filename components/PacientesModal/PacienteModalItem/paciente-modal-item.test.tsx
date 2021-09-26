import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import PacienteModalItem, { PacienteModalItemProps } from "./paciente-modal-item.component";
import { PacienteObject } from "../../../models/Paciente";
import { IconButton } from "@material-ui/core";

describe("PacienteModalItem component", () => {
  let wrapper: ShallowWrapper;
  let mockOnUpdatePaciente: any;
  let mockOnDeletePaciente: any;

  beforeEach(() => {
    mockOnUpdatePaciente = jest.fn();
    mockOnDeletePaciente = jest.fn();

    const mockProps: PacienteModalItemProps = {
      paciente: PacienteObject,
      onUpdatePaciente: mockOnUpdatePaciente,
      onDeletePaciente: mockOnDeletePaciente,
    };

    wrapper = shallow(<PacienteModalItem {...mockProps} />);
  });

  it("should render PacienteModalItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onDelete when IconButton component is clicked", () => {
    wrapper
      .find(IconButton)
      .simulate("click", { stopPropagation: () => undefined });
    expect(mockOnDeletePaciente).toHaveBeenCalled();
  });
});
