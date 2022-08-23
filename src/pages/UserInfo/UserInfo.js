import React from "react";
import './UserInfo.scss';
//react-redux
import { connect ,useDispatch, useSelector} from 'react-redux';
import { setAge,setName } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import Top from '../../images/router.png';
import File from '../../images/file.png';
import not from '../../images/not.png';
import logout from '../../images/logout.png';
import upload from '../../images/upload.png';

import { Button,Select } from 'antd';
const { Option } = Select;

const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

const UserInfo = () => {

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
            <p>Address：5FUCy...uMaq <img src={File}></img></p>
            </div>
            <div  className='not'>
                <img src={not}></img>
                <img src={upload}></img>
                <img src={logout}></img>
            </div>
            </div>

            </div>
      
    )
}
const mapDispatchToProps= () =>{ 
    return {
        setAge, setName 
    }
}
export default connect(mapDispatchToProps)(UserInfo)
