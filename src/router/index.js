import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Main from '../views/Main'
import UserList from '../views/user/List'
import UserProfile from '../views/user/Profile'
import Notfound from "../views/Notfound";
import RoleBasic from "../views/role/RoleBasic";
import RoleUser from "../views/role/RoleUser";
import PermissionBasic from "../views/permission/PermissionBasic";
Vue.use(VueRouter);

export default new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/',
      name:'login',
      component:Login,
    },
    {
      path:'/main',
      name:'main',
      component:Main,
      children:[
        {
          path:'/user/profile',
          name:'UserProfile',
          component:UserProfile,
          props:true
        },
        {
          path:'/user/list',
          name:'UserList',
          component:UserList
        },
        {
          path:'/role/basic',
          name:'RoleBasic',
          component:RoleBasic
        },
        {
          path:'/role/user',
          name:'RoleUser',
          component:RoleUser
        },
        {
          path:'/permission/basic',
          name:'PermissionBasic',
          component:PermissionBasic
        }
      ]
    },
    {
      path:'/goHome',
      redirect:'/main'
    },
    {
      path:'/fail',
      component:Notfound
    },

  ]
});
