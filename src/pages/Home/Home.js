import { Button, Checkbox, Form, Input } from 'antd';
import { DoubleRightOutlined, } from '@ant-design/icons';
import React,{useState,useEffect} from 'react';
import tabactive from '../../images/tabactive.png';
import chainx from '../../images/Chainx.png';
import poek from '../../images/Poeka.png';
import bifrost from '../../images/bifrost.png';
import kusama from '../../images/kusama.png';
import reef from '../../images/reff.png';
import ent from '../../images/ent.png';
import listicon from '../../images/listicon.png';

import './Home.scss';
const Home = () => {
  const [active,setActive]=useState(1)
  const logoSrc=[
    {src:chainx},
    {src:poek},
    {src:bifrost},
    {src:kusama},
    {src:reef},
    {src:ent},
  ]
  useEffect(()=>{
    //post
    // document.title=` ${count} `;
  },[])
  const tabs=(data)=>{
    setActive(data)
  }
  return (
    <div className='HomeWrap'>
      <div className='banner'>
        <div className='coinBtn' >
        <p>
        <Button>CoinMarketCap</Button>
        <Button className='coing'>CoinGecko</Button>
        </p>
        </div>
      </div>
      <div className='homeTabs'> 

        <div className='tbas'>
          <ul>
            <li className={active==1?'actives':''} onClick={()=>tabs(1)}>
            Polkadot
            <img className={active==1?'actives':''}  src={tabactive}/>
            </li>
            <li className={active==2?'actives':''}  onClick={()=>tabs(2)}>
            Kusama
            <img className={active==2?'actives':''}  src={tabactive}/>
            </li>
            <li className={active==3?'actives':''}  onClick={()=>tabs(3)}>
            Acala
            <img className={active==3?'actives':''}  src={tabactive}/>
            </li>
            <li className={active==4?'actives':''}  onClick={()=>tabs(4)}>
            Moonbeam
            <img className={active==4?'actives':''}  src={tabactive}/>
            </li>
           </ul>

          <div className='application'>
            {
              logoSrc.map((item,index)=>{
                return <p key={index}>
                <img src={item.src}/>
                </p>
              })
            }
          </div>
          <div>
          </div>
        </div>

        <div className='liveWire'>
            <div className='titles'>
                <img src={listicon}/>
                <p>Web3  Live Wire</p>
                <Button>More<DoubleRightOutlined /></Button>
            </div>

            <p className='comming'>Comming Soon</p>
        </div>

      </div>
    </div>

  );
};

export default Home;