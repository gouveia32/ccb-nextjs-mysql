import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { PatientObject, PatientType } from "../../models/Patient";
import { ChangeActionType } from "../../lib/helpers";
import { del, get, post, put as update } from "../../lib/RestAPI";
import { toast } from "react-toastify";
import { RootState } from "../../store/RootState";
import { createContext, useState } from "react";
import { StringifyOptions } from "querystring";

import { ApiLinks, PageLinks } from "../../lib/Links";

import { parseCookies } from 'nookies'
/**
 * PatientsAPI State interface
 */
export interface PatientsApiInterface {
  newPatient: PatientType;
  patients: PatientType[];
  patient: PatientType;
  patientsLoading: boolean;
  searchPatients: PatientType[];
  searchPatientsQuery: string;
  searchPatientsLoading: boolean;
}


export type SearchPatientsQuery = {
  query: string;
};

const PatientInit: PatientType = { ...PatientObject };

export const getInitialState = (): PatientsApiInterface => {
  return {
    newPatient: PatientInit,
    patients: [],
    patient: PatientObject,
    patientsLoading: false,
    searchPatients: [],
    searchPatientsQuery: "",
    searchPatientsLoading: false,
  };
};

/**
 * PatientsAPI
 */
class PatientsApi {
  private static instance: PatientsApi;

  private constructor() {
    this.handleFetchPatients = this.handleFetchPatients.bind(this);
    this.handleFetchPatient = this.handleFetchPatient.bind(this);
    this.handleAddPatient = this.handleAddPatient.bind(this);
    this.handleUpdatePatient = this.handleUpdatePatient.bind(this);
    this.handleDeletePatient = this.handleDeletePatient.bind(this);
    this.handleOnSearchPatients = this.handleOnSearchPatients.bind(this);
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
      fetchPatient(state) {                  //incl
        //state.patientsLoading = true;
      },
      setPatients(state, action: PayloadAction<PatientType[]>) {
        state.patients = action.payload;
        state.patientsLoading = false;
      },
      setPatient(state, action: PayloadAction<PatientType>) {
        //console.log("payload antes:",state.selectPatient)
        state.patient = action.payload;
        //console.log("payload depois:",state.patient)
      },
      setSearchPatients(state, action: PayloadAction<PatientType[]>) {
        state.searchPatients = action.payload;
        state.searchPatientsLoading = false;
        //console.log("setPat:",state.searchPatients)
      },
      addPatient() { },
      updatePatient(state, action: PayloadAction<PatientType>) { },
      deletePatient(state, action: PayloadAction<PatientType>) { },

      searchPatients(state, action: PayloadAction<SearchPatientsQuery>) {
        state.searchPatientsLoading = true;
        state.searchPatientsQuery = action.payload.query;
      },
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

      //console.log("Pacientes filtrado:", patients)

      yield put(this.slice.actions.setPatients(patients));
    } catch (e) {
      console.log(e);
    }
  }

  public *handleFetchPatient(): Generator<any> {
    const cookie = parseCookies(null);
    const patientId = cookie['pe-patient'];
    const request = () =>
      fetch(`/api/patients/${patientId}`, {
        method: "GET",
      }).then((res) => res.json());

    try {

      const patient: any = yield call(request);

     //console.log("API:", patient)

      yield put(this.slice.actions.setPatient(patient));
    } catch (e) {
      console.log(e);
    }
  }

  //public *handleAddPatient(action: PayloadAction<PatientType>): Generator<any> {
  public *handleAddPatient(): Generator<any> {
    const patient: PatientType | any = yield select(selectNewPatient);

    if (patient.name.length === 0) {
      toast.warning(`Você precisa dar um nome para a patient.`);
      return;
    }

    toast.info(`Adicionando um paciente...`);

    try {
      //console.log("paciente adicionando:",patient)
      const response = yield call(post, "/api/patients", patient);
      toast.success("Paciente adicionado.");

      yield put(this.slice.actions.reset());
      yield put(this.slice.actions.fetchPatients());
      //yield put(this.slice.actions.fetchPatient());    //seleciona o ultimo adicionado
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
    //console.log("alterando:",action.payload)
    try {
      //sconsole.log("Antes",action.payload)
      const response = yield call(update, '/api/patients', action.payload);
      toast.success("Paciente alterado.");

      yield put(this.slice.actions.reset());
      yield put(this.slice.actions.fetchPatient());
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

  public *handleOnSearchPatients(
    action: PayloadAction<SearchPatientsQuery>
  ): Generator<any> {
    const { query } = action.payload;

    //console.log("Aqui->",query)
    yield delay(500);

    if (action.payload.query.length === 0) {
      yield put(this.slice.actions.setSearchPatients([]));
      return;
    }

    try {
      const response: PatientType[] | any = yield call(
        get,
        `${ApiLinks.patients}/search?query=${query}$`
      );

      //console.log("pesqAPI:",response)

      yield delay(300);

      yield put(this.slice.actions.setSearchPatients(response));

    } catch (e) {
      console.log(e);
      toast.error(`Sorry, something went wrong...`);
    }
  }

  /*
   * SAGA - MAIN
   */
  public *saga(): Generator<any> {
    const { 
      addPatient, 
      fetchPatients, 
      fetchPatient, 
      deletePatient, 
      updatePatient, 
      searchPatients 
    } = this.slice.actions;
    yield all([
      yield takeLatest([fetchPatients.type], this.handleFetchPatients),
      yield takeLatest([fetchPatient.type], this.handleFetchPatient),
      yield takeLatest([addPatient.type], this.handleAddPatient),
      yield takeLatest([updatePatient.type], this.handleUpdatePatient),
      yield takeLatest([deletePatient.type], this.handleDeletePatient),
      yield takeLatest([searchPatients.type], this.handleOnSearchPatients),
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

  public selectSearchPatients = createSelector(
    [this.selectDomain],
    (patientsPageApiState) => patientsPageApiState.searchPatients
  );

  public selectSearchPatientsQuery = createSelector(
    [this.selectDomain],
    (patientsPageApiState) => patientsPageApiState.searchPatientsQuery
  );

  public selectSearchPatientsLoading = createSelector(
    [this.selectDomain],
    (patientsPageApiState) => patientsPageApiState.searchPatientsLoading
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
  selectPatientsLoading,
  selectSearchPatients,
  selectSearchPatientsQuery,
  selectSearchPatientsLoading,
  saga: PatientsApiSaga,
  handleUpdatePatient,
  handleDeletePatient,
  handleAddPatient,
  handleFetchPatients,
} = PatientsApi.getInstance();