import Axios from 'axios';
import { VueConstructor } from 'vue';

Axios.defaults.baseURL = process.env.VUE_APP_BUILD === 'production' ? 'https://api.DOMAIN.com/prod' : 'https://api.DOMAIN.com/uat';
Axios.defaults.headers.common.Accept = 'application/json';

export default (Vue: VueConstructor): void => {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return Axios;
      },
    },
  });
};
