import { Action, ThunkAction } from "@reduxjs/toolkit";
import { all } from "redux-saga/effects";
import {
  NotesApiInterface,
  NotesApiReducer,
  NotesApiSaga,
} from "../API/NotesPageAPI/NotesAPI";
import { PacientesApiInterface, PacientesApiReducer } from "../API/PacientesPageAPI/PacientesAPI";
import { TagsAPIInterface, TagsApiReducer, TagsApiSaga } from "../API/TagsAPI/TagsAPI";

export interface RootState {
  // API
  notesPageApiSlice?: NotesApiInterface;
  tagsApiSlice?: TagsAPIInterface;
  pacientesPageApiSlice?: PacientesApiInterface;

}

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const mainReducers = {
  // API
  notesPageApiSlice: NotesApiReducer,
  tagsApiSlice: TagsApiReducer,
  pacientesApiSlice: PacientesApiReducer,
};

/**
 * IMPORT EVERY OTHER NOT SOMEWHERE ELSE INJECTED SAGA
 */
export default function* rootSaga() {
  yield all([NotesApiSaga(), TagsApiSaga()]);
}
