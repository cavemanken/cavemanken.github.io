import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: false,
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false,
      firebaseProjectLink: 'https://cmk63project-default-rtdb.firebaseio.com/',
      dbName: 'my_cbs_links',
    };
  },
  mutations,
  actions,
  getters,
};
