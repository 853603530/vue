import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login/login';
import search from '@/views/search/search';
import register from '@/views/register/register';
import index from '@/views/index/index';
import home from '@/views/home/home';
import upage from '@/views/upage/upage';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect:'/index',
            meta: {
                title: '首页'
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/register',
            name: 'register',
            component: register,
            meta: {
                title: '注册'
            }
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            meta: {
                title: '首页'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            meta: {
                title: '主页'
            }
        },
        {
            path: '/search',
            name: 'search',
            component: search,
            meta: {
                title: '搜索页'
            }
        },
        {
            path: '/upage/:userid',
            name: 'upage',
            component: upage,
            meta: {
                title: '开发者主页'
            }
        }
    ]
})

//导航守卫
//使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    // if (to.path === '/login') {
    //     next();
    // } else {
    //     let token = localStorage.getItem('Authorization');
    //     if (token === null || token === '' || token === undefined) {
    //         next('/login');
    //     } else {
    //         next();
    //     }
    // }
    /*路由发生改变修改页面的title */
    if(to.meta.title) {
        document.title = to.meta.title
    }
    next();

});

export default router;