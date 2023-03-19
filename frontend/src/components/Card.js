import { CryptoCards, Button } from '@web3uikit/core';

export const Card = () => (
    <>
        <CryptoCards
            chain="ethereum"
            bgColor="blue"
            chainType="Network"
            onClick={console.log}
        />
        <Button theme="primary" type="button" text="Launch Dapp" />
    </>
);