import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import SignOut from '@/components/SignOut'
import SellerHome from '@/components/SellerHome'
import AddProduct from '@/components/AddProduct'
import EditProduct from '@/components/EditProduct'
// import EditAccount from '@/components/EditAccount'
import AccountInformation from '@/components/AccountInformation'
import AdminHome from '@/components/AdminHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signout',
      name: 'SignOut',
      component: SignOut
    },
    {
      path: '/seller_home',
      name: 'SellerHome',
      component: SellerHome
    },
    {
      path: '/editProduct',
      name: 'EditProduct',
      component: EditProduct
    },
    {
      path: '/addProduct',
      name: 'AddProduct',
      component: AddProduct
    },
    {
      path: '/showAccount',
      name: 'AccountInformation',
      component: AccountInformation
    },
    {
      path: '/adminHome',
      name: 'AdminHome',
      component: AdminHome
    }
  ]
})
