import Menu from './Menu';
import 'antd/dist/antd.css';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import routers from "../router/routers";
import Header from './Header'
import styled from 'styled-components';
import dfstyles from '../style/style';

const _windowwrap = styled.div`
  width: 100%;
  height: 100%;
  // background: ${dfstyles.colors.background};
  position: relative;
`;

function WindowWrapper() {

  return (
    <div className="App">
     <Header></Header>
      <div className='main'>
        <Menu></Menu>
        <div className='routers'>
            <Router>
                <Routes>
                    {
                        routers.map((item,index)=>{
                          console.log(item)
                            return (
                                <Route key={index} path={item.path} exact={item.exact} element={<item.component></item.component>}></Route>
                            )
                        })
                    }
                </Routes>
            </Router>
        </div>
        {/* <Routes></Routes> */}
      </div>
    </div>
  );
}

export default WindowWrapper;
