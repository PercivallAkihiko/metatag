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
        tag.submitHash(company, 12, 0x4adaa3070110d4026c3e6f5288f9f23fd66b5e5e5438ed3bf7ef8c017a4c3c4f);
        vm.stopPrank();

        vm.startPrank(user2);
        tag.submitHash(company, 12, 0x79e6b03012503efbdd4a2838f8186e52a2ba4ddc19d12e9866ec89ccc1b85d83);
        vm.stopPrank();

        vm.startPrank(user3);
        tag.submitHash(company, 12, 0x94759a906497aab2e5670a365581a96c39a6c5a99946763dcd3417f34b779d9a);
        vm.stopPrank();

        vm.startPrank(user4);
        tag.submitHash(company, 12, 0x87c8f2f9fc02302eaa5063862823f121c33d6d791fea1a652792460030e4080f);
        vm.stopPrank();

        vm.startPrank(user5);
        tag.submitHash(company, 12, 0xe23e10568ae9ea0bc5b5f7ed8c03341f520c8dba14f0af760d20a53b80920830);
        vm.stopPrank();

        vm.startPrank(user6);
        tag.submitHash(company, 12, 0x01e96e3adf4bda90192ee694db38e421e75444b9a008ab20e83090ec8b82feb3);
        vm.stopPrank();

        vm.startPrank(user7);
        tag.submitHash(company, 12, 0x65b776ca4943c369e64f4eb1735e1b00acf9c39785f03662725b3577f4f12462);
        vm.stopPrank();

        vm.startPrank(user8);
        tag.submitHash(company, 12, 0xabdb1ca529b15bc26f5fd868a27e15e375dd3c9c23e32bc21bf3532a03ad64b0);
        vm.stopPrank();

        vm.startPrank(user9);
        tag.submitHash(company, 12, 0x31dab6c372b09756601ca1d927ec5cf40b193c9aeb9e1b744f6e95d32c96b205);
        vm.stopPrank();

        vm.startPrank(user10);
        tag.submitHash(company, 12, 0x60e518a4dadd3715d5995c47d994c3a2cb1ec507e7edccfb1ab0ba18c0a5535d);
        vm.stopPrank();
        
        //vm.roll(7304);

        vm.startPrank(user1);
        uint256[] memory inputArray1 = new uint256[](3);
        inputArray1[0] = 1;
        inputArray1[1] = 8;
        inputArray1[2] = 10;
        tag.revealHash(company, 12, inputArray1, 0x4f6b32704865304d324b65); //Ok2pHe0M2Ke
        vm.stopPrank();

        vm.startPrank(user2);
        uint256[] memory inputArray2 = new uint256[](3);
        inputArray2[0] = 1;
        inputArray2[1] = 8;
        inputArray2[2] = 10;
        tag.revealHash(company, 12, inputArray2, 0x466b44785a63374861764e); //FkDxZc7HavN
        vm.stopPrank();

        vm.startPrank(user3);
        uint256[] memory inputArray3 = new uint256[](3);
        inputArray3[0] = 7;
        inputArray3[1] = 9;
        inputArray3[2] = 10;
        tag.revealHash(company, 12, inputArray3, 0x4846756242686533716337); //HFubBhe3qc7
        vm.stopPrank();
        
        vm.startPrank(user4);
        uint256[] memory inputArray4 = new uint256[](1);
        inputArray4[0] = 1;
        tag.revealHash(company, 12, inputArray4, 0x736c524c38396f5a425033); //slRL89oZBP3
        vm.stopPrank();

        vm.startPrank(user5);
        uint256[] memory inputArray5 = new uint256[](1);
        inputArray5[0] = 1;
        tag.revealHash(company, 12, inputArray5, 0x6b62673054795a5a645552); //kbg0TyZZdUR
        vm.stopPrank();

        vm.startPrank(user6);
        uint256[] memory inputArray6 = new uint256[](1);
        inputArray6[0] = 1;
        tag.revealHash(company, 12, inputArray6, 0x667267756442735a5a7941); //frgudBsZZyA
        vm.stopPrank();

        vm.startPrank(user7);
        uint256[] memory inputArray7 = new uint256[](1);
        inputArray7[0] = 1;
        tag.revealHash(company, 12, inputArray7, 0x4b53346934456756396f58); //KS4i4EgV9oX
        vm.stopPrank();

        vm.startPrank(user8);
        uint256[] memory inputArray8 = new uint256[](1);
        inputArray8[0] = 1;
        tag.revealHash(company, 12, inputArray8, 0x5568334c6776337332736b); //Uh3Lgv3s2sk
        vm.stopPrank();

        /*
        vm.startPrank(user9);
        uint256[] memory inputArray9 = new uint256[](1);
        inputArray9[0] = 7;
        tag.revealHash(company, 12, inputArray9, 0x796b6e7069523531585868); //yknpiR51XXh
        vm.stopPrank();

        vm.startPrank(user10);
        uint256[] memory inputArray10 = new uint256[](3);
        inputArray10[0] = 3;
        inputArray10[1] = 4;
        inputArray10[2] = 10;
        tag.revealHash(company, 12, inputArray10, 0x5a7a6c72504b366b4a4c6f); //ZzlrPK6kJLo
        vm.stopPrank(); */

        vm.roll(14620);

        vm.startPrank(user1);
        tag.getRewards(company,12);
        vm.stopPrank();

        vm.startPrank(user2);
        tag.getRewards(company,12);
        vm.stopPrank();
        
        vm.startPrank(user3);
        tag.getRewards(company,12);
        vm.stopPrank();

        vm.startPrank(user4);
        tag.getRewards(company,12);
        vm.stopPrank();

        vm.startPrank(user5);
        tag.getRewards(company,12);
        vm.stopPrank();

        vm.startPrank(user6);
        tag.getRewards(company,12);
        vm.stopPrank();

        vm.startPrank(user7);
        tag.getRewards(company,12);
        vm.stopPrank();

        vm.startPrank(user8);
        tag.getRewards(company,12);
        vm.stopPrank();

        vm.startPrank(user9);
        tag.getRewards(company,12);
        vm.stopPrank();

        vm.startPrank(user10);
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