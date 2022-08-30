import React, { useState, useEffect } from "react";
import './WalletHome.scss';
//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAccount, setSeed } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo'
import tabActive from '../../images/tba_active.png';
import Dot_IMF from '../../images/dot.png';
import Nft_IMG from '../../images/nft.png';
import Set_IMG from '../../images/set.png';
import { NftAsset } from '../NftAssets/NftAssets'
import { Button, Spin } from 'antd';
import { postWallet } from '../../api/walletManager';
import { knownSubstrate } from '../../api/network'

const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const WalletHome = (props) => {
    const { account, setAccount, keys } = props;
    const [tabType, setTabType] = useState(true);
    const [previousFrees, setPreviousFrees] = useState();
    const [tokenName, setTokenName] = useState();
    const [tokenNumber, setTokenNumber] = useState();
    const [lodingL, setLodingL] = useState(true);

    const [nftRecord, setNftRecord] = useState([]);
    const Navigate = useNavigate();
    const Recieve_click = (send) => {
        console.log(send)
        Navigate('/AssetsTabs', { state: { datas: send }, replace: true })
    };
    const RecordBtn = () => {
        Navigate('/sendRecord')
    }
    const Nft_click = (props) => {
        console.log(props)
        // Navigate('/NftTabs',{state:{datas:props},replace:true})
    };
    const GetBlance = () => {
        knownSubstrate.map(async (item) => {
            if (keys == item.prefix) {
                setTokenName(item.displayName)
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
        })
        let ps4 = {
            address: 'EJJuXJGycFmy6e7ePJVEU57hmLAgiB1y5RFfguo61fgTU9A',
        }
        postWallet(1, 'pol.nftByAddress', ps4).then(res => {
            const nftData = res.data
            nftData.map(item => {
                console.log(item)
                item.metadata_image = 'https://' + item.metadata_image.slice(11, item.metadata_image.length) + '.ipfs.cf-ipfs.com'
            })
            console.log(nftData)
            setNftRecord(nftData)
        }).catch(err => {
        })
    }
    useEffect(() => {
        GetBlance()

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
                        <span className={!tabType ? 'active' : ''} >NFT</span>
                        <img className={!tabType ? 'active' : ''} src={tabActive}></img>
                    </li>
                    <Button  onClick={RecordBtn} className={tabType ? 'RecordBtn':'key'}>Record</Button>
                </ul>

                <div className={tabType ? 'active' : 'key'}>
                    <ul className='Assets_record'>
                    <div className={lodingL?'Spin_modal':'key'}>
                    <Spin></Spin>
                    </div>
                        <li className='title'>
                            <p>Token</p>
                            <p>Amount</p>
                            <p></p>
                        </li>
                        <li>
                            <p>{tokenName}</p>
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
                        <ul className='Nft_ul'>

                            {
                                nftRecord.map((item, index) => {

                                    return <li key={index}>
                                        <div className='setings'>
                                            <img src={Set_IMG}></img>
                                            <div className='setting_l'>
                                                <p>Set to avatar</p>
                                                <p>NFT Market</p>
                                            </div>
                                        </div>
                                        <img className='bg' src={item.metadata_image ? item.metadata_image : Nft_IMG}></img>
                                        <p className='seting_btn'>
                                            <Button onClick={() => Nft_click(item.metadata_image)} className='btn Recieve'>Recieve</Button>
                                            <Button onClick={() => Nft_click(item.metadata_image)} className='btn'>Send</Button>
                                        </p>
                                    </li>
                                })

                            }


                            {/* <NftAsset></NftAsset> */}

                        </ul>

                    </div>
                </div>

            </div>

        </div>
    )
}
const mapDispatchToProps = () => {
    return {
        setAccount, setSeed
    }
}
const mapStateToProps = (state) => {
    console.log(state.account)
    return {
        account: state.account,
        keys: state.keys
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WalletHome)
