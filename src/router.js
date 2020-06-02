import Vue from 'vue';
import Router from 'vue-router';
import scenario from './components/scenario.vue';
import configurator from './components/configurator.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'scenario',
      component: scenario,
    },
    {
      path: '/configurator',
      name: 'configurator',
      component: configurator,
    }
  ],
});
