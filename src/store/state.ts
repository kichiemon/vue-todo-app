import { ToDoItem } from "../models/ToDoItem";
import firebase from "firebase";

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
