import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { IconButton, TextField } from "@material-ui/core";
import PatientsModal, { PatientsModalProps } from "./patients-modal.component";
import { PatientObject } from "../../models/Patient";
import PatientModalItem from "./PatientModalItem/patient-modal-item.component";

describe("PatientsModal component", () => {
  let wrapper: ShallowWrapper;
  let mockOnChange: any;
  let mockOnAddPatient: any;
  let mockOnUpdatePatient: any;
  let mockOnDeletePatient: any;

  beforeEach(() => {
    mockOnChange = jest.fn();
    mockOnAddPatient = jest.fn();
    mockOnUpdatePatient = jest.fn();
    mockOnDeletePatient = jest.fn();

    const mockProps: PatientsModalProps = {
      newPatient: PatientObject,
      patients: [],
      patientsLoading: false,
      onChange: mockOnChange,
      onAddPatient: mockOnAddPatient,
      onUpdatePatient: mockOnUpdatePatient,
      onDeletePatient: mockOnDeletePatient,
    };

    wrapper = shallow(<PatientsModal {...mockProps} />);
  });

  it("should render PatientsModal component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onChange on TextField component", () => {
    wrapper.find(TextField).simulate("change", { target: { value: "" } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should call onAddPatient when IconButton component is clicked", () => {
    wrapper.find(IconButton).simulate("click");
    expect(mockOnAddPatient).toHaveBeenCalled();
  });

  it("should render PatientModalItem components when patients array is not empty and patients are not loading", () => {
    const mockProps: PatientsModalProps = {
      newPatient: PatientObject,
      patients: [PatientObject, PatientObject],
      patientsLoading: false,
      onChange: mockOnChange,
      onAddPatient: mockOnAddPatient,
      onUpdatePatient: mockOnUpdatePatient,
      onDeletePatient: mockOnDeletePatient,
    };

    wrapper = shallow(<PatientsModal {...mockProps} />);

    const patientsItems = wrapper.find(PatientModalItem);

    expect(patientsItems).toHaveLength(2);
  });
});
