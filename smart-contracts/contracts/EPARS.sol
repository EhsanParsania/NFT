// SPDX-License-Identifier: GPL-3.0

import "./ERC20.sol";

pragma solidity ^0.8.0;

contract EPARS is ERC20 {
    address public owner;

    constructor() ERC20("epars", "EPARS") {
        _mint(msg.sender, 69000000 * 10**18);
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can mint !");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function transfer(address _to, uint256 _amount)
        public
        override
        returns (bool success)
    {
        _transfer(owner, _to, _amount);
        return true;
    }
}
