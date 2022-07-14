// SPDX-License-Identifier: GPL-3.0

import "./ERC20.sol";

pragma solidity ^0.8.0;

contract EhpToken is ERC20 {
    address public admin;

    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {
        _mint(msg.sender, 69000000 * 10**18);
        admin = msg.sender;
    }

    function mint(address _to, uint256 amount) external {
        require(msg.sender == admin, "Only admin can mint !");
        _mint(_to, amount);
    }
}
