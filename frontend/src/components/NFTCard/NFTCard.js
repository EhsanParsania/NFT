import React from 'react';
import './NFTCard.css';
import { Hash } from '../Hash';

const NFTCard = ({ nft, number }) => {
    const { image_data, name, owner, price = 2 } = nft;
    const randomPrice = (Math.random() * 2).toFixed(2);
    return (
        <div className="nft-card">
            <img className="nft-image" src={image_data} alt={name} />
            <div className="nft-content">
                <h3 className="nft-title">#{number}</h3>
                <hr />
                <div className="nft-metadata">
                    <span className="nft-owner">Owner</span> <Hash hash={owner} shorten={5} clickable={true} mode='address' className={'hash-component'}/>
                </div>
                <div className="nft-metadata">
                    <span className="nft-price">Price </span> <span>{randomPrice} ETH</span>
                </div>
                <button className='buy-nft'>Buy Now</button>
            </div>
        </div>
    );
};

export { NFTCard };
