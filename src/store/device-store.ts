/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { version } from '../../package.json';

const initializeState = () => ({
  type: null,
  screenWidth: window.innerWidth || 620,
  screenDpi: window.devicePixelRatio || 1,
  version,
});

export default () => ({
  state: initializeState(),
  mutations: {},
  actions: {},
  getters: {
    device: (state) => state,
    screenImgWidth: (state) => parseInt(state.screenWidth * state.screenDpi, 10),
    version: (state) => state.version,
  },
});
