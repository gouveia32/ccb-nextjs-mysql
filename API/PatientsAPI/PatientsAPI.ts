import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { RootState } from "../../store/RootState";
import { ChangeActionType } from "../../lib/helpers";
import { cPatientModel, PatientObject, PatientType } from "../../models/Patient";
import { del, get, post, put as update } from "../../lib/RestAPI";
import { toast } from "react-toastify";
import { TagType } from "../../models/Tag";
import {
  CheckPointObject,
  CheckPointType,
} from "../../models/CheckPointObject";
import { ApiLinks, PageLinks } from "../../lib/Links";

/**
 * PatientsPage API State interface
 */
export interface PatientsAPIInterface {
  newPatient: PatientType;
  editPatient: PatientType | null;
  searchPatients: PatientType[];
  searchPatientQuery: string;
  searchPatientsLoading: boolean;
  currentRoute: string;
}

export type SetPatientType = {
  patient: PatientType;
  edit?: boolean;
};

export type SearchPatientQuery = {
  query: string;
  tagId?: string;
};

const PatientInit: PatientType = { ...PatientObject };
//PatientInit.checkPoints = [CheckPointObject];

export const getInitialState = (): PatientsAPIInterface => {
  return {
    newPatient: PatientInit,
    editPatient: null,
    searchPatients: [],
    searchPatientQuery: "",
    searchPatientsLoading: false,
    currentRoute: PageLinks.patientsPage,
  };
};

/**
 * PatientsPage API
 */
class PatientsApi {
  private static instance: PatientsApi;

