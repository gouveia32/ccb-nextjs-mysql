import {
  getInitialState,
  handleAddPaciente,
  handleDeletePaciente,
  handleFetchPacientes,
  handleUpdatePaciente,
  PacientesAPI,
  PacientesAPIInterface,
  PacientesApiName,
  PacientesApiReducer,
  PacientesApiSaga,
} from "./PacientesAPI";
import { ChangeActionType } from "../../lib/helpers";
import { takeLatest } from "@redux-saga/core/effects";
import { cPacienteModel, PacienteObject, PacienteType } from "../../models/Paciente";

describe("PacientesAPI", () => {
  describe("Reducer slices tests", () => {
    const initialState: PacientesAPIInterface = getInitialState();

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

    it("should handle change", () => {
      const paciente: PacienteType = { ...PacienteObject };
      paciente.name = "test";

      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.handleChange.type,
          payload: {
            attr: cPacienteModel.name,
            value: paciente.name,
          },
        }).newPaciente
      ).toEqual(paciente);
    });

    it("should fetch Pacientes", () => {
      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.fetchPacientes.type,
        }).pacientesLoading
      ).toEqual(true);
    });

    it("should set Pacientes", () => {
      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.setPacientes.type,
          payload: [PacienteObject],
        }).pacientesLoading
      ).toEqual(false);
      expect(
        PacientesApiReducer(initialState, {
          type: PacientesAPI.setPacientes.type,
          payload: [PacienteObject],
        }).pacientes
      ).toEqual([PacienteObject]);
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

    it("should create an action to fetch Pacientes", () => {
      const expectedAction = {
        type: `${PacientesApiName}/fetchPacientes`,
      };
      expect(PacientesAPI.fetchPacientes()).toEqual(expectedAction);
    });

    it("should create an action to set Pacientes", () => {
      const expectedAction = {
        type: `${PacientesApiName}/setPacientes`,
        payload: [PacienteObject],
      };
      expect(PacientesAPI.setPacientes([PacienteObject])).toEqual(expectedAction);
    });

    it("should create an action to add paciente", () => {
      const expectedAction = {
        type: `${PacientesApiName}/addPaciente`,
      };
      expect(PacientesAPI.addPaciente()).toEqual(expectedAction);
    });

    it("should create an action to update paciente", () => {
      const expectedAction = {
        type: `${PacientesApiName}/updatePaciente`,
        payload: PacienteObject,
      };
      expect(PacientesAPI.updatePaciente(PacienteObject)).toEqual(expectedAction);
    });

    it("should create an action to delete paciente", () => {
      const expectedAction = {
        type: `${PacientesApiName}/deletePaciente`,
        payload: PacienteObject,
      };
      expect(PacientesAPI.deletePaciente(PacienteObject)).toEqual(expectedAction);
    });
  });

  describe("Saga tests", () => {
    const generator = PacientesApiSaga();
    it("should trigger on fetch pacientes", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([PacientesAPI.fetchPacientes.type], handleFetchPacientes)
      );
    });

    it("should trigger on add paciente", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([PacientesAPI.addPaciente.type], handleAddPaciente)
      );
    });

    it("should trigger on update paciente", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([PacientesAPI.updatePaciente.type], handleUpdatePaciente)
      );
    });

    it("should trigger on delete paciente", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([PacientesAPI.deletePaciente.type], handleDeletePaciente)
      );
    });
  });
});
