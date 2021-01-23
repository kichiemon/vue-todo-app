import { MutationTree } from "vuex";
import { State } from "./state";
import firebase from "firebase";
import { todoMutations, ToDoMutations, ToDoMutationTypes } from "./todo";

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
