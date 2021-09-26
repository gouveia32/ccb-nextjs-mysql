import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChangeActionType } from "../../lib/helpers";
import {
  AddNotaInput,
  AddNotaInputAddCheckPoint,
  AddNotaInputCheckPoints,
  AddNotaInputContent,
  AddNotaInputContentSwitch,
  AddNotaInputContentWrapper,
  AddNotaInputErrorMessage,
  AddNotaInputMenu,
  AddNotaInputNameInput,
  AddNotaInputPaciente,
  AddNotaInputPacientes,
} from "./add-nota.styles";
import { Button, Divider, IconButton } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { SubmitHandler, useForm } from "react-hook-form";
import ColorPicker from "../ColorPicker/color-picker-component";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import TextFieldsOutlinedIcon from "@material-ui/icons/TextFieldsOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import NotaCheckItem from "./AddNotaCheckItem/add-nota-checkitem.component";
import { cNotaModel, TipoNota, tipoNotaEnum } from "../../models/Nota";
import {
  ControleObject,
  TipoControle,
} from "../../models/ControleObject";
import { TipoPaciente } from "../../models/Paciente";

export interface AddNotaProps {
  onHandleChange: (action: ChangeActionType) => void;
  notaModel: TipoNota;
  pacientes: TipoPaciente[];
  onAddNota: () => void;
  onClick?: () => void;
  edit?: boolean;
}

const AddNota: React.FC<AddNotaProps> = ({
  onHandleChange,
  notaModel,
  onAddNota,
  pacientes,
  edit,
  onClick,
}: AddNotaProps) => {
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
  } = useForm<TipoNota>();

  const onSubmit: SubmitHandler<TipoNota> = (data) => onAddNota();

  const handleChangeTipoNota = (e: any, tipoNota: tipoNotaEnum) => {
    onHandleChange({
      attr: cNotaModel.tipoNota,
      value: tipoNota,
    });
    e.stopPropagation();
  };

  const renderBottomMenu = (
    <AddNotaInputMenu>
      <AddNotaInputPacientes>
        {pacientes &&
          pacientes.map((paciente: TipoPaciente, k: number) => (
            <AddNotaInputPaciente
              key={paciente.id}
              chosen={!!notaModel.pacientes.find((t) => t.id === paciente.id)}
              onClick={() =>
                onHandleChange({ attr: cNotaModel.pacientes, value: paciente })
              }
            >
              <LabelOutlinedIcon fontSize={"small"} className="me-1" />
              <span>{paciente.nome}</span>
            </AddNotaInputPaciente>
          ))}
      </AddNotaInputPacientes>
      <AddNotaInputContentSwitch>
        <ColorPicker
          onChooseColor={(color) =>
            onHandleChange({ attr: cNotaModel.cor, value: color })
          }
          edit={edit}
        />
      </AddNotaInputContentSwitch>
      <AddNotaInputContentSwitch>
        {notaModel.tipoNota === tipoNotaEnum.TEXT ? (
          <IconButton
            size={"small"}
            onClick={(event) => handleChangeTipoNota(event, tipoNotaEnum.CHECK)}
          >
            <ListOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton
            size={"small"}
            onClick={(event) => handleChangeTipoNota(event, tipoNotaEnum.TEXT)}
          >
            <TextFieldsOutlinedIcon />
          </IconButton>
        )}
      </AddNotaInputContentSwitch>
    </AddNotaInputMenu>
  );

  const renderNameInput = (
    <>
      <AddNotaInputNameInput
        placeholder={focused ? "Nome" : "Crie uma nota..."}
        {...register(cNotaModel.nome, { required: true, maxLength: 20 })}
        onChange={(event) =>
          onHandleChange({ attr: cNotaModel.nome, value: event.target.value })
        }
        value={notaModel.nome}
      />
      {errors.nome?.type === "required" && (
        <AddNotaInputErrorMessage style={{ bottom: 0 }}>
          O Nome é obrigatório
        </AddNotaInputErrorMessage>
      )}
    </>
  );

  const renderTextContentInput = (
    <>
      <AddNotaInputContent
        {...register(cNotaModel.conteudo, { maxLength: 1000 })}
        onFocus={() => setFocused(true)}
        rows={edit ? 8 : 4}
        onChange={(event) =>
          onHandleChange({
            attr: cNotaModel.conteudo,
            value: event.target.value,
          })
        }
        placeholder={"Escreva algo"}
        value={notaModel.conteudo}
      />
      {errors.conteudo?.type === "required" && (
        <AddNotaInputErrorMessage>Too long</AddNotaInputErrorMessage>
      )}
    </>
  );

  const renderCheckPointsContentInput = (
    <>
      <AddNotaInputCheckPoints edit={!!edit}>
        {notaModel.controles
          ?.filter((f) => !f.marcado)
          .map((c: TipoControle, i: number) => (
            <NotaCheckItem
              key={c.id}
              checkItem={c}
              onHandleChange={(newCheckItem) =>
                onHandleChange({
                  attr: cNotaModel.controles,
                  value: newCheckItem,
                })
              }
              onDelete={(id) =>
                onHandleChange({
                  attr: cNotaModel.controles,
                  value: id,
                })
              }
            />
          ))}
        {notaModel.controles?.find((f) => f.marcado) && (
          <Divider className="w-100 bg-dark mt-3 mb-2" />
        )}
        {notaModel.controles
          ?.filter((f) => f.marcado)
          .map((c: TipoControle, i: number) => (
            <NotaCheckItem
              key={c.id}
              checkItem={c}
              onHandleChange={(newCheckItem) =>
                onHandleChange({
                  attr: cNotaModel.controles,
                  value: newCheckItem,
                })
              }
              onDelete={(id) =>
                onHandleChange({
                  attr: cNotaModel.controles,
                  value: id,
                })
              }
            />
          ))}
      </AddNotaInputCheckPoints>
      <AddNotaInputAddCheckPoint>
        <IconButton
          size={"small"}
          onClick={() =>
            onHandleChange({
              attr: cNotaModel.controles,
              value: ControleObject,
            })
          }
        >
          <AddOutlinedIcon />
        </IconButton>
      </AddNotaInputAddCheckPoint>
    </>
  );

  return (
    <AddNotaInput
      edit={edit}
      open={focused}
      controles={notaModel.controles?.length}
      type={notaModel.tipoNota}
      onFocus={() => setFocused(true)}
      onClick={onClick}
      style={{ backgroundColor: notaModel.cor }}
      ref={mainRef}
      onKeyDown={(event) =>
        event.code === "Enter" &&
        notaModel.tipoNota === tipoNotaEnum.CHECK &&
        onHandleChange({
          attr: cNotaModel.controles,
          value: ControleObject,
        })
      }
    >
      {renderNameInput}
      {(focused || (edit !== undefined && edit)) && (
        <AddNotaInputContentWrapper
          initial={{ opacity: 0, width: "100%" }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {notaModel.tipoNota === tipoNotaEnum.TEXT
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
            disabled={notaModel.nome.length === 0}
          >
            {edit ? "Alterar" : "Adicionar"}
          </Button>
        </AddNotaInputContentWrapper>
      )}
    </AddNotaInput>
  );
};

export default React.memo(AddNota);
