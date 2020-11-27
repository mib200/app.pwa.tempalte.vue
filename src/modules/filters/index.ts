/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Vue from 'vue';
import snakeToCamelCase from '@/modules/utils/snake-to-camelcase';

const req = require.context('./', true, /\.(js|vue)$/i);
const filteredFiles = req.keys().filter((key) => !key.includes('/index.js'));
filteredFiles.forEach((component) => {
  const name = snakeToCamelCase(component.split('-filter.js')[0].split('./')[1]);
  Vue.filter(name, req(component).default);
});
