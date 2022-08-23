import Index from "../pages/Wallet/Wallet";
import Chart from "../pages/Chart/chart";
import Home from "../pages/Home/Home";
import CreatWallte from '../pages/CreatWallte/CreatWallte';
import LoginWallet from '../pages/LoginWallet/LoginWallet';
import WalletHome from '../pages/WalletHome/WalletHome';
import AssetsTabs from '../pages/AssetsTabs/AssetsTabs';
import SendRecord from '../pages/SendRecord/SendRecord';
import NftTabs from '../pages/NftTabs/NftTabs';
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
    {
        path: "/WalletHome",
        component: WalletHome,
        exact: true,
        key:'WalletHome',
    },
    {
        path: "/AssetsTabs",
        component: AssetsTabs,
        exact: true,
        key:'AssetsTabs',
    },
    {
        path: "/SendRecord",
        component: SendRecord,
        exact: true,
        key:'SendRecord',
    },
    {
        path: "/NftTabs",
        component: NftTabs,
        exact: true,
        key:'NftTabs',
    },
    
    
]
export default routes;