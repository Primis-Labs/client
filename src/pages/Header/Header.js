import React from "react";
import dfstyles from '../../style/style';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { connect} from 'react-redux';
import './Header.scss';
import {SearchIcon} from '../../style/iconfont'
//引入react-redux
function Header(props) {
  const {age,name} =props;
  console.log(age)
  const onSearch = (value) => console.log(value);
    return (
      <div className='header'>
          <span>{name}</span>
          <Input className="Search_Input"  placeholder="Search" value={age} prefix={<SearchIcon />} />
        </div>
    )
}  
const mapStateToProps=(state)=>{
  console.log(state)
  return {age:state.age,name:state.name}
}
export default connect(mapStateToProps)(Header)