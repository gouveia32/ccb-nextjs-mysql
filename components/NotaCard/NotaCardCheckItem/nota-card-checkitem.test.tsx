import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { ControleObject } from "../../../models/ControleObject";
import { Checkbox } from "@material-ui/core";
import NotaCardCheckItem, {
  NotaCardCheckItemProps,
} from "./nota-card-checkitem.component";
import { NotaCardCheckItemText } from "./nota-card-checkitem.styles";

describe("NotaCardCheckItem component", () => {
  let wrapper: ShallowWrapper;
  let mockOnChecked: any;
  const controle = ControleObject;
  controle.checked = true;
  controle.text = "text";

  beforeEach(() => {
    mockOnChecked = jest.fn();

    const mockProps: NotaCardCheckItemProps = {
      checkItem: controle,
      onChecked: mockOnChecked,
    };

    wrapper = shallow(<NotaCardCheckItem {...mockProps} />);
  });

  it("should render NotaCardCheckItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onChecked when Checkbox component is clicked", () => {
    wrapper.find(Checkbox).simulate("change", { target: { checked: true } });
    expect(mockOnChecked).toHaveBeenCalled();
  });

  it("should render when NotaCardCheckItemText component with checkItem values", () => {
    const checkItem = wrapper.find(NotaCardCheckItemText);
    expect(checkItem).toHaveLength(1);
    expect(checkItem.prop("checked")).toBe(controle.checked);
    expect(checkItem.contains(controle.text)).toEqual(true);
  });
});
