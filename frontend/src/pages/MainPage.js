import * as React from 'react';
import { MainLayer } from '../layers/MainLayer';
import { NFTCard } from '../components';
import { getNFT, lastNFTId } from '../blockchain/NFT';

export function MainPage() {
    const [nfts, setNfts] = React.useState([]);

    React.useEffect(() => {
        getNFTs();
    }, []);

    const getNFTs = async () => {
        try {
            const lastId = await lastNFTId();
            const nfts = [];
            for (let i = 0; i <= lastId; ++i) {
                const nft = await getNFT(i);
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
            <main id='content'>
                {
                    nfts.map((nft, index) => {
                        return <NFTCard key={index} nft={nft} />
                    })
                }
            </main>
        </>
    );
}
