import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import ProvinceList from '../views/ProvinceList.vue'
import MunicipalityList from '../views/MunicipalityList.vue'
import BarangayList from '../views/BarangayList.vue'
import place from '../views/place.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/regions'
  },
  {
    path: '/regions',
    name: 'Home',
    component: HomePage
  }, {
    path: '/provinces/:regionCode',
    component: ProvinceList,
    props: true,
  },
  {
    path: '/municipalities/:provinceCode',
    component: MunicipalityList,
    props: true,
  },
  {
    path: '/provinces/:provinceCode/municipalities/:municipalityCode/barangays',
    component: BarangayList,
    props: true,
  },
  
  {
    path: '/pl',
    component: place,
    props: true,
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
