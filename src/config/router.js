import {createRouter, createWebHistory} from 'vue-router'
import {Config} from "@antv/x6";
import ConfigInfo from "@/constant/ConfigInfo";

const AllWatch = () => import('@/view/allWatch/OpenWatch')
const OpenWatch1 = () => import('@/view/allWatch/OpenWatch1')
const Test = () => import('@/view/allWatch/Test')

const OpenWatch2 = () => import('@/view/allWatch/OpenWatch2')
const OpenWatch3 = () => import('@/view/allWatch/NowAuction')
const OpenWatch4 = () => import('@/view/allWatch/OpenWatch4')
const OpenWatch5 = () => import('@/view/allWatch/ThemeHistorySimulate')
const OpenWatch6 = () => import('@/view/allWatch/OpenWatch6')

const OpenTheme = () => import('@/view/allWatch/OpenTheme')
const HistoryAuctionSimulate = () => import('@/view/allWatch/HistoryAuctionSimulate')
const FilterUpLimitInfo = () => import('@/view/allWatch/FilterUpLimitInfo')

const CloseWatch = () => import('@/view/allWatch/CloseWatch')
const CloseWatch1 = () => import('@/view/allWatch/CloseWatch1')
const CloseWatch2 = () => import('@/view/allWatch/CloseWatch2')

const Home = () => import('@/view/layout/Home')
const Login = () => import('@/view/Login')
const Index1 = () => import('@/view/stock/Num1')
const Index2 = () => import('@/view/stock/upLimit/Num2')
const Index3 = () => import('@/view/stock/stratrgy/Num3')
const Index4 = () => import('@/view/stock/templatedQuery/Num4')
const Index5 = () => import('@/view/stock/BaseLine')
const Index6 = () => import('@/view/stock/Num6')
const Index7 = () => import('@/view/stock/Num7')
const Index8 = () => import('@/view/stock/Num8')
const Index9 = () => import('@/view/stock/Num9')
const Index10 = () => import('@/view/stock/Num10')
const Index11 = () => import('@/view/stock/Num11')
const Index12 = () => import('@/view/stock/Num12')
const Index13 = () => import('@/view/stock/Num13')
const Index14 = () => import('@/view/stock/Num14')
const Index15 = () => import('@/view/stock/Num15')
const Index16 = () => import('@/view/stock/Num16')
const Index17 = () => import('@/view/stock/Num17')
const Index18 = () => import('@/view/stock/Num18')
const Index19 = () => import('@/view/stock/Num19')
const Index20 = () => import('@/view/stock/Num20')
const Index21 = () => import('@/view/stock/Num21')
const Index22 = () => import('@/view/stock/strategyWatch/Num22')
const Index23 = () => import('@/view/stock/optionalPool/Num23')
const Index24 = () => import('@/view/stock/Num24')
const Index25 = () => import('@/view/stock/moduleFuture/Num25')
const Index26 = () => import('@/view/stock/Num26')
const Index27 = () => import('@/view/stock/Num27')
const Index28 = () => import('@/view/stock/Num28')
const Index29 = () => import('@/view/stock/Num29')
const Index30 = () => import('@/view/stock/Num30')
const Index31 = () => import('@/view/stock/Num31')
const Index32 = () => import('@/view/stock/Num32')
const Index33 = () => import('@/view/stock/Num33')
const Index34 = () => import('@/view/stock/Num34')
const Index35 = () => import('@/view/stock/Num35')
const Index36 = () => import('@/view/stock/anomalousBehavior/Num36')
const Index37 = () => import('@/view/stock/optionalPlate/Num37')
const Index38 = () => import('@/view/stock/Num38')
const Index39 = () => import('@/view/stock/abStatic/Num39')
const Index40 = () => import('@/view/stock/Num40')
const Index41 = () => import('@/view/stock/Num41')
const Index42 = () => import('@/view/stock/Num42')
const Index43 = () => import('@/view/stock/Num43')
const Index44 = () => import('@/view/stock/Num44')
const Index45 = () => import('@/view/stock/Num45')
const Index46 = () => import('@/view/stock/Num46')
const Index47 = () => import('@/view/stock/Num47')


const LearnVue1 = () => import('@/view/learn/Num1')


const IntervalStatic = () => import('@/view/river/IntervalStatic')
const IntervalTimeInfo = () => import('@/view/river/IntervalTimeInfo')


const JamesLegge1 = () => import('@/view/jamesLegge/Num1')
const JamesLegge2 = () => import('@/view/jamesLegge/Num2')
const JamesLegge3 = () => import('@/view/jamesLegge/Num3')
const JamesLegge4 = () => import('@/view/jamesLegge/Num4')
const JamesLegge5 = () => import('@/view/jamesLegge/Num5')
const JamesLegge6 = () => import('@/view/jamesLegge/Num6')


