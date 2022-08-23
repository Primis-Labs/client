import React, { useState } from "react";
import './LoginWallet.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAccount, setName } from '../../store/action';
import SuperChain from '../SuperChain/SuperChain';
import { useNavigate } from 'react-router-dom';
import Top from '../../images/router.png';
import tabActive from '../../images/tba_active.png';
import { Button, message, Upload,Input } from 'antd';

const { TextArea } = Input;
function LoginWallet() {
    const [tabType, setTabType] = useState(true)
    const Navigate = useNavigate();
    const outWalletRouter = (props) => {
      console.log(props)
      Navigate('/Wallet')
    };
    const WalletHomeRouter = (props) => {
        console.log(props)
        Navigate('/WalletHome')
      };
    const handleTab = (index) => {
    }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
      
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
      
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    return (
        <div className="LoginWallet" >
            <div className='top_'>
                <img onClick={outWalletRouter} src={Top}></img>
                <span>Import Wallet</span>
            </div>
            <div className='LoginWallet_c'>
                <ul>
                    <li onClick={()=>{
                        setTabType(true)
                    }}
                    >
                        <span  className={tabType?'active':''} >Private key</span>
                        <img className={tabType?'active':''} src={tabActive}></img>
                    </li>
                    <li  onClick={()=>{
                        setTabType(false)
                    }}>
                        <span className={!tabType?'active':''} >Keyfile</span>
                        <img className={!tabType?'active':''} src={tabActive}></img>
                    </li>
                </ul>

                <div  className={tabType?'active':'key'}>
                    <from>
                        <TextArea rows={6} maxLength={6} ></TextArea>
                        <div className='Confirm_c'>
                            <Button className='Cancel'>Cancel</Button>
                            <Button className='Confirm'>Confirm</Button>
                        </div>
                    </from>
                </div>

                <div  className={!tabType?'active':'key'}>
                <div className='Uploads'>
                 <Input disabled placeholder='File Name'></Input>
                <Upload {...props} >
                    <Button className='Upload_B'>Select File</Button>
                </Upload>
                </div>
                <div className='_password'>
                    <span>Enter password</span>
                    <Input  placeholder='PassWord'></Input>
                </div>
                <div className='Confirm_c'>
                    <Button className='Confirm' onClick={WalletHomeRouter}>Confirm</Button>
                </div>
                </div>

            </div>
            <SuperChain></SuperChain>
        </div>

    )
}
const mapDispatchToProps = () => {
    return {
        setAccount, setName
    }
}
export default connect(mapDispatchToProps)(LoginWallet)
