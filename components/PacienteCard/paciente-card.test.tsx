import * as React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {Dialog, Divider, IconButton} from "@material-ui/core";
import PacienteCard, {PacienteCardProps} from "./Paciente-card.component";
import {PacienteObject, PacienteTypeEnum} from "../../models/Paciente";
import {PacienteCardComponent} from "./Paciente-card.styles";
import {CheckPointObject} from "../../models/ControleObject";
import PacienteCardCheckItem from "./PacienteCardCheckItem/Paciente-card-checkitem.component";

describe("PacienteCard component", () => {
  let wrapper: ShallowWrapper;
  let mockOnHandleChange: any;
  let mockOnAddPaciente: any;
  let mockOnDeletePaciente: any;
  let mockOnClick: any;
  let mockOnCheckItemClick: any;
  let mockOnCloseModal: any;

  beforeEach(() => {
    mockOnHandleChange = jest.fn();
    mockOnAddPaciente = jest.fn();
    mockOnDeletePaciente = jest.fn();
    mockOnClick = jest.fn();
    mockOnCheckItemClick = jest.fn();
    mockOnCloseModal = jest.fn();

    const mockProps: PacienteCardProps = {
      Paciente: PacienteObject,
      tags: [],
      editPaciente: PacienteObject,
      onHandleChange: mockOnHandleChange,
      onAddPaciente: mockOnAddPaciente,
      onDeletePaciente: mockOnDeletePaciente,
      onClick: mockOnClick,
      onCheckItemClick: mockOnCheckItemClick,
      onCloseModal: mockOnCloseModal,
    };

    wrapper = shallow(<PacienteCard {...mockProps} />);
  });

  it("should render PacienteCard component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onClick when PacienteCardComponent component is clicked", () => {
    wrapper.find(PacienteCardComponent).simulate("click");
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("should call onClose when Dialog component closed", () => {
    wrapper.find(Dialog).simulate("close");
    expect(mockOnCloseModal).toHaveBeenCalled();
  });

  it("should call onDelete when IconButton is clicked", () => {
    wrapper
      .find(IconButton)
      .simulate("click", { stopPropagation: () => undefined });
    expect(mockOnDeletePaciente).toHaveBeenCalled();
  });

    it("should render PacienteCardCheckItem and Divider components when PacienteType is CHECK", () => {
        const PacienteModel = PacienteObject;
        PacienteModel.PacienteType = PacienteTypeEnum.CHECK;

        const checkedCheckpoint = CheckPointObject;
        checkedCheckpoint.checked = true;
        PacienteModel.checkPoints = [CheckPointObject, checkedCheckpoint];

        const mockProps: PacienteCardProps = {
            Paciente: PacienteObject,
            tags: [],
            editPaciente: PacienteObject,
            onHandleChange: mockOnHandleChange,
            onAddPaciente: mockOnAddPaciente,
            onDeletePaciente: mockOnDeletePaciente,
            onClick: mockOnClick,
            onCheckItemClick: mockOnCheckItemClick,
            onCloseModal: mockOnCloseModal,
        };

        wrapper = shallow(<PacienteCard {...mockProps} />);

        const PacienteCardCheckpoints = wrapper.find(PacienteCardCheckItem);
        expect(PacienteCardCheckpoints).toHaveLength(2);

        const divider = wrapper.find(Divider);
        expect(divider).toHaveLength(1);
    });
});
