// SPDX-License-Identifier: GPL-3.0

import "./ERC20.sol";

pragma solidity ^0.8.0;

contract EhpToken is ERC20 {
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {
    }
}
