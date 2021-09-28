import { Action, ThunkAction } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";
import {
  NotesApiInterface,
  NotesApiReducer,
  NotesApiSaga,
} from "../API/NotesPageAPI/NotesAPI";
import { PacientesAPIInterface, PacientesApiReducer, PacientesApiSaga } from "../API/PacientesAPI/PacientesAPI";

export interface RootState {
  // API
  notesPageApiSlice?: NotesApiInterface;
  pacientesApiSlice?: PacientesAPIInterface;
}

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const mainReducers = {
  // API
  notesPageApiSlice: NotesApiReducer,
  pacientesApiSlice: PacientesApiReducer,
};

/**
 * IMPORT EVERY OTHER NOT SOMEWHERE ELSE INJECTED SAGA
 */
export default function* rootSaga() {
  yield all([NotesApiSaga(), PacientesApiSaga()]);
}
