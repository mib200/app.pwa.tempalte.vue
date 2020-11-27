import Vue from 'vue';
import vf from 'vue-forage';
import VueProgressBar from 'vue-progressbar';
import Axios from './axios-plugin';

// const req = require.context('./', true, /\.(js|vue)$/i);
// const filteredFiles = req.keys().filter((key) => !key.includes('/index.js'));
// console.warn(require.context('./', true, /\.(js|vue)$/i));
// filteredFiles.forEach((plugin) => {
//   console.log(req(plugin));
//   Vue.use(req(plugin).default);
// });

Vue.use(Axios);
Vue.use(vf);
Vue.use(VueProgressBar, {
  // color: '#FF545E',
  color: '#48bb78',
  failedColor: '#FF545E',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
  autoFinish: false,
});
