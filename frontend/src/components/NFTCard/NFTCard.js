import React from 'react';
import './NFTCard.css';

const NFTCard = ({ nft }) => {
    const { imageUrl, title, address, owner, price } = nft;

    return (
        <div className="nft-card">
            <img className="nft-image" src={imageUrl} alt={title} />
            <div className="nft-content">
                <h3 className="nft-title">{title}</h3>
                <hr />
                <p className="nft-address">Address: {address}</p>
                <div className="nft-metadata">
                    <p className="nft-owner">Owner: {owner}</p>
                </div>
                <span className="nft-price">Price: {price} ETH</span> <button className='buy-nft'>Buy Now</button>
            </div>
        </div>
    );
};

export { NFTCard };
