import React, { useState } from "react";
import './NftTabs.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAccount, setSeed } from '../../store/action';
import { useNavigate ,useLocation} from 'react-router-dom';
import { Button ,Input,Modal} from 'antd';
import Top from '../../images/router.png';
import UserInfo from '../UserInfo/UserInfo'
import tabActive from '../../images/tba_active.png';
import Loding from '../../images/loding.png';
import Success from '../../images/success.png';
import Error from '../../images/error.png';
import QR from '../../images/QR.png';
import QRCode from 'qrcode.react';

const NftTabs = (props) => {
    const {account,keys} = props
    const [tabType, setTabType] = useState(true)
    const Navigate = useNavigate();
    const useLocations=useLocation()
    console.log(useLocations)
    const outWalletRouter = (props) => {
        console.log(props)
        Navigate('/WalletHome')
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleLoading, setIsModalVisibleLoading] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
      };    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      const handleCancelLoading = () => {
        setIsModalVisibleLoading(false);
      };
      
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
                            <Input  placeholder="Enter Address"></Input>
                            </div>
                            <Button  onClick={showModal} className='send'>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal wrapClassName='ModalSend' title="Transaction Confirm" width='500px' visible={isModalVisible} onCancel={handleCancel}>
                        <ul>
                            <li>
                                <p>
                                    <img src={useLocations.state.datas}></img>
                                </p>
                                <span>Send</span>
                            </li>                            <li>
                                <p>oxcccvv
                                    vvvvvvvv
                                    vmmmmm</p>
                                <span>Recieve</span>
                            </li>

                        </ul>
                        <h6><span>Transaction  Fee：</span><a>0.01 DOT</a></h6>
            <div className='modal_footer'>
                <Button onClick={handleCancel} className='Cancel'>Cancel</Button>
                <Button className='Confirm'>Confirm</Button>
            </div>
            </Modal>

            <Modal wrapClassName='ModalSend' title="Transaction Confirmation" width='500px' visible={isModalVisibleLoading} onCancel={handleCancelLoading}>
                    <div className='loding'>
                    <img src={Loding}></img>
                    </div>
                    <div className='success'>
                    <img src={Success}></img>
                    <p>Go to my channel</p>
                    </div>
                    <div className='error'>
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
export default connect(mapStateToProps,mapDispatchToProps)(NftTabs)
