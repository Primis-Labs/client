import {
  HomeIcon,
  WalletIcon,
  ChatIcon,
  BrowserIcon,
  SubIcon,
} from '../../style/iconfont';
import { Button, Menu } from 'antd';
import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './Menu.scss';
import logo from '../../images/logo.png';
import setting from '../../images/setting.png';
import { connect} from 'react-redux';

const SiderMenu = (props) => {
  const {account}=props;
  // console.log(account)
  const items = [
    { label: 'Home', key: '/', icon: <HomeIcon /> }, // 菜单项务必填写 key
    { label: 'Wallet', key: '/Wallet', icon: <WalletIcon /> },
    { label: 'Chat', key: '/Chart', icon: <ChatIcon /> },
    { label: 'Subsoribe', key: '/Subsoribe', icon: <SubIcon /> },
    { label: 'Brower', key: '/Brower', icon: <BrowserIcon /> },
  ];
  const Navigate = useNavigate();
  const Location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
  console.log(Location.pathname)

    if(Location.pathname=='/Wallet'||Location.pathname=='/WalletHome'||Location.pathname=='/AssetsTabs'||Location.pathname=='/NftTabs'){
      setActiveMenu('/Wallet')
      console.log(activeMenu)
    }
    if(Location.pathname=='/'){
      setActiveMenu('/')
    }
    if(Location.pathname=='/Chart'){
      setActiveMenu('/Chart')
    }
    if(Location.pathname=='/Subsoribe'){
      setActiveMenu('/Subsoribe')
    }
    if(Location.pathname=='/Brower'){
      setActiveMenu('/Brower')
    }
    return () => {
    }
  }, [Location.pathname])
  const MenuRouter = (routers) => {
    if(account){
      if(routers.key=='/Wallet'){
        Navigate('/WalletHome')
      }else{
        Navigate(routers.key)
      }
    }else{
      Navigate(routers.key)
    }

 
  };
  const Setting=()=>{
    Navigate('/Setting')
  }
  return (
    <div
      style={{
        width: '348px',
        background: '#1A1C1E',
        height:'100vh'
      }}
    >
      <p className='Logo'><img src={logo}></img></p>
      <Menu className='menu' selectedKeys={[activeMenu]} onClick={MenuRouter} mode="inline" items={items} />

      <div className='setting'>
          <button onClick={Setting}> <img src={setting}></img> Setting</button>
      </div>
    </div>
  );
};
const mapStateToProps=(state)=>{
  // console.log(state)
  return {account:state.account}
}
export default connect(mapStateToProps)(SiderMenu);