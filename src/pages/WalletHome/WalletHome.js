import React, { useState, useEffect } from "react";
import './WalletHome.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAccount, setSeed ,setUserimg} from '../../store/action';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo'
import tabActive from '../../images/tba_active.png';
import Nft_IMG from '../../images/nft.png';
import Set_IMG from '../../images/set.png';
import { NftAsset } from '../NftAssets/NftAssets'
import { Button, Spin ,message,Pagination} from 'antd';
import { postWallet } from '../../api/walletManager';
import { knownSubstrate } from '../../api/network';
import Dot_IMF from '../../images/dot.png';
import Ksm_Img from '../../images/ksm.png';
import aca_Img from '../../images/aca.png';
import astr_Img from '../../images/astr.png';
import gkmr_Img from '../../images/gkmr.png';

const { UserService }  = require("../../store/user_service");

const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const WalletHome = (props) => {
    const { account, keys, setUserimg ,address,ethAddress} = props;
    const [tabType, setTabType] = useState(true);
    const [previousFrees, setPreviousFrees] = useState();
    const [tokenName, setTokenName] = useState();
    const [tokenNumber, setTokenNumber] = useState();
    const [lodingL, setLodingL] = useState(true);
    const [totals, setTotals] = useState(1);

    const [nftRecord, setNftRecord] = useState([]);
    const [rmrks, setRmrks] = useState(2);
    const Navigate = useNavigate();
    const Recieve_click = (send) => {
        Navigate('/AssetsTabs', { state: { datas: send }, replace: true })
    };
    const RecordBtn = () => {
        Navigate('/sendRecord')
    }
    const Nft_click = (images,send,id) => {
        Navigate('/NftTabs',{state:{images:images,datas:send,rmrks:rmrks,id:id},replace:true})
    };
    const pageChange=(value)=>{
        GetNfts(rmrks,value)
    }
    const setAvatar=(url)=>{
        console.log(url)
        var obj = {
            address:account,
            img:url,
            createTime:new Date(),
          }
          var indexdb = new UserService();
          var r = indexdb.updateByAddress(account,obj);
          message.success('Avatar changed successfully！');
          setUserimg(url)
    }
    const GetNfts=(type,page)=>{
        let ps4 = {
            address:address,
            rmrk:type,
            page:page
        }
        postWallet(1, 'pol.nftByAddress', ps4).then(res => {
            if(res.data.data){
                const nftData = res.data.data.nfts
                nftData.map(item => {
                    // console.log(item)
                    item.metadata_image = 'https://' + item.metadata_image.slice(11, item.metadata_image.length) + '.ipfs.cf-ipfs.com'
                })
                // console.log(nftData)
                setNftRecord(nftData)
                setTotals(res.data.data.nfts_aggregate.aggregate.count)
            }else {
                setNftRecord([])
            }
         
        }).catch(err => {
        })
    }
    const GetBlance = () => {
        // console.log(account)
        knownSubstrate.map(async (item) => {
            if (keys == item.prefix) {
                setTokenName(item.displayName)

                if(keys==1284){
                    const ps2 = {
                        address: ethAddress,
                        chain: item.rpc
                    }
                    setLodingL(true)
                    let { data: { free: previousFree }, nonce: previousNonce } = await postWallet(1, 'pol.balance', ps2)
                    //  console.log(`${previousFree}`)
                    setLodingL(false)
                    setTokenNumber(`${previousFree}`)
                    setPreviousFrees(`${previousFree}` / item.decimals)
                }else{

                const ps2 = {
                    address: account,
                    chain: item.rpc
                }
                //   =
                setLodingL(true)
                let { data: { free: previousFree }, nonce: previousNonce } = await postWallet(1, 'pol.balance', ps2)
                //  console.log(`${previousFree}`)
                setLodingL(false)
                setTokenNumber(`${previousFree}`)
                setPreviousFrees(`${previousFree}` / item.decimals)
                //    })
            }
            }
        })
    
    }
    const rmrk=(type)=>{
        setRmrks(type)
        GetNfts(type,1);

    }
    useEffect(() => {
        setNftRecord([]);
        GetBlance();
        GetNfts(2,1);

    }, [keys])
    return (
        <div className="WalletHome" >
            <UserInfo></UserInfo>
            <div className='LoginWallet_c'>
                <ul className='tabs'>
                    <li onClick={() => {
                        setTabType(true)
                    }}
                    >
                        <span className={tabType ? 'active' : ''} >Assets</span>
                        <img className={tabType ? 'active' : ''} src={tabActive}></img>
                    </li>
                    <li onClick={() => {
                        setTabType(false)
                    }}>
                        <span className={!tabType ? 'active' : ''} >NFTs</span>
                        <img className={!tabType ? 'active' : ''} src={tabActive}></img>
                    </li>
                    <Button  onClick={RecordBtn} className={tabType ? 'RecordBtn':'key'}>Records</Button>
                </ul>

                <div className={tabType ? 'active' : 'key'}>
                    <ul className='Assets_record'>
                    <div className={lodingL?'Spin_modal':'key'}>
                    <Spin></Spin>
                    </div>
                        <li className='title'>
                            <p>Tokens</p>
                            <p>Amount</p>
                            <p></p>
                        </li>
                        <li>
                            <p className={keys=='0'?'':'tokenHidden'}><img src={Dot_IMF}></img></p>
                            <p className={keys=='2'?'':'tokenHidden'} ><img src={Ksm_Img}></img></p>
                            <p className={keys=='10'?'':'tokenHidden'} ><img src={aca_Img}></img></p>
                            <p className={keys=='5'?'':'tokenHidden'} ><img src={astr_Img}></img></p>
                            <p className={keys=='1284'?'':'tokenHidden'} ><img src={gkmr_Img}></img></p>
                            <p className={keys=='172'?'':'tokenHidden'} ><img src={Ksm_Img}></img></p>
                            <p>{previousFrees && previousFrees.toFixed(4)}</p>
                            <p>
                                <Button onClick={()=>Recieve_click('1')} className='button'>Recieve</Button>
                                <Button onClick={()=>Recieve_click('2')} className='button'>Send</Button>
                            </p>
                        </li>
                    </ul>
                </div>
                <div className={!tabType ? 'active' : 'key'}>
                    <div className='Nft'>
                        <Button className={rmrks==1?'nftTab':'olds'} onClick={()=>rmrk(1)}>RMRK 1</Button>
                        <Button className={rmrks==2?'nftTab':'olds'}  onClick={()=>rmrk(2)}>RMRK 2</Button>
                        <ul className='Nft_ul'>

                            {
                              nftRecord.map((item, index) => {

                                    return <li key={index}>
                                        <div className='setings'>
                                            <img src={Set_IMG}></img>
                                            <div className='setting_l'>
                                                <p onClick={()=>setAvatar(item.metadata_image)}>Set to avatar</p>
                                                <p>NFT Market</p>
                                            </div>
                                        </div>
                                        <img className='bg' src={item.metadata_image ? item.metadata_image : Nft_IMG}></img>
                                        <p className='seting_btn'>
                                            <Button onClick={() => Nft_click(item.metadata_image,1,item.id)} className='btn Recieve'>Recieve</Button>
                                            <Button onClick={() => Nft_click(item.metadata_image,2,item.id)} className='btn'>Send</Button>
                                        </p>
                                    </li>
                                })
                            }
                             {nftRecord.length==0 ? <NftAsset /> : null}
                        </ul>
                        <Pagination className='pages' onChange={pageChange} defaultCurrent={1} total={totals} />
                    </div>
                </div>

            </div>

        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUserimg:(url) => dispatch(setUserimg(url)),
    }
}
const mapStateToProps = (state) => {
    console.log(state.account)
    return {
        account: state.account,
        keys: state.keys,
        address:state.address,
        ethAddress:state.ethAddress

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WalletHome)
