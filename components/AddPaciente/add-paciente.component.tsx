import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChangeActionType } from "../../lib/helpers";
import {
  AddPacienteInput,
  AddPacienteInputAddCheckPoint,
  AddPacienteInputCheckPoints,
  AddPacienteInputContent,
  AddPacienteInputContentSwitch,
  AddPacienteInputContentWrapper,
  AddPacienteInputErrorMessage,
  AddPacienteInputMenu,
  AddPacienteInputNameInput,
  AddPacienteInputTag,
  AddPacienteInputTags,
} from "./add-paciente.styles";
import { Button, Divider, IconButton } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { SubmitHandler, useForm } from "react-hook-form";
import ColorPicker from "../ColorPicker/color-picker-component";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import TextFieldsOutlinedIcon from "@material-ui/icons/TextFieldsOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import PacienteCheckItem from "./AddPacienteCheckItem/add-paciente-checkitem.component";
import { cPacienteModel, PacienteType, PacienteTypeEnum } from "../../models/Paciente";
import {
  CheckPointObject,
  CheckPointType,
} from "../../models/ControleObject";
import { TagType } from "../../models/Tag";

export interface AddPacienteProps {
  onHandleChange: (action: ChangeActionType) => void;
  pacienteModel: PacienteType;
  tags: TagType[];
  onAddPaciente: () => void;
  onClick?: () => void;
  edit?: boolean;
}

