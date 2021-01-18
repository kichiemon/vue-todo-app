// store.ts
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { db } from "../api/firebase";
import { ToDoItem } from "../models/ToDoItem";

export interface State {
  todos: ToDoItem[];
  unsubscribeTodos?: () => void;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    todos: [],
  },
  mutations: {
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
  },
  actions: {
    bindTodos: (context) =>
      (context.state.unsubscribeTodos = db
        .collection("todos")
        .onSnapshot((snapshot) => {
          context.state.todos = snapshot.docs.map(
            (doc) => new ToDoItem(doc.id, doc.data().name, doc.data().isDone)
          );
        })),
    unbindTodos: (context) => context.state.unsubscribeTodos(),
  },
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
