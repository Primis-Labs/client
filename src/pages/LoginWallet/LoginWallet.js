import React, { useState } from "react";
import './LoginWallet.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAccount, setSeed ,setethAddress, setAddress} from '../../store/action';
import SuperChain from '../SuperChain/SuperChain';
import { useNavigate } from 'react-router-dom';
import Top from '../../images/router.png';
import tabActive from '../../images/tba_active.png';
import { Button, message, Upload,Input } from 'antd';
import { postWallet, initWallet } from '../../api/walletManager';
const { TextArea } = Input;
function LoginWallet(props){
    const { setAccount,setethAddress, dispatch} = props
    const [tabType, setTabType] = useState(true);
    const [filesContent, setFilesContent] = useState('')
    const [fileName, setFileName] = useState('')
    const [passwords, setPasswords] = useState('')
    const [newpasswords, setNewpasswords] = useState('')
    const [seedValue, setSeedValue] = useState('')
    const [loadings, setLoadings] = useState(false);
    
    const Navigate = useNavigate();
    const outWalletRouter = () => {
      Navigate('/Wallet')
    };
    const WalletHomeRouter = () => {
        Navigate('/WalletHome')
      };
    const printFile=(file)=> {
        var reader = new FileReader();
        reader.onload = evt => {
            setFilesContent(evt.target.result);
        };
        reader.readAsText(file);
      };
    const FileProps = {
        name: 'file',
        action: '',
        headers: {
          authorization: 'authorization-text',
        },
      
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            setFileName(info.file.name);
            printFile(info.file.originFileObj);
          }
        //   if (info.file.status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully`);
        //   } 
        },
      };
      const PassClick=(e)=>{
        setPasswords(e.target.value);
      }
      const newPassClick=(e)=>{
        setNewpasswords(e.target.value);

      }
      const ConfirmLogin= async()=>{
        setLoadings(true)
        if(!filesContent){
            message.error(`Not upload File!`);
            setLoadings(false)
            return;
        }
        if(!passwords){
            message.error(`Wrong Password！`);
             setLoadings(false)
            return;
        }
        let ps4 = {
            'json':JSON.parse(filesContent),
            'newPass':passwords
          }
          await postWallet(1,'pol.jsonRestore',ps4).then(res=>{
              if(res){
                dispatch(setAccount(JSON.parse(filesContent).address))
                Navigate('/WalletHome')
             }else{
                message.error(`Password mistake！`);
                setLoadings(false)
             }
          });
      
      }
      const CreatWallet = async (genesisHash, name, seed, address, oldpasswd) => {
        const data = {
            genesisHash,
            name,
            seed,
            address,
            oldpasswd,
        };
        await postWallet(1, 'pol.saveAccountsCreate', data).then(res => {
            // console.log(res)
            if (res) {
            Navigate('/WalletHome')            
            }
        });
    }
      const seed=(e)=>{
          console.log(e.target.value)
        setSeedValue(e.target.value)
      }
    const Secret=async()=>{
        if(!newpasswords){
            message.error(`Wrong Password！`);
            return;
        }
        let ps2={
            mnemonic:seedValue,
          } 
        postWallet(1,'pol.seedCreateAddress',ps2).then(res=>{
            let genesisHash = '';
            CreatWallet(genesisHash, 'xxx', res.seed, res.address, newpasswords)
            dispatch(setAccount(res.address))
            dispatch(setAddress(res.address))
            dispatch(setethAddress(res.ethaddress))

        });
    }
    return (
        <div className="LoginWallet" >
            <div className='top_'>
                <img onClick={outWalletRouter} src={Top}></img>
                <span>Log in Wallet</span>
            </div>
            <div className='LoginWallet_c'>
                <ul>
                    <li onClick={()=>{
                        setTabType(true)
                    }}
                    >
                        <span  className={tabType?'active':''} >Secret Phrase</span>
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
                        <TextArea onChange={seed} rows={6}  ></TextArea>
                        <div className='_password'>
                         <span>New password</span>
                        <Input type='password'  placeholder='PassWord' onChange={newPassClick}></Input>
                        </div>
                        <div className='Confirm_c'>
                            {/* <Button className='Cancel'>Cancel</Button> */}
                            <Button onClick={Secret} className='Confirm'>Confirm</Button>
                        </div>
                </div>

                <div  className={!tabType?'active':'key'}>
                <div className='Uploads'>
                 <Input disabled placeholder='File Name' value={fileName}></Input>
                <Upload {...FileProps} >
                    <Button className='Upload_B'>Select File</Button>
                </Upload>
                </div>
                <div className='_password'>
                    <span>Enter password</span>
                    <Input type='password'  placeholder='PassWord' onChange={PassClick}></Input>
                </div>
                <div className='Confirm_c'>
                    <Button loading={loadings}  onClick={()=>ConfirmLogin()} className='Confirm' >Confirm</Button>
                </div>
                </div>

            </div>
            <SuperChain></SuperChain>
        </div>

    )
}
const mapDispatchToProps = () => {
    return {
        setAccount,
        setSeed,
        setethAddress
    }
}
export default connect(mapDispatchToProps)(LoginWallet)
