import { Action, ThunkAction } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";
import {
  NotesApiInterface,
  NotesApiReducer,
  NotesApiSaga,
} from "../API/NotesPageAPI/NotesAPI";
import { TagsAPIInterface, TagsApiReducer, TagsApiSaga } from "../API/TagsAPI/TagsAPI";
import { PatientsApiInterface, PatientsApiReducer, PatientsApiSaga } from "../API/PatientsAPI/PatientsAPI";
import { DoctorsApiInterface, DoctorsApiReducer, DoctorsApiSaga } from "../API/DoctorsAPI/DoctorsAPI";

export interface RootState {
  // API
  notesPageApiSlice?: NotesApiInterface;
  tagsApiSlice?: TagsAPIInterface;
  patientsPageApiSlice?: PatientsApiInterface;
  patientsApiSlice?: PatientsApiInterface;
  doctorsApiSlice?: DoctorsApiInterface;
}

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const mainReducers = {
  // API
  notesPageApiSlice: NotesApiReducer,
  tagsApiSlice: TagsApiReducer,
  patientsPageApiSlice: PatientsApiReducer,
  patientsApiSlice: PatientsApiReducer,
  doctorsApiSlice: DoctorsApiReducer,
};

/**
 * IMPORT EVERY OTHER NOT SOMEWHERE ELSE INJECTED SAGA
 */
export default function* rootSaga() {
  yield all([NotesApiSaga(), TagsApiSaga(), PatientsApiSaga(), DoctorsApiSaga()]);
}
