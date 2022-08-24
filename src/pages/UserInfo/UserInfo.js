import React, { useState } from "react";
import './UserInfo.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAccount, setSeed } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import Top from '../../images/router.png';
import File from '../../images/file.png';
import not from '../../images/not.png';
import logout from '../../images/logout.png';
import upload from '../../images/upload.png';
import { Button, Select, message, Input } from 'antd';
import closeUrl from '../../images/close.png';
import keyDowload from '../../images/keyDowload.png';
import { postWallet } from '../../api/walletManager';

const { Option } = Select;
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const UserInfo = (props) => {
    const { account, setAccount } = props;
    const Navigate = useNavigate();
    const [tabType, setTabType] = useState(false);
    const [passFILE, setPassFILE] = useState(false);
    const [passType, setPassType] = useState(false);
    
    const copyAddress = () => {
        let copyContent = account;
        var input = document.createElement("input");
        input.value = copyContent;
        document.body.appendChild(input);
        input.select();
        document.execCommand("Copy");
        document.body.removeChild(input);
        message.success('Copy success message');
    };
    const logoutModal = () => {
        setTabType(true)
        setPassType(false);
    };
    const exportModal = () => {
        setPassType(true)
        setTabType(false);
    };
    const colseLogout = () => {
        setTabType(false);
        setPassType(false);
    };
    const logoutConfirm = () => {
        setAccount('')
        Navigate('/Wallet')
    };
    const PASS_FILE =(e)=>{
        setPassFILE(e.target.value)
    }
    const exportConfirm=async()=>{
        const ps2 = {
            'address':account,
            'newPass':passFILE
          }
         await postWallet(1,'pol.accountsExport',ps2).then(res=>{
          funDownload(JSON.stringify(res), `keyFile.json`);
        setPassType(false);
        });;
    }
    const funDownload = (content, filename) => {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement("a");
        eleLink.download = filename;
        eleLink.style.display = "none";
        // 字符内容转变成blob地址
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    };
    return (
        <div className="UserInfo" >
            <div className='user_wallet'>
                <img className='avatar' src={Top}></img>
                <div className='address_ehem'>
                    <Select className='select_main' defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    <p>Address：{account.slice(0, 4)}****{account.slice(account.length - 4, account.length)}<img onClick={copyAddress} src={File}></img></p>
                </div>
                <div className='not'>
                    <img src={not}></img>
                    <div className='upload'>
                        <img onClick={exportModal} src={upload}></img>
                        <div className={passType ? 'upload-c active_b' : 'upload-c'}>
                            <h6 onClick={colseLogout}><img src={closeUrl}></img></h6>
                                <p>
                                    <Input type='password' onChange={PASS_FILE} placeholder="Password"/>
                                </p>
                                <div className='dowLoad'>
                                    <Input  placeholder="Download Keyfile" disabled/>
                                    <img src={keyDowload}></img>
                                </div>
                                <a>Note: Never disclose this private key.</a>
                                <div className='Confirm_c'>
                                    <Button onClick={exportConfirm} className='Confirm'>Confirm</Button>
                                </div>
                        </div>
                    </div>
                    <div className='logOut'>
                        <img onClick={logoutModal} src={logout}></img>
                        <div className={tabType ? 'logOut-c active_b' : 'logOut-c'}>
                            <h6 onClick={colseLogout}><img src={closeUrl}></img></h6>
                            <p>Are you sure <br></br>
                                to log out wallet?</p>
                            <div className='Confirm_c'>
                                <Button className='Cancel'>Cancel</Button>
                                <Button onClick={logoutConfirm} className='Confirm'>Confirm</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )
}
const mapDispatchToProps = (dispatch) => { 
   return {
    setAccount:(account) => dispatch(setAccount(account)) 
    }
}
const mapStateToProps = (state) => {
    return { account: state.account }
}  
export default  connect(mapStateToProps,mapDispatchToProps)(UserInfo)
