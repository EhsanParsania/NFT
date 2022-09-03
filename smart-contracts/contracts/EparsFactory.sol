// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EparsFactory {
    IERC20 public tokenAddress;
    address public factoryOwner;
    uint256 public nftCount = 0;

    mapping(uint256 => NFT) public allNFTs;

    constructor(IERC20 _tokenAddress) {
        factoryOwner = msg.sender;
        tokenAddress = _tokenAddress;
    }

    struct NFT {
        uint256 _id;
        string base64Photo;
    }

    modifier onlyfactoryOwner() {
        require(msg.sender == factoryOwner);
        _;
    }

    function sendGift(address _to, uint256 _amount)
        external
        onlyfactoryOwner
        returns (bool success)
    {
        tokenAddress.transfer(_to, _amount);
        return true;
    }

    function getBalance(address _owner)
        external
        view
        returns (uint256 balance)
    {
        return tokenAddress.balanceOf(_owner);
    }

    function mintNFT(string memory base64Photo) public {
        allNFTs[nftCount] = NFT(nftCount, base64Photo);
        incrementCount();
    }

    function incrementCount() internal {
        nftCount += 1;
    }
}
