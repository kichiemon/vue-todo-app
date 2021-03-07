// store.ts
import { Store } from "./types/store";
import { ActionTree, createStore, MutationTree } from "vuex";
import { getters } from "./types/getters";
import { authAction, AuthActions } from "./auth";
import { todoAction, ToDoActions, ToDoMutations, todoMutations } from "./todo";
import firebase from "firebase";
import { ToDoItem } from "@/models/ToDoItem";

/** store */

interface StateType {
  todos: ToDoItem[];
  currentUser?: firebase.User;
  adminAuth: boolean;
}
export const state: StateType = {
  todos: [],
  currentUser: null,
  adminAuth: false,
};

export type State = typeof state;

/** actions */

export type Actions = AuthActions & ToDoActions;
export const actions: ActionTree<State, State> & AuthActions & ToDoActions = {
  ...authAction,
  ...todoAction,
};

/** mutaions */

export enum MutationTypes {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  SET_ADMIN_AUTH = "SET_ADMIN_AUTH",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_CURRENT_USER](
    state: S,
    payload: { user: firebase.User }
  ): void;
  [MutationTypes.SET_ADMIN_AUTH](
    state: S,
    payload: { adminAuth: boolean }
  ): void;
} & ToDoMutations;

export const mutations: MutationTree<State> & Mutations & ToDoMutations = {
  [MutationTypes.SET_CURRENT_USER](state, { user }) {
    state.currentUser = user;
  },
  [MutationTypes.SET_ADMIN_AUTH](state, { adminAuth }) {
    state.adminAuth = adminAuth;
  },
  ...todoMutations,
};

/** store */

export const store = createStore({
  state,
  getters,
  mutations,
  actions,
});

// define your own `useStore` composition function
export function useStore(): Store {
  return store;
}
