import React, { useState, useEffect } from "react";
import './NftTabs.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAccount, setSeed } from '../../store/action';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Modal,message } from 'antd';
import Top from '../../images/router.png';
import UserInfo from '../UserInfo/UserInfo'
import tabActive from '../../images/tba_active.png';
import Loding from '../../images/loding.png';
import Success from '../../images/success.png';
import Error from '../../images/error.png';
import QR from '../../images/QR.png';
import QRCode from 'qrcode.react';
import {knownSubstrate} from '../../api/network';
import { postWallet } from '../../api/walletManager';

const NftTabs = (props) => {
    const { account, keys ,address } = props
    const [tabType, setTabType] = useState(true)
    const [addressT, setAddressT] = useState('')
    const [isLoding, setIsLoding] = useState('3');
    const [Blances,setBlances] =useState(0);
    const [passwords, setPasswords] = useState('');
    const [depositBalnce, setDepositBalnce] = useState(1);
    const Navigate = useNavigate();
    const useLocations = useLocation()
    const outWalletRouter = (props) => {
        console.log(props)
        Navigate('/WalletHome')
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleLoading, setIsModalVisibleLoading] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);

        if(Blances <= 0 ){
            message.error('Amount not entered.');
            setIsModalVisible(false)
            return;
        }

        if(Blances <= depositBalnce){
            setIsModalVisible(false)
            message.error('Minimum account amount must be greater than ' + depositBalnce);
            return;
        }


        if(addressT === ''){
            message.error('Recipient Address not entered.');
            setIsModalVisible(false)
            return;
        }
        if(passwords === ''){
            message.error('Wrong Password.');
            setIsModalVisible(false)
            return;
        }
       
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancelLoading = () => {
        setIsModalVisibleLoading(false);
    };
    const addressChange = (e) => {
        setAddressT(e.target.value)
    }
    const passwordChange=(e)=>{
        setPasswords(e.target.value)

      }
    const sends = async () => {
        setIsModalVisible(false);
        setIsModalVisibleLoading(true);
        setIsLoding(0);
        if(Blances==0){
          message.error('Lack of balance！');
        }

        let ps2 = {
            from:address,
            passwd:passwords,
            recipient: addressT,
            id: useLocations.state.id,
            version: useLocations.state.rmrks == 2 ? '2.0.0' : '1.0.0',
            chain:'wss://kusama-rpc.polkadot.io'
        }
        try {
            await postWallet(1, 'pol.transferNFT', ps2).then((res) => { 
                console.log(res);
                setIsLoding(1);
            }).catch(err => {
                setIsLoding(2)

            })
        } catch (e) {

            setIsLoding(2)

        }
    }

    const GetBlance =  () =>{
        knownSubstrate.map( async(item)=>{
            if(keys==item.prefix){
                setDepositBalnce(item.exdeposit);
                // postWallet(1,'pol.openConnnect',item.rpc).then(async (res)=>{
                const ps2 = {
                    address:account,
                    chain:item.rpc
                  }
                
                 let { data: { free: previousFree }, nonce: previousNonce } = await postWallet(1,'pol.balance',ps2);
                 setBlances(`${previousFree}`/item.decimals);
                
            //    })
            }})
    }

    useEffect(() => {
        GetBlance();
        if (useLocations.state.datas == '1') {
            setTabType(true)
        } else {
            setTabType(false)
        }
    }, [])
    return (
        <div className="NftTabs" >
            <UserInfo></UserInfo>
            <div className='LoginWallet_c'>
                <div className='top_'>
                    <img onClick={outWalletRouter} src={Top}></img>
                    <span>NFTs</span>
                </div>
                <div className='tabsWrap'>
                    <ul className='tabs'>
                        <li onClick={() => {
                            setTabType(true)
                        }}
                        >
                            <span className={tabType ? 'active' : ''} >Receive</span>
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
                            {/* <img src={QR}></img> */}
                            <div className="QR_CODE">
                                <QRCode value={address} size={170}></QRCode>
                            </div>
                            <p> Your Address </p>
                            <span>{address}</span>
                        </div>
                    </div>
                    <div className={!tabType ? 'active' : 'key'}>
                        <div className='Recieve'>
                            <img src={useLocations.state.images}></img>

                            <div className='_address'>
                                <Input onChange={addressChange} placeholder="Recipient Address"></Input>
                            </div>
                            <div className='_passwd'>
                            <Input type='password'  onChange={passwordChange} placeholder="Send Wallet Password" className='_address_input'></Input>
                            </div>
                            <div className='deposit'>
                                Balance:{Blances} , existential deposit:{depositBalnce}
                            </div>
                            {/* <Button onClick={showModal} className='send'>Send</Button> */}
                            <Button onClick={showModal}  className='send'>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal wrapClassName='ModalSend' title="Transaction Confirm" width='500px' visible={isModalVisible} onCancel={handleCancel}>
                <ul>
                    <li>
                        <p>
                            <img src={useLocations.state.images}></img>
                        </p>
                        <span></span>
                    </li>
                    <li>
                        <p className='addresst'>{addressT}</p>
                        <span>Receive</span>
                    </li>

                </ul>
                {/* <h6><span>Transaction  Fee：</span><a>0.01 DOT</a></h6> */}
                <div className='modal_footer'>
                    <Button onClick={handleCancel} className='Cancel'>Cancel</Button>
                    <Button onClick={sends} className='Confirm'>Confirm</Button>
                </div>
            </Modal>

            <Modal wrapClassName='ModalSend' title="Transaction Confirmation" width='500px' visible={isModalVisibleLoading} onCancel={handleCancelLoading}>
                <div className={isLoding == 0 ? 'loding madelHide' : 'loding '}>
                    <img src={Loding}></img>
                </div>
                <div className={isLoding == 1 ? 'success madelHide' : 'success '}>
                    <img src={Success}></img>
                    <p>Success !</p>
                </div>
                <div className={isLoding == 2 ? 'success madelHide' : 'success '}>
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
        account: state.account,
        keys: state.keys,
        address:state.address
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NftTabs)
