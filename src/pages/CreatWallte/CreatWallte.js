import React, { useState, useEffect ,createContext} from "react";
import './CreatWallte.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAccount, setName } from '../../store/action';
import SuperChain from '../SuperChain/SuperChain';
import { useNavigate } from 'react-router-dom';
import Top from '../../images/router.png';
import Warring from '../../images/warring.png';
import CreatWalletFile from '../CreatWalletFile/CreatWalletFile'
import Pc from '../../images/pc.png';
import { Button, Select, message } from 'antd';
import { postWallet, initWallet } from '../../api/walletManager';
const { knownGenesis, handle, cryptoWaitReady } = require('../../api/polkadot');

const { Option } = Select;
// const {   knownGenesis,handle,cryptoWaitReady } = require('../../api/polkadot');
export const CreatWalletContext = createContext({});
function CreatWallte(props) {
    console.log(props)
    const { setAccount, dispatch } = props
    const Navigate = useNavigate();
    const outWalletRouter = (props) => {
        console.log(props)
        Navigate('/Wallet')
    };
    useEffect(() => {
        initWallet(1)
    }, [])
    const [passwords, setPasswords] = useState('');
    const [passwordv, setPasswordv] = useState('');
    const [styleHiden, setStyleHiden] = useState(false);
    const [seed, setSeed] = useState(false);

    const creatAccount = () => {
        if (passwords == passwordv && passwords !== '') {
            postWallet(1, 'pol.mnemonicGenerate', {}).then(res => {
                postWallet(1, 'pol.seedCreateAddress', { res }).then(res => {
                    dispatch(setAccount(res.address))
                    setSeed(res.seed)
                    let genesisHash = knownGenesis.acala[0];
                    CreatWallet(genesisHash, 'xxx', res.seed, res.address, passwordv)
                })
            });
        }
        else {
            message.error('Failed to set password !');
        }

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
            console.log(res)
            if (res) {
                setStyleHiden(res)
            }
        });
    }
    const password = (value) => {
        console.log(value.target.value)
        setPasswords(value.target.value)
    }
    const password_void = (value) => {
        setPasswordv(value.target.value)
        console.log(value.target.value)

    }
    return (

        <div className="CreatWallet" >
            <div className='top_'>
                <img onClick={outWalletRouter} src={Top}></img>
                <span>Create wallet</span>
            </div>
            <div className={!styleHiden?'CreatWallet_c':'singe'}>
                <div className='networks'>
                    <p><img src={Pc}></img><span>Select Networks</span></p>
                    <Select className='select_main' defaultValue="Polkadot">
                        <Option value="jack">Polkadot</Option>
                    </Select>
                </div>

                <from>
                    <p>New Password</p>
                    <input type='password' placeholder='Pass Word' onChange={password}></input>
                    <p>Confirm password</p>
                    <input type='password' placeholder='Pass Word' onChange={password_void}></input>
                    <h6><img src={Warring}></img>Keep your own password and avoid sharing it to anyone.</h6>
                    <div className='Confirm_c'>
                        {/* <Button className='Cancel'>Cancel</Button> */}
                        <Button onClick={creatAccount} className='Confirm'>Confirm</Button>
                    </div>
                </from>
            </div>
            <CreatWalletContext.Provider
                value={{
                    seed: seed,
                    password:passwordv
                }}
            >
                {
                    styleHiden?<CreatWalletFile></CreatWalletFile>:''
                }
            </CreatWalletContext.Provider>
            <SuperChain></SuperChain>
        </div>

    )
}
const mapDispatchToProps = () => {
    return {
        setAccount
    }
}
export default connect(mapDispatchToProps)(CreatWallte)
