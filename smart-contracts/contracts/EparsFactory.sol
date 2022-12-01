// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";


contract EparsFactory is Context {
    IERC20 public tokenAddress;
    address public factoryOwner;

    mapping(uint256 => NFT) public allNFTs;

    constructor(IERC20 _tokenAddress) {
        factoryOwner = _msgSender();
        tokenAddress = _tokenAddress;
    }

    modifier onlyfactoryOwner() {
        require(_msgSender() == factoryOwner);
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

}
