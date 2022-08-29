import React, { useState,useEffect } from "react";
import './AssetsTabs.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAccount, setSeed } from '../../store/action';
import { useNavigate,useLocation } from 'react-router-dom';
import { Button ,Input,Modal} from 'antd';
import Top from '../../images/router.png';
import UserInfo from '../UserInfo/UserInfo'
import tabActive from '../../images/tba_active.png';
import QR from '../../images/QR.png';
import Loding from '../../images/loding.png';
import Success from '../../images/success.png';
import Error from '../../images/error.png';
import { postWallet } from '../../api/walletManager';
import {knownSubstrate} from '../../api/network';
import QRCode from 'qrcode.react';
const  { initJsStore } = require("../../store/idb_service");
const { TransferService }  = require("../../store/transfer_service");
const AssetsTab = (props) => {
    const useLocations=useLocation()
    const {account,keys} = props
    const [tabType, setTabType] = useState(true)
    const Navigate = useNavigate();
    const outWalletRouter = (props) => {
        Navigate('/WalletHome')
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleLoading, setIsModalVisibleLoading] = useState(false);
    const [tokenAccount, setTokenAccount] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [passwords, setPasswords] = useState('');
    const [isLoding, setIsLoding] = useState('3');
    const [toeknBalnce, setTokenBalance] = useState(true);
    const [decimal, setDecimal] = useState(true);
    const [rpc, setRpc] = useState('');

    
    const showModal = () => {
        setIsModalVisible(true);
      };    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      const handleCancelLoading = () => {
        setIsModalVisibleLoading(false);
      };
      const Max=()=>{
        setTokenAccount(useLocations.state.datas)
      }
      const AccountToken=(e)=>{
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
        setTokenAccount(e.target.value)
        }else{
            return ;
        }
      }
      const GetBlance =  () =>{
        knownSubstrate.map( async(item)=>{
            if(keys==item.prefix){
                // postWallet(1,'pol.openConnnect',item.rpc).then(async (res)=>{
                const ps2 = {
                    address:account,
                    chain:item.rpc
                  }
                 let { data: { free: previousFree }, nonce: previousNonce } = await postWallet(1,'pol.balance',ps2);
                 setTokenBalance(`${previousFree}`/item.decimals);
                 setDecimal(item.decimals);
                 setRpc(item.rpc)
            //    })
            }})
    }
     const addData = (data) => {
            let DBAddRequest = window.indexedDB.open("test");
            console.log(DBAddRequest)
            DBAddRequest.onsuccess = function (event) {
                let transaction = DBAddRequest.result.transaction(["data"], "readwrite");
                let objectStore = transaction.objectStore("data");
            };
        };
    
    useEffect( () => {
        var indexdb = new TransferService();
        var query = indexdb.getTransfers(account).then(res=>{
            console.log(res)
        });
        GetBlance()
    }, [keys])
      const SendToken= async()=>{
        setIsModalVisible(false);
        setIsModalVisibleLoading(true);
        setIsLoding(0);
        console.log(tokenAccount*decimal)
        const ps2={
            from:account,
            passwd:passwords,
            to:tokenAddress,
            balance:tokenAccount*decimal,
            chain:rpc
        }
        try{
            await postWallet(1,'pol.transfer',ps2).then(async(res)=>{
                console.log(res)
                await initJsStore();
                GetBlance()
                setIsLoding(1);
                GetBlance();
                var obj = {
                  hash:'123456',
                  from:account,
                  to:tokenAddress,
                  formatFrom:'gkKej1RjUhsfLCzVc4wHzd3mLCNet7EcvrC4n2FjU7fasSmzC',
                  balance:tokenAccount,
                  symbols:'roc',
                  status:'1',
                  desc:'',
                  createTime:new Date()
                }
                addData(obj)
              });;
        }catch(e){
            setIsLoding(2)
        }
      
      }
      const addressChange=(e)=>{
        setTokenAddress(e.target.value)
      }
      const passwordChange=(e)=>{
        setPasswords(e.target.value)

      }
    return (
        <div className="AssetTab" >
            <UserInfo></UserInfo>
            <div className='LoginWallet_c'>
                <div className='top_'>
                    <img onClick={outWalletRouter} src={Top}></img>
                    <span>Assets</span>
                </div>
                <div className='tabsWrap'>
                    <ul className='tabs'>
                        <li onClick={() => {
                            setTabType(true)
                        }}
                        >
                            <span className={tabType ? 'active' : ''} >Recieve</span>
                            <img className={tabType ? 'active' : ''} src={tabActive}></img>
                        </li>
                        <li onClick={() => {
                            setTabType(false)
                        }}>
                            <span className={!tabType ? 'active' : ''} >Send</span>
                            <img className={!tabType ? 'active' : ''} src={tabActive}></img>
                        </li>
                    </ul>

                    <div className={tabType ? 'active' : 'key'}>
                        <div className='Recieve'>
                            <img src={QR}></img>
                            <div className="QR_CODE">
                            <QRCode value={account} size={170}></QRCode>
                            </div>
                            <p> Your Address </p>
                            <span>{account}</span>
                        </div>
                    </div>
                    <div className={!tabType ? 'active' : 'key'}>
                    <div className='Recieve'>
                            <img src={QR}></img>
                            <div className='_address'>
                            <Input  onChange={addressChange} placeholder="Enter Address" className='_address_input'></Input>
                            </div>
                            <div className='_Amount'>
                            <Input onChange={AccountToken} value={tokenAccount}  placeholder="Enter Amount"></Input>
                            <Button onClick={Max}>MAX</Button>
                            </div>
                            <div className='_address'>
                            <Input type='password'  onChange={passwordChange} placeholder="Password" className='_address_input'></Input>
                            </div>
                            <p className='balance'> Balance:{toeknBalnce} </p>
                            <Button  onClick={showModal} className='send'>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal wrapClassName='ModalSend' title="Transaction Confirm" width='600px' visible={isModalVisible} onCancel={handleCancel}>
            <p><span>Send：</span> <a>{tokenAddress}</a></p>
            <p><span>Recieve：</span> <a>{account.slice(0, 4)}****{account.slice(account.length - 4, account.length)}</a></p>
            <p><span>Total amount：</span> <a>{tokenAccount}</a></p>
            {/* <p><span>Transaction  amount：</span> <a>12DOT</a></p> */}
            <p><span>Transaction  Fee：</span> <a>0.03</a></p>
            <div className='modal_footer'>
                <Button onClick={handleCancel} className='Cancel'>Cancel</Button>
                <Button onClick={SendToken} className='Confirm'>Confirm</Button>
            </div>
            </Modal>

            <Modal wrapClassName='ModalSend' title="Transaction Confirmation" width='600px' visible={isModalVisibleLoading} onCancel={handleCancelLoading}>
                    <div className={isLoding==0?'loding madelHide':'loding '}>
                    <img src={Loding}></img>
                    </div>
                    <div className={isLoding==1?'success madelHide':'success '}>
                    <img src={Success}></img>
                    <p>Go to my channel</p>
                    </div>
                    <div className={isLoding==2?'success madelHide':'success '}>
                    <img src={Error}></img>
                    <p> Please try again.</p>
                    </div>

            </Modal>

        </div>
    )
}
const mapDispatchToProps = () => {
    return {
        setAccount, setSeed
    }
}
const mapStateToProps = (state) => {
    return { 
        account: state.account ,
        keys:state.keys
    }
}  
export default connect(mapStateToProps,mapDispatchToProps)(AssetsTab)
