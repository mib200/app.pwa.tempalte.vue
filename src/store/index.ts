import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import accountsModule from './accounts/accounts-store';
// import deviceModule from './device-store';
// import notificationsModule from './notifications-store';
// import requestModule from './requests-store';
import routerModule from './router-store';

type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};

export interface StoreInterface extends Weaken<Store<string>, 'state'> {
  state: {
    accounts: any;
    route: {
      fullPath: string;
      query: string;
    };
  };
}

Vue.use(Vuex);

const injectionObj = {
  $http: Vue.prototype.$http,
  $vf: Vue.prototype.$vf,
};

export default new Vuex.Store({
  strict: true,
  modules: {
    accounts: accountsModule(injectionObj),
    // device: deviceModule(),
    // notifications: notificationsModule(),
    // request: requestModule(),
    router: routerModule(),
  },
});
