import { CryptoCards, Button } from '@web3uikit/core';

export const Card = () => (
    <>
        <CryptoCards
            chain='binance'
            bgColor='#000'
            chainType="Network"
            onClick={console.log}
        />
        <Button theme="primary" type="button" text="Launch Dapp" />
    </>
);