import {
  getInitialState,
  handleAddPaciente,
  handleChange,
  handleCheckPacienteAndSubmit,
  handleDeletePaciente,
  handleOnSearchPacientes,
  PacientesAPI,
  PacientesApiInterface,
  PacientesApiName,
  PacientesApiReducer,
  PacientesApiSaga,
  SearchPacienteQuery,
  SetPacienteType,
} from "./PacientesAPI";
import { PacienteObject, PacienteType } from "../../models/Paciente";
import { ChangeActionType } from "../../lib/helpers";
import { CheckPointObject } from "../../models/ControleObject";
import { takeLatest } from "@redux-saga/core/effects";

describe("PacientesAPI", () => {
  describe("Reducer slices tests", () => {
    const initialState: PacientesApiInterface = getInitialState();

    it("should return initial state", () => {
      expect(PacientesApiReducer(undefined, { type: null })).toEqual(initialState);
    });

    it("should reset reducer", () => {
      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.reset,
        })
      ).toEqual(getInitialState());
    });

    it("should set Paciente", () => {
      const paciente: PacienteType = PacienteObject;
      paciente.nome = "test";

      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.setPaciente.type,
          payload: {
            paciente: paciente,
            edit: false,
          },
        }).newPaciente
      ).toEqual(paciente);

      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.setPaciente.type,
          payload: {
            paciente: paciente,
            edit: true,
          },
        }).editPaciente
      ).toEqual(paciente);
    });

    it("should set search Pacientes", () => {
      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.setSearchPacientes.type,
          payload: [PacienteObject, PacienteObject],
        }).searchPacientes
      ).toHaveLength(2);

      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.setSearchPacientes.type,
          payload: [PacienteObject, PacienteObject],
        }).searchPacientesLoading
      ).toEqual(false);
    });

    it("should change current route", () => {
      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.changeCurrentRoute.type,
          payload: "route",
        }).currentRoute
      ).toEqual("route");
    });

    it("should search pacientes", () => {
      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.searchPacientes.type,
          payload: {
            query: "paciente",
          },
        }).searchPacienteQuery
      ).toEqual("paciente");

      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.searchPacientes.type,
          payload: {
            query: "paciente",
          },
        }).searchPacientesLoading
      ).toEqual(true);
    });
  });

  describe("Action tests", () => {
    it("should create an action to reset", () => {
      const expectedAction = {
        type: `${PacientesApiName}/reset`,
      };
      expect(PacientesAPI.reset()).toEqual(expectedAction);
    });

    it("should create an action to handleChange", () => {
      const actionType: ChangeActionType = { attr: "test", value: "test" };
      const expectedAction = {
        type: `${PacientesApiName}/handleChange`,
        payload: {
          ...actionType,
        },
      };
      expect(PacientesAPI.handleChange(actionType)).toEqual(expectedAction);
    });

    it("should create an action to set Paciente", () => {
      const setPacienteType: SetPacienteType = { paciente: PacienteObject, edit: false };
      const expectedAction = {
        type: `${PacientesApiName}/setPaciente`,
        payload: {
          ...setPacienteType,
        },
      };
      expect(PacientesAPI.setPaciente(setPacienteType)).toEqual(expectedAction);
    });

    it("should create an action to set search Pacientes", () => {
      const expectedAction = {
        type: `${PacientesApiName}/setSearchPacientes`,
        payload: [PacienteObject],
      };
      expect(PacientesAPI.setSearchPacientes([PacienteObject])).toEqual(expectedAction);
    });

    it("should create an action to change current route", () => {
      const expectedAction = {
        type: `${PacientesApiName}/changeCurrentRoute`,
        payload: "route",
      };
      expect(PacientesAPI.changeCurrentRoute("route")).toEqual(expectedAction);
    });

    it("should create an action to add paciente", () => {
      const expectedAction = {
        type: `${PacientesApiName}/addPaciente`,
        payload: true,
      };
      expect(PacientesAPI.addPaciente(true)).toEqual(expectedAction);
    });

    it("should create an action to delete paciente", () => {
      const expectedAction = {
        type: `${PacientesApiName}/deletePaciente`,
        payload: PacienteObject,
      };
      expect(PacientesAPI.deletePaciente(PacienteObject)).toEqual(expectedAction);
    });

    it("should create an action to check paciente and submit", () => {
      const checkType = { paciente: PacienteObject, checkitem: CheckPointObject };
      const expectedAction = {
        type: `${PacientesApiName}/checkPacienteAndSubmit`,
        payload: {
          ...checkType,
        },
      };
      expect(PacientesAPI.checkPacienteAndSubmit(checkType)).toEqual(expectedAction);
    });

    it("should create an action to search pacientes", () => {
      const pacienteQuery: SearchPacienteQuery = { query: "test", tagId: "test" };
      const expectedAction = {
        type: `${PacientesApiName}/searchPacientes`,
        payload: {
          ...pacienteQuery,
        },
      };
      expect(PacientesAPI.searchPacientes(pacienteQuery)).toEqual(expectedAction);
    });
  });

  describe("Saga tests", () => {
    const generator = PacientesApiSaga();
    it("should trigger on handle change", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([PacientesAPI.handleChange.type], handleChange)
      );
    });

    it("should trigger on add paciente", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([PacientesAPI.addPaciente.type], handleAddPaciente)
      );
    });

    it("should trigger on delete paciente", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([PacientesAPI.deletePaciente.type], handleDeletePaciente)
      );
    });

    it("should trigger on check paciente and submit", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([PacientesAPI.checkPacienteAndSubmit.type], handleCheckPacienteAndSubmit)
      );
    });

    it("should trigger on search pacientes", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([PacientesAPI.searchPacientes.type], handleOnSearchPacientes)
      );
    });
  });
});
