import React,{useEffect,useState,useRef} from "react";
import './Brower.scss'
import { Tabs } from 'antd';

function Brower() {

    const initialItems = [

        {
          label: 'Brower',
          children: <webview id="foo" src='https://www.google.com/' preload='../../../preload.js'></webview>,
          key: '0',
        },
      ];
      console.log(initialItems)
      const [activeKey, setActiveKey] = useState(initialItems[0].key);
      const [items, setItems] = useState(initialItems);
      const newTabIndex = useRef(0);
      console.log(items)
      const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey);
      };
    
      const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({
          label: 'New Tab',
          children: <webview id="foo" src='https://www.google.com/' preload='../../../preload.js'></webview>,
          key: newActiveKey,
        });
        setItems(newPanes);
        setActiveKey(newActiveKey);
      };
    
      const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
          if (item.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
    
        if (newPanes.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newPanes[lastIndex].key;
          } else {
            newActiveKey = newPanes[0].key;
          }
        }
    
        setItems(newPanes);
        setActiveKey(newActiveKey);
      };
    
      const onEdit = (targetKey, action) => {
        if (action === 'add') {
          add();
        } else {
          remove(targetKey);
        }
      };


    useEffect(() => {
    const webview = document.querySelector('webview');
    const indicator = document.querySelector('.indicator')
    const loadstart = () => {
        indicator.innerText = 'loading...'
      }
      const loadstop = () => {
        indicator.innerText = ''
      }
      webview.addEventListener('did-start-loading', loadstart)
      webview.addEventListener('did-stop-loading', loadstop)
    }, [])
    return (

        <Tabs
        className='tabs'
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    //    <webview id="foo" src='https://www.google.com/' preload='../../../preload.js'></webview>
    )
}
 
export default Brower;