  private constructor() {
    this.handleAddPatient = this.handleAddPatient.bind(this);
    this.handleDeletePatient = this.handleDeletePatient.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckPatientAndSubmit = this.handleCheckPatientAndSubmit.bind(this);
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
    name: "patientsPageSlice",
    initialState: getInitialState(),
    reducers: {
      reset: (state) => getInitialState(),
      handleChange(state, action: PayloadAction<ChangeActionType>) {},
      setPatient(state, action: PayloadAction<SetPatientType>) {
        if (action.payload.edit) {
          
          const editedPatient = { ...action.payload.patient };
          

          state.editPatient = editedPatient;
        } else {
          state.newPatient = action.payload.patient;
        }
      },
      setSearchPatients(state, action: PayloadAction<PatientType[]>) {
        state.searchPatients = action.payload;
        state.searchPatientsLoading = false;
      },
      changeCurrentRoute(state, action: PayloadAction<string>) {
        state.currentRoute = action.payload;
      },
      addPatient(state, action: PayloadAction<boolean>) {},
      deletePatient(state, action: PayloadAction<PatientType>) {},
      checkPatientAndSubmit(
        state,
        action: PayloadAction<{ patient: PatientType; checkitem: CheckPointType }>
      ) {},
      searchPatients(state, action: PayloadAction<SearchPatientQuery>) {
        state.searchPatientsLoading = true;
        state.searchPatientQuery = action.payload.query;
      },
    },
  });

  /*
   * SAGAS
   */
  public *handleChange(
    action: PayloadAction<ChangeActionType>
  ): Generator<any> {
    const { attr, value, edit } = action.payload;

    const patient: PatientType | any = Object.assign(
      {},
      edit ? yield select(this.selectEditPatient) : yield select(this.selectPatient)
    );


    patient[attr] = value;

    yield put(this.slice.actions.setPatient({ patient: patient, edit: edit }));
  }

  public *handleAddPatient(action: PayloadAction<boolean>): Generator<any> {
    yield put(
      this.slice.actions.changeCurrentRoute(PageLinks.patientsPageNewPatient)
    );

    toast.info(`${action.payload ? "Updating" : "Adding"} patient...`);

    const patient: PatientType | any = action.payload
      ? yield select(this.selectEditPatient)
      : yield select(this.selectPatient);

    try {
      const response = yield call(
        action.payload ? update : post,
        ApiLinks.patients,
        patient
      );

      yield put(this.slice.actions.reset());
      toast.success(`Patient ${action.payload ? "updated" : "added"}.`);
    } catch (e) {
      console.log(e);
      toast.error(
        `Patient was not ${
          action.payload ? "updated" : "added"
        }. Something went wrong...`
      );
    }

    yield put(this.slice.actions.changeCurrentRoute(PageLinks.patientsPage));
  }

  public *handleDeletePatient(action: PayloadAction<PatientType>): Generator<any> {
    yield put(
      this.slice.actions.changeCurrentRoute(PageLinks.patientsPageDeletePatient)
    );

    toast.info(`Deleting patient...`);

    try {
      const res: any = yield call(del, `/api/patients/${action.payload.id}`);
      toast.success("Patient deleted.");
      yield put(this.slice.actions.reset());
    } catch (e) {
      console.log(e);
      toast.error("Patient was not deleted. Something went wrong...");
    }

    yield put(this.slice.actions.changeCurrentRoute(PageLinks.patientsPage));
  }

  public *handleCheckPatientAndSubmit(
    action: PayloadAction<{ patient: PatientType; checkitem: CheckPointType }>
  ): Generator<any> {
    yield put(
      this.slice.actions.changeCurrentRoute(PageLinks.patientsPageNewPatient)
    );
    toast.info(`Updating patient...`);

    const { patient, checkitem } = action.payload;

    const patientCopy: PatientType = { ...patient };

    try {
      const response = yield call(update, ApiLinks.patients, patientCopy);

      yield put(this.slice.actions.reset());
      toast.success(`Nota alterada.`);
    } catch (e) {
      console.log(e);
      toast.error(`Patient was not updated. Something went wrong...`);
    }

    yield put(this.slice.actions.changeCurrentRoute(PageLinks.patientsPage));
  }

  public *handleOnSearchPatients(
    action: PayloadAction<SearchPatientQuery>
  ): Generator<any> {
    const { query, tagId } = action.payload;

    yield delay(500);

    if (action.payload.query.length === 0) {
      yield put(this.slice.actions.setSearchPatients([]));
      return;
    }

    try {
      const response: PatientType[] | any = yield call(
        get,
        `${ApiLinks.patients}/search?query=${query}${
          tagId ? `&tagId=${tagId}` : ""
        }`
      );

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
      deletePatient,
      handleChange,
      checkPatientAndSubmit,
      searchPatients,
    } = this.slice.actions;
    yield all([
      yield takeLatest([handleChange.type], this.handleChange),
      yield takeLatest([addPatient.type], this.handleAddPatient),
      yield takeLatest([deletePatient.type], this.handleDeletePatient),
      yield takeLatest(
        [checkPatientAndSubmit.type],
        this.handleCheckPatientAndSubmit
      ),
      yield takeLatest([searchPatients.type], this.handleOnSearchPatients),
    ]);
  }

  /*
   * SELECTORS
   */
  private selectDomain(state: RootState) {
    return state.patientsApiSlice || getInitialState();
  }

  public selectPatient = createSelector(
    [this.selectDomain],
    (patientsPageApiState) => patientsPageApiState.newPatient
  );

  public selectSearchPatients = createSelector(
    [this.selectDomain],
    (patientsPageApiState) => patientsPageApiState.searchPatients
  );

  public selectSearchPatientsQuery = createSelector(
    [this.selectDomain],
    (patientsPageApiState) => patientsPageApiState.searchPatientQuery
  );

  public selectSearchPatientsLoading = createSelector(
    [this.selectDomain],
    (patientsPageApiState) => patientsPageApiState.searchPatientsLoading
  );

  public selectEditPatient = createSelector(
    [this.selectDomain],
    (patientsPageApiState) => patientsPageApiState.editPatient
  );

  public selectCurrentRoute = createSelector(
    [this.selectDomain],
    (patientsPageApiState) => patientsPageApiState.currentRoute
  );
}

export const {
  actions: PatientsAPI,
  reducer: PatientsApiReducer,
  name: PatientsApiName,
} = PatientsApi.getInstance().slice;

export const { saga: PatientsApiSaga } = PatientsApi.getInstance();

export const {
  selectPatient,
  selectSearchPatients,
  selectSearchPatientsQuery,
  selectSearchPatientsLoading,
  selectEditPatient,
  selectCurrentRoute,
  handleAddPatient,
  handleChange,
  handleCheckPatientAndSubmit,
  handleDeletePatient,
  handleOnSearchPatients,
} = PatientsApi.getInstance();
