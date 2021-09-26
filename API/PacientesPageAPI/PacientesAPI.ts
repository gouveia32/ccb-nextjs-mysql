import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { RootState } from "../../store/RootState";
import { ChangeActionType } from "../../lib/helpers";
import { cPacienteModel, PacienteObject, PacienteType } from "../../models/Paciente";
import { del, get, post, put as update } from "../../lib/RestAPI";
import { toast } from "react-toastify";
import { TagType } from "../../models/Tag";
import {
  CheckPointObject,
  CheckPointType,
} from "../../models/ControleObject";
import { ApiLinks, PageLinks } from "../../lib/Links";

/**
 * PacientesPage API State interface
 */
export interface PacientesApiInterface {
  newPaciente: PacienteType;
  editPaciente: PacienteType | null;
  searchPacientes: PacienteType[];
  searchPacienteQuery: string;
  searchPacientesLoading: boolean;
  currentRoute: string;
}

export type SetPacienteType = {
  paciente: PacienteType;
  edit?: boolean;
};

export type SearchPacienteQuery = {
  query: string;
  tagId?: string;
};

const PacienteInit: PacienteType = { ...PacienteObject };
PacienteInit.checkPoints = [CheckPointObject];

export const getInitialState = (): PacientesApiInterface => {
  return {
    newPaciente: PacienteInit,
    editPaciente: null,
    searchPacientes: [],
    searchPacienteQuery: "",
    searchPacientesLoading: false,
    currentRoute: PageLinks.pacientesPage,
  };
};

/**
 * PacientesPage API
 */
class PacientesApi {
  private static instance: PacientesApi;

