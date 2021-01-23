import { createApp } from "vue";
import { store } from "./store";
import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);

// pass the injection key
app.use(store);
app.use(router);
app.mount("#app");
