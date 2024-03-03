// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Solidity version

import "src/MetaTagToken.sol";
import "forge-std/test.sol"; // Library for tests by Foundry
import "forge-std/Vm.sol"; // Library for Foundry vm
import "forge-std/console.sol"; // Library to print information on console

// The contract name does not require the "Test" word, but functions inside it require "test" to be executed
contract MetaTagTokenTest is DSTest {
    MetaTagToken private token;
    address private owner;
    address private user;
    Vm private vm = Vm(HEVM_ADDRESS); // Initialize the vm for tests
    
    // Function called to setup the environment for tests, all the functions under it can access these values
    function setUp() public {
        owner = address(0xB005); // Owner created
        user = address(0x2); // User created
        vm.startPrank(owner); // The next actions will be performed with owner
        token = new MetaTagToken(); // Deployment of the smart contract
        vm.stopPrank(); // After this action the owner will not perform anymore the actions
    }

    // Function to test initialization
    function testInitialSetup() public {
        assertEq(token.name(), "MetaTag"); // Check if correct name
        assertEq(token.symbol(), "MTG"); // Check if correct symbol
        assertEq(token.totalSupply(), 1e9 * 1e18); // Check if correct totalSupply
        assertEq(token.balanceOf(owner), 1e9 * 1e18); // Check if correct quantity to owner
    }

    // Function to test buyTokens
    function testBuyTokens() public {
        uint256 amountEth = 1 ether;
        uint256 expectedTokenAmount = amountEth / 0.001 ether * 1e18;
        vm.deal(user, amountEth); // In the virtualized environment, user receives the amountEth
        vm.startPrank(user); // The next actions will be performed with the specified user
        token.buyTokens{value: amountEth}(); // buyTokens function does not take in input any value, you only send ETH
        assertEq(token.balanceOf(user), expectedTokenAmount);
        console.log(token.balanceOf(user));
        vm.stopPrank();
    }

    // Function to test the ETH withdraw from the owner
    function testWithdrawETH() public {
        uint256 amountEth = 1 ether;
        vm.deal(user, amountEth); // In the virtualized environment, user receives the amountEth
        vm.startPrank(user); // The next actions will be performed with the specified user
        assertEq(address(user).balance, amountEth);
        token.buyTokens{value: amountEth}();
        assertEq(address(token).balance, amountEth); // Check if the smart contract receives the ETH
        assertEq(address(user).balance, 0); // Now the user has 0 ETH
        vm.stopPrank(); // User does not execute anymore the actions
        vm.deal(owner, amountEth); // In the virtualized environment, owner receives the amountEth
        vm.startPrank(owner); // The next actions will be performed with owner
        token.withdrawETH();
        assertEq(owner.balance, 2 ether);
        assertEq(address(token).balance, 0);
        vm.stopPrank();
    }

    // Function to test that only the owner can call the terminate function
    function testTerminate() public {
        vm.startPrank(user);
        vm.expectRevert("Only the owner can terminate the smart contract!"); // This function expects a revert and catches it
        token.terminate();
        vm.stopPrank();
        vm.startPrank(owner);
        token.terminate();
        vm.stopPrank();
    }
}
