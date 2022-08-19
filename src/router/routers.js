//导入需要配置路由的组件
import Index from "../pages/Wallet/Wallet";
import Chart from "../pages/Chart/chart";
import Home from "../pages/Home/Home";
import CreatWallte from '../pages/CreatWallte/CreatWallte';
import LoginWallet from '../pages/LoginWallet/LoginWallet';
//The routing configuration
const routes =  [

    {
    path:'/Wallet',
    component: Index,
    exact: true,    

    },
    {
        lable:'Home',
        key:'Home',
        path: "/",
        component: Home,
        exact: true,
    },
    {
        lable:'chart',
        path: "/chart",
        component: Chart,
        exact: true,
        key:'chart',
    }
    ,
    {
        lable:'CreatWallte',
        path: "/CreatWallet",
        component: CreatWallte,
        exact: true,
        key:'CreatWallte',
    },
    {
        path: "/LoginWallet",
        component: LoginWallet,
        exact: true,
        key:'LoginWallet',
    },
]
export default routes;