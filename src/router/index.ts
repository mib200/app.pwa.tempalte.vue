/* eslint-disable @typescript-eslint/ban-ts-comment */

import Vue from 'vue';
import { AxiosInstance } from 'axios';
import VueRouter, { RouteConfig } from 'vue-router';
import { Store } from 'vuex';
import Home from '../views/Home.vue';

export interface RouterOptionsInterface {
  store: Store<string>;
  $progress: any;
  $http: AxiosInstance;
}

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
];

const createRouter = ({ store, $progress, $http }: RouterOptionsInterface): VueRouter => {
  const router = new VueRouter({
    routes,
    mode: 'history',
    fallback: false,
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
      if (from.meta.saveScrollPos) {
        store.dispatch('setViewScrollPos', {
          name: from.name,
          coordinates: {
            x: window.scrollX,
            y: window.scrollY,
          },
        });
      }
      if (savedPosition) {
        return savedPosition;
      }
      return { x: 0, y: 0 };
    },
  });

  router.beforeEach(async (to, from, next) => {
    const { userId, adminToken, accessToken } = to.query;
    $progress.start();

    try {
      if (accessToken) {
        $http.defaults.headers.common.Authorization = `Bearer ${accessToken}`; //eslint-disable-line
        const user = await store.dispatch('fetchUser');
        // Have to set this twice as the header token is cleared by first request since there is no session created yet
        $http.defaults.headers.common.Authorization = `Bearer ${accessToken}`; //eslint-disable-line
        await store.dispatch('setSession', {
          user,
          token: accessToken,
        });
      }

      if (userId && adminToken) {
      $http.defaults.headers.common.Authorization = `Bearer ${adminToken}`; //eslint-disable-line
        const user = await store.dispatch('fetchUser', userId);
        // Have to set this twice as the header token is cleared by first request since there is no session created yet
      $http.defaults.headers.common.Authorization = `Bearer ${adminToken}`; //eslint-disable-line
        await store.dispatch('setSession', {
          user,
          token: adminToken,
        });
        await store.dispatch('getSessionFromLocalDb');
      }
    } catch (e) {
      console.log(e);
    }

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
        const obj = {
          name: 'Auth.Login',
        };
        if (to.path) {
          // @ts-ignore
          obj.query = {
            redirect: to.path,
          };
        }
        next(obj);
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.redirectIfLoggedIn)) {
      if (store.getters.isLoggedIn) {
        next({
          name: 'Dashboard.Summary',
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  router.afterEach(() => {
    // store.dispatch('clearViewScrollPos', to.name);
    // @ts-ignore
    if (store.state.router.next) store.dispatch('clearNextRoute');
    $progress.finish();
  });

  return router;
};

export default createRouter;
