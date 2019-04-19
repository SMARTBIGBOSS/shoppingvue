import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import SignOut from '@/components/SignOut'
import SellerHome from '@/components/SellerHome'
import AddProduct from '@/components/AddProduct'
import EditProduct from '@/components/EditProduct'
import AccountInformation from '@/components/AccountInformation'
import AdminHome from '@/components/AdminHome'
import ProductPage from '@/components/ProductPage'
import Transaction from '@/components/Transaction'
import Orders from '@/components/OrderList'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      meta: {
        guest: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signout',
      name: 'SignOut',
      component: SignOut,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/seller_home',
      name: 'SellerHome',
      component: SellerHome,
      meta: {
        requiresAuth: true,
        is_seller: true
      }
    },
    {
      path: '/editProduct',
      name: 'EditProduct',
      component: EditProduct,
      meta: {
        requiresAuth: true,
        is_seller: true
      }
    },
    {
      path: '/addProduct',
      name: 'AddProduct',
      component: AddProduct,
      meta: {
        requiresAuth: true,
        is_seller: true
      }
    },
    {
      path: '/showAccount',
      name: 'AccountInformation',
      component: AccountInformation,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/adminHome',
      name: 'AdminHome',
      component: AdminHome,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/product',
      name: 'ProductPage',
      component: ProductPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/product/transaction',
      name: 'Transaction',
      component: Transaction,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/transactions',
      name: 'Orders',
      component: Orders,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('id') == null) {
      next({
        path: '/signin',
        params: {nextUrl: to.fullPath}
      })
    } else {
      let user = sessionStorage.getItem('role')
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user === 'admin') {
          next()
        } else {
          next({name: 'HomePage'})
        }
      } else if (to.matched.some(record => record.meta.is_seller)) {
        if (user === 'seller') {
          next()
        } else {
          next({name: 'HomePage'})
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (sessionStorage.getItem('id') == null) {
      next()
    } else {
      next({name: 'HomePage'})
    }
  } else {
    next()
  }
})

export default router
