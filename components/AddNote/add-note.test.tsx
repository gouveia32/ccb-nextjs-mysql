import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import AddNote, { AddNoteProps } from "./add-note.component";
import { NoteObject, NoteTypeEnum } from "../../models/Note";
import { PacienteObject } from "../../models/Paciente";
import {
  AddNoteInputCheckPoints,
  AddNoteInputContent,
  AddNoteInputNameInput,
  AddNoteInputPaciente,
} from "./add-note.styles";
import { CheckPointObject } from "../../models/CheckPointObject";
import NoteCheckItem from "./AddNoteCheckItem/add-note-checkitem.component";
import { Divider } from "@material-ui/core";

describe("AddNote component", () => {
  let wrapper: ShallowWrapper;
  let mockOnAddNote: any;
  let mockOnHandleChange: any;
  let mockOnClick: any;

  beforeEach(() => {
    mockOnAddNote = jest.fn();
    mockOnHandleChange = jest.fn();
    mockOnClick = jest.fn();

    const mockProps: AddNoteProps = {
      edit: false,
      noteModel: NoteObject,
      pacientes: [PacienteObject, PacienteObject],
      onAddNote: mockOnAddNote,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };
    wrapper = shallow(<AddNote {...mockProps} />);
  });

  it("should render AddNote component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onHandleChange when AddNoteInputNameInput component is clicked", () => {
    wrapper
      .find(AddNoteInputNameInput)
      .simulate("change", { target: { value: "" } });

    expect(mockOnHandleChange).toHaveBeenCalled();
  });

  it("should render AddNoteInputContent component when noteType is TEXT and call onHandleChange", () => {
    const noteModel = NoteObject;
    noteModel.noteType = NoteTypeEnum.TEXT;
    const mockProps: AddNoteProps = {
      edit: true,
      noteModel: noteModel,
      pacientes: [],
      onAddNote: mockOnAddNote,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };

    wrapper = shallow(<AddNote {...mockProps} />);
    const addNoteInputContent = wrapper.find(AddNoteInputContent);
    addNoteInputContent.simulate("change", { target: { value: "" } });

    expect(addNoteInputContent).toBeTruthy();
    expect(addNoteInputContent).toHaveLength(1);
    expect(mockOnHandleChange).toHaveBeenCalled();
    expect(addNoteInputContent.prop("value")).toBe(mockProps.noteModel.content);
  });

  it("should render AddNoteInputCheckPoints, Divider, NoteCheckItem when noteType is CHECK", () => {
    const noteModel = NoteObject;
    noteModel.noteType = NoteTypeEnum.CHECK;

    const checkedCheckpoint = CheckPointObject;
    checkedCheckpoint.checked = true;
    noteModel.checkPoints = [CheckPointObject, checkedCheckpoint];

    const mockProps: AddNoteProps = {
      edit: true,
      noteModel: noteModel,
      pacientes: [],
      onAddNote: mockOnAddNote,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };

    wrapper = shallow(<AddNote {...mockProps} />);
    const addNoteInputCheckPoints = wrapper.find(AddNoteInputCheckPoints);
    expect(addNoteInputCheckPoints).toHaveLength(1);

    const noteCheckItemChecked: any = wrapper.find(NoteCheckItem);
    expect(noteCheckItemChecked).toHaveLength(2);
    expect(noteCheckItemChecked.at(0).prop("checkItem")).toBe(CheckPointObject);
    expect(noteCheckItemChecked.at(1).prop("checkItem")).toBe(
      checkedCheckpoint
    );

    const divider = wrapper.find(Divider);
    expect(divider).toHaveLength(1);
  });

  it("should render AddNoteInputPaciente components when pacientes array is not empty", () => {
    const noteModel = NoteObject;
    noteModel.noteType = NoteTypeEnum.TEXT;
    const mockProps: AddNoteProps = {
      edit: true,
      noteModel: noteModel,
      pacientes: [PacienteObject, PacienteObject],
      onAddNote: mockOnAddNote,
      onClick: mockOnClick,
      onHandleChange: mockOnHandleChange,
    };

    wrapper = shallow(<AddNote {...mockProps} />);
    const addNoteInputPaciente = wrapper.find(AddNoteInputPaciente);

    expect(addNoteInputPaciente).toHaveLength(2);
  });
});
