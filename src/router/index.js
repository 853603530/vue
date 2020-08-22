import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/views/login/login';
import index from '@/views/index/index';
import home from '@/views/home/home';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect:'/index'
        },
        {
            path: '/helloworld',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/home',
            name: 'home',
            component: home
        }
    ]
})

//导航守卫
//使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//         next();
//     } else {
//         let token = localStorage.getItem('Authorization');
//         if (token === null || token === '' || token === undefined) {
//             next('/login');
//         } else {
//             next();
//         }
//     }
// });

export default router;