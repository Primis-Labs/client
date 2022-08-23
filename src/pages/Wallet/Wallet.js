import React from "react";
import './Wallet.scss';
//引入react-redux
import { connect ,useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

//引入公共方法
import { setAccount,setName } from '../../store/action';
import creat_img from '../../images/creat.png';
import import_img from '../../images/impot.png';
import SuperChain from '../SuperChain/SuperChain';
function Wallets(props) {
    console.log(props)
    const {setAccount,setName,dispatch} =props
    const test=()=>{
        dispatch(setAccount(2))
    }
    const test1=()=>{
        dispatch(setName('ice'))
    }
    const Navigate = useNavigate();
    const CreatWalletRouter = (props) => {
      console.log(props)
      Navigate('/CreatWallet')
    };
    const LoginWalletRouter = (props) => {
        console.log(props)
        Navigate('/LoginWallet')
      };
    return (
        <div className="wallet" >
           {/* <span style={{color:'#fff'}} onClick={()=>test()}>wallet</span> 
            <p  style={{color:'#fff'}}  onClick={()=>test1()} >11111</p> */}

            <div className='login_wallet'>
                <h6>Welcome to Primis</h6>
                <ul>
                    <li onClick={CreatWalletRouter}>
                       <img src={creat_img}></img> 
                       <p>
                            <span>Create a wallet</span>
                            <a>Getting started with Primis</a>
                       </p>
                    </li>
                    <li onClick={LoginWalletRouter}>
                    <img src={import_img}></img> 
                       <p>
                            <span>Importing a wallet</span>
                            <a>Getting started with Primis</a>
                       </p>
                    </li>

                </ul>
            </div>
            <SuperChain></SuperChain>
            </div>
      
    )
}
const mapDispatchToProps= () =>{ 
    return {
        setAccount, setName 
    }
}
//建立连接  调用方法
export default connect(mapDispatchToProps)(Wallets)
