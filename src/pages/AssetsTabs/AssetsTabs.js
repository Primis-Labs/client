import React, { useState } from "react";
import './AssetsTabs.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAge, setName } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import { Button ,Input,Modal} from 'antd';
import Top from '../../images/router.png';
import UserInfo from '../UserInfo/UserInfo'
import tabActive from '../../images/tba_active.png';
import QR from '../../images/QR.png';
import Loding from '../../images/loding.png';
import Success from '../../images/success.png';
import Error from '../../images/error.png';
const AssetsTab = () => {
    const [tabType, setTabType] = useState(true)
    const Navigate = useNavigate();
    const outWalletRouter = (props) => {
        console.log(props)
        Navigate('/WalletHome')
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleLoading, setIsModalVisibleLoading] = useState(true);

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

                            </div>
                            <p> Your Address </p>
                            <span>xxxxxxxxxxxxxxxxxxxxx</span>
                        </div>
                    </div>
                    <div className={!tabType ? 'active' : 'key'}>
                    <div className='Recieve'>
                            <img src={QR}></img>
                            <div className='_address'>
                            <Input  placeholder="Enter Address" className='_address_input'></Input>
                            </div>
                            <div className='_Amount'>
                            <Input  placeholder="Enter Amount"></Input>
                            <Button>MAX</Button>
                            </div>
                            <p className='balance'> Balance:0.00 </p>
                            <Button  onClick={showModal} className='send'>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal wrapClassName='ModalSend' title="Transaction Confirm" width='600px' visible={isModalVisible} onCancel={handleCancel}>
            <p><span>Send：</span> <a>oxcccvvvvvvvvvvvmmmmm</a></p>
            <p><span>Recieve：</span> <a>oxcccvvvvvvvvvvvmmmmm</a></p>
            <p><span>Total amount：</span> <a>12.5DOT</a></p>
            <p><span>Transaction  amount：</span> <a>12DOT</a></p>
            <p><span>Transaction  Fee：</span> <a>12DOT</a></p>
            <div className='modal_footer'>
                <Button onClick={handleCancel} className='Cancel'>Cancel</Button>
                <Button className='Confirm'>Confirm</Button>
            </div>
            </Modal>

            <Modal wrapClassName='ModalSend' title="Transaction Confirmation" width='600px' visible={isModalVisibleLoading} onCancel={handleCancelLoading}>
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
        setAge, setName
    }
}
export default connect(mapDispatchToProps)(AssetsTab)
