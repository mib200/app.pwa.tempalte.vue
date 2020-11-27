/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

const initializeState = () => ({
  inProgress: false,
  status: '',
  keys: [],
});

export default () => ({
  state: initializeState(),
  mutations: {
    setRequestState(state, payload) {
      if (payload.key && !state.keys.find((x) => x === payload.key)) {
        state.keys.push(payload.key);
      }
      if (state.keys.length) state.inProgress = true;
    },
    clearRequestState(state, key) {
      state.keys = state.keys.filter((x) => x !== key);
      if (!state.keys.length) state.inProgress = false;
    },
  },
  actions: {
    setRequestStatus(context, payload) {
      context.commit('setRequestState', payload);
    },
    clearRequestStatus(context, key) {
      context.commit('clearRequestState', key);
    },
  },
  getters: {
    request: (state) => state,
  },
});
