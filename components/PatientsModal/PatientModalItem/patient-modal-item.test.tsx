import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import PatientModalItem, { PatientModalItemProps } from "./patient-modal-item.component";
import { PatientObject } from "../../../models/Patient";
import { IconButton } from "@material-ui/core";

describe("PatientModalItem component", () => {
  let wrapper: ShallowWrapper;
  let mockOnUpdatePatient: any;
  let mockOnDeletePatient: any;

  beforeEach(() => {
    mockOnUpdatePatient = jest.fn();
    mockOnDeletePatient = jest.fn();

    const mockProps: PatientModalItemProps = {
      patient: PatientObject,
      onUpdatePatient: mockOnUpdatePatient,
      onDeletePatient: mockOnDeletePatient,
    };

    wrapper = shallow(<PatientModalItem {...mockProps} />);
  });

  it("should render PatientModalItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onDelete when IconButton component is clicked", () => {
    wrapper
      .find(IconButton)
      .simulate("click", { stopPropagation: () => undefined });
    expect(mockOnDeletePatient).toHaveBeenCalled();
  });
});
