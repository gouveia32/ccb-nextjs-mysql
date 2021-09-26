import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import NotaCheckItem, {
  NotaCheckItemProps,
} from "./add-nota-checkitem.component";
import { CheckPointObject } from "../../../models/ControleObject";
import { Checkbox, IconButton, TextField } from "@material-ui/core";

describe("AddNotaCheckItem component", () => {
  let wrapper: ShallowWrapper;
  let mockOnDelete: any;
  let mockOnHandleChange: any;

  beforeEach(() => {
    mockOnDelete = jest.fn();
    mockOnHandleChange = jest.fn();

    const mockProps: NotaCheckItemProps = {
      checkItem: CheckPointObject,
      onDelete: mockOnDelete,
      onHandleChange: mockOnHandleChange,
    };

    wrapper = shallow(<NotaCheckItem {...mockProps} />);
  });

  it("should render AddNotaCheckItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onHandleChange when Checkbox component is clicked", () => {
    wrapper.find(Checkbox).simulate("change", { target: { checked: true } });

    expect(mockOnHandleChange).toHaveBeenCalled();
  });

  it("should call onHandleChange when TextField component is clicked", () => {
    wrapper.find(TextField).simulate("change", { target: { value: "" } });

    expect(mockOnHandleChange).toHaveBeenCalled();
  });

  it("should call onDelete when IconButton component is clicked", () => {
    wrapper
      .find(IconButton)
      .simulate("click", { stopPropagation: () => undefined });

    expect(mockOnDelete).toHaveBeenCalled();
  });
});
