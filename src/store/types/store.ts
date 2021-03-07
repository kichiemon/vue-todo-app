//https://dev.to/3vilarthas/vuex-typescript-m4j

import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import { Getters } from "./getters";
import { Actions, Mutations, State } from "..";

/**
export const state = {
  counter: 0,
  todos: [],
};
type State = typeof state;

export type Mutations<S = State> = {
  [MutationTypes.SET_COUNTER](state: S, payload: number): void;
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.GET_COUTNER]({
    commit,
  }: AugmentedActionContext): Promise<number>;
}

export type Getters = {
  doubledCounter(state: State): number;
};

export interface CommitOptions {
  silent?: boolean;
  root?: boolean;
}

export interface DispatchOptions {
  root?: boolean;
}

type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
*/

// Omit: VuexStore の "getters" | "commit" | "dispatch"  を除外して定義し直す
// https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch" // 除外対象
  // Intersection Type https://typescript-jp.gitbook.io/deep-dive/type-system#jiao-cha-xing-intersection-type
  // 二つの型を連結させる
> & {
  // keyof : Mutationsがとりうるkeyに限定
  // P: payloadの型を指定する。MutationsをK(Key)で絞り、取れた関数の引数をタプルに展開している。そして、展開したものの二つ目（payload）をとってきている
  //     e.g. [state: S, payload: number]
  //    いまいちなところは、常に二つ目にpayloadを書かなければいけない点。Mutationsを追加するときに書き損じたら動かなそう。何かしら別の仕組みで制約すべし。
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
    // ReturnType:https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype
    // 関数を指定すると、関数の返り値をとってくれる。ここでは、Mutations[K]関数の返り値（void）になる
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
