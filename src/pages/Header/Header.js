import React from "react";
import dfstyles from '../../style/style';
import { SearchOutlined,ArrowLeftOutlined,ArrowRightOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { connect} from 'react-redux';
import './Header.scss';
import {SearchIcon} from '../../style/iconfont'
function Header(props) {
  const {age,name} =props;
  // console.log(age)
  const onSearch = (value) => console.log(value);
    return (
      <div className='header'>
          {/* <ArrowLeftOutlined className='outIcon' />
          <ArrowRightOutlined className='outIcon'  /> */}
          <Input className="Search_Input"  placeholder="Http://" value={age} prefix={<SearchIcon />} />
        </div>
    )
}  
const mapStateToProps=(state)=>{
  return {age:state.age,name:state.name}
}
export default connect(mapStateToProps)(Header)