const MenuInfo = () => import('@/view/menu/MenuInfo')
const DialogMenuDetail = () => import('@/view/menu/DialogMenuDetail')


const routes = [
    {
        path: "/Login",
        name: "Login",
        component: Login,
    },
    {
        path: "/AllWatch",
        name: "AllWatch",
        component: AllWatch,
    },
    {
        path: "/OpenWatch1",
        name: "OpenWatch1",
        component: OpenWatch1,
    },
    {
        path: "/OpenWatch2",
        name: "OpenWatch2",
        component: OpenWatch2,
    },
    {
        path: "/Test",
        name: "Test",
        component: Test,
    },
    {
        path: "/OpenWatch3",
        name: "OpenWatch3",
        component: OpenWatch3,
    },
    {
        path: "/OpenWatch4",
        name: "OpenWatch4",
        component: OpenWatch4,
    },
    {
        path: "/OpenWatch5",
        name: "OpenWatch5",
        component: OpenWatch5,
    },
    {
        path: "/OpenWatch6",
        name: "OpenWatch6",
        component: OpenWatch6,
    },
    {
        path: "/OpenTheme",
        name: "OpenTheme",
        component: OpenTheme,
    },
    {
        path: "/HistoryAuctionSimulate",
        name: "HistoryAuctionSimulate",
        component: HistoryAuctionSimulate,
    },
    {
        path: "/FilterUpLimitInfo",
        name: "FilterUpLimitInfo",
        component: FilterUpLimitInfo,
    },
    {
        path: "/CloseWatch",
        name: "CloseWatch",
        component: CloseWatch,
    },
    {
        path: "/CloseWatch1",
        name: "CloseWatch1",
        component: CloseWatch1,
    },
    {
        path: "/CloseWatch2",
        name: "CloseWatch2",
        component: CloseWatch2,
    },
    {
        path: "/jamesLegge1",
        name: "jamesLegge1",
        component: JamesLegge1,
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
        path: "/",
        name: "Home",
        component: Home,
        children: [
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
                path: "/index19",
                name: "index19",
                component: Index19,
            },
            {
                path: "/index20",
                name: "index20",
                component: Index20,
            },
            {
                path: "/index21",
                name: "index21",
                component: Index21,
            },
            {
                path: "/index22",
                name: "index22",
                component: Index22,
            },
            {
                path: "/index23",
                name: "index23",
                component: Index23,
            },
            {
                path: "/index24",
                name: "index24",
                component: Index24,
            },
            {
                path: "/index25",
                name: "index25",
                component: Index25,
            },
            {
                path: "/index26",
                name: "index26",
                component: Index26,
            },
            {
                path: "/index27",
                name: "index27",
                component: Index27,
            },
            {
                path: "/index28",
                name: "index28",
                component: Index28,
            },
            {
                path: "/index29",
                name: "index29",
                component: Index29,
            },
            {
                path: "/index30",
                name: "index30",
                component: Index30,
            },
            {
                path: "/index31",
                name: "index31",
                component: Index31,
            },
            {
                path: "/index32",
                name: "index32",
                component: Index32,
            },
            {
                path: "/index33",
                name: "index33",
                component: Index33,
            },
            {
                path: "/index34",
                name: "index34",
                component: Index34,
            },
            {
                path: "/index35",
                name: "index35",
                component: Index35,
            },
            {
                path: "/index36",
                name: "index36",
                component: Index36,
            },
            {
                path: "/index37",
                name: "index37",
                component: Index37,
            },
            {
                path: "/index38",
                name: "index38",
                component: Index38,
            },
            {
                path: "/index39",
                name: "index39",
                component: Index39,
            },
            {
                path: "/index40",
                name: "index40",
                component: Index40,
            },
            {
                path: "/index41",
                name: "index41",
                component: Index41,
            },
            {
                path: "/index42",
                name: "index42",
                component: Index42,
            },
            {
                path: "/index43",
                name: "index43",
                component: Index43,
            },
            {
                path: "/index44",
                name: "index44",
                component: Index44,
            },
            {
                path: "/index45",
                name: "index45",
                component: Index45,
            },
            {
                path: "/index46",
                name: "index46",
                component: Index46,
            },
            {
                path: "/index47",
                name: "index47",
                component: Index47,
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

function validToken(token) {
    //一天有效,特么的服务器和当前时间有误差？
    let number = new Date().getTime() - token+10*1000;
    if (number / 1000 / 60 / 60 / 24 > 1 || number / 1000 / 60 / 60 / 24 < 0) {
        return false;
    } else {
        return true;
    }
}

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("token");
    if (to.path === "/login") {
        next();
    } else if (validToken(token)) {
        next();
    } else {
        next("/login");
    }
})

export default router;
