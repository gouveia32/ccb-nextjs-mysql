import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { RootState } from "../../store/RootState";
import { ChangeActionType } from "../../lib/helpers";
import { cNotaModel, NotaObject, TipoNota } from "../../models/Nota";
import { del, get, post, put as update } from "../../lib/RestAPI";
import { toast } from "react-toastify";
import { TipoPaciente } from "../../models/Paciente";
import {
  ControleObject,
  TipoControle,
} from "../../models/ControleObject";
import { ApiLinks, PageLinks } from "../../lib/Links";

/**
 * NotasPage API State interface
 */
export interface NotasApiInterface {
  newNota: TipoNota;
  editNota: TipoNota | null;
  searchNotas: TipoNota[];
  searchNotaQuery: string;
  searchNotasLoading: boolean;
  currentRoute: string;
}

export type SetNotaType = {
  nota: TipoNota;
  edit?: boolean;
};

export type SearchNotaQuery = {
  query: string;
  pacienteId?: string;
};

const NotaInit: TipoNota = [ControleObject];

export const getInitialState = (): NotasApiInterface => {
  return {
    newNota: NotaInit,
    editNota: null,
    searchNotas: [],
    searchNotaQuery: "",
    searchNotasLoading: false,
    currentRoute: PageLinks.notasPage,
  };
};

/**
 * NotasPage API
 */
class NotasApi {
  private static instance: NotasApi;

  private constructor() {
    this.handleAddNota = this.handleAddNota.bind(this);
    this.handleDeleteNota = this.handleDeleteNota.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckNotaAndSubmit = this.handleCheckNotaAndSubmit.bind(this);
    this.handleOnSearchNotas = this.handleOnSearchNotas.bind(this);
    this.saga = this.saga.bind(this);
  }

  public static getInstance(): NotasApi {
    if (NotasApi.instance) {
      return this.instance;
    }
    this.instance = new NotasApi();
    return this.instance;
  }

  /*
   * SLICE
   */

