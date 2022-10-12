import {createRouter, createWebHashHistory} from 'vue-router'
import printerStatus from "../components/printerStatus";
import submit from "../components/submit";
import payment from "../components/payment";
import uploadFile from "../components/uploadFile";

const routes = [
  {
    path: '/',
    component:printerStatus
  },
  {
    path:'/create-job',
    component: submit
  },
  {
    path:'/pay',
    component: payment,
  },
  {
    path:'/upload',
    component: uploadFile
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
