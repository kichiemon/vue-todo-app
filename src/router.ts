import HelloWorld from "./components/HelloWorld.vue";
import ToDoItemList from "./components/ToDoItemList.vue";
import SignIn from "./components/SignIn.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { useStore } from "./store";
import firebase from "firebase";

const routes = [
  { path: "/", component: HelloWorld, meta: { requiresAuth: true } },
  { path: "/todos", component: ToDoItemList, meta: { requiresAuth: true } },
  { path: "/login", component: SignIn, meta: { requiresAuth: false } },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// castしたいだけ
function isFirebaseUser(user: any): user is firebase.User {
  return user !== null && user !== undefined;
}

router.beforeEach(async (to, from, next) => {
  const redirectToLogin = () =>
    next({ path: "/login", query: { redirect: to.fullPath } });

  const store = useStore();
  const currentUser = store.state.currentUser;
  const adminAuth = store.state.adminAuth;

  if (!to.meta.requiresAuth) next();
  else if (adminAuth) next();
  else if (!currentUser) redirectToLogin();
  else {
    return next();
    // const unsubscribe = await store
    //   .dispatch(AuthActionTypes.BIND_AUTH_SUBSCRIBE, null)
    //   .then((f) => {
    //     const adminAuth = store.state.adminAuth;
    //     if (adminAuth) next();
    //     else redirectToLogin();
    //     return f;
    //   });
    // unsubscribe();
  }
});
