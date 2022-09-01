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
  const [count,setCount]=useState(0)
  const onFinish = () => {
    setCount(count+1)
  };
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
  },[count])

  return (
    <div className='HomeWrap'>
      <div className='banner'>
        <div className='coinBtn' >
        <p>
        <Button>coinmarketcap</Button>
        <Button className='coing'>coinggecko</Button>
        </p>
        </div>
      </div>
      <div className='homeTabs'> 

        <div className='tbas'>
          <ul>
            <li className='actives'>
            Polkadot
            <img src={tabactive}/>
            </li>
            <li>
            Kusama
            {/* <img src={tabactive}/> */}
            </li>
            <li>
            Acala
            {/* <img src={tabactive}/> */}
            </li>
            <li>
            Astar
            {/* <img src={tabactive}/> */}
            </li>
            <li>
            Moonbeam
            {/* <img src={tabactive}/> */}
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