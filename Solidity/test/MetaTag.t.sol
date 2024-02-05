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

    // Function to check the company depositing tokens
    function testTokenCompany() public {
        vm.startPrank(team);
        tag.whitelistCompany(company);
        vm.stopPrank();
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
        vm.startPrank(team);
        tag.whitelistCompany(company);
        vm.stopPrank();
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

        vm.startPrank(team);
        tag.whitelistCompany(company);
        vm.stopPrank();

        vm.deal(company, amountEth); // In the virtualized environment, company receives the amountEth
        vm.startPrank(company); // Next action will be executed as company
        token.buyTokens{value: amountEth}();
        token.approve(address(tag), 5000 * 1e18); // Before the token transfer we need to approve it
        tag.receiveTokensFromCompany(1e18 * 120);
        tag.addVideo(12, 12000);
        tag.addVideo(13, 12000);
        vm.stopPrank(); // The actions will not anymore be executed as company
        

        //tag.schifo(company,12);
        address[] memory rValidators = tag.getVideoValidators(company, 12);
        for (uint i = 0; i < rValidators.length; i++) {
            //console.log(rValidators[i]);
        }

        vm.startPrank(user1);
        tag.submitHash(company, 12, "e7e58eed08f818747b2a268007dc40a50521536b02c4db9ed4c0221984d9908c");
        vm.stopPrank();

        vm.startPrank(user2);
        tag.submitHash(company, 12, "4be25c88e0160a8688ff9c2a951cd73ab31292a83640699111cbba817894947f");
        vm.stopPrank();

        vm.startPrank(user3);
        tag.submitHash(company, 12, "2ba50801c924fbcaa5759d1ee855727a5f141d90ec29de667683082bcf3fbe25");
        vm.stopPrank();

        vm.startPrank(user4);
        tag.submitHash(company, 12, "5b1b7fc3cc64855a85d5cdc91c77a9c8db4e2dc242f1800d6cfcfa2e8c73335c");
        vm.stopPrank();

        vm.startPrank(user5);
        tag.submitHash(company, 12, "f4b77ec457b3179d88e24558e81d6119960e66df8f49ee862468b927e04ce4d4");
        vm.stopPrank();

        vm.startPrank(user6);
        tag.submitHash(company, 12, "4d7d2f60c3f6b8e07f91957c214751750be65c4750e1be52f8e0a346821788b1");
        vm.stopPrank();

        vm.startPrank(user7);
        tag.submitHash(company, 12, "e0b138bc2090e0a2c65f9e7fd84a841ae1f5341dfd731fc8d73a8db902587b3e");
        vm.stopPrank();

        vm.startPrank(user8);
        tag.submitHash(company, 12, "abdb1ca529b15bc26f5fd868a27e15e375dd3c9c23e32bc21bf3532a03ad64b0");
        vm.stopPrank();

        vm.startPrank(user9);
        tag.submitHash(company, 12, "46d3ccc5685fc4c14269a8cbbf01f00e39e03c8090b44c197757411e8c720969");
        vm.stopPrank();

        vm.startPrank(user10);
        tag.submitHash(company, 12, "f0d097a87446c4a503c6517e7d22e9a72f6c1ead42a24d30c7529ecec115b9a8");
        vm.stopPrank();
        
        //vm.roll(7304);

        vm.startPrank(user1);
        tag.revealHash(company, 12, "8 10 Ok2pHe0M2Ke");
        vm.stopPrank();

        vm.startPrank(user2);
        tag.revealHash(company, 12, "1 2 3 4 6 7 9 FkDxZc7HavN");
        vm.stopPrank();

        vm.startPrank(user3);
        tag.revealHash(company, 12, "4 10 HFubBhe3qc7");
        vm.stopPrank();

        vm.startPrank(user4);
        tag.revealHash(company, 12, "8 10 slRL89oZBP3");
        vm.stopPrank();

        vm.startPrank(user5);
        tag.revealHash(company, 12, "8 9 10 kbg0TyZZdUR");
        vm.stopPrank();

        vm.startPrank(user6);
        tag.revealHash(company, 12, "8 10 frgudBsZZyA");
        vm.stopPrank();

        vm.startPrank(user7);
        tag.revealHash(company, 12, "5 KS4i4EgV9oX");
        vm.stopPrank();

        vm.startPrank(user8);
        tag.revealHash(company, 12, "1 Uh3Lgv3s2sk");
        vm.stopPrank();

        vm.startPrank(user9);
        tag.revealHash(company, 12, "7 8 yknpiR51XXh");
        vm.stopPrank();

        vm.startPrank(user10);
        tag.revealHash(company, 12, "3 4 8 10 ZzlrPK6kJLo");
        vm.stopPrank();

        vm.startPrank(user8);
        //vm.roll(15000);
        tag.getRewards(company,12);
        vm.stopPrank();

        vm.startPrank(user3);
        tag.getRewards(company,12);
        vm.stopPrank();

        vm.startPrank(user2);
        //console.log(tag.balanceValidators(user2));
        //
        //console.log(a, b, c);
        tag.getRewards(company,12);
        //console.log(tag.balanceValidators(user2));
        vm.stopPrank();

        vm.startPrank(user1);
        
        //console.log(videos1);
        //(address companyChosen, uint256 videoIdChosen) = tag.validatorVideos(user1, 0);
        tag.getRewards(company,12);
        //console.log(tag.balanceValidators(user1));
        vm.stopPrank();

        vm.startPrank(user7);
        //console.log(tag.balanceValidators(user7));
        //tag.getRewards(company, 12);
        tag.setVariable();
        tag.withdrawFundsValidators();
        //tag.getRewards(company, 12);
        //(uint256 a, uint256 b, uint256 c) = tag.getRewards(company,12);
        //console.log(a, b, c);
        //console.log(tag.balanceValidators(user7));
        vm.stopPrank();

        vm.startPrank(company);
        vm.roll(73000);
        tag.withdrawFundsCompany();
        vm.stopPrank();
    }

    // Function to check the depositing for validators
    function testTokenValidator() public {
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
