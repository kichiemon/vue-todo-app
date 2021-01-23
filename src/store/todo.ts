import { ActionContext, ActionTree, Module, MutationTree } from "vuex";
import { db } from "../api/firebase";
import { ToDoItem } from "@/models/ToDoItem";
import { AugmentedActionContext } from "./actions";
import { State } from "./state";

export interface TodoState {
  todos: ToDoItem[];
  unsubscribeTodos?: () => void;
}

/** Mutations */

export enum ToDoMutationTypes {
  TOGGLE = "TODO/TOGGLE",
  ADD = "TODO/ADD",
  REMOVE = "TODO/REMOVE",
}
export type ToDoMutations<S = State> = {
  [ToDoMutationTypes.TOGGLE](state: S, payload: { indexOfItem: number }): void;
  [ToDoMutationTypes.ADD](state: S, payload: { id: string }): void;
  [ToDoMutationTypes.REMOVE](
    state: S,
    payload: { itemName: string; isDone: boolean }
  ): void;
};

export const todoMutations: ToDoMutations = {
  [ToDoMutationTypes.TOGGLE](state, { indexOfItem }) {
    console.log(
      ToDoMutationTypes.TOGGLE,
      "@@ mutation called",
      indexOfItem,
      state.todos,
      state.todos[indexOfItem]
    );
    db.collection("todos")
      .doc(state.todos[indexOfItem].id)
      .set({ isDone: !state.todos[indexOfItem].isDone }, { merge: true });
  },
  [ToDoMutationTypes.ADD](state, { id }) {
    db.collection("todos").doc(id).delete();
  },
  [ToDoMutationTypes.REMOVE](state, { itemName, isDone }) {
    const id = db.collection("todos").doc().id;
    db.collection("todos")
      .doc(id)
      .set({ id: id, name: itemName, isDone: isDone }, { merge: true });
  },
};

/** Actions  */

export enum ToDoActionTypes {
  TOGGLE = "TODO/TOGGLE",
  ADD = "TODO/ADD",
  REMOVE = "TODO/REMOVE",
  BIND_TODO = "TODO/BIND_TODO",
}

export interface ToDoActions {
  [ToDoActionTypes.TOGGLE](
    { commit }: AugmentedActionContext,
    payload: { indexOfItem: number }
  ): void;
  [ToDoActionTypes.REMOVE](
    { commit }: AugmentedActionContext,
    payload: { id: string }
  ): Promise<void>;
  [ToDoActionTypes.ADD](
    { commit }: AugmentedActionContext,
    payload: { itemName: string; isDone: boolean }
  ): Promise<void>;
  [ToDoActionTypes.BIND_TODO]({
    commit,
  }: AugmentedActionContext): Promise<void>;
}

export const todoAction: ActionTree<State, State> & ToDoActions = {
  async [ToDoActionTypes.TOGGLE](
    { state, commit },
    { indexOfItem }
  ): Promise<void> {
    console.log(ToDoActionTypes.TOGGLE, "@@ called");
    if (state.todos.length < indexOfItem) return;
    commit(ToDoMutationTypes.TOGGLE, { indexOfItem: indexOfItem });
  },
  async [ToDoActionTypes.REMOVE]({ state, commit }, { id }): Promise<void> {},
  async [ToDoActionTypes.ADD](
    { state, commit },
    { itemName, isDone }
  ): Promise<void> {
    const newId = db.collection("todos").doc().id;
    db.collection("todos").doc(newId).set({
      id: newId,
      name: itemName,
      isDone: isDone,
    });
  },
  async [ToDoActionTypes.BIND_TODO]({ state, commit }) {
    db.collection("todos").onSnapshot((result) => {
      state.todos = result.docs.map((d) => d.data() as ToDoItem);
    });
  },
};
