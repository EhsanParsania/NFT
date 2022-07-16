// SPDX-License-Identifier: GPL-3.0

import "./ERC20.sol";

pragma solidity ^0.8.0;

contract EhpToken is ERC20 {
    address public admin;

    constructor() ERC20("epars", "EPARS") {
        _mint(msg.sender, 69000000 * 10**18);
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, "Only admin can mint !");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
