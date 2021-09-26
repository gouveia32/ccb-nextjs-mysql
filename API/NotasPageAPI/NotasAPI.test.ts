import {
  getInitialState,
  handleAddNota,
  handleChange,
  handleCheckNotaAndSubmit,
  handleDeleteNota,
  handleOnSearchNotas,
  NotasAPI,
  NotasApiInterface,
  NotasApiName,
  NotasApiReducer,
  NotasApiSaga,
  SearchNotaQuery,
  SetNotaType,
} from "./NotasAPI";
import { NotaObject, TipoNota } from "../../models/Nota";
import { ChangeActionType } from "../../lib/helpers";
import { ControleObject } from "../../models/ControleObject";
import { takeLatest } from "@redux-saga/core/effects";

describe("NotasAPI", () => {
  describe("Reducer slices tests", () => {
    const initialState: NotasApiInterface = getInitialState();

    it("should return initial state", () => {
      expect(NotasApiReducer(undefined, { type: null })).toEqual(initialState);
    });

    it("should reset reducer", () => {
      expect(
        NotasApiReducer(initialState, {
          type: NotasAPI.reset,
        })
      ).toEqual(getInitialState());
    });

    it("should set Nota", () => {
      const nota: TipoNota = NotaObject;
      nota.nome = "test";

      expect(
        NotasApiReducer(initialState, {
          type: NotasAPI.setNota.type,
          payload: {
            nota: nota,
            edit: false,
          },
        }).newNota
      ).toEqual(nota);

      expect(
        NotasApiReducer(initialState, {
          type: NotasAPI.setNota.type,
          payload: {
            nota: nota,
            edit: true,
          },
        }).editNota
      ).toEqual(nota);
    });

    it("should set search Notas", () => {
      expect(
        NotasApiReducer(initialState, {
          type: NotasAPI.setSearchNotas.type,
          payload: [NotaObject, NotaObject],
        }).searchNotas
      ).toHaveLength(2);

      expect(
        NotasApiReducer(initialState, {
          type: NotasAPI.setSearchNotas.type,
          payload: [NotaObject, NotaObject],
        }).searchNotasLoading
      ).toEqual(false);
    });

    it("should change current route", () => {
      expect(
        NotasApiReducer(initialState, {
          type: NotasAPI.changeCurrentRoute.type,
          payload: "route",
        }).currentRoute
      ).toEqual("route");
    });

    it("should search notas", () => {
      expect(
        NotasApiReducer(initialState, {
          type: NotasAPI.searchNotas.type,
          payload: {
            query: "nota",
          },
        }).searchNotaQuery
      ).toEqual("nota");

      expect(
        NotasApiReducer(initialState, {
          type: NotasAPI.searchNotas.type,
          payload: {
            query: "nota",
          },
        }).searchNotasLoading
      ).toEqual(true);
    });
  });

  describe("Action tests", () => {
    it("should create an action to reset", () => {
      const expectedAction = {
        type: `${NotasApiName}/reset`,
      };
      expect(NotasAPI.reset()).toEqual(expectedAction);
    });

    it("should create an action to handleChange", () => {
      const actionType: ChangeActionType = { attr: "test", value: "test" };
      const expectedAction = {
        type: `${NotasApiName}/handleChange`,
        payload: {
          ...actionType,
        },
      };
      expect(NotasAPI.handleChange(actionType)).toEqual(expectedAction);
    });

    it("should create an action to set Nota", () => {
      const setNotaType: SetNotaType = { nota: NotaObject, edit: false };
      const expectedAction = {
        type: `${NotasApiName}/setNota`,
        payload: {
          ...setNotaType,
        },
      };
      expect(NotasAPI.setNota(setNotaType)).toEqual(expectedAction);
    });

    it("should create an action to set search Notas", () => {
      const expectedAction = {
        type: `${NotasApiName}/setSearchNotas`,
        payload: [NotaObject],
      };
      expect(NotasAPI.setSearchNotas([NotaObject])).toEqual(expectedAction);
    });

    it("should create an action to change current route", () => {
      const expectedAction = {
        type: `${NotasApiName}/changeCurrentRoute`,
        payload: "route",
      };
      expect(NotasAPI.changeCurrentRoute("route")).toEqual(expectedAction);
    });

    it("should create an action to add nota", () => {
      const expectedAction = {
        type: `${NotasApiName}/addNota`,
        payload: true,
      };
      expect(NotasAPI.addNota(true)).toEqual(expectedAction);
    });

    it("should create an action to delete nota", () => {
      const expectedAction = {
        type: `${NotasApiName}/deleteNota`,
        payload: NotaObject,
      };
      expect(NotasAPI.deleteNota(NotaObject)).toEqual(expectedAction);
    });

    it("should create an action to check nota and submit", () => {
      const checkType = { nota: NotaObject, checkitem: ControleObject };
      const expectedAction = {
        type: `${NotasApiName}/checkNotaAndSubmit`,
        payload: {
          ...checkType,
        },
      };
      expect(NotasAPI.checkNotaAndSubmit(checkType)).toEqual(expectedAction);
    });

    it("should create an action to search notas", () => {
      const notaQuery: SearchNotaQuery = { query: "test", tagId: "test" };
      const expectedAction = {
        type: `${NotasApiName}/searchNotas`,
        payload: {
          ...notaQuery,
        },
      };
      expect(NotasAPI.searchNotas(notaQuery)).toEqual(expectedAction);
    });
  });

  describe("Saga tests", () => {
    const generator = NotasApiSaga();
    it("should trigger on handle change", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([NotasAPI.handleChange.type], handleChange)
      );
    });

    it("should trigger on add nota", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([NotasAPI.addNota.type], handleAddNota)
      );
    });

    it("should trigger on delete nota", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([NotasAPI.deleteNota.type], handleDeleteNota)
      );
    });

    it("should trigger on check nota and submit", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([NotasAPI.checkNotaAndSubmit.type], handleCheckNotaAndSubmit)
      );
    });

    it("should trigger on search notas", async () => {
      expect(generator.next().value).toEqual(
        takeLatest([NotasAPI.searchNotas.type], handleOnSearchNotas)
      );
    });
  });
});
