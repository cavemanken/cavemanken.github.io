import { createStore } from 'vuex';

import authModule from './modules/auth/index.js';
import printingModule from './modules/printing/index.js';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';
import bucketListModule from './modules/bucketlist/index.js';
import blogListModule from './modules/bloglist/index.js';

// const store = createStore({
// });

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    printing: printingModule,
    bucketlist: bucketListModule,
    bloglist: blogListModule,
    auth: authModule,
  },
  state() {
    return {
      isAuthenticated: false,
    };
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
  },
});

export default store;
