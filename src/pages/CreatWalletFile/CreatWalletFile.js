import React from "react";
import './CreatWalletFile.scss';
import { connect ,useDispatch, useSelector} from 'react-redux';
import { setAge,setName } from '../../store/action';
import SuperChain from '../SuperChain/SuperChain'
import Top from '../../images/router.png';
import Warring from '../../images/warring.png';
import { Button } from 'antd';
import files from '../../images/file.png';
import down from '../../images/dowload.png';

function CreatWalletFile() {
    return (
        <div className="CreatWalletFile" >
            <div className='top_'>
                <img src={Top}></img>
                <span>Private Key</span>
            </div>
            <div className='CreatWallet_c'>
            <from>
                <p><input placeholder='Private Key'></input> <img src={files}></img></p>
                <p><input  placeholder='Download Keyfile'></input> <img src={down}></img></p>
                <h6><img src={Warring}></img>Note: Never disclose this private key.</h6>
                <div className='Confirm_c'>
                <Button className='Confirm'>Confirm</Button>
                </div>
            </from>
            </div>
            </div>
      
    )
}
const mapDispatchToProps= () =>{ 
    return {
        setAge, setName 
    }
}
//Link building rudux
export default connect(mapDispatchToProps)(CreatWalletFile)
