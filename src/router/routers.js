//导入需要配置路由的组件
import Index from "../pages/Wallet/Wallet";
import Chart from "../pages/Chart/chart";
import Home from "../pages/Home/Home";
import CreatWallte from '../pages/CreatWallte/CreatWallte';
//路由配置选项效果然后挂载到对应的节点即可
const routes =  [
    {
    path:'/Wallet',
    component: Index,
    exact: true,    

    },
    {
        lable:'Home',
        key:'Home',
        path: "/Home",
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
    }
]
export default routes;