import { ActionTree, ActionContext } from "vuex";
import { todoAction, ToDoActions } from "../todo";
import { authAction, AuthActions } from "../auth";
import { Mutations, State } from "..";

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;
