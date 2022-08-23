import React from "react";
import './CreatWallte.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAge, setName } from '../../store/action';
import SuperChain from '../SuperChain/SuperChain';
import { useNavigate } from 'react-router-dom';
import Top from '../../images/router.png';
import Warring from '../../images/warring.png';
import CreatWalletFile from '../CreatWalletFile/CreatWalletFile'
import Pc from '../../images/pc.png';
import { Button, Select } from 'antd';
import {postWallet} from '../../api/walletManager';
const { Option } = Select;
// const {   knownGenesis,handle,cryptoWaitReady } = require('../../api/polkadot');

function CreatWallte() {
    console.log(postWallet)
    const Navigate = useNavigate();
    const outWalletRouter = (props) => {
        console.log(props)
        Navigate('/Wallet')
    };
    return (
        <div className="CreatWallet" >
            <div className='top_'>
                <img onClick={outWalletRouter} src={Top}></img>
                <span>Create wallet</span>
            </div>
            <div className='CreatWallet_c'>
                <div className='networks'>
                    <p><img src={Pc}></img><span>Select Networks</span></p>
                    <Select className='select_main' defaultValue="Polkadot">
                        <Option value="jack">Polkadot</Option>
                    </Select>
                </div>

                <from>
                    <p>New Password</p>
                    <input></input>
                    <p>Confirm password</p>
                    <input></input>
                    <h6><img src={Warring}></img>Keep your own password and avoid sharing it to anyone.</h6>
                    <div className='Confirm_c'>
                        <Button className='Cancel'>Cancel</Button>
                        <Button className='Confirm'>Confirm</Button>
                    </div>
                </from>
            </div>

            <CreatWalletFile></CreatWalletFile>
            <SuperChain></SuperChain>

        </div>

    )
}
const mapDispatchToProps = () => {
    return {
        setAge, setName
    }
}
export default connect(mapDispatchToProps)(CreatWallte)
