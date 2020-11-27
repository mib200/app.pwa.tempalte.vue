/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

const initializeState = () => ({
  next: '',
  redirect: '',
  viewScrollPos: {},
});

export default (): any => ({
  state: initializeState(),
  mutations: {
    setNextRouteState(state, payload) {
      state.next = payload.next || '';
    },
    setViewScrollPosInState(state, payload) {
      if (Object.keys(payload).length) state.viewScrollPos[payload.name] = payload.coordinates;
    },
    clearViewScrollPosInState(state, payload) {
      if (payload) delete state.viewScrollPos[payload];
    },
    clearNextRouteState(state) {
      state.next = '';
    },
    setRedirectRouteState(state, payload) {
      state.redirect = payload.redirect || '';
    },
    clearRedirectRouteState(state) {
      state.redirect = '';
    },
  },
  actions: {
    setNextRoute(context, payload) {
      context.commit('setNextRouteState', payload);
    },
    setViewScrollPos(context, payload) {
      context.commit('setViewScrollPosInState', payload);
    },
    clearViewScrollPos(context, payload) {
      context.commit('clearViewScrollPosInState', payload);
    },
    clearNextRoute(context) {
      context.commit('clearNextRouteState');
    },
    setRedirectRoute(context, payload) {
      context.commit('setRedirectRouteState', payload);
    },
    clearRedirectRoute(context) {
      context.commit('clearRedirectRouteState');
    },
  },
  getters: {
    nextRouteLink: (state) => state.next,
    redirectRouteLink: (state) => state.redirect,
    viewScrollPos: (state) => state.viewScrollPos,
  },
});