  private constructor() {
    this.handleAddPaciente = this.handleAddPaciente.bind(this);
    this.handleDeletePaciente = this.handleDeletePaciente.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckPacienteAndSubmit = this.handleCheckPacienteAndSubmit.bind(this);
    this.handleOnSearchPacientes = this.handleOnSearchPacientes.bind(this);
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
    name: "pacientesPageSlice",
    initialState: getInitialState(),
    reducers: {
      reset: (state) => getInitialState(),
      handleChange(state, action: PayloadAction<ChangeActionType>) {},
      setPaciente(state, action: PayloadAction<SetPacienteType>) {
        if (action.payload.edit) {
          const checkPoints: CheckPointType[] = action.payload.paciente.checkPoints!.map(
            (ch: CheckPointType, i: number) => ({
              id: i,
              text: ch.text,
              checked: ch.checked,
            })
          );
          const editedPaciente = { ...action.payload.paciente };
          editedPaciente.checkPoints = checkPoints;

          state.editPaciente = editedPaciente;
        } else {
          state.newPaciente = action.payload.paciente;
        }
      },
      setSearchPacientes(state, action: PayloadAction<PacienteType[]>) {
        state.searchPacientes = action.payload;
        state.searchPacientesLoading = false;
      },
      changeCurrentRoute(state, action: PayloadAction<string>) {
        state.currentRoute = action.payload;
      },
      addPaciente(state, action: PayloadAction<boolean>) {},
      deletePaciente(state, action: PayloadAction<PacienteType>) {},
      checkPacienteAndSubmit(
        state,
        action: PayloadAction<{ paciente: PacienteType; checkitem: CheckPointType }>
      ) {},
      searchPacientes(state, action: PayloadAction<SearchPacienteQuery>) {
        state.searchPacientesLoading = true;
        state.searchPacienteQuery = action.payload.query;
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

    const paciente: PacienteType | any = Object.assign(
      {},
      edit ? yield select(this.selectEditPaciente) : yield select(this.selectPaciente)
    );


    if (attr === cPacienteModel.checkPoints) {
      if (value === CheckPointObject) {
        const lastCheckPointId = paciente.checkPoints![paciente.checkPoints!.length - 1]
          .id;

        const newCheckPoint: CheckPointType = {
          checked: false,
          id: lastCheckPointId! + 1,
          text: "",
        };

        paciente.checkPoints = [...paciente.checkPoints!, newCheckPoint];

        return yield put(
          this.slice.actions.setPaciente({ paciente: paciente, edit: edit })
        );
      } else {
        if (typeof value === "number") {
          if (paciente.checkPoints?.length === 1) {
            paciente.checkPoints = [CheckPointObject];
          } else {
            paciente.checkPoints = paciente.checkPoints?.filter(
              (f: any) => f.id !== value
            );
          }
        } else {
          const checkPoints: CheckPointType[] = [...paciente.checkPoints!];
          const checkPointIndex = checkPoints.findIndex(
            (f: CheckPointType) => f.id === value.id
          );

          checkPoints[checkPointIndex] = value;

          paciente.checkPoints = [...checkPoints];
        }
        return yield put(
          this.slice.actions.setPaciente({ paciente: paciente, edit: edit })
        );
      }
    }

    paciente[attr] = value;

    yield put(this.slice.actions.setPaciente({ paciente: paciente, edit: edit }));
  }

  public *handleAddPaciente(action: PayloadAction<boolean>): Generator<any> {
    yield put(
      this.slice.actions.changeCurrentRoute(PageLinks.pacientesPageNewPaciente)
    );

    toast.info(`${action.payload ? "Updating" : "Adding"} paciente...`);

    const paciente: PacienteType | any = action.payload
      ? yield select(this.selectEditPaciente)
      : yield select(this.selectPaciente);

    try {
      const response = yield call(
        action.payload ? update : post,
        ApiLinks.pacientes,
        paciente
      );

      yield put(this.slice.actions.reset());
      toast.success(`Paciente ${action.payload ? "updated" : "added"}.`);
    } catch (e) {
      console.log(e);
      toast.error(
        `Paciente was not ${
          action.payload ? "updated" : "added"
        }. Something went wrong...`
      );
    }

    yield put(this.slice.actions.changeCurrentRoute(PageLinks.pacientesPage));
  }

  public *handleDeletePaciente(action: PayloadAction<PacienteType>): Generator<any> {
    yield put(
      this.slice.actions.changeCurrentRoute(PageLinks.pacientesPageDeletePaciente)
    );

    toast.info(`Deleting paciente...`);

    try {
      const res: any = yield call(del, `/api/pacientes/${action.payload.id}`);
      toast.success("Paciente deleted.");
      yield put(this.slice.actions.reset());
    } catch (e) {
      console.log(e);
      toast.error("Paciente was not deleted. Something went wrong...");
    }

    yield put(this.slice.actions.changeCurrentRoute(PageLinks.pacientesPage));
  }

  public *handleCheckPacienteAndSubmit(
    action: PayloadAction<{ paciente: PacienteType; checkitem: CheckPointType }>
  ): Generator<any> {
    yield put(
      this.slice.actions.changeCurrentRoute(PageLinks.pacientesPageNewPaciente)
    );
    toast.info(`Updating paciente...`);

    const { paciente, checkitem } = action.payload;

    const pacienteCopy: PacienteType = { ...paciente };

    const editedCheckitems: CheckPointType[] = paciente.checkPoints!.map(
      (ch: CheckPointType) => (ch.id === checkitem.id ? checkitem : ch)
    );

    pacienteCopy.checkPoints = editedCheckitems;

    try {
      const response = yield call(update, ApiLinks.pacientes, pacienteCopy);

      yield put(this.slice.actions.reset());
      toast.success(`Nota alterada.`);
    } catch (e) {
      console.log(e);
      toast.error(`Paciente was not updated. Something went wrong...`);
    }

    yield put(this.slice.actions.changeCurrentRoute(PageLinks.pacientesPage));
  }

  public *handleOnSearchPacientes(
    action: PayloadAction<SearchPacienteQuery>
  ): Generator<any> {
    const { query, tagId } = action.payload;

    yield delay(500);

    if (action.payload.query.length === 0) {
      yield put(this.slice.actions.setSearchPacientes([]));
      return;
    }

    try {
      const response: PacienteType[] | any = yield call(
        get,
        `${ApiLinks.pacientes}/search?query=${query}${
          tagId ? `&tagId=${tagId}` : ""
        }`
      );

      yield delay(300);

      yield put(this.slice.actions.setSearchPacientes(response));
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
      addPaciente,
      deletePaciente,
      handleChange,
      checkPacienteAndSubmit,
      searchPacientes,
    } = this.slice.actions;
    yield all([
      yield takeLatest([handleChange.type], this.handleChange),
      yield takeLatest([addPaciente.type], this.handleAddPaciente),
      yield takeLatest([deletePaciente.type], this.handleDeletePaciente),
      yield takeLatest(
        [checkPacienteAndSubmit.type],
        this.handleCheckPacienteAndSubmit
      ),
      yield takeLatest([searchPacientes.type], this.handleOnSearchPacientes),
    ]);
  }

  /*
   * SELECTORS
   */
  private selectDomain(state: RootState) {
    return state.pacientesPageApiSlice || getInitialState();
  }

  public selectPaciente = createSelector(
    [this.selectDomain],
    (pacientesPageApiState) => pacientesPageApiState.newPaciente
  );

  public selectSearchPacientes = createSelector(
    [this.selectDomain],
    (pacientesPageApiState) => pacientesPageApiState.searchPacientes
  );

  public selectSearchPacientesQuery = createSelector(
    [this.selectDomain],
    (pacientesPageApiState) => pacientesPageApiState.searchPacienteQuery
  );

  public selectSearchPacientesLoading = createSelector(
    [this.selectDomain],
    (pacientesPageApiState) => pacientesPageApiState.searchPacientesLoading
  );

  public selectEditPaciente = createSelector(
    [this.selectDomain],
    (pacientesPageApiState) => pacientesPageApiState.editPaciente
  );

  public selectCurrentRoute = createSelector(
    [this.selectDomain],
    (pacientesPageApiState) => pacientesPageApiState.currentRoute
  );
}

export const {
  actions: PacientesAPI,
  reducer: PacientesApiReducer,
  name: PacientesApiName,
} = PacientesApi.getInstance().slice;

export const { saga: PacientesApiSaga } = PacientesApi.getInstance();

export const {
  selectPaciente,
  selectSearchPacientes,
  selectSearchPacientesQuery,
  selectSearchPacientesLoading,
  selectEditPaciente,
  selectCurrentRoute,
  handleAddPaciente,
  handleChange,
  handleCheckPacienteAndSubmit,
  handleDeletePaciente,
  handleOnSearchPacientes,
} = PacientesApi.getInstance();
