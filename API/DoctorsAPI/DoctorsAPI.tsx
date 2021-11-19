import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { DoctorObject, DoctorType } from "../../models/Doctor";
import { ChangeActionType } from "../../lib/helpers";
import { del, post, put as update } from "../../lib/RestAPI";
import { toast } from "react-toastify";
import { RootState } from "../../store/RootState";
import { createContext, useState } from "react";
import { StringifyOptions } from "querystring";

import { parseCookies } from 'nookies'
/**
 * DoctorsAPI State interface
 */
export interface DoctorsApiInterface {
  newDoctor: DoctorType;
  doctors: DoctorType[];
  doctor: DoctorType;
  doctorsLoading: boolean;
}

const DoctorInit: DoctorType = { ...DoctorObject };

export const getInitialState = (): DoctorsApiInterface => {
  return {
    newDoctor: DoctorInit,
    doctors: [],
    doctor: DoctorObject,
    doctorsLoading: false,
  };
};

/**
 * DoctorsAPI
 */
class DoctorsApi {
  private static instance: DoctorsApi;

  private constructor() {
    this.handleFetchDoctors = this.handleFetchDoctors.bind(this);
    this.handleFetchDoctor = this.handleFetchDoctor.bind(this);
    this.handleAddDoctor = this.handleAddDoctor.bind(this);
    this.handleUpdateDoctor = this.handleUpdateDoctor.bind(this);
    this.handleDeleteDoctor = this.handleDeleteDoctor.bind(this);

    this.saga = this.saga.bind(this);
  }

  public static getInstance(): DoctorsApi {
    if (DoctorsApi.instance) {
      return this.instance;
    }
    this.instance = new DoctorsApi();
    return this.instance;
  }

  /*
   * SLICE
   */
  public slice = createSlice({
    name: "doctorsApiSlice",
    initialState: getInitialState(),
    reducers: {
      reset: (state) => getInitialState(),
      handleChange(state, action: PayloadAction<ChangeActionType>) {
        const doctor: any = state.newDoctor;
        doctor[action.payload.attr] = action.payload.value;
        state.newDoctor = doctor;
      },
      fetchDoctors(state) {
        state.doctorsLoading = true;
      },
      fetchDoctor(state) {                  //incl
        //state.doctorsLoading = true;
      },
      setDoctors(state, action: PayloadAction<DoctorType[]>) {
        state.doctors = action.payload;
        state.doctorsLoading = false;
      },
      setDoctor(state, action: PayloadAction<DoctorType>) {
        //console.log("payload antes:",state.selectDoctor)
        state.doctor = action.payload;
        //console.log("payload depois:",state.doctor)
      },
      addDoctor() { },
      updateDoctor(state, action: PayloadAction<DoctorType>) { },
      deleteDoctor(state, action: PayloadAction<DoctorType>) { },
    },
  });

  /*
   * SAGAS
   */
  public *handleFetchDoctors(): Generator<any> {
    const request = () =>
      fetch(`/api/doctors`, {
        method: "GET",
      }).then((res) => res.json());

    try {
      const doctors: any = yield call(request);

      //console.log("Pacientes:", doctors)

      yield put(this.slice.actions.setDoctors(doctors));
    } catch (e) {
      console.log(e);
    }
  }

  public *handleFetchDoctor(): Generator<any> {
    const cookie = parseCookies(null);
    const doctorId = cookie['pe-doctor'];
    const request = () =>
      fetch(`/api/doctors/${doctorId}`, {
        method: "GET",
      }).then((res) => res.json());

    try {

      const doctor: any = yield call(request);

     //console.log("API:", doctor)

      yield put(this.slice.actions.setDoctor(doctor));
    } catch (e) {
      console.log(e);
    }
  }

  //public *handleAddDoctor(action: PayloadAction<DoctorType>): Generator<any> {
  public *handleAddDoctor(): Generator<any> {
    const doctor: DoctorType | any = yield select(selectNewDoctor);

    if (doctor.name.length === 0) {
      toast.warning(`Você precisa dar um nome para a doctor.`);
      return;
    }

    toast.info(`Adicionando um paciente...`);

    try {
      const response = yield call(post, "/api/doctors", doctor);
      toast.success("Paciente adicionado.");

      yield put(this.slice.actions.reset());
      yield put(this.slice.actions.fetchDoctors());
    } catch (e) {
      console.log(e);
      toast.error("O paciente não foi adicionado. Algo deu errado...");
    }
  }

  public *handleUpdateDoctor(action: PayloadAction<DoctorType>): Generator<any> {
    if (action.payload.name.length === 0) {
      toast.warning(`Você precisa iinformar um nome.`);
      return;
    }

    toast.info(`Alterando o paciente...`);
    //console.log("alterando:",action.payload)
    try {
      //sconsole.log("Antes",action.payload)
      const response = yield call(update, '/api/doctors', action.payload);
      toast.success("Paciente alterado.");

      yield put(this.slice.actions.reset());
      yield put(this.slice.actions.fetchDoctor());
      yield put(this.slice.actions.fetchDoctors());
    } catch (e) {
      console.log(e);
      toast.error("O Paciente não foi inserido. Algo deu errado...");
    }
  }

  public *handleDeleteDoctor(action: PayloadAction<DoctorType>): Generator<any> {
    toast.info(`Apagando paciente...`);

    try {
      const res: any = yield call(del, `/api/doctors/${action.payload.id}`);
      yield put(this.slice.actions.fetchDoctors());
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
    const { addDoctor, fetchDoctors, fetchDoctor, deleteDoctor, updateDoctor } = this.slice.actions;
    yield all([
      yield takeLatest([fetchDoctors.type], this.handleFetchDoctors),
      yield takeLatest([fetchDoctor.type], this.handleFetchDoctor),
      yield takeLatest([addDoctor.type], this.handleAddDoctor),
      yield takeLatest([updateDoctor.type], this.handleUpdateDoctor),
      yield takeLatest([deleteDoctor.type], this.handleDeleteDoctor),
    ]);
  }

  /*
   * SELECTORS
   */
  private selectDomain(state: RootState) {
    return state.doctorsApiSlice || getInitialState();
  }

  public selectNewDoctor = createSelector(
    [this.selectDomain],
    (doctorsApiState) => doctorsApiState.newDoctor
  );

  public selectDoctors = createSelector(
    [this.selectDomain],
    (doctorsApiState) => doctorsApiState.doctors
  );

  public selectDoctorsLoading = createSelector(
    [this.selectDomain],
    (doctorsApiState) => doctorsApiState.doctorsLoading
  );

  public selectDoctor = createSelector(
    [this.selectDomain],
    (doctorsApiState) => doctorsApiState.doctor
  );
}

export default DoctorsApi.getInstance();

export const {
  actions: DoctorsAPI,
  reducer: DoctorsApiReducer,
  name: DoctorsApiName,
} = DoctorsApi.getInstance().slice;

export const {
  selectNewDoctor,
  selectDoctors,
  selectDoctor,
  selectDoctorsLoading,
  saga: DoctorsApiSaga,
  handleUpdateDoctor,
  handleDeleteDoctor,
  handleAddDoctor,
  handleFetchDoctors,
} = DoctorsApi.getInstance();