import React, { useState, useEffect } from "react";
import './NftTabs.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAccount, setSeed } from '../../store/action';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Modal } from 'antd';
import Top from '../../images/router.png';
import UserInfo from '../UserInfo/UserInfo'
import tabActive from '../../images/tba_active.png';
import Loding from '../../images/loding.png';
import Success from '../../images/success.png';
import Error from '../../images/error.png';
import QR from '../../images/QR.png';
import QRCode from 'qrcode.react';
import { postWallet } from '../../api/walletManager';

const NftTabs = (props) => {
    const { account, keys } = props
    const [tabType, setTabType] = useState(true)
    const [addressT, setAddressT] = useState(true)
    const [isLoding, setIsLoding] = useState('3');
    const Navigate = useNavigate();
    const useLocations = useLocation()
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
    const addressChange = (e) => {
        setAddressT(e.target.value)
    }
    const sends = async () => {
        setIsModalVisible(false);
        setIsModalVisibleLoading(true);
        setIsLoding(0);
        let ps2 = {
            id: useLocations.state.id,
            recipient: addressT,
            version: useLocations.state.rmrks == 2 ? '2.0.0' : '1.0.0'
        }
        try {

            await postWallet(1, 'pol.sendNft', ps2).then((res) => {
                console.log(res)
                setIsLoding(1);

            }).catch(err => {
            })
        } catch (e) {
            setIsLoding(2)

        }
    }
    useEffect(() => {
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
                                <Input onChange={addressChange} placeholder="Enter Address"></Input>
                            </div>
                            <Button onClick={showModal} className='send'>Send</Button>
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
                        <span>Send</span>
                    </li>
                    <li>
                        <p className='addresst'>{addressT}</p>
                        <span>Recieve</span>
                    </li>

                </ul>
                <h6><span>Transaction  Fee：</span><a>0.01 DOT</a></h6>
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
        keys: state.keys
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NftTabs)