  public slice = createSlice({
    name: "notasPageSlice",
    initialState: getInitialState(),
    reducers: {
      reset: (state) => getInitialState(),
      handleChange(state, action: PayloadAction<ChangeActionType>) {},
      setNota(state, action: PayloadAction<SetNotaType>) {
        if (action.payload.edit) {
          const controles: TipoControle[] = action.payload.nota.controles!.map(
            (ch: TipoControle, i: number) => ({
              id: i,
              texto: ch.texto,
              marcado: ch.marcado,
            })
          );
          const editedNota = { ...action.payload.nota };
          editedNota.controles = controles;

          state.editNota = editedNota;
        } else {
          state.newNota = action.payload.nota;
        }
      },
      setSearchNotas(state, action: PayloadAction<TipoNota[]>) {
        state.searchNotas = action.payload;
        state.searchNotasLoading = false;
      },
      changeCurrentRoute(state, action: PayloadAction<string>) {
        state.currentRoute = action.payload;
      },
      addNota(state, action: PayloadAction<boolean>) {},
      deleteNota(state, action: PayloadAction<TipoNota>) {},
      checkNotaAndSubmit(
        state,
        action: PayloadAction<{ nota: TipoNota; checkitem: TipoControle }>
      ) {},
      searchNotas(state, action: PayloadAction<SearchNotaQuery>) {
        state.searchNotasLoading = true;
        state.searchNotaQuery = action.payload.query;
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

    const nota: TipoNota | any = Object.assign(
      {},
      edit ? yield select(this.selectEditNota) : yield select(this.selectNota)
    );

    if (attr === cNotaModel.pacientes) {
      if (nota.pacientes.find((f: TipoPaciente) => f.id === value.id)) {
        nota.pacientes = nota.pacientes.filter((t: TipoPaciente) => t.id !== value.id);
      } else {
        nota.pacientes = [...nota.pacientes, value];
      }
      return yield put(this.slice.actions.setNota({ nota: nota, edit: edit }));
    }

    if (attr === cNotaModel.controles) {
      if (value === ControleObject) {
        const lastControleId = nota.controles![nota.controles!.length - 1]
          .id;

        const newControle: TipoControle = {
          marcado: false,
          id: lastControleId! + 1,
          texto: "",
        };

        nota.controles = [...nota.controles!, newControle];

        return yield put(
          this.slice.actions.setNota({ nota: nota, edit: edit })
        );
      } else {
        if (typeof value === "number") {
          if (nota.controles?.length === 1) {
            nota.controles = [ControleObject];
          } else {
            nota.controles = nota.controles?.filter(
              (f: any) => f.id !== value
            );
          }
        } else {
          const controles: TipoControle[] = [...nota.controles!];
          const controleIndex = controles.findIndex(
            (f: TipoControle) => f.id === value.id
          );

          controles[controleIndex] = value;

          nota.controles = [...controles];
        }
        return yield put(
          this.slice.actions.setNota({ nota: nota, edit: edit })
        );
      }
    }

    nota[attr] = value;

    yield put(this.slice.actions.setNota({ nota: nota, edit: edit }));
  }

  public *handleAddNota(action: PayloadAction<boolean>): Generator<any> {
    yield put(
      this.slice.actions.changeCurrentRoute(PageLinks.notasPageNewNota)
    );

    toast.info(`${action.payload ? "Updating" : "Adding"} nota...`);

    const nota: TipoNota | any = action.payload
      ? yield select(this.selectEditNota)
      : yield select(this.selectNota);

    try {
      const response = yield call(
        action.payload ? update : post,
        ApiLinks.notas,
        nota
      );

      yield put(this.slice.actions.reset());
      toast.success(`Nota ${action.payload ? "updated" : "added"}.`);
    } catch (e) {
      console.log(e);
      toast.error(
        `Nota was not ${
          action.payload ? "updated" : "added"
        }. Something went wrong...`
      );
    }

    yield put(this.slice.actions.changeCurrentRoute(PageLinks.notasPage));
  }

  public *handleDeleteNota(action: PayloadAction<TipoNota>): Generator<any> {
    yield put(
      this.slice.actions.changeCurrentRoute(PageLinks.notasPageDeleteNota)
    );

    toast.info(`Deleting nota...`);

    try {
      const res: any = yield call(del, `/api/notas/${action.payload.id}`);
      toast.success("Nota deleted.");
      yield put(this.slice.actions.reset());
    } catch (e) {
      console.log(e);
      toast.error("Nota was not deleted. Something went wrong...");
    }

    yield put(this.slice.actions.changeCurrentRoute(PageLinks.notasPage));
  }

  public *handleCheckNotaAndSubmit(
    action: PayloadAction<{ nota: TipoNota; checkitem: TipoControle }>
  ): Generator<any> {
    yield put(
      this.slice.actions.changeCurrentRoute(PageLinks.notasPageNewNota)
    );
    toast.info(`Updating nota...`);

    const { nota, checkitem } = action.payload;

    const notaCopy: TipoNota = { ...nota };

    const editedCheckitems: TipoControle[] = nota.controles!.map(
      (ch: TipoControle) => (ch.id === checkitem.id ? checkitem : ch)
    );

    notaCopy.controles = editedCheckitems;

    try {
      const response = yield call(update, ApiLinks.notas, notaCopy);

      yield put(this.slice.actions.reset());
      toast.success(`Nota alterada.`);
    } catch (e) {
      console.log(e);
      toast.error(`Nota was not updated. Something went wrong...`);
    }

    yield put(this.slice.actions.changeCurrentRoute(PageLinks.notasPage));
  }

  public *handleOnSearchNotas(
    action: PayloadAction<SearchNotaQuery>
  ): Generator<any> {
    const { query, pacienteId } = action.payload;

    yield delay(500);

    if (action.payload.query.length === 0) {
      yield put(this.slice.actions.setSearchNotas([]));
      return;
    }

    try {
      const response: TipoNota[] | any = yield call(
        get,
        `${ApiLinks.notas}/search?query=${query}${
          pacienteId ? `&pacienteId=${pacienteId}` : ""
        }`
      );

      yield delay(300);

      yield put(this.slice.actions.setSearchNotas(response));
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
      addNota,
      deleteNota,
      handleChange,
      checkNotaAndSubmit,
      searchNotas,
    } = this.slice.actions;
    yield all([
      yield takeLatest([handleChange.type], this.handleChange),
      yield takeLatest([addNota.type], this.handleAddNota),
      yield takeLatest([deleteNota.type], this.handleDeleteNota),
      yield takeLatest(
        [checkNotaAndSubmit.type],
        this.handleCheckNotaAndSubmit
      ),
      yield takeLatest([searchNotas.type], this.handleOnSearchNotas),
    ]);
  }

  /*
   * SELECTORS
   */
  private selectDomain(state: RootState) {
    return state.notasPageApiSlice || getInitialState();
  }

  public selectNota = createSelector(
    [this.selectDomain],
    (notasPageApiState) => notasPageApiState.newNota
  );

  public selectSearchNotas = createSelector(
    [this.selectDomain],
    (notasPageApiState) => notasPageApiState.searchNotas
  );

  public selectSearchNotasQuery = createSelector(
    [this.selectDomain],
    (notasPageApiState) => notasPageApiState.searchNotaQuery
  );

  public selectSearchNotasLoading = createSelector(
    [this.selectDomain],
    (notasPageApiState) => notasPageApiState.searchNotasLoading
  );

  public selectEditNota = createSelector(
    [this.selectDomain],
    (notasPageApiState) => notasPageApiState.editNota
  );

  public selectCurrentRoute = createSelector(
    [this.selectDomain],
    (notasPageApiState) => notasPageApiState.currentRoute
  );
}

export const {
  actions: NotasAPI,
  reducer: NotasApiReducer,
  name: NotasApiName,
} = NotasApi.getInstance().slice;

export const { saga: NotasApiSaga } = NotasApi.getInstance();

export const {
  selectNota,
  selectSearchNotas,
  selectSearchNotasQuery,
  selectSearchNotasLoading,
  selectEditNota,
  selectCurrentRoute,
  handleAddNota,
  handleChange,
  handleCheckNotaAndSubmit,
  handleDeleteNota,
  handleOnSearchNotas,
} = NotasApi.getInstance();
