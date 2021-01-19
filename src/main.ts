import { createApp } from "vue";
import { store, key } from "./store";
import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);

// pass the injection key
app.use(store, key);
app.use(router);
app.mount("#app");
