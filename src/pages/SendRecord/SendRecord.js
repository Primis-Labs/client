import React, { useState } from "react";
import './SendRecord.scss';
//react-redux
import { connect ,useDispatch, useSelector} from 'react-redux';
import { setAccount,setName } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo'
import Dot_IMF from '../../images/dot.png';
import status_s from '../../images/status_s.png';
import status_fail from '../../images/status_fail.png';
import Top from '../../images/router.png';

import { Button } from 'antd';

const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
const SendRecord = () => {
    const [tabType, setTabType] = useState(true)
    const Navigate = useNavigate();
    const outWalletRouter = (props) => {
      console.log(props)
      Navigate('/Wallet')
    };
    return (
        <div className="SendRecord" >
            <UserInfo></UserInfo>
            <div className='SendRecord_c'>
            <div className='top_'>
                <img onClick={outWalletRouter} src={Top}></img>
                <span>Record</span>
            </div>
                <div>  
                    
                <ul className='Assets_record'>
                    <li className='title'>
                       <p className='token'>Token</p> 
                       <p className='Amount'>Amount</p> 
                       <p className='Hash'>Hash</p> 
                       <p className='Date'>Date</p> 
                       <p className='Status'>Status</p> 
                    </li>
                    <li>
                       <p className='token'>DOT</p> 
                       <p className='Amount'>100</p> 
                       <p className='Hash'>dfhuofh..ghgjkggkg</p> 
                       <p className='Date'>05-17-2022 19:02:34</p> 
                       <p className='Status'><img src={status_s}></img></p> 
                    </li>
                    <li>
                       <p className='token'>DOT</p> 
                       <p className='Amount'>100</p> 
                       <p className='Hash'>dfhuofh..ghgjkggkg</p> 
                       <p className='Date'>05-17-2022 19:02:34</p> 
                       <p className='Status'><img src={status_fail}></img></p> 
                    </li>
                    <li>
                       <p className='token'>DOT</p> 
                       <p className='Amount'>100</p> 
                       <p className='Hash'>dfhuofh..ghgjkggkg</p> 
                       <p className='Date'>05-17-2022 19:02:34</p> 
                       <p className='Status'><img src={status_fail}></img></p> 
                    </li>
                    <li>
                       <p className='token'>DOT</p> 
                       <p className='Amount'>100</p> 
                       <p className='Hash'>dfhuofh..ghgjkggkg</p> 
                       <p className='Date'>05-17-2022 19:02:34</p> 
                       <p className='Status'><img src={status_s}></img></p> 
                    </li>
                    <li>
                       <p className='token'>DOT</p> 
                       <p className='Amount'>100</p> 
                       <p className='Hash'>dfhuofh..ghgjkggkg</p> 
                       <p className='Date'>05-17-2022 19:02:34</p> 
                       <p className='Status'><img src={status_s}></img></p> 
                    </li>
                    <li>
                       <p className='token'>DOT</p> 
                       <p className='Amount'>100</p> 
                       <p className='Hash'>dfhuofh..ghgjkggkg</p> 
                       <p className='Date'>05-17-2022 19:02:34</p> 
                       <p className='Status'><img src={status_s}></img></p> 
                    </li>

                </ul>
                </div>
            </div>

            </div>
    )
}
const mapDispatchToProps= () =>{ 
    return {
        setAccount, setName 
    }
}
export default connect(mapDispatchToProps)(SendRecord)
