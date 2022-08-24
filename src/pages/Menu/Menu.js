import {
  HomeIcon,
  WalletIcon,
  ChatIcon,
  BrowserIcon,
  SubIcon,
} from '../../style/iconfont';
import { Button, Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.scss';
import logo from '../../images/logo.png';
import setting from '../../images/setting.png';
import { connect} from 'react-redux';

const SiderMenu = (props) => {
  const {account}=props;
  console.log(account)
  const items = [
    { label: 'Home', key: '/', icon: <HomeIcon /> }, // 菜单项务必填写 key
    { label: 'Wallet', key: '/Wallet', icon: <WalletIcon /> },
    { label: 'Chart', key: '/Chart', icon: <ChatIcon /> },
    { label: 'Subsoribe', key: '/Subsoribe', icon: <SubIcon /> },
    { label: 'Brower', key: '/Brower', icon: <BrowserIcon /> },
  ];
  const Navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
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

  return (
    <div
      style={{
        width: '348px',
        background: '#1A1C1E',
        height:'100vh'
      }}
    >
      <p className='Logo'><img src={logo}></img></p>
      <Menu className='menu' onClick={MenuRouter} mode="inline" items={items} />

      <div className='setting'>
          <button > <img src={setting}></img> Setting</button>
      </div>
    </div>
  );
};
const mapStateToProps=(state)=>{
  console.log(state)
  return {account:state.account}
}
export default connect(mapStateToProps)(SiderMenu);