// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract Emmanuelcoin is ERC20 {
    constructor() ERC20("Emmanuelcoin", "EMT") {
        _mint(msg.sender, 10 * 10 ** 18);
    }

    function withdrawCoinShare() external {
        _transfer(address(this), msg.sender, 1 * 10 ** 18);
    }
}
