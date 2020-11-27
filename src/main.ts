/* eslint-disable @typescript-eslint/ban-ts-comment */
import Vue from 'vue';
import { AxiosInstance } from 'axios';
import { sync } from 'vuex-router-sync';
import App from '@/App.vue';
import '@/modules/plugins';
// import '@/modules/filters';
// import '@/components/global';
import '@/registerServiceWorker';
import createRouter, { RouterOptionsInterface } from '@/router';
import store from '@/store';
import requestInterceptors from '@/modules/request-interceptors';

Vue.config.productionTip = false;

const router = createRouter(<RouterOptionsInterface>{ store, $progress: Vue.prototype.$Progress, $http: <AxiosInstance>Vue.prototype.$http });

sync(store, router);
// configure your local storage
Vue.prototype.$vf.config({
  name: 'app-pwa-db',
});

store.dispatch('getSessionFromLocalDb').then(() => {
  /*
   Intercept all axios requests
   and update its state in store
  */
  requestInterceptors({
    router,
    // @ts-ignore
    store,
    $http: Vue.prototype.$http,
    $progress: Vue.prototype.$Progress,
  });

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
