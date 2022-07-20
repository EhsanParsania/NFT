// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./EPARS.sol";

contract EparsFactory is EPARS {
    address public factoryOwner;

    constructor() {
        factoryOwner = msg.sender;
    }
}
