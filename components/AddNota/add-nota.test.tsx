import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import AddNota, { AddNotaProps } from "./add-nota.component";
import { NotaObject, NotaTypeEnum } from "../../models/Nota";
import { TagObject } from "../../models/Tag";
import {
  AddNotaInputCheckPoints,
  AddNotaInputContent,
  AddNotaInputNameInput,
  AddNotaInputTag,
} from "./add-nota.styles";
import { CheckPointObject } from "../../models/ControleObject";
import NotaCheckItem from "./AddNotaCheckItem/add-nota-checkitem.component";
import { Divider } from "@material-ui/core";

describe("AddNota component", () => {
  let wrapper: ShallowWrapper;
  let mockOnAddNota: any;
  let mockOnHandleChange: any;
  let mockOnClick: any;

  beforeEach(() => {
    mockOnAddNota = jest.fn();
    mockOnHandleChange = jest.fn();
    mockOnClick = jest.fn();

    const mockProps: AddNotaProps = {
      edit: false,
      notaModel: NotaObject,
      tags: [TagObject, TagObject],
      onAddNota: mockOnAddNota,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };
    wrapper = shallow(<AddNota {...mockProps} />);
  });

  it("should render AddNota component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onHandleChange when AddNotaInputNameInput component is clicked", () => {
    wrapper
      .find(AddNotaInputNameInput)
      .simulate("change", { target: { value: "" } });

    expect(mockOnHandleChange).toHaveBeenCalled();
  });

  it("should render AddNotaInputContent component when notaType is TEXT and call onHandleChange", () => {
    const notaModel = NotaObject;
    notaModel.notaType = NotaTypeEnum.TEXT;
    const mockProps: AddNotaProps = {
      edit: true,
      notaModel: notaModel,
      tags: [],
      onAddNota: mockOnAddNota,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };

    wrapper = shallow(<AddNota {...mockProps} />);
    const addNotaInputContent = wrapper.find(AddNotaInputContent);
    addNotaInputContent.simulate("change", { target: { value: "" } });

    expect(addNotaInputContent).toBeTruthy();
    expect(addNotaInputContent).toHaveLength(1);
    expect(mockOnHandleChange).toHaveBeenCalled();
    expect(addNotaInputContent.prop("value")).toBe(mockProps.notaModel.content);
  });

  it("should render AddNotaInputCheckPoints, Divider, NotaCheckItem when notaType is CHECK", () => {
    const notaModel = NotaObject;
    notaModel.notaType = NotaTypeEnum.CHECK;

    const checkedCheckpoint = CheckPointObject;
    checkedCheckpoint.checked = true;
    notaModel.checkPoints = [CheckPointObject, checkedCheckpoint];

    const mockProps: AddNotaProps = {
      edit: true,
      notaModel: notaModel,
      tags: [],
      onAddNota: mockOnAddNota,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };

    wrapper = shallow(<AddNota {...mockProps} />);
    const addNotaInputCheckPoints = wrapper.find(AddNotaInputCheckPoints);
    expect(addNotaInputCheckPoints).toHaveLength(1);

    const notaCheckItemChecked: any = wrapper.find(NotaCheckItem);
    expect(notaCheckItemChecked).toHaveLength(2);
    expect(notaCheckItemChecked.at(0).prop("checkItem")).toBe(CheckPointObject);
    expect(notaCheckItemChecked.at(1).prop("checkItem")).toBe(
      checkedCheckpoint
    );

    const divider = wrapper.find(Divider);
    expect(divider).toHaveLength(1);
  });

  it("should render AddNotaInputTag components when tags array is not empty", () => {
    const notaModel = NotaObject;
    notaModel.notaType = NotaTypeEnum.TEXT;
    const mockProps: AddNotaProps = {
      edit: true,
      notaModel: notaModel,
      tags: [TagObject, TagObject],
      onAddNota: mockOnAddNota,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };

    wrapper = shallow(<AddNota {...mockProps} />);
    const addNotaInputTag = wrapper.find(AddNotaInputTag);

    expect(addNotaInputTag).toHaveLength(2);
  });
});
