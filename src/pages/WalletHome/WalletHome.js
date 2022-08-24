import React, { useState } from "react";
import './WalletHome.scss';
//react-redux
import { connect ,useDispatch, useSelector} from 'react-redux';
import { setAccount,setSeed } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo'
import tabActive from '../../images/tba_active.png';
import Dot_IMF from '../../images/dot.png';
import Nft_IMG from '../../images/nft.png';
import Set_IMG from '../../images/set.png';
import {NftAsset} from '../NftAssets/NftAssets'
import { Button } from 'antd';

const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
const WalletHome = () => {
    const [tabType, setTabType] = useState(true)
    const Navigate = useNavigate();
    const Recieve_click = (props) => {
        console.log(props)
        Navigate('/AssetsTabs')
    };
    return (
        <div className="WalletHome" >
            <UserInfo></UserInfo>
            <div className='LoginWallet_c'>
                <ul className='tabs'>
                    <li onClick={()=>{
                        setTabType(true)
                    }}
                    >
                        <span  className={tabType?'active':''} >Assets</span>
                        <img className={tabType?'active':''} src={tabActive}></img>
                    </li>
                    <li  onClick={()=>{
                        setTabType(false)
                    }}>
                        <span className={!tabType?'active':''} >NFT</span>
                        <img className={!tabType?'active':''} src={tabActive}></img>
                    </li>
                </ul>

                <div  className={tabType?'active':'key'}>  
                <ul className='Assets_record'>
                    <li className='title'>
                       <p>Token</p> 
                       <p>Amount</p> 
                       <p></p> 
                    </li>
                    <li>
                       <p><img src={Dot_IMF}></img></p> 
                       <p>100</p> 
                       <p>
                           <Button onClick={Recieve_click} className='button'>Recieve</Button>
                           <Button onClick={Recieve_click} className='button'>Send</Button>
                        </p> 
                    </li>
                    <li>
                       <p><img src={Dot_IMF}></img></p> 
                       <p>100</p> 
                       <p>
                           <Button onClick={Recieve_click} className='button'>Recieve</Button>
                           <Button onClick={Recieve_click} className='button'>Send</Button>
                        </p> 
                    </li>
                    <li>
                       <p><img src={Dot_IMF}></img></p> 
                       <p>100</p> 
                       <p>
                           <Button className='button'>Recieve</Button>
                           <Button className='button'>Send</Button>
                        </p> 
                    </li>
                    <li>
                       <p><img src={Dot_IMF}></img></p> 
                       <p>100</p> 
                       <p>
                           <Button className='button'>Recieve</Button>
                           <Button className='button'>Send</Button>
                        </p> 
                    </li>
                    <li>
                       <p><img src={Dot_IMF}></img></p> 
                       <p>100</p> 
                       <p>
                           <Button onClick={Recieve_click} className='button'>Recieve</Button>
                           <Button onClick={Recieve_click} className='button'>Send</Button>
                        </p> 
                    </li>
                </ul>
                </div>
                <div  className={!tabType?'active':'key'}>
                <div className='Nft'>
                    <ul className='Nft_ul'>
                        {/* <li>
                            <div className='setings'>
                                <img src={Set_IMG}></img>
                                <div className='setting_l'>
                                    <p>Set to avatar</p>
                                    <p>NFT Market</p>
                                </div>
                            </div>
                            <img  className='bg' src={Nft_IMG}></img>
                            <p className='seting_btn'>
                                <Button className='btn Recieve'>Recieve</Button>
                                <Button className='btn'>Send</Button>
                            </p>
                            </li> */}

                    <NftAsset></NftAsset>

                    </ul>

                </div>
                </div>

            </div>

            </div>
    )
}
const mapDispatchToProps= () =>{ 
    return {
        setAccount, setSeed 
    }
}
export default connect(mapDispatchToProps)(WalletHome)
