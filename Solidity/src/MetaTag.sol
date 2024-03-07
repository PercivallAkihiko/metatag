// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Solidity version

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // Library for ERC20
import "@openzeppelin/contracts/utils/Strings.sol";

contract MetaTag {

// VARIABLES ####################################################################################################################################################################################
 
    ERC20 public mtgToken; // MTG token to make correlation

    address public mtgTeam; // "We"

    mapping(address => bool) public wlCompanies;
    mapping(address => uint) public balanceCompanies; // Hash table for companies' balances
    mapping(address => uint[]) public companyVideos;

    mapping(address => bool) public variableValidators; // Variable that validators have to turn on to work (it requires minimum 50 tokens)
    mapping(address => uint) public balanceValidators; // Hash table for validators' balances
    address[] public readyValidators; // List of ready validators
    mapping(address => ValidatorVideo[]) public validatorVideos;
    
    mapping(address => mapping(uint => Video)) public videos; // Hash table Company -> video ID -> Video (video information). Different companies can have same video ID.
    mapping(address => uint) public lastVideo; // Hash table to know the block in which the last block was added (for companies withdraw)
    
    // Structure for the video information given by the companies
    struct Video {
        uint id;
        uint length;
        address[] chosenValidators;
        uint timestamp; // Timestamp when the video was added
        mapping(address => bytes32) hashedData; // Mapping from validator address to their encrypted data
        mapping(address => uint[]) revealedTags; // Mapping from validator address to their tags
        uint hashedCounter;
        address[] revValidators; // Array to keep track of the validators that revealed their tags
    }

    struct ValidatorVideo {
        address companyChosen;
        uint videoIdChosen;
    }

    uint constant tagsNumber = 20;
    uint constant confirmedTags = 80; // In percentage
    uint constant ambiguousTags = 30; // In percentage
    uint constant minimumReadyValidators = 15;
    uint constant validatorsQuantity = 10;
    uint constant rewardVariable = 2000; // Lower more rewards
    uint constant noConfirmedOrNoRevealedTagSlash = 15;

// EVENTS ####################################################################################################################################################################################

event eventMTGforVoucher(address indexed validator);

event eventWhitelistCompany(address indexed company);
event eventRemoveWhitelistCompany(address indexed company);

event eventReceiveTokensFromValidator(address indexed company, uint amount);
event eventSetVariable(address indexed validator);
event eventSubmitHash(address indexed validator, address indexed company, uint videoId, bytes32 hash);
event eventRevealHash(address indexed validator, address indexed company, uint videoId, uint[] tags, bytes11 seed);
event eventGetRewards(address indexed validator, address indexed company, uint videoId, uint rewardAmount, bool positive);
event eventWithdrawFundsValidator(address indexed validator, uint amount);

event eventReceiveTokensFromCompany(address indexed company, uint amount);
event eventAddVideo(address indexed emitter, uint videoId, address[] chosenValidators, uint timestamp);
event eventWithdrawFundsCompany(address indexed company, uint amount);

// CONSTRUCTOR ####################################################################################################################################################################################

    // In the constructor we save the sender and we choose as input the address of the MTG token
    constructor(address _mtgToken) {
        mtgToken = ERC20(_mtgToken);
        mtgTeam = msg.sender;
    }

// MODIFIERS ####################################################################################################################################################################################

    modifier onlyWhitelist() {
        require(wlCompanies[msg.sender] == true, "You are not a whitelisted company!");
        _;
    }

    modifier onlyTeam() {
        require(msg.sender == mtgTeam, "You are not MtgTeam!");
        _;
    }

    modifier notCompany() {
        require(wlCompanies[msg.sender] == false, "You are a company!");
        _;
    }

// MTGTEAM FUNCTION ####################################################################################################################################################################################

    function whitelistCompany(address company) public onlyTeam {
        wlCompanies[company] = true;
        emit eventWhitelistCompany(company);
    }

    function removeWhitelistCompany(address company) public onlyTeam {
        wlCompanies[company] = false;
        emit eventRemoveWhitelistCompany(company);
    }

// VALIDATORS FUNCTIONS ####################################################################################################################################################################################

    // Function for validators to announce their willing to partecipate in the DApp
    function setVariable() public notCompany {
        require(balanceValidators[msg.sender] >= 50 * 1e18, "You need to lock at least 50 tokens!");

        if (variableValidators[msg.sender]) {
            removeValidator(msg.sender);
            variableValidators[msg.sender] = false;
        }
        else {
            addValidator(msg.sender);
            variableValidators[msg.sender] = true;
        }
        emit eventSetVariable(msg.sender);
    }

    function addValidator(address _validator) internal {
        readyValidators.push(_validator);
    }

    function removeValidator(address _validator) internal {
        uint index = 0;
        for (uint i = 0; i < readyValidators.length; i++) {
            if (readyValidators[i] == _validator) {
                index = i;
                break;
            }
        }
        readyValidators[index] = readyValidators[readyValidators.length - 1];
        readyValidators.pop();
    }

    // Function for validators to send their tokens to the smart contract to partecipate in the DApp
    function receiveTokensFromValidator(uint amount) public notCompany {
        bool sent = mtgToken.transferFrom(msg.sender, address(this), amount); // Transfer tokens from the validator's address to this contract
        require(sent, "Token transfer failed!");
        balanceValidators[msg.sender] += amount; // Update the validator's token balance in this contract
        emit eventReceiveTokensFromValidator(msg.sender, amount);
    }

    // Function for validators to submit a hash for a video
    function submitHash(address company, uint videoId, bytes32 hash) public {
        require(isValidatorChosenForVideo(company, videoId, msg.sender), "Not a chosen validator for this video!");
        require(block.number <= videos[company][videoId].timestamp + 7200, "Submission time exceeded!");
        require((videos[company][videoId].hashedData[msg.sender]) == "","You cannot submit the hash twice!");

        videos[company][videoId].hashedData[msg.sender] = hash;
        videos[company][videoId].hashedCounter +=1;
        emit eventSubmitHash(msg.sender, company, videoId, hash);
    }

    // Helper function to check if a validator is chosen for a specific video
    function isValidatorChosenForVideo(address company, uint videoId, address validator) private view returns (bool) {
        for (uint i = 0; i < videos[company][videoId].chosenValidators.length; i++) {
            if (videos[company][videoId].chosenValidators[i] == validator) {
                return true;
            }
        }
        return false;
    }

    // Function for validators to reveal their original value for a video
    function revealHash(address company, uint videoId, uint[] memory tags, bytes11 seed) public {
        bytes memory result = abi.encodePacked(Strings.toString(tags[0]));
        require(tags[0] < tagsNumber, "Illegal first tag!");
        for (uint i = 1; i < tags.length; i++) {
            result = abi.encodePacked(result, " ", Strings.toString(tags[i]));
            require(tags[i] < tagsNumber, "Illegal tag!");
        }
        require(videos[company][videoId].hashedData[msg.sender] == keccak256(abi.encodePacked(result, " ", seed)), "Hash mismatch!");
        require((block.number > videos[company][videoId].timestamp + 7200) || (videos[company][videoId].hashedCounter == validatorsQuantity), "Reveal not yet allowed!");
        require(block.number < videos[company][videoId].timestamp + 14400, "Reveal time exceeded!");
        require(videos[company][videoId].revealedTags[msg.sender].length == 0,"You cannot submit the reveal twice!");
        videos[company][videoId].revealedTags[msg.sender] = tags;
        videos[company][videoId].revValidators.push(msg.sender);
        emit eventRevealHash(msg.sender, company, videoId, tags, seed);
    }

    //function getRewards(address company, uint videoId) public returns (uint) {
    function getRewards(address company, uint videoId) public {
        require((block.number > videos[company][videoId].timestamp + 14400) || (videos[company][videoId].revValidators.length == videos[company][videoId].hashedCounter), "Withdraw not yet allowed!");
        require(isValidatorChosenForVideo(company, videoId, msg.sender), "Not a chosen validator for this video!");
        bool check = false;
        for (uint i = 0; i < validatorVideos[msg.sender].length; i++) {
            if (validatorVideos[msg.sender][i].companyChosen == company && validatorVideos[msg.sender][i].videoIdChosen == videoId) {
                uint lastIndex = validatorVideos[msg.sender].length - 1;
                validatorVideos[msg.sender][i] = validatorVideos[msg.sender][lastIndex];
                validatorVideos[msg.sender].pop();
                check = true;
                break;
            }
        }
        require(check, "You cannot withdraw twice!");

        uint totalValidators = videos[company][videoId].revValidators.length;
        uint totalConfirmedTags = 0;
        uint totalAmbiguousTags = 0;
        uint totalWrongTags = 0;
        uint validatorConfirmedTags = 0;
        uint validatorAmbiguousTags = 0;
        uint validatorWrongTags = 0;
        uint videoLength = videos[company][videoId].length;
        uint constantMultiplier = 5; // 0.0005

        // Arrays to keep track of tag counts
        uint[tagsNumber] memory tagCounts; // There are 20 possible tags
        uint[tagsNumber] memory tagStatus; // Status: 1 for confirmed, 2 for ambiguous, 3 for wrong

        // Tally votes for each tag
        for (uint i = 0; i < totalValidators; i++) {
            uint[] memory tags = videos[company][videoId].revealedTags[videos[company][videoId].revValidators[i]];
            for (uint j = 0; j < tags.length; j++) {
                tagCounts[tags[j]]++;
            }
        }

        // Categorize tags and count totals for each category
        for (uint i = 0; i < tagsNumber; i++) {
            if (tagCounts[i] * 100 >= totalValidators * confirmedTags) {
                tagStatus[i] = 1; // Confirmed
                totalConfirmedTags++;
            } 
            else if (tagCounts[i] * 100 >= totalValidators * ambiguousTags) {
                tagStatus[i] = 2; // Ambiguous
                totalAmbiguousTags++;
            } 
            else if (tagCounts[i] > 0) {
                tagStatus[i] = 3; // Wrong
                totalWrongTags++;
            }
        }

        // Calculate the reward for msg.sender
        uint[] memory senderTags = videos[company][videoId].revealedTags[msg.sender];
        for (uint i = 0; i < senderTags.length; i++) {
            uint tag = senderTags[i];
            if (tagStatus[tag] == 1) {
                validatorConfirmedTags++;
            } 
            else if (tagStatus[tag] == 2) {
                validatorAmbiguousTags++;
            } 
            else if (tagStatus[tag] == 3) {
                validatorWrongTags++;
            }
        }
        
        if (senderTags.length == 0 || totalConfirmedTags == 0)
        {
            uint bln = balanceValidators[msg.sender];
            if (bln < noConfirmedOrNoRevealedTagSlash * 1e18) {
                balanceValidators[msg.sender] = 0;
                variableValidators[msg.sender] = false;
            }
            else {
                balanceValidators[msg.sender] -= noConfirmedOrNoRevealedTagSlash * 1e18;
            }
            //return balanceValidators[msg.sender];
            return;
        }

        uint reward = 1e8 * 1e18;
        if (totalConfirmedTags > 0) {
            reward += (validatorConfirmedTags * 1e18 / totalConfirmedTags) ;
        }
        if (totalAmbiguousTags > 0) {
            reward -= (validatorAmbiguousTags * 1e20 / totalAmbiguousTags ) * 75 / 10000;
        }
        if (totalWrongTags > 0) {
            reward -= (validatorWrongTags * 125) * (125 * 1e18 / 100 - 1e18 * validatorConfirmedTags / totalConfirmedTags) / 100 ;
        }
        
        uint rewardAmount;
        bool positive = true;

        if (reward > 1e26) {
            rewardAmount = (reward - 1e26) * videoLength * constantMultiplier / 10000;
            balanceCompanies[company] -= rewardAmount;
            balanceValidators[msg.sender] += rewardAmount;
        } 
        else {
            rewardAmount = (1e26 - reward) * videoLength * constantMultiplier / 10000;
            uint bln = balanceValidators[msg.sender];
            if (bln < rewardAmount) {
                balanceValidators[msg.sender] = 0;
                variableValidators[msg.sender] = false;
            }
            else {
                balanceValidators[msg.sender] -= rewardAmount;
            }
            positive = false;
        }
        emit eventGetRewards(msg.sender, company, videoId, rewardAmount, positive);
        //return balanceValidators[msg.sender];
    }

    // Function to exchange 100 tokens for a voucher. The implementation should be done on the website, it return only true
    function MTGforVoucher(uint amount) public returns (bool) {
        require(msg.sender != mtgTeam, "You cannot be the team!");
        require(amount == 100 * 1e18, "The voucher costs 100 MTG!");
        bool sent = mtgToken.transferFrom(msg.sender, mtgTeam, amount); // Transfer MTG tokens from the sender to the contract owner
        require(sent, "Token transfer failed");
        emit eventMTGforVoucher(msg.sender);
        return true;   
    }

    //function withdrawFundsValidator() public notCompany returns (uint) {
    function withdrawFundsValidator() public notCompany {
        require(!variableValidators[msg.sender], "You have to turn off the variable!");
        uint val = 0;
        while (val < validatorVideos[msg.sender].length)
        {   
            address company = validatorVideos[msg.sender][val].companyChosen;
            uint videoId = validatorVideos[msg.sender][val].videoIdChosen;
            if ((block.number > videos[company][videoId].timestamp + 7200) || (videos[company][videoId].hashedCounter == validatorsQuantity)) {
                getRewards(company, videoId);
            }
            else {
                val++;
            }
        }
        uint _amount = balanceValidators[msg.sender];
        balanceValidators[msg.sender] -= _amount;
        balanceValidators[mtgTeam] += _amount * 1/100;
        require(mtgToken.transfer(msg.sender, _amount * 99/100), "Transfer failed!");
        emit eventWithdrawFundsValidator(msg.sender, _amount);
    }

// COMPANIES FUNCTIONS ####################################################################################################################################################################################
  
    // Function for companies to send their tokens to the smart contract to have the possibility to send video for tagging
    function receiveTokensFromCompany(uint amount) public onlyWhitelist {
        require(!variableValidators[msg.sender], "You cannot be both a validator and a company!");
        bool sent = mtgToken.transferFrom(msg.sender, address(this), amount); // Transfer tokens from the company's address to this contract
        require(sent, "Token transfer failed!");
        balanceCompanies[msg.sender] += amount; // Update the company's token balance in this contract
        emit eventReceiveTokensFromCompany(msg.sender, amount);
    }

    // Function for companies to submit videos for tagging
    function addVideo(uint videoId, uint videoLength) public onlyWhitelist {
        require(readyValidators.length >= minimumReadyValidators, "There should be a minimum of 15 ready validators!");
        require(videos[msg.sender][videoId].id == 0, "Video ID already exists for this company!");
        companyVideos[msg.sender].push(videoId);
        Video storage newVideo = videos[msg.sender][videoId];
        newVideo.length = videoLength;
        newVideo.chosenValidators = randomChooseValidators(videoId);
        newVideo.timestamp = block.number;
        lastVideo[msg.sender] = block.number;
        require(balanceCompanies[msg.sender] >= calculateNeededTokens(), "Not enough MTG tokens in the smart contract, deposit the right amount!");
        emit eventAddVideo(msg.sender, videoId, newVideo.chosenValidators, block.number);
    }
    
    function randomChooseValidators(uint videoId) internal returns (address[] memory) {
        address[] memory selectedValidators = new address[](validatorsQuantity);

        address[] memory readyFinal = readyValidators;
        uint length = readyFinal.length;

        uint indexo = 0;
        
        while (indexo != validatorsQuantity) {
            uint randomIndex = uint(keccak256(abi.encodePacked(block.prevrandao, msg.sender, indexo))) % length;
            selectedValidators[indexo] = readyFinal[randomIndex];
            readyFinal[randomIndex] = readyFinal[length-1];
            assembly { mstore(readyFinal, sub(mload(readyFinal), 1))}
            indexo +=1;
            length -=1;
        }

        //DELETE IT!
        for (uint i = 0; i < validatorsQuantity; i++) {
            selectedValidators[i] = readyValidators[i];
            validatorVideos[selectedValidators[i]].push(ValidatorVideo(msg.sender,videoId));
        }
        //DELETE IT!

        return selectedValidators;
    }

    function calculateNeededTokens() internal returns (uint) {
        uint neededTokens = 0;
        uint last = companyVideos[msg.sender].length;
        uint e = 0;
        while (e < last) {
            if (block.number < videos[msg.sender][companyVideos[msg.sender][e]].timestamp + 72000) {
                neededTokens += 1e18 * videos[msg.sender][companyVideos[msg.sender][e]].length * validatorsQuantity * 1/rewardVariable;
                e += 1;
            }
            else {
                companyVideos[msg.sender][e] = companyVideos[msg.sender][last - 1];
                companyVideos[msg.sender].pop();
            }
        }
        return neededTokens;
    }

    function withdrawFundsCompany() public onlyWhitelist {
        require(block.number >= lastVideo[msg.sender] + 72000 , "You have to wait 10 days since adding the last video!");
        uint amount = balanceCompanies[msg.sender];
        balanceCompanies[msg.sender] -= amount;
        require(mtgToken.transfer(mtgTeam, amount * 1/100), "Transfer to team failed!");
        require(mtgToken.transfer(msg.sender, amount * 99/100), "Transfer to wallet failed!");
        emit eventWithdrawFundsCompany(msg.sender, amount);
    }

// ADDITIONAL FUNCTIONS ####################################################################################################################################################################################

    // Function that terminate the smart contract
    function terminate() public onlyTeam {
        selfdestruct(payable(mtgTeam)); // This is deprecated but I do not see alternatives at this moment
    }
}