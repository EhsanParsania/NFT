import { CryptoCards, Button } from '@web3uikit/core';

export const NFTCard = () => (
    <>
        <CryptoCards
            chain='binance'
            bgColor='#000'
            textColor="yellow"
            chainType="Network"
            onClick={console.log}
        />
        <Button theme="primary" type="button" text="Launch Dapp" />
    </>
);