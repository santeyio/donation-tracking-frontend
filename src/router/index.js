import Vue from 'vue';
import Router from 'vue-router';
import UserInfo from '@/components/UserInfo';
import VolunteerOpportunities from '@/components/VolunteerOpportunities';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserInfo',
      component: UserInfo,
    },
    {
      path: '/volunteer',
      name: 'VolunteerOpportunities',
      component: VolunteerOpportunities,
    },
  ],
});
