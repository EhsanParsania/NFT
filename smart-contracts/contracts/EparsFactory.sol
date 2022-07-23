// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract EparsFactory {
    address public factoryOwner;
    IERC20 public tokenAddress;

    constructor(IERC20 _tokenAddress) {
        factoryOwner = msg.sender;
        tokenAddress = _tokenAddress;
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
}
