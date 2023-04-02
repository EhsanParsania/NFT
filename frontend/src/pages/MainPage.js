import * as React from 'react';
import { MainLayer } from '../layers/MainLayer';
import { NFTCard } from '../components';
import { getNFT, lastNFTId } from '../blockchain/NFT';

export function MainPage() {
    const [nfts, setNfts] = React.useState([]);

    React.useEffect(() => {
        getNFTs();
    }, []);

    const getAddress = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        return account;
    };

    const getNFTs = async () => {
        const account = await getAddress();
        try {
            const lastId = await lastNFTId();
            const nfts = [];
            for (let i = 0; i <= lastId; ++i) {
                const nft = await getNFT(i);
                nft.owner = account;
                if (!nft.image_data) continue;
                nfts.push(nft);
            }
            setNfts(nfts);
            console.log(nfts);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <MainLayer />
            <div className='nft-container'>
                <h1 className='main-page-title'>NFT Marketplace</h1>
                <div className='nft-box'>
                    {/* <main id='content'> */}
                        {
                            nfts.map((nft, index) => {
                                return <NFTCard key={index} nft={nft} number={index} />
                            })
                        }
                    {/* </main> */}
                </div>
            </div>
        </>
    );
}
