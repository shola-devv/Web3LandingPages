// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// use import for environments where needed import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract Emmanuelcoin is ERC20 {
    constructor() ERC20("Emmanuelcoin", "EMT") {
         _mint(address(this), 10 * 10 ** 18);
    }

    function withdrawCoinShare() external {
        _transfer(address(this), msg.sender, 1 * 10 ** 18);
    }
}

// contract address = 0xD24c00b7a90b2e8Db9Bf28e4F3b55375d9968C3c
//deployed on sepolia testnet