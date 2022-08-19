import React from "react";
import './CreatWallte.scss';
//引入react-redux
import { connect ,useDispatch, useSelector} from 'react-redux';
//引入公共方法
import { setAge,setName } from '../../store/action';
import SuperChain from '../SuperChain/SuperChain'
import Top from '../../images/router.png';
import Warring from '../../images/warring.png';
import { Button } from 'antd';
function CreatWallte() {
    return (
        <div className="CreatWallet" >
            <div className='top_'>
                <img src={Top}></img>
                <span>Create wallet</span>
            </div>
            <div className='CreatWallet_c'>
            <from>
                <p>New Password</p>
                <input></input>
                <p>Confirm password</p>
                <input></input>
                <h6><img src={Warring}></img>Keep your own password and avoid sharing it to anyone.</h6>
                <div className='Confirm_c'>
                <Button className='Cancel'>Cancel</Button>
                <Button className='Confirm'>Confirm</Button>
                </div>
            </from>
            </div>
            <SuperChain></SuperChain>

            </div>
      
    )
}
const mapDispatchToProps= () =>{ 
    return {
        setAge, setName 
    }
}
//建立连接  调用方法
export default connect(mapDispatchToProps)(CreatWallte)
