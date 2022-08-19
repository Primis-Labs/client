import { Button, Checkbox, Form, Input } from 'antd';
import React,{useState,useEffect} from 'react';
import './Home.scss';
const Home = () => {
  const [count,setCount]=useState(0)
  const onFinish = () => {
    setCount(count+1)
  };
  useEffect(()=>{
    //post
    document.title=` ${count} `;
  },[count])

  return (
    <div>
      <Button  onClick={onFinish}>Home</Button>
      <p>{count}</p>
    </div>
  );
};

export default Home;