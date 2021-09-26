import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import AddPaciente, { AddPacienteProps } from "./add-paciente.component";
import { PacienteObject, PacienteTypeEnum } from "../../models/Paciente";
import { TagObject } from "../../models/Tag";
import {
  AddPacienteInputCheckPoints,
  AddPacienteInputContent,
  AddPacienteInputNameInput,
  AddPacienteInputTag,
} from "./add-paciente.styles";
import { CheckPointObject } from "../../models/ControleObject";
import PacienteCheckItem from "./AddPacienteCheckItem/add-paciente-checkitem.component";
import { Divider } from "@material-ui/core";

describe("AddPaciente component", () => {
  let wrapper: ShallowWrapper;
  let mockOnAddPaciente: any;
  let mockOnHandleChange: any;
  let mockOnClick: any;

  beforeEach(() => {
    mockOnAddPaciente = jest.fn();
    mockOnHandleChange = jest.fn();
    mockOnClick = jest.fn();

    const mockProps: AddPacienteProps = {
      edit: false,
      pacienteModel: PacienteObject,
      tags: [TagObject, TagObject],
      onAddPaciente: mockOnAddPaciente,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };
    wrapper = shallow(<AddPaciente {...mockProps} />);
  });

  it("should render AddPaciente component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onHandleChange when AddPacienteInputNameInput component is clicked", () => {
    wrapper
      .find(AddPacienteInputNameInput)
      .simulate("change", { target: { value: "" } });

    expect(mockOnHandleChange).toHaveBeenCalled();
  });

  it("should render AddPacienteInputContent component when pacienteType is TEXT and call onHandleChange", () => {
    const pacienteModel = PacienteObject;
    pacienteModel.pacienteType = PacienteTypeEnum.TEXT;
    const mockProps: AddPacienteProps = {
      edit: true,
      pacienteModel: pacienteModel,
      tags: [],
      onAddPaciente: mockOnAddPaciente,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };

    wrapper = shallow(<AddPaciente {...mockProps} />);
    const addPacienteInputContent = wrapper.find(AddPacienteInputContent);
    addPacienteInputContent.simulate("change", { target: { value: "" } });

    expect(addPacienteInputContent).toBeTruthy();
    expect(addPacienteInputContent).toHaveLength(1);
    expect(mockOnHandleChange).toHaveBeenCalled();
    expect(addPacienteInputContent.prop("value")).toBe(mockProps.pacienteModel.content);
  });

  it("should render AddPacienteInputCheckPoints, Divider, PacienteCheckItem when pacienteType is CHECK", () => {
    const pacienteModel = PacienteObject;
    pacienteModel.pacienteType = PacienteTypeEnum.CHECK;

    const checkedCheckpoint = CheckPointObject;
    checkedCheckpoint.checked = true;
    pacienteModel.checkPoints = [CheckPointObject, checkedCheckpoint];

    const mockProps: AddPacienteProps = {
      edit: true,
      pacienteModel: pacienteModel,
      tags: [],
      onAddPaciente: mockOnAddPaciente,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };

    wrapper = shallow(<AddPaciente {...mockProps} />);
    const addPacienteInputCheckPoints = wrapper.find(AddPacienteInputCheckPoints);
    expect(addPacienteInputCheckPoints).toHaveLength(1);

    const pacienteCheckItemChecked: any = wrapper.find(PacienteCheckItem);
    expect(pacienteCheckItemChecked).toHaveLength(2);
    expect(pacienteCheckItemChecked.at(0).prop("checkItem")).toBe(CheckPointObject);
    expect(pacienteCheckItemChecked.at(1).prop("checkItem")).toBe(
      checkedCheckpoint
    );

    const divider = wrapper.find(Divider);
    expect(divider).toHaveLength(1);
  });

  it("should render AddPacienteInputTag components when tags array is not empty", () => {
    const pacienteModel = PacienteObject;
    pacienteModel.pacienteType = PacienteTypeEnum.TEXT;
    const mockProps: AddPacienteProps = {
      edit: true,
      pacienteModel: pacienteModel,
      tags: [TagObject, TagObject],
      onAddPaciente: mockOnAddPaciente,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };

    wrapper = shallow(<AddPaciente {...mockProps} />);
    const addPacienteInputTag = wrapper.find(AddPacienteInputTag);

    expect(addPacienteInputTag).toHaveLength(2);
  });
});
