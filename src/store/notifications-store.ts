/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

const initializeState = () => ({
  toast: {
    showBot: false,
    timer: 10000,
    notifications: [],
  },
});

let setToastTimeout;

export default () => ({
  state: initializeState(),
  mutations: {
    addToastNotificationsToState(state, payload) {
      state.toast.showBot = payload.showBot || false;
      state.toast.timer = payload.timer || payload.timer === 0 ? payload.timer : 10000;
      if (!state.toast.notifications.find((notification) => payload.text.toLowerCase() === notification.text.toLowerCase())) {
        if (!payload.status || (payload.status && !state.toast.notifications.find((x) => x.status && x.status === payload.status))) {
          state.toast.notifications.push({
            text: payload.text,
            type: payload.type || 'success',
            action: payload.action || '',
            status: payload.status || null,
          });
        }
      }
    },
    clearToastNotificationsState(state) {
      state.toast.timer = 10000;
      state.toast.notifications = [];
    },
  },
  actions: {
    addToastNotifications(context, payload) {
      context.commit('addToastNotificationsToState', payload);

      if (setToastTimeout) clearTimeout(setToastTimeout);
      if (payload.timer !== 0) {
        setToastTimeout = setTimeout(() => {
          context.commit('clearToastNotificationsState');
        }, payload.timer || context.state.toast.timer);
      }
    },
    clearToastNotifications(context) {
      context.commit('clearToastNotificationsState');
    },
  },
  getters: {
    toast: (state) => state.toast,
  },
});
