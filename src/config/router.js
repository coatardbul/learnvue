import {createRouter, createWebHistory} from 'vue-router'

const Home = () => import('@/view/layout/Home')
const Login = () => import('@/view/Login')
const Index1 = () =>import('@/view/stock/Num1')
const Index2 = () =>import('@/view/stock/Num2')
const Index3 = () =>import('@/view/stock/Num3')
const Index4 = () =>import('@/view/stock/Num4')
const Index5 = () =>import('@/view/stock/BaseLine')
const Index6 = () =>import('@/view/stock/Num6')
const Index7 = () =>import('@/view/stock/Num7')
const Index8 = () =>import('@/view/stock/Num8')
const Index9 = () =>import('@/view/stock/Num9')
const Index10 = () =>import('@/view/stock/Num10')
const Index11 = () =>import('@/view/stock/Num11')
const Index12 = () =>import('@/view/stock/Num12')
const Index13 = () =>import('@/view/stock/Num13')
const Index14 = () =>import('@/view/stock/Num14')
const Index15 = () =>import('@/view/stock/Num15')
const Index16 = () =>import('@/view/stock/Num16')
const Index17 = () =>import('@/view/stock/Num17')
const Index18 = () =>import('@/view/stock/Num18')


const LearnVue1 = () =>import('@/view/learn/Num1')



const IntervalStatic = () =>import('@/view/river/IntervalStatic')
const IntervalTimeInfo = () =>import('@/view/river/IntervalTimeInfo')


const JamesLegge1 = () =>import('@/view/jamesLegge/Num1')
const JamesLegge2 = () =>import('@/view/jamesLegge/Num2')
const JamesLegge3 = () =>import('@/view/jamesLegge/Num3')
const JamesLegge4 = () =>import('@/view/jamesLegge/Num4')
const JamesLegge5 = () =>import('@/view/jamesLegge/Num5')
const JamesLegge6 = () =>import('@/view/jamesLegge/Num6')


const MenuInfo = () =>import('@/view/menu/MenuInfo')
const DialogMenuDetail = () =>import('@/view/menu/DialogMenuDetail')



const routes = [
    {
        path: "/Login",
        name: "Login",
        component: Login,
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children:[
            {
                path: "/index1",
                name: "index1",
                component: Index1,
            },
            {
                path: "/index2",
                name: "index2",
                component: Index2,
            },
            {
                path: "/index3",
                name: "index3",
                component: Index3,
            },
            {
                path: "/index4",
                name: "index4",
                component: Index4,
            },
            {
                path: "/index5",
                name: "index5",
                component: Index5,
            },
            {
                path: "/index6",
                name: "index6",
                component: Index6,
            },
            {
                path: "/index7",
                name: "index7",
                component: Index7,
            },
            {
                path: "/index8",
                name: "index8",
                component: Index8,
            },
            {
                path: "/index9",
                name: "index9",
                component: Index9,
            },
            {
                path: "/index10",
                name: "index10",
                component: Index10,
            },
            {
                path: "/index11",
                name: "index11",
                component: Index11,
            },
            {
                path: "/index12",
                name: "index12",
                component: Index12,
            },
            {
                path: "/index13",
                name: "index13",
                component: Index13,
            },
            {
                path: "/index14",
                name: "index14",
                component: Index14,
            },
            {
                path: "/index15",
                name: "index15",
                component: Index15,
            },
            {
                path: "/index16",
                name: "index16",
                component: Index16,
            },
            {
                path: "/index17",
                name: "index17",
                component: Index17,
            },
            {
                path: "/index18",
                name: "index18",
                component: Index18,
            },

            {
                path: "/intervalStatic",
                name: "intervalStatic",
                component: IntervalStatic,
            },
            {
                path: "/intervalTime",
                name: "intervalTime",
                component: IntervalTimeInfo,
            },




            {
                path: "/learn-vue-1",
                name: "learn-vue-1",
                component: LearnVue1,
            },



            {
                path: "/jamesLegge1",
                name: "jamesLegge1",
                component: JamesLegge1,
            },
            {
                path: "/jamesLegge2",
                name: "jamesLegge2",
                component: JamesLegge2,
            },
            {
                path: "/jamesLegge3",
                name: "jamesLegge3",
                component: JamesLegge3,
            },
            {
                path: "/jamesLegge4",
                name: "jamesLegge4",
                component: JamesLegge4,
            },
            {
                path: "/jamesLegge5",
                name: "jamesLegge5",
                component: JamesLegge5,
            },
            {
                path: "/jamesLegge6",
                name: "jamesLegge6",
                component: JamesLegge6,
            },
            {
                path: "/menuInfo",
                name: "menuInfo",
                component: MenuInfo,
            },
            {
                path: "/menuDialog",
                name: "menuDialog",
                component: DialogMenuDetail,
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("token");
    if (token || to.path === "/login") {
        next();
    } else {
        next("/login");
    }
})

export default router;
