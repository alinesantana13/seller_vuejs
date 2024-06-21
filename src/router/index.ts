import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import ProfileView from '@/views/ProfileView.vue'
import StoresView from '@/views/StoresView.vue'
import StoreView from '@/views/StoreView.vue'
import StoreNew from '@/views/store/StoreNew.vue'
import StoreEdit from '@/views/store/StoreEdit.vue'
import ListProduct from '@/components/product/ListProduct.vue'
import NewProduct from '@/components/product/NewProduct.vue'
import EditProduct from '@/components/product/EditProduct.vue'
import UnitProduct from '@/components/product/UnitProduct.vue'
import { Auth } from '../auth'; // Importe sua classe de autenticação
import ListOrder from '@/components/order/ListOrder.vue'

const auth = new Auth();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/stores',
      name: 'stores',
      component: StoresView,
      meta: { requiresAuth: true }
    },
    {
      path: '/stores/new',
      name: 'storeNew',
      component: StoreNew,
      meta: { requiresAuth: true }
    },
    {
      path: '/stores/:id/edit',
      name: 'storeEdit',
      component: StoreEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/stores/:id/',
      component: StoreView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: ListProduct,
          meta: { requiresAuth: true }
        },
        {
          path: 'products/:productId',
          component: UnitProduct,
          meta: { requiresAuth: true }
        },
        {
          path: 'products/:productId/edit',
          component: EditProduct,
          meta: { requiresAuth: true }
        },
        {
          path: 'products/new',
          component: NewProduct,
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          component: ListOrder,
          meta: { requiresAuth: true }
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isLoggedIn()) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
