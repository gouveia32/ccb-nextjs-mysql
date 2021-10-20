import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { PatientObject, PatientType } from "../../models/Patient";
import { ChangeActionType } from "../../lib/helpers";
import { del, post, put as update } from "../../lib/RestAPI";
import { toast } from "react-toastify";
import { RootState } from "../../store/RootState";
import { createContext, useState } from "react";
import { StringifyOptions } from "querystring";

/**
 * PatientsAPI State interface
 */
export interface PatientsApiInterface {
  newPatient: PatientType;
  patients: PatientType[];
  selectPatient?: string;
  patientsLoading: boolean;
}

export const getInitialState = (): PatientsApiInterface => {
  return {
    newPatient: PatientObject,
    patients: [],
    selectPatient: "",
    patientsLoading: false,
  };
};



/**
 * PatientsAPI
 */
class PatientsApi {
  private static instance: PatientsApi;

  private constructor() {
    this.handleFetchPatients = this.handleFetchPatients.bind(this);
    this.handleSelectPatient = this.handleSelectPatient.bind(this);
    this.handleAddPatient = this.handleAddPatient.bind(this);
    this.handleUpdatePatient = this.handleUpdatePatient.bind(this);
    this.handleDeletePatient = this.handleDeletePatient.bind(this);

    this.saga = this.saga.bind(this);
  }

  public static getInstance(): PatientsApi {
    if (PatientsApi.instance) {
      return this.instance;
    }
    this.instance = new PatientsApi();
    return this.instance;
  }

  /*
   * SLICE
   */
  public slice = createSlice({
    name: "patientsApiSlice",
    initialState: getInitialState(),
    reducers: {
      reset: (state) => getInitialState(),
      handleChange(state, action: PayloadAction<ChangeActionType>) {
        const patient: any = state.newPatient;
        patient[action.payload.attr] = action.payload.value;
        state.newPatient = patient;
      },
      fetchPatients(state) {
        state.patientsLoading = true;
      },
      selectPatient(state) {                  //incl
        //state.patientsLoading = true;
      },
      setPatients(state, action: PayloadAction<PatientType[]>) {
        state.patients = action.payload;
        state.patientsLoading = false;
      },
      setSelectPatient(state, action: PayloadAction<string>) {
        //console.log("payload antes:",state.selectPatient)
        state.selectPatient = action.payload;
        //console.log("payload depois:",state.selectPatient)
      },
      addPatient() { },
      updatePatient(state, action: PayloadAction<PatientType>) { },
      deletePatient(state, action: PayloadAction<PatientType>) { },
    },
  });

  /*
   * SAGAS
   */
  public *handleFetchPatients(): Generator<any> {
    const request = () =>
      fetch(`/api/patients`, {
        method: "GET",
      }).then((res) => res.json());

    try {
      const patients: any = yield call(request);

      //console.log("Pacientes:", patients)

      yield put(this.slice.actions.setPatients(patients));
    } catch (e) {
      console.log(e);
    }
  }

  public *handleSelectPatient(): Generator<any> {
    const request = () =>
      fetch(`/api/patients`, {
        method: "GET",
      }).then((res) => res.json());

    try {
      const patients: any = yield call(request);
      const selectPatient = patients[0].id;


      //console.log("API:", selectPatient)

      yield put(this.slice.actions.setSelectPatient(selectPatient));
    } catch (e) {
      console.log(e);
    }
  }

  public *handleAddPatient(): Generator<any> {
    const patient: PatientType | any = yield select(selectNewPatient);

    if (patient.name.length === 0) {
      toast.warning(`Você precisa dar um nome para a patient.`);
      return;
    }

    toast.info(`Adicionando um paciente...`);

    try {
      const response = yield call(post, "/api/patients", patient);
      toast.success("Patient added.");

      yield put(this.slice.actions.reset());
      yield put(this.slice.actions.fetchPatients());
    } catch (e) {
      console.log(e);
      toast.error("O paciente não foi adicionado. Algo deu errado...");
    }
  }

  public *handleUpdatePatient(action: PayloadAction<PatientType>): Generator<any> {
    if (action.payload.name.length === 0) {
      toast.warning(`You need to set the patient name.`);
      return;
    }

    toast.info(`Alterando o paciente...`);
    try {
      const response = yield call(update, "/api/patients", action.payload);
      toast.success("Paciente alterado.");

      yield put(this.slice.actions.reset());
      yield put(this.slice.actions.fetchPatients());
    } catch (e) {
      console.log(e);
      toast.error("Patient was not added. Something went wrong...");
    }
  }

  public *handleDeletePatient(action: PayloadAction<PatientType>): Generator<any> {
    toast.info(`Apagando paciente...`);

    try {
      const res: any = yield call(del, `/api/patients/${action.payload.id}`);
      yield put(this.slice.actions.fetchPatients());
      toast.success("Patient deleted.");
    } catch (e) {
      console.log(e);
      toast.error("Patient was not deleted. Something went wrong...");
    }
  }

  /*
   * SAGA - MAIN
   */
  public *saga(): Generator<any> {
    const { addPatient, fetchPatients, selectPatient, deletePatient, updatePatient } = this.slice.actions;
    yield all([
      yield takeLatest([fetchPatients.type], this.handleFetchPatients),
      yield takeLatest([selectPatient.type], this.handleSelectPatient),
      yield takeLatest([addPatient.type], this.handleAddPatient),
      yield takeLatest([updatePatient.type], this.handleUpdatePatient),
      yield takeLatest([deletePatient.type], this.handleDeletePatient),
    ]);
  }

  /*
   * SELECTORS
   */
  private selectDomain(state: RootState) {
    return state.patientsApiSlice || getInitialState();
  }

  public selectNewPatient = createSelector(
    [this.selectDomain],
    (patientsApiState) => patientsApiState.newPatient
  );

  public selectPatients = createSelector(
    [this.selectDomain],
    (patientsApiState) => patientsApiState.patients
  );

  public selectPatientsLoading = createSelector(
    [this.selectDomain],
    (patientsApiState) => patientsApiState.patientsLoading
  );

  public selectPatient = createSelector(
    [this.selectDomain],
    (patientsApiState) => patientsApiState.selectPatient
  );
}

export default PatientsApi.getInstance();

export const {
  actions: PatientsAPI,
  reducer: PatientsApiReducer,
  name: PatientsApiName,
} = PatientsApi.getInstance().slice;

export const {
  selectNewPatient,
  selectPatients,
  selectPatient,
  handleSelectPatient,
  selectPatientsLoading,
  saga: PatientsApiSaga,
  handleUpdatePatient,
  handleDeletePatient,
  handleAddPatient,
  handleFetchPatients,
} = PatientsApi.getInstance();
