// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Solidity version

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // Library for ERC20

contract MetaTagToken is ERC20 {
    address public owner;
    uint256 public constant MAX_SUPPLY = 1e9 * 1e18;  // 1 billion tokens (1e18 decimals)
    uint256 public constant TOKEN_PRICE_ETH = 0.001 ether; // Variable to calculate how many tokens from ETH 

    constructor() ERC20("MetaTag", "MTG") {
        owner = msg.sender;
        _mint(owner, MAX_SUPPLY);
    }

    // Function to buy tokens with ETH. "Payable" in this way the smart contract function can receive ETHs
    // Validators and companies need this function to partecipate
    function buyTokens() public payable {
        require(msg.value > 0, "You need to send ETH to buy tokens!");
        uint256 tokensToBuy = msg.value / TOKEN_PRICE_ETH * 1e18;
        require(tokensToBuy <= balanceOf(owner), "Not enough ETH to buy!");
        _transfer(owner, msg.sender, tokensToBuy); // Internal ERC20 function
    }

    // Function that the owner can use to withdraw the ETH from the smart contract
    function withdrawETH() public {
        require(msg.sender == owner, "Only the owner can withdraw ETH!");
        require(address(this).balance > 0, "No ETH to withdraw!");
        payable(owner).transfer(address(this).balance); // Payable so the owner can receive the ETHs
    }

    // Function that terminate the smart contract
    function terminate() public {
        require(msg.sender == owner, "Only the owner can terminate the smart contract!");
        selfdestruct(payable(owner)); // This is deprecated but I do not see alternatives in this moment
    }
}
