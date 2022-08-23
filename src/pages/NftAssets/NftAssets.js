import React from 'react';
import search from '../../images/search.png';
export const NftAsset=()=>{
    return (
        <div style={{width:'100%',paddingTop:'100px',paddingBottom:'100px'}}>
            <img  style={{width:'113px',display:'block',margin:'0 auto'}} src={search}></img>
            <p style={{fontSize:'20px',color: '#FFFFFF',textAlign:'center',paddingTop:'14px'}}>
            Please switch to<br></br>
            Kusama network to view NFT assets
            </p>
        </div>
    )
}