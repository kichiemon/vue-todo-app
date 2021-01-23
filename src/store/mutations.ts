import { MutationTree } from "vuex";
import { State } from "./state";
import firebase from "firebase";

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
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_CURRENT_USER](state, { user }) {
    state.currentUser = user;
  },
  [MutationTypes.SET_ADMIN_AUTH](state, { adminAuth }) {
    state.adminAuth = adminAuth;
  },
};
