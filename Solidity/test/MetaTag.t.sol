// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Solidity version

import "src/MetaTag.sol";
import "src/MetaTagToken.sol";
import "forge-std/test.sol"; // Library for tests by Foundry
import "forge-std/Vm.sol"; // Library for Foundry vm
import "forge-std/console.sol"; // Library to print information on console

// The contract name does not require the "Test" word, but functions inside it require "test" to be executed
contract MetaTagTest is DSTest {
    MetaTag public tag;
    MetaTagToken public token;
    address public team;
    address private company;
    address private validator;
    address private user;
    Vm private vm = Vm(HEVM_ADDRESS); // Initialize the vm for tests

    // Function called to setup the environment for tests, all the functions under it can access these values
    function setUp() public {
        team = address(0xB005); // Owner created
        company = address(0x1); // Company address created
        validator = address(0x2); // Validator address created
        user = address(0x3); // User address created
        vm.startPrank(team); // The next actions will be performed with team
        token = new MetaTagToken(); // Deployment of the token smart contract
        tag = new MetaTag(address(token)); // Deployment of the main smart contract
        vm.stopPrank(); // After this action the team will not perform anymore the actions
    }

    // Function to check if the company can be whitelisted by the team
    function testCompanyWhitelist() public {
        vm.startPrank(user); // Next action will be executed as user
        vm.expectRevert("Not MTG Team!"); // This function expects a revert and catches it
        tag.whitelistCompany(company);
        vm.stopPrank(); // The actions will not anymore be executed as user
        vm.startPrank(team); // Next action will be executed as team
        tag.whitelistCompany(company);
        vm.stopPrank(); // The actions will not anymore be executed as team
    }

    // Function to check the company depositing tokens
    function testTokenCompany() public {
        vm.startPrank(team); // Next action will be executed as team
        tag.whitelistCompany(company);
        vm.stopPrank(); // The actions will not anymore be executed as team
        uint256 amountEth = 1 ether;
        vm.deal(company, amountEth); // In the virtualized environment, company receives the amountEth
        vm.startPrank(company); // Next action will be executed as company
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromCompany(1000 * 1e18);
        assertEq(token.balanceOf(company), 0);
        assertEq(tag.balanceCompanies(company), 1000 * 1e18);
        vm.stopPrank(); // The actions will not anymore be executed as company
    }

    // Function to check the depositing of companies and normal transfer
    function testActions() public {
        vm.startPrank(team); // Next action will be executed as team
        tag.whitelistCompany(company);
        vm.stopPrank(); // The actions will not anymore be executed as team
        uint256 amountEth = 1 ether;
        vm.deal(company, amountEth); // In the virtualized environment, company receives the amountEth
        vm.startPrank(company); // Next action will be executed as company
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromCompany(1000 * 1e18);
        vm.stopPrank(); // The actions will not anymore be executed as company
        vm.startPrank(team); // Next action will be executed as team
        token.transfer(company, 12);
        vm.stopPrank(); // The actions will not anymore be executed as team
        vm.startPrank(company); // Next action will be executed as company
        tag.receiveTokensFromCompany(11);
        vm.stopPrank(); // The actions will not anymore be executed as company
        assertEq(token.balanceOf(company), 1);
        assertEq(tag.balanceCompanies(company), 1000 * 1e18 + 11);
    }

    // Function to check the adding of videos by companies
    function testAddVideo() public {
        vm.startPrank(team); // Next action will be executed as team
        tag.whitelistCompany(company);
        vm.stopPrank(); // The actions will not anymore be executed as team
        address user1 = address(0x41);
        address user2 = address(0x42);
        address user3 = address(0x43);
        address user4 = address(0x44);
        address user5 = address(0x45);
        address user6 = address(0x46);
        address user7 = address(0x47);
        address user8 = address(0x48);
        address user9 = address(0x49);
        address user10 = address(0x50);
        address user11 = address(0x51);
        address user12 = address(0x52);
        address user13 = address(0x53);
        address user14 = address(0x54);
        address user15 = address(0x55);
        
        uint256 amountEth = 1 ether;

        vm.deal(user1, amountEth);
        vm.startPrank(user1);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user2, amountEth);
        vm.startPrank(user2);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user3, amountEth);
        vm.startPrank(user3);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user4, amountEth);
        vm.startPrank(user4);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user5, amountEth);
        vm.startPrank(user5);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user6, amountEth);
        vm.startPrank(user6);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user7, amountEth);
        vm.startPrank(user7);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user8, amountEth);
        vm.startPrank(user8);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user9, amountEth);
        vm.startPrank(user9);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user10, amountEth);
        vm.startPrank(user10);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user11, amountEth);
        vm.startPrank(user11);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user12, amountEth);
        vm.startPrank(user12);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user13, amountEth);
        vm.startPrank(user13);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user14, amountEth);
        vm.startPrank(user14);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.deal(user15, amountEth);
        vm.startPrank(user15);
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(100 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        vm.roll(10);
        vm.deal(company, amountEth); // In the virtualized environment, company receives the amountEth
        vm.startPrank(company); // Next action will be executed as company
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromCompany(1e18 * 600);
        tag.addVideo(12, 12000);
        vm.stopPrank(); // The actions will not anymore be executed as company
        

        tag.schifo(company,12);
        address[] memory rValidators = tag.getVideoValidators(company, 12);
        for (uint i = 0; i < rValidators.length; i++) {
            console.log(rValidators[i]);
        }

        vm.startPrank(user1);
        tag.submitHash(company, 12, "e7e58eed08f818747b2a268007dc40a50521536b02c4db9ed4c0221984d9908c");
        vm.stopPrank();

        vm.startPrank(user2);
        tag.submitHash(company, 12, "0e985ee5657a9b5986e24eae213457571c0cfbec2dbee2f417efa4f7a9f6d512");
        vm.stopPrank();

        vm.startPrank(user3);
        tag.submitHash(company, 12, "bfe42a83947a214a89e026a16cedb3e3203ff13bf35fe44fccc87279f2843486");
        vm.stopPrank();

        vm.startPrank(user4);
        tag.submitHash(company, 12, "5b1b7fc3cc64855a85d5cdc91c77a9c8db4e2dc242f1800d6cfcfa2e8c73335c");
        vm.stopPrank();

        vm.startPrank(user5);
        tag.submitHash(company, 12, "a7bde8d58e53a16feaa5dd854668d2cb678aedfa47de5a74f9719c1d764e595d");
        vm.stopPrank();

        vm.startPrank(user6);
        tag.submitHash(company, 12, "4d7d2f60c3f6b8e07f91957c214751750be65c4750e1be52f8e0a346821788b1");
        vm.stopPrank();

        vm.startPrank(user7);
        tag.submitHash(company, 12, "f64931f9fbeb2c556a04516dd06c08ef38463b1fed5aeaeae68a41585afb45fd");
        vm.stopPrank();

        vm.startPrank(user8);
        tag.submitHash(company, 12, "a20faac46d6e1f887fce0bb94eb56e521f2d86e212c5de6a6bf65bed958fcad1");
        vm.stopPrank();

        vm.startPrank(user9);
        tag.submitHash(company, 12, "7a052941ae57ebabddb2fae410428cadc2511ee3b6ec992328cb674ec15ae062");
        vm.stopPrank();

        vm.startPrank(user10);
        tag.submitHash(company, 12, "f0d097a87446c4a503c6517e7d22e9a72f6c1ead42a24d30c7529ecec115b9a8");
        vm.stopPrank();
        
        vm.roll(7304);

        vm.startPrank(user1);
        tag.revealHash(company, 12, "8 10 Ok2pHe0M2Ke");
        vm.stopPrank();

        vm.startPrank(user2);
        tag.revealHash(company, 12, "4 6 7 8 9 FkDxZc7HavN");
        vm.stopPrank();

        vm.startPrank(user3);
        tag.revealHash(company, 12, "10 HFubBhe3qc7");
        vm.stopPrank();

        vm.startPrank(user4);
        tag.revealHash(company, 12, "8 10 slRL89oZBP3");
        vm.stopPrank();

        vm.startPrank(user5);
        tag.revealHash(company, 12, "8 10 kbg0TyZZdUR");
        vm.stopPrank();

        vm.startPrank(user6);
        tag.revealHash(company, 12, "8 10 frgudBsZZyA");
        vm.stopPrank();

        vm.startPrank(user7);
        tag.revealHash(company, 12, "4 KS4i4EgV9oX");
        vm.stopPrank();

        vm.startPrank(user8);
        tag.revealHash(company, 12, "1 10 Uh3Lgv3s2sk");
        vm.stopPrank();

        vm.startPrank(user9);
        tag.revealHash(company, 12, "8 10 yknpiR51XXh");
        vm.stopPrank();

        vm.startPrank(user10);
        tag.revealHash(company, 12, "3 4 8 10 ZzlrPK6kJLo");
        vm.stopPrank();

        vm.startPrank(user8);
        console.log(tag.balanceValidators(user8));
        vm.roll(15000);
        //(uint256 aba, uint256 abaa, uint256 abaaa) = tag.getRewards(company, 12);
        tag.getRewards(company,12);
        //console.log(aba, abaa, abaaa);
        console.log(tag.balanceValidators(user8));
        vm.stopPrank();
        //uint256[] memory best = tag.getVideoTags(company, 12, user5);
        //console.log(best[2]);
        //console.log(tag.hashStringToString("ciao"));
        //console.log(tag.bytes32ToString(0x3120342032203338667339336a66373368000000000000000000000000000000));
    }

    // Function to check the depositing for validators
    function testTokenValidator() public {
        vm.startPrank(team); // Next action will be executed as team
        tag.whitelistCompany(company);
        vm.stopPrank(); // The actions will not anymore be executed as team
        uint256 amountEth = 1 ether;
        vm.deal(validator, amountEth); // In the virtualized environment, validator receives the amountEth
        vm.startPrank(validator); // Next action will be executed as validator
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(5);
        vm.stopPrank();  // The actions will not anymore be executed as validator
    }

    // Function to test the validator variable
    function testVariable() public {
        uint256 amountEth = 1 ether;
        vm.deal(validator, amountEth); // In the virtualized environment, validator receives the amountEth
        vm.startPrank(validator);  // Next action will be executed as validator
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromValidator(50 * 1e18);
        tag.setVariable();
        assertTrue(tag.variableValidators(validator), "Good");
        tag.setVariable();
        assertTrue(!tag.variableValidators(validator), "Good");
        vm.stopPrank(); // The actions will not anymore be executed as validator
    }

    // Function to test the proper implementation of the voucher function
    function testVoucher() public {
        uint256 amountEth = 1 ether;
        vm.deal(validator, amountEth); // In the virtualized environment, validator receives the amountEth
        vm.startPrank(validator);  // Next action will be executed as validator
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.MTGforVoucher(100 * 1e18);
        vm.stopPrank(); // The actions will not anymore be executed as validator
    }

    function testIndexTry() public {
        uint256 amountEth = 1 ether;
        vm.deal(validator, amountEth); // In the virtualized environment, validator receives the amountEth
        vm.startPrank(validator);  // Next action will be executed as validator
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18);
        tag.receiveTokensFromValidator(50 * 1e18);
        tag.setVariable();
        vm.stopPrank();

        
    }
}
