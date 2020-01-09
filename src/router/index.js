import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import BookManger from "../views/BookManger";
import Spider from  '../components/spider'
import Save from  '../components/save'
import MochaTest from '../components/mocha';


Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'bookManager',
    component: BookManger
  },
  {
    path: '/spider',
    name: 'Spider',
    component: Spider
  },
  {
    path: '/save',
    name: 'save',
    component: Save
  },
  {
    path: '/mocha',
    name: 'MochaTest',
    component: MochaTest
  }
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
