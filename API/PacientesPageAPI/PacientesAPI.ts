import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { PacienteObject, TipoPaciente } from "../../models/Paciente";
import { ChangeActionType } from "../../lib/helpers";
import { del, post, put as update } from "../../lib/RestAPI";
import { toast } from "react-toastify";
import { RootState } from "../../store/RootState";

/**
 * PacientesAPI State interface
 */
export interface PacientesApiInterface {
  newPaciente: TipoPaciente;
  pacientes: TipoPaciente[];
  pacientesLoading: boolean;
}

export const getInitialState = (): PacientesApiInterface => {
  return {
    newPaciente: PacienteObject,
    pacientes: [],
    pacientesLoading: false,
  };
};

/**
 * PacientesAPI
 */
class PacientesApi {
  private static instance: PacientesApi;

  private constructor() {
    this.handleFetchPacientes = this.handleFetchPacientes.bind(this);
    this.handleAddPaciente = this.handleAddPaciente.bind(this);
    this.handleUpdatePaciente = this.handleUpdatePaciente.bind(this);
    this.handleDeletePaciente = this.handleDeletePaciente.bind(this);

    this.saga = this.saga.bind(this);
  }

  public static getInstance(): PacientesApi {
    if (PacientesApi.instance) {
      return this.instance;
    }
    this.instance = new PacientesApi();
    return this.instance;
  }

  /*
   * SLICE
   */
  public slice = createSlice({
    name: "pacientesApiSlice",
    initialState: getInitialState(),
    reducers: {
      reset: (state) => getInitialState(),
      handleChange(state, action: PayloadAction<ChangeActionType>) {
        const paciente: any = state.newPaciente;
        paciente[action.payload.attr] = action.payload.value;
        state.newPaciente = paciente;
      },
      fetchPacientes(state) {
        state.pacientesLoading = true;
      },
      setPacientes(state, action: PayloadAction<TipoPaciente[]>) {
        state.pacientes = action.payload;
        state.pacientesLoading = false;
      },
      addPaciente() {},
      updatePaciente(state, action: PayloadAction<TipoPaciente>) {},
      deletePaciente(state, action: PayloadAction<TipoPaciente>) {},
    },
  });

  /*
   * SAGAS
   */
  public *handleFetchPacientes(): Generator<any> {
    const request = () =>
      fetch(`/api/pacientes`, {
        method: "GET",
      }).then((res) => res.json());

    try {
      const pacientes: any = yield call(request);

      yield put(this.slice.actions.setPacientes(pacientes));
    } catch (e) {
      console.log(e);
    }
  }

  public *handleAddPaciente(): Generator<any> {
    const paciente: TipoPaciente | any = yield select(selectNewPaciente);

    if (paciente.name.length === 0) {
      toast.warning(`You need to set the paciente name.`);
      return;
    }

    toast.info(`Adding paciente...`);

    try {
      const response = yield call(post, "/api/pacientes", paciente);
      toast.success("Paciente added.");

      yield put(this.slice.actions.reset());
      yield put(this.slice.actions.fetchPacientes());
    } catch (e) {
      console.log(e);
      toast.error("Paciente was not added. Something went wrong...");
    }
  }

  public *handleUpdatePaciente(action: PayloadAction<TipoPaciente>): Generator<any> {
    if (action.payload.nome.length === 0) {
      toast.warning(`You need to set the paciente name.`);
      return;
    }

    toast.info(`Updating paciente...`);
    try {
      const response = yield call(update, "/api/pacientes", action.payload);
      toast.success("Paciente updated.");

      yield put(this.slice.actions.reset());
      yield put(this.slice.actions.fetchPacientes());
    } catch (e) {
      console.log(e);
      toast.error("Paciente was not added. Something went wrong...");
    }
  }

  public *handleDeletePaciente(action: PayloadAction<TipoPaciente>): Generator<any> {
    toast.info(`Deleting paciente...`);

    try {
      const res: any = yield call(del, `/api/pacientes/${action.payload.id}`);
      yield put(this.slice.actions.fetchPacientes());
      toast.success("Paciente deleted.");
    } catch (e) {
      console.log(e);
      toast.error("Paciente was not deleted. Something went wrong...");
    }
  }

  /*
   * SAGA - MAIN
   */
  public *saga(): Generator<any> {
    const { addPaciente, fetchPacientes, deletePaciente, updatePaciente } = this.slice.actions;
    yield all([
      yield takeLatest([fetchPacientes.type], this.handleFetchPacientes),
      yield takeLatest([addPaciente.type], this.handleAddPaciente),
      yield takeLatest([updatePaciente.type], this.handleUpdatePaciente),
      yield takeLatest([deletePaciente.type], this.handleDeletePaciente),
    ]);
  }

  /*
   * SELECTORS
   */
  private selectDomain(state: RootState) {
    return state.pacientesApiSlice || getInitialState();
  }

  public selectNewPaciente = createSelector(
    [this.selectDomain],
    (pacientesApiState) => pacientesApiState.newPaciente
  );

  public selectPacientes = createSelector(
    [this.selectDomain],
    (pacientesApiState) => pacientesApiState.pacientes
  );

  public selectPacientesLoading = createSelector(
    [this.selectDomain],
    (pacientesApiState) => pacientesApiState.pacientesLoading
  );
}

export default PacientesApi.getInstance();

export const {
  actions: PacientesAPI,
  reducer: PacientesApiReducer,
  name: PacientesApiName,
} = PacientesApi.getInstance().slice;

export const {
  selectNewPaciente,
  selectPacientes,
  selectPacientesLoading,
  saga: PacientesApiSaga,
  handleUpdatePaciente,
  handleDeletePaciente,
  handleAddPaciente,
  handleFetchPacientes,
} = PacientesApi.getInstance();
