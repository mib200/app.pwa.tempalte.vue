/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export default ({ $http, $vf }): any => ({
  async setSession(context, payload) {
    $http.defaults.headers.common.Authorization = `Bearer ${payload.token}`; // eslint-disable-line

    await $vf.setItem('accessToken', payload.token);
    await $vf.setItem('user', payload.user);

    context.commit('setLoggedInState', {
      accessToken: payload.token,
      user: payload.user,
    });
    return payload;
  },

  async login(context, payload) {
    context.commit('clearToastNotificationsState');
    const { data: response } = await $http.post('/auth/customer/login', payload, {
      requestName: 'login',
    });

    try {
      await context.dispatch('setSession', response);
    } catch (e) {
      alert('Error setting localforage values'); // eslint-disable-line
    }

    context.commit('setNextRouteState', {
      next: context.rootState.route.query.redirect ? context.rootState.route.query.redirect : '/dashboard',
    });

    return response;
  },

  async getSessionFromLocalDb(context) {
    const [accessToken, user] = await Promise.all([$vf.getItem('accessToken'), $vf.getItem('user')]);
    const obj = {
      accessToken,
      user,
    };
    context.commit('updateSessionFromLocalDbInStore', obj);
    return obj;
  },

  async logout(context, redirectUrl) {
    // eslint-disable-next-line no-param-reassign
    delete $http.defaults.headers.common.Authorization;
    await $vf.clear();
    console.warn(`/login${redirectUrl && typeof (redirectUrl) === 'string' ? `?redirect=${redirectUrl}` : ''}`); //eslint-disable-line
    context.commit('setNextRouteState', {
      next: `/login${redirectUrl && typeof redirectUrl === 'string' ? `?redirect=${redirectUrl}` : ''}`,
    });
    context.commit('setLoggedOutState');
  },
});
