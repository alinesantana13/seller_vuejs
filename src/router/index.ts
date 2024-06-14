import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import ProfileView from '@/views/ProfileView.vue'
import StoresView from '@/views/StoresView.vue'
import StoreView from '@/views/StoreView.vue'
import StoreNew from '@/views/store/StoreNew.vue'
import StoreEdit from '@/views/store/StoreEdit.vue'
import ProductsView from '@/views/ProductsView.vue'
import { Auth } from '../auth'; // Importe sua classe de autenticação

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
      path: '/stores/:id',
      name: 'store',
      component: StoreView,
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
      path: '/products',
      name: 'products',
      component: ProductsView,
      meta: { requiresAuth: true }
    }
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
