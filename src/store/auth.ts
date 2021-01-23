import firebase from "firebase";
import { ActionTree } from "vuex";
import { AugmentedActionContext } from "./actions";
import { MutationTypes } from "./mutations";
import { State } from "./state";

interface AuthState {
  user: firebase.User | null;
  unsubscribeUser?: () => void;
}

const authGetters = {
  isAuth(state: AuthState) {
    return state.user?.isAnonymous;
  },
};

const authMutations = {
  updateUser(state: AuthState, newUser: firebase.User) {
    state.user = newUser;
  },
};

export enum AuthActionTypes {
  LOGIN = "AUTH/LOGIN",
  ANONIMOUS_LOGIN = "AUTH/ANONIMOUS_LOGIN",
  REFRESH_ADMIN_AUTH = "AUTH/REFRESH_ADMIN_AUTH",
  BIND_AUTH_SUBSCRIBE = "AUTH/BIND_AUTH_SUBSCRIBE",
}

export interface AuthActions {
  [AuthActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    payload: { email: string; password: string }
  ): void;
  [AuthActionTypes.ANONIMOUS_LOGIN](
    { commit }: AugmentedActionContext,
    payload: { email: string; password: string }
  ): Promise<void>;
  [AuthActionTypes.REFRESH_ADMIN_AUTH]({
    commit,
  }: AugmentedActionContext): Promise<boolean>;
  [AuthActionTypes.BIND_AUTH_SUBSCRIBE]({
    commit,
  }: AugmentedActionContext): Promise<() => void>;
}

export const authAction: ActionTree<State, State> & AuthActions = {
  async [AuthActionTypes.LOGIN]({ state, commit }, { email, password }) {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const idToken = await user.getIdTokenResult(false);
    const adminAuth = idToken.claims.admin == true;
    commit(MutationTypes.SET_CURRENT_USER, { user });
    commit(MutationTypes.SET_ADMIN_AUTH, { adminAuth });
  },
  // DEBUG用の匿名ログイン
  async [AuthActionTypes.ANONIMOUS_LOGIN]({ state, commit }) {
    console.log(AuthActionTypes.ANONIMOUS_LOGIN, "@@@ called");
    const userCredential = await firebase.auth().signInAnonymously();
    const user = userCredential.user;
    const idToken = await user.getIdTokenResult(false);
    const adminAuth = idToken.claims.admin == true;
    console.log(AuthActionTypes.ANONIMOUS_LOGIN, "@@@ success");
    commit(MutationTypes.SET_CURRENT_USER, { user });
    commit(MutationTypes.SET_ADMIN_AUTH, { adminAuth });
  },
  async [AuthActionTypes.REFRESH_ADMIN_AUTH]({ state, commit }) {
    const currentUser = state.currentUser;
    if (currentUser !== null) {
      const idToken = await currentUser.getIdTokenResult(true);
      const adminAuth = idToken.claims.admin == true;
      commit(MutationTypes.SET_ADMIN_AUTH, { adminAuth });
      return adminAuth;
    }
    return false;
  },
  async [AuthActionTypes.BIND_AUTH_SUBSCRIBE]({ commit }) {
    return firebase.auth().onAuthStateChanged(async (user) => {
      const idToken = await user.getIdTokenResult(true);
      const adminAuth = idToken.claims.admin == true;
      commit(MutationTypes.SET_ADMIN_AUTH, { adminAuth });
      commit(MutationTypes.SET_CURRENT_USER, { user });
    });
  },
};
