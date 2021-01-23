import { ActionContext, ActionTree, Module } from "vuex";
import { db } from "../api/firebase";
import { ToDoItem } from "@/models/ToDoItem";
import { AugmentedActionContext } from "./actions";
import { State } from "./state";

export interface TodoState {
  todos: ToDoItem[];
  unsubscribeTodos?: () => void;
}

/** Mutations */

export const todoMutations = {
  toggle(state, indexOfItem: number) {
    db.collection("todos")
      .doc(state.todos[indexOfItem].id)
      .set({ isDone: !state.todos[indexOfItem].isDone }, { merge: true });
  },
  removeTodo(state, id) {
    db.collection("todos").doc(id).delete();
  },
  addTodo(state, { itemName, isDone }) {
    const id = db.collection("todos").doc().id;
    db.collection("todos").doc(id).set(
      {
        id: id,
        name: itemName,
        isDone: isDone,
      },
      { merge: true }
    );
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
    if (state.todos.length < indexOfItem) return;
    state.todos[indexOfItem].toggle();
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
