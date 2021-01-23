import { ActionTree, ActionContext } from "vuex";
import { Mutations } from "./mutations";
import { State } from "./state";
import { todoAction, ToDoActions } from "./todo";
import { authAction, AuthActions } from "./auth";

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export type Actions = AuthActions & ToDoActions;
export const actions: ActionTree<State, State> & AuthActions & ToDoActions = {
  ...authAction,
  ...todoAction,
};
