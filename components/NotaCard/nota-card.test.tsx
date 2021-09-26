import * as React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {Dialog, Divider, IconButton} from "@material-ui/core";
import NotaCard, {NotaCardProps} from "./nota-card.component";
import {NotaObject, NotaTypeEnum} from "../../models/Nota";
import {NotaCardComponent} from "./nota-card.styles";
import {CheckPointObject} from "../../models/ControleObject";
import NotaCardCheckItem from "./NotaCardCheckItem/nota-card-checkitem.component";

describe("NotaCard component", () => {
  let wrapper: ShallowWrapper;
  let mockOnHandleChange: any;
  let mockOnAddNota: any;
  let mockOnDeleteNota: any;
  let mockOnClick: any;
  let mockOnCheckItemClick: any;
  let mockOnCloseModal: any;

  beforeEach(() => {
    mockOnHandleChange = jest.fn();
    mockOnAddNota = jest.fn();
    mockOnDeleteNota = jest.fn();
    mockOnClick = jest.fn();
    mockOnCheckItemClick = jest.fn();
    mockOnCloseModal = jest.fn();

    const mockProps: NotaCardProps = {
      nota: NotaObject,
      tags: [],
      editNota: NotaObject,
      onHandleChange: mockOnHandleChange,
      onAddNota: mockOnAddNota,
      onDeleteNota: mockOnDeleteNota,
      onClick: mockOnClick,
      onCheckItemClick: mockOnCheckItemClick,
      onCloseModal: mockOnCloseModal,
    };

    wrapper = shallow(<NotaCard {...mockProps} />);
  });

  it("should render NotaCard component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onClick when NotaCardComponent component is clicked", () => {
    wrapper.find(NotaCardComponent).simulate("click");
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
    expect(mockOnDeleteNota).toHaveBeenCalled();
  });

    it("should render NotaCardCheckItem and Divider components when notaType is CHECK", () => {
        const notaModel = NotaObject;
        notaModel.notaType = NotaTypeEnum.CHECK;

        const checkedCheckpoint = CheckPointObject;
        checkedCheckpoint.checked = true;
        notaModel.checkPoints = [CheckPointObject, checkedCheckpoint];

        const mockProps: NotaCardProps = {
            nota: NotaObject,
            tags: [],
            editNota: NotaObject,
            onHandleChange: mockOnHandleChange,
            onAddNota: mockOnAddNota,
            onDeleteNota: mockOnDeleteNota,
            onClick: mockOnClick,
            onCheckItemClick: mockOnCheckItemClick,
            onCloseModal: mockOnCloseModal,
        };

        wrapper = shallow(<NotaCard {...mockProps} />);

        const notaCardCheckpoints = wrapper.find(NotaCardCheckItem);
        expect(notaCardCheckpoints).toHaveLength(2);

        const divider = wrapper.find(Divider);
        expect(divider).toHaveLength(1);
    });
});
