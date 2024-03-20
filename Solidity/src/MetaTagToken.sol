// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @notice Import ERC20 token contract
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title MetaTagToken Contract based on ER20
contract MetaTagToken is ERC20 {

    // Public variable to store the owner's address
    address public owner;

    // Event emitted when tokens are purchased
    event eventBuyTokens(address indexed user, uint amount);

    /// @notice Constructor to initialize the contract
    constructor() ERC20("MetaTag", "MTG") {
        // Set the contract owner to the sender of the transaction
        owner = msg.sender;
        // Mint the maximum token supply and assign them to the owner (1 billion tokens with 18 decimals)
        _mint(owner, 1e9 * 1e18);
    }

    /// @notice Modifier to restrict access to owner
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner!");
        _;
    }

    /// @notice Function to buy tokens with ETH, validators and companies use this function to participate in the DApp
    function buyTokens() public payable {
        /// @dev Require that ETH is sent along with the transaction
        require(msg.value > 0, "You need to send ETH to buy tokens!");
        // Calculate the number of tokens to buy based on the sent ETH, in this case 1 ETH = 1000 MTG
        uint tokensToBuy = msg.value * 1e3;
        /// @dev Ensure that the contract owner has enough tokens to sell
        require(tokensToBuy <= balanceOf(owner), "Not enough ETH to buy!");
        // Transfer tokens from the contract owner to the sender
        _transfer(owner, msg.sender, tokensToBuy);
        // Emit an event to notify the purchase of tokens
        emit eventBuyTokens(msg.sender, tokensToBuy);
    }

    /// @notice Function that the owner can use to withdraw the ETH from the smart contract
    function withdrawETH() public onlyOwner {
        /// @dev Ensure there is ETH available to withdraw
        require(address(this).balance > 0, "No ETH to withdraw!");
        // Transfer ETH from the contract to the owner
        payable(owner).transfer(address(this).balance);
    }

    /// @notice Function that terminates the smart contract
    function terminate() public onlyOwner() {
        /// @dev Destroy the contract and transfer any remaining Ether balance to the owner
        // Deprecated but there is no alternative at this moment
        selfdestruct(payable(owner));
    }
}