
# vue-todo

Vue.js base project structure

- TypeScript
- Vue.js v3
- Composition API Style
- vuex v4
- vue-router v4
- firebase v8
- GitHub Actions（auto deploy to Firebase Hosting）

## Points
- using Vue.js v3 x TypeScript.
- Vuex for TypeScript and implements type safe commit/dispatch/getter.
- providing firebase config values by environment variables.
- validating for authentication, by using firebase authentication and vue-router
- GitHubAction auto deploy to Firebase Hosting



![Deploy to Firebase Hosting on PR](https://github.com/kichiemon/vue-todo-app/workflows/Deploy%20to%20Firebase%20Hosting%20on%20PR/badge.svg)
![Deploy to Firebase Hosting on merge](https://github.com/kichiemon/vue-todo-app/workflows/Deploy%20to%20Firebase%20Hosting%20on%20merge/badge.svg)

## Project setup
```
yarn install
```

### setup env variables

- create .env.dev

```.env.dev
VUE_APP_FIREBASE_API_KEY=hoge
VUE_APP_FIREBASE_AUTH_DOMAIN=hoge
VUE_APP_FIREBASE_PROJECT_ID=hoge
VUE_APP_FIREBASE_STORAGE_BUCKET=hoge
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=hoge
VUE_APP_FIREBASE_APP_ID=hoge
VUE_APP_FIREBASE_DATABASE_URL=hoge
```

### Compiles and hot-reloads for development
```
yarn serve --mode=dev
```

### Compiles and minifies for production
```
yarn build --mode=dev
```

### Lints and fixes files
```
yarn format
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
