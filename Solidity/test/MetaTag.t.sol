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
        //address[] memory rValidators = tag.getVideoValidators(company, 12);
        //for (uint i = 0; i < rValidators.length; i++) {
            //console.log(rValidators[i]);
       //}

        vm.startPrank(user1);
        tag.submitHash(company, 12, 0xe7e58eed08f818747b2a268007dc40a50521536b02c4db9ed4c0221984d9908c);
        vm.stopPrank();

        vm.startPrank(user2);
        tag.submitHash(company, 12, 0x4be25c88e0160a8688ff9c2a951cd73ab31292a83640699111cbba817894947f);
        vm.stopPrank();

        vm.startPrank(user3);
        tag.submitHash(company, 12, 0x2ba50801c924fbcaa5759d1ee855727a5f141d90ec29de667683082bcf3fbe25);
        vm.stopPrank();

        vm.startPrank(user4);
        tag.submitHash(company, 12, 0x5b1b7fc3cc64855a85d5cdc91c77a9c8db4e2dc242f1800d6cfcfa2e8c73335c);
        vm.stopPrank();

        vm.startPrank(user5);
        tag.submitHash(company, 12, 0xf4b77ec457b3179d88e24558e81d6119960e66df8f49ee862468b927e04ce4d4);
        vm.stopPrank();

        vm.startPrank(user6);
        tag.submitHash(company, 12, 0x4d7d2f60c3f6b8e07f91957c214751750be65c4750e1be52f8e0a346821788b1);
        vm.stopPrank();

        vm.startPrank(user7);
        tag.submitHash(company, 12, 0xf11d3d3c5084710df6f6f312f17c1f5ac2f230e54c63d569c6bc5e0d4ccdc1fd);
        vm.stopPrank();

        vm.startPrank(user8);
        tag.submitHash(company, 12, 0x2eb7678a5bdfe34c4d36a2d1168e60de750c629e3c0b9f359af0772edf4f4fe8);
        vm.stopPrank();

        vm.startPrank(user9);
        tag.submitHash(company, 12, 0x46d3ccc5685fc4c14269a8cbbf01f00e39e03c8090b44c197757411e8c720969);
        vm.stopPrank();

        vm.startPrank(user10);
        tag.submitHash(company, 12, 0xf0d097a87446c4a503c6517e7d22e9a72f6c1ead42a24d30c7529ecec115b9a8);
        vm.stopPrank();
        
        //vm.roll(7304);

        vm.startPrank(user1);
        uint256[] memory inputArray1 = new uint256[](2);
        inputArray1[0] = 8;
        inputArray1[1] = 10;
        tag.revealHash(company, 12, inputArray1, 0x4f6b32704865304d324b65);
        vm.stopPrank();

        vm.startPrank(user2);
        uint256[] memory inputArray2 = new uint256[](7);
        inputArray2[0] = 1;
        inputArray2[1] = 2;
        inputArray2[2] = 3;
        inputArray2[3] = 4;
        inputArray2[4] = 6;
        inputArray2[5] = 7;
        inputArray2[6] = 9;
        tag.revealHash(company, 12, inputArray2, 0x466b44785a63374861764e); //FkDxZc7HavN
        vm.stopPrank();

        vm.startPrank(user3);
        uint256[] memory inputArray3 = new uint256[](2);
        inputArray3[0] = 4;
        inputArray3[1] = 10;
        tag.revealHash(company, 12, inputArray3, 0x4846756242686533716337);
        vm.stopPrank();

        vm.startPrank(user4);
        uint256[] memory inputArray4 = new uint256[](2);
        inputArray4[0] = 8;
        inputArray4[1] = 10;
        tag.revealHash(company, 12, inputArray4, 0x736c524c38396f5a425033);
        vm.stopPrank();

        vm.startPrank(user5);
        uint256[] memory inputArray5 = new uint256[](3);
        inputArray5[0] = 8;
        inputArray5[1] = 9;
        inputArray5[2] = 10;
        tag.revealHash(company, 12, inputArray5, 0x6b62673054795a5a645552);
        vm.stopPrank();

        vm.startPrank(user6);
        uint256[] memory inputArray6 = new uint256[](2);
        inputArray6[0] = 8;
        inputArray6[1] = 10;
        tag.revealHash(company, 12, inputArray6, 0x667267756442735a5a7941);
        vm.stopPrank();

        vm.startPrank(user7);
        uint256[] memory inputArray7 = new uint256[](2);
        inputArray7[0] = 5;
        inputArray7[1] = 8;
        tag.revealHash(company, 12, inputArray7, 0x4b53346934456756396f58); //KS4i4EgV9oX
        vm.stopPrank();

        vm.startPrank(user8);
        uint256[] memory inputArray8 = new uint256[](2);
        inputArray8[0] = 1;
        inputArray8[1] = 8;
        tag.revealHash(company, 12, inputArray8, 0x5568334c6776337332736b); //Uh3Lgv3s2sk
        vm.stopPrank();

        vm.startPrank(user9);
        uint256[] memory inputArray9 = new uint256[](2);
        inputArray9[0] = 7;
        inputArray9[1] = 8;
        tag.revealHash(company, 12, inputArray9, 0x796b6e7069523531585868);
        vm.stopPrank();

        vm.startPrank(user10);
        uint256[] memory inputArray10 = new uint256[](4);
        inputArray10[0] = 3;
        inputArray10[1] = 4;
        inputArray10[2] = 8;
        inputArray10[3] = 10;
        tag.revealHash(company, 12, inputArray10, 0x5a7a6c72504b366b4a4c6f);
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
        //console.log(tag.getRewards(company,12));
        //console.log(tag.balanceValidators(user2));
        vm.stopPrank();

        vm.startPrank(user1);
        
        //console.log(videos1);
        //(address companyChosen, uint256 videoIdChosen) = tag.validatorVideos(user1, 0);
        tag.getRewards(company,12);
        //tag.getRewards(company,12);
        //console.log(tag.getRewards(company,12));
        //console.log(tag.balanceValidators(user1));
        vm.stopPrank();

        vm.startPrank(user7);
        //console.log(tag.balanceValidators(user7));
        tag.getRewards(company, 12);
        tag.setVariable();
        tag.withdrawFundsValidator();
        //tag.getRewards(company, 12);
        //(uint256 a, uint256 b, uint256 c) = tag.getRewards(company,12);
        //console.log(a, b, c);
        //console.log(tag.balanceValidators(user7));
        vm.stopPrank();

        vm.startPrank(user5);
        tag.getRewards(company,12);
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
        tag.MTGforVoucher();
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