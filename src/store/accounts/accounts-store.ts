/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import accountsActionModule from './accounts-actions';

const initializeState = () => ({
  accessToken: null,
  user: {},
  preferences: {},
});

export default ({ $http, $vf }): any => ({
  state: {
    ...initializeState(),
  },
  mutations: {
    setLoggedInState(state, payload) {
      state.accessToken = payload.accessToken ? payload.accessToken : null;
      state.user = payload.user ? { ...payload.user } : {};
    },
    setLoggedOutState(state) {
      Object.assign(state, initializeState());
    },
    setProfilePreferencesInState(state, payload) {
      state.preferences = Object.keys(payload).length ? payload : {};
    },
    updateSessionFromLocalDbInStore(state, payload) {
      state.accessToken = payload.accessToken ? payload.accessToken : null;
      state.user = payload.user && Object.keys(payload.user).length ? { ...payload.user } : {};
    },
  },
  actions: accountsActionModule({ $http, $vf }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    user: (state) => state.user,
  },
});
