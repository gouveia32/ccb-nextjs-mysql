import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { PatientObject, PatientType } from "../../models/Patient";
import { ChangeActionType } from "../../lib/helpers";
import { del, post, put as update } from "../../lib/RestAPI";
import { toast } from "react-toastify";
import { RootState } from "../../store/RootState";
import { createContext, useState } from "react";
import { StringifyOptions } from "querystring";

import { parseCookies } from 'nookies'
/**
 * PatientsAPI State interface
 */
export interface PatientsApiInterface {
  newPatient: PatientType;
  patients: PatientType[];
  patient: PatientType;
  patientsLoading: boolean;
}

const PatientInit: PatientType = { ...PatientObject };

export const getInitialState = (): PatientsApiInterface => {
  return {
    newPatient: PatientInit,
    patients: [],
    patient: PatientObject,
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
    this.handlePatient = this.handlePatient.bind(this);
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
      patient(state) {                  //incl
        //state.patientsLoading = true;
      },
      setPatients(state, action: PayloadAction<PatientType[]>) {
        state.patients = action.payload;
        state.patientsLoading = false;
      },
      setPatient(state, action: PayloadAction<PatientType>) {
        //console.log("payload antes:",state.selectPatient)
        state.patient = action.payload;
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

  public *handlePatient(): Generator<any> {
    const cookie = parseCookies(null);
    const patientId = cookie['pe-patient'];
    const request = () =>
      fetch(`/api/patients/${patientId}`, {
        method: "GET",
      }).then((res) => res.json());

    try {

      const patient: any = yield call(request);

     // console.log("API:", patient)

      yield put(this.slice.actions.setPatient(patient));
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
      toast.success("Paciente adicionado.");

      yield put(this.slice.actions.reset());
      yield put(this.slice.actions.fetchPatients());
    } catch (e) {
      console.log(e);
      toast.error("O paciente não foi adicionado. Algo deu errado...");
    }
  }

  public *handleUpdatePatient(action: PayloadAction<PatientType>): Generator<any> {
    if (action.payload.name.length === 0) {
      toast.warning(`Você precisa iinformar um nome.`);
      return;
    }

    toast.info(`Alterando o paciente...`);
    console.log("alterando:",action.payload)
    try {
      const response = yield call(update, '/api/patients', action.payload);
      toast.success("Paciente alterado.");

      yield put(this.slice.actions.reset());
      yield put(this.slice.actions.fetchPatients());
    } catch (e) {
      console.log(e);
      toast.error("O Paciente não foi inserido. Algo deu errado...");
    }
  }

  public *handleDeletePatient(action: PayloadAction<PatientType>): Generator<any> {
    toast.info(`Apagando paciente...`);

    try {
      const res: any = yield call(del, `/api/patients/${action.payload.id}`);
      yield put(this.slice.actions.fetchPatients());
      toast.success("Paciente apagado.");
    } catch (e) {
      console.log(e);
      toast.error("O Paciente não foi apagado. Algo deu errado...");
    }
  }

  /*
   * SAGA - MAIN
   */
  public *saga(): Generator<any> {
    const { addPatient, fetchPatients, patient, deletePatient, updatePatient } = this.slice.actions;
    yield all([
      yield takeLatest([fetchPatients.type], this.handleFetchPatients),
      yield takeLatest([patient.type], this.handlePatient),
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
    (patientsApiState) => patientsApiState.patient
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
  handlePatient,
  selectPatientsLoading,
  saga: PatientsApiSaga,
  handleUpdatePatient,
  handleDeletePatient,
  handleAddPatient,
  handleFetchPatients,
} = PatientsApi.getInstance();
