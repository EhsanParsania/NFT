// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./EPARS.sol";

contract EparsFactory is EPARS {
    address public factoryOwner;

    constructor() {
        factoryOwner = msg.sender;
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
        EPARS.transfer(_to, _amount);
        return true;
    }
}