const AddPaciente: React.FC<AddPacienteProps> = ({
  onHandleChange,
  pacienteModel,
  onAddPaciente,
  tags,
  edit,
  onClick,
}: AddPacienteProps) => {
  const [focused, setFocused] = useState<boolean>(!!edit);

  const mainRef = useRef(null);

  const clickOutsideListener = useCallback((e: MouseEvent) => {
    if (!(mainRef.current! as any).contains(e.target)) {
      setFocused(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", clickOutsideListener);
    return () => {
      document.removeEventListener("click", clickOutsideListener);
    };
  }, [clickOutsideListener]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PacienteType>();

  const onSubmit: SubmitHandler<PacienteType> = (data) => onAddPaciente();

  const handleChangePacienteType = (e: any, pacienteType: PacienteTypeEnum) => {
    onHandleChange({
      attr: cPacienteModel.pacienteType,
      value: pacienteType,
    });
    e.stopPropagation();
  };

  const renderBottomMenu = (
    <AddPacienteInputMenu>
      <AddPacienteInputTags>
        {tags &&
          tags.map((tag: TagType, k: number) => (
            <AddPacienteInputTag
              key={tag.id}
              chosen={!!pacienteModel.tags.find((t) => t.id === tag.id)}
              onClick={() =>
                onHandleChange({ attr: cPacienteModel.tags, value: tag })
              }
            >
              <LabelOutlinedIcon fontSize={"small"} className="me-1" />
              <span>{tag.name}</span>
            </AddPacienteInputTag>
          ))}
      </AddPacienteInputTags>
      <AddPacienteInputContentSwitch>
        <ColorPicker
          onChooseColor={(color) =>
            onHandleChange({ attr: cPacienteModel.color, value: color })
          }
          edit={edit}
        />
      </AddPacienteInputContentSwitch>
      <AddPacienteInputContentSwitch>
        {pacienteModel.pacienteType === PacienteTypeEnum.TEXT ? (
          <IconButton
            size={"small"}
            onClick={(event) => handleChangePacienteType(event, PacienteTypeEnum.CHECK)}
          >
            <ListOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton
            size={"small"}
            onClick={(event) => handleChangePacienteType(event, PacienteTypeEnum.TEXT)}
          >
            <TextFieldsOutlinedIcon />
          </IconButton>
        )}
      </AddPacienteInputContentSwitch>
    </AddPacienteInputMenu>
  );

  const renderNameInput = (
    <>
      <AddPacienteInputNameInput
        placeholder={focused ? "Nome" : "Crie uma nota..."}
        {...register(cPacienteModel.name, { required: true, maxLength: 20 })}
        onChange={(event) =>
          onHandleChange({ attr: cPacienteModel.name, value: event.target.value })
        }
        value={pacienteModel.name}
      />
      {errors.name?.type === "required" && (
        <AddPacienteInputErrorMessage style={{ bottom: 0 }}>
          O Nome é obrigatório
        </AddPacienteInputErrorMessage>
      )}
    </>
  );

  const renderTextContentInput = (
    <>
      <AddPacienteInputContent
        {...register(cPacienteModel.content, { maxLength: 1000 })}
        onFocus={() => setFocused(true)}
        rows={edit ? 8 : 4}
        onChange={(event) =>
          onHandleChange({
            attr: cPacienteModel.content,
            value: event.target.value,
          })
        }
        placeholder={"Escreva algo"}
        value={pacienteModel.content}
      />
      {errors.content?.type === "required" && (
        <AddPacienteInputErrorMessage>Too long</AddPacienteInputErrorMessage>
      )}
    </>
  );

  const renderCheckPointsContentInput = (
    <>
      <AddPacienteInputCheckPoints edit={!!edit}>
        {pacienteModel.checkPoints
          ?.filter((f) => !f.checked)
          .map((c: CheckPointType, i: number) => (
            <PacienteCheckItem
              key={c.id}
              checkItem={c}
              onHandleChange={(newCheckItem) =>
                onHandleChange({
                  attr: cPacienteModel.checkPoints,
                  value: newCheckItem,
                })
              }
              onDelete={(id) =>
                onHandleChange({
                  attr: cPacienteModel.checkPoints,
                  value: id,
                })
              }
            />
          ))}
        {pacienteModel.checkPoints?.find((f) => f.checked) && (
          <Divider className="w-100 bg-dark mt-3 mb-2" />
        )}
        {pacienteModel.checkPoints
          ?.filter((f) => f.checked)
          .map((c: CheckPointType, i: number) => (
            <PacienteCheckItem
              key={c.id}
              checkItem={c}
              onHandleChange={(newCheckItem) =>
                onHandleChange({
                  attr: cPacienteModel.checkPoints,
                  value: newCheckItem,
                })
              }
              onDelete={(id) =>
                onHandleChange({
                  attr: cPacienteModel.checkPoints,
                  value: id,
                })
              }
            />
          ))}
      </AddPacienteInputCheckPoints>
      <AddPacienteInputAddCheckPoint>
        <IconButton
          size={"small"}
          onClick={() =>
            onHandleChange({
              attr: cPacienteModel.checkPoints,
              value: CheckPointObject,
            })
          }
        >
          <AddOutlinedIcon />
        </IconButton>
      </AddPacienteInputAddCheckPoint>
    </>
  );

  return (
    <AddPacienteInput
      edit={edit}
      open={focused}
      checkpoints={pacienteModel.checkPoints?.length}
      type={pacienteModel.pacienteType}
      onFocus={() => setFocused(true)}
      onClick={onClick}
      style={{ backgroundColor: pacienteModel.color }}
      ref={mainRef}
      onKeyDown={(event) =>
        event.code === "Enter" &&
        pacienteModel.pacienteType === PacienteTypeEnum.CHECK &&
        onHandleChange({
          attr: cPacienteModel.checkPoints,
          value: CheckPointObject,
        })
      }
    >
      {renderNameInput}
      {(focused || (edit !== undefined && edit)) && (
        <AddPacienteInputContentWrapper
          initial={{ opacity: 0, width: "100%" }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {pacienteModel.pacienteType === PacienteTypeEnum.TEXT
            ? renderTextContentInput
            : renderCheckPointsContentInput}
          {renderBottomMenu}
          <Button
            id={"add-button"}
            fullWidth={true}
            size={"small"}
            variant={"outlined"}
            onClick={handleSubmit(onSubmit)}
            className="mt-2"
            disabled={pacienteModel.name.length === 0}
          >
            {edit ? "Alterar" : "Adicionar"}
          </Button>
        </AddPacienteInputContentWrapper>
      )}
    </AddPacienteInput>
  );
};

export default React.memo(AddPaciente);
