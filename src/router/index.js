import Vue from 'vue';
import Router from 'vue-router';
import UserInfo from '@/components/UserInfo';
import VolunteerOpportunities from '@/components/VolunteerOpportunities';
import Donations from '@/components/Donations';

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
    {
      path: '/donations',
      name: 'Donations',
      component: Donations,
    },
  ],
});
