// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Solidity version

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // Library for ERC20

contract MetaTag {

// VARIABLES ####################################################################################################################################################################################
 
    ERC20 public mtgToken; // MTG token to make correlation
    address public mtgTeam; // "We"

    mapping(address => uint256) public balanceCompanies; // Hash table for companies' balances
    mapping(address => uint256) public balanceValidators; // Hash table for validators' balances
    mapping(address => bool) public wlCompanies;
    mapping(address => mapping(uint256 => Video)) public videos; // Hash table Company -> video ID -> Video (video information). Different companies can have same video ID.
    mapping(address => bool) public variableValidators; // Variable that validators have to turn on to work (it requires minimum 50 tokens)
    address[] public readyValidators; // List of ready validators
    mapping(address => uint256) public lastVideo; // Hash table to know the block in which the last block was added (for companies withdraw)
    mapping(address => ValidatorVideo[]) public validatorVideos;
    mapping(address => uint256[]) public companyVideos;

    // Structure for the video information given by the companies
    struct Video {
        uint256 id;
        uint256 length;
        address[] chosenValidators;
        uint256 timestamp; // Timestamp when the video was added
        mapping(address => string) hashedData; // Mapping from validator address to their encrypted data
        mapping(address => uint256[]) revealedTags; // Mapping from validator address to their tags
        uint256 hashedCounter;
        address[] revValidators; // Array to keep track of the validators that revealed their tags
    }

    struct ValidatorVideo {
        address companyChosen;
        uint256 videoIdChosen;
    }

// EVENTS ####################################################################################################################################################################################

event eventAddVideo(address indexed emitter, uint256 videoId, address[] chosenValidators, uint256 timestamp);
event eventSetVariable(address indexed validator);
event eventReceiveTokensFromValidator(address indexed company, uint256 amount);
event eventSubmitHash(address indexed validator, address indexed company, uint256 videoId, string hash);
event eventRevealHash(address indexed validator, address indexed company, uint256 videoId, string originalValue);
event eventGetRewards(address indexed validator, address indexed company, uint256 videoId, uint256 rewardAmount, bool positive);
event eventMTGforVoucher(address indexed validator);
event eventWithdrawFundsValidators(address indexed validator, uint256 amount);
event eventReceiveTokensFromCompany(address indexed validator, uint256 amount);
event eventWithdrawFundsCompany(address indexed company, uint256 amount);
event eventWhitelistCompany(address indexed company);
event eventRemoveWhitelistCompany(address indexed company);



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

// MTGTEAM FUNCTION ####################################################################################################################################################################################

    function whitelistCompany(address company) public {
        require(msg.sender == mtgTeam, "You are not MtgTeam!");
        wlCompanies[company] = true;
        emit eventWhitelistCompany(company);
    }

    function removeWhitelistCompany(address company) public {
        require(msg.sender == mtgTeam, "You are not MtgTeam!");
        wlCompanies[company] = false;
        emit eventRemoveWhitelistCompany(company);
    }

// VALIDATORS FUNCTIONS ####################################################################################################################################################################################

    // Function for validators to announce their willing to partecipate in the DApp
    function setVariable() public {
        require(balanceCompanies[msg.sender] == 0, "You are a company!");
        require(balanceValidators[msg.sender] >= 50 * 1e18, "You need to lock at least 50 tokens!");

        if (variableValidators[msg.sender]){
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
        address get = readyValidators[index];
        readyValidators[index] = readyValidators[readyValidators.length - 1];
        readyValidators[readyValidators.length - 1] = get;
        readyValidators.pop();
    }

    // Function for validators to send their tokens to the smart contract to partecipate in the DApp
    function receiveTokensFromValidator(uint256 amount) public {
        require(balanceCompanies[msg.sender] == 0, "You are a company!");
        bool sent = mtgToken.transferFrom(msg.sender, address(this), amount); // Transfer tokens from the validator's address to this contract
        require(sent, "Token transfer failed");
        balanceValidators[msg.sender] += amount; // Update the validator's token balance in this contract
        emit eventReceiveTokensFromValidator(msg.sender, amount);
    }

    // Function for validators to submit a hash for a video
    function submitHash(address company, uint256 videoId, string memory hash) public {
        require(isValidatorChosenForVideo(company, videoId, msg.sender), "Not a chosen validator for this video");
        require(block.number <= videos[company][videoId].timestamp + 7200, "Submission time exceeded");

        // Check if the hash is 64 characters long (for SHA-256)
        require(bytes(hash).length == 64, "Invalid hash length");

        // Check if the hash contains only valid hexadecimal characters
        for (uint i = 0; i < 64; i++) {
            bytes1 char = bytes(hash)[i];
            require(
                (char >= 0x30 && char <= 0x39) || // 0-9
                (char >= 0x61 && char <= 0x66) || // a-f
                (char >= 0x41 && char <= 0x46),   // A-F
                "Invalid hash character"
            );
        }

        videos[company][videoId].hashedData[msg.sender] = hash;
        videos[company][videoId].hashedCounter +=1;
        emit eventSubmitHash(msg.sender, company, videoId, hash);
    }

    // Helper function to check if a validator is chosen for a specific video
    function isValidatorChosenForVideo(address company, uint256 videoId, address validator) private view returns (bool) {
        for (uint i = 0; i < videos[company][videoId].chosenValidators.length; i++) {
            if (videos[company][videoId].chosenValidators[i] == validator) {
                return true;
            }
        }
        return false;
    }

    // Function for validators to reveal their original value for a video
    function revealHash(address company, uint256 videoId, string memory originalValue) public {
        require(isValidatorChosenForVideo(company, videoId, msg.sender), "Not a chosen validator for this video!");
        require((block.number > videos[company][videoId].timestamp + 7200) || (videos[company][videoId].hashedCounter == 10), "Reveal not yet allowed!");
        require(keccak256(abi.encodePacked(hashStringToString(originalValue))) == keccak256(abi.encodePacked(videos[company][videoId].hashedData[msg.sender])), "Hash mismatch");
        require(block.number < videos[company][videoId].timestamp + 14400, "Reveal time exceeded!");
        // Split the originalValue into tags and seed
        // Assuming the format "tag1 tag2 ... tagN seed"
        bytes memory originalValueBytes = bytes(originalValue);
        uint lastSpaceIndex = 0;
        for (uint i = originalValueBytes.length - 1; i > 0; i--) {
            if (originalValueBytes[i] == ' ') {
                lastSpaceIndex = i;
                break;
            }
        }
        require(lastSpaceIndex > 0 && originalValueBytes.length - lastSpaceIndex - 1 == 11, "Invalid seed length");
        // Re-hash the tags with the seed and compare with the stored hash
        
        bytes memory tagsBytes = slice(originalValueBytes, 0, lastSpaceIndex);
        string memory tagsString = string(tagsBytes);
        videos[company][videoId].revealedTags[msg.sender] = extractTags(tagsString);
        videos[company][videoId].revValidators.push(msg.sender);
        emit eventRevealHash(msg.sender, company, videoId, originalValue);
    }

    function getRewards(address company, uint256 videoId) public {
    //function getRewards(address company, uint256 videoId) public returns (uint256, uint256, uint256){
        require((block.number > videos[company][videoId].timestamp + 14400) || (videos[company][videoId].revValidators.length == 10), "Withdraw not yet allowed");
        require(msg.sender != company, "You cannot be the company!");
        require(isValidatorChosenForVideo(company, videoId, msg.sender), "Not a chosen validator for this video");
        bool check = false;
        for (uint i = 0; i < validatorVideos[msg.sender].length; i++)
        {
            if (validatorVideos[msg.sender][i].companyChosen == company && validatorVideos[msg.sender][i].videoIdChosen == videoId)
            {
                uint256 lastIndex = validatorVideos[msg.sender].length - 1;
                validatorVideos[msg.sender][i] = validatorVideos[msg.sender][lastIndex];
                validatorVideos[msg.sender][lastIndex] = validatorVideos[msg.sender][i];
                validatorVideos[msg.sender].pop();
                check = true;
                break;
            }
        }

        require(check, "You cannot withdraw twice!");

        uint256 totalValidators = videos[company][videoId].revValidators.length;
        uint256 totalConfirmedTags = 0;
        uint256 totalAmbiguousTags = 0;
        uint256 totalWrongTags = 0;
        uint256 validatorConfirmedTags = 0;
        uint256 validatorAmbiguousTags = 0;
        uint256 validatorWrongTags = 0;
        uint256 videoLength = videos[company][videoId].length;
        uint256 constantMultiplier = 5; // 0.0005

        // Arrays to keep track of tag counts
        uint256[20] memory tagCounts; // There are 20 possible tags
        uint256[20] memory tagStatus; // Status: 1 for confirmed, 2 for ambiguous, 3 for wrong

        // Tally votes for each tag
        for (uint i = 0; i < totalValidators; i++) {
            uint256[] memory tags = videos[company][videoId].revealedTags[videos[company][videoId].revValidators[i]];
            for (uint j = 0; j < tags.length; j++) {
                if (tags[j] < 20) { // Ensure the tag is within the allowed range
                    tagCounts[tags[j]]++;
                }
            }
        }

        // Categorize tags and count totals for each category
        for (uint i = 0; i < 20; i++) {
            if (tagCounts[i] >= totalValidators * 80 / 100) {
                tagStatus[i] = 1; // Confirmed
                totalConfirmedTags++;
            } else if (tagCounts[i] >= totalValidators * 30 / 100) {
                tagStatus[i] = 2; // Ambiguous
                totalAmbiguousTags++;
            } else if (tagCounts[i] > 0) {
                tagStatus[i] = 3; // Wrong
                totalWrongTags++;
            }
        }

        // Calculate the reward for msg.sender
        uint256[] memory senderTags = videos[company][videoId].revealedTags[msg.sender];
        for (uint i = 0; i < senderTags.length; i++) {
            uint256 tag = senderTags[i];
            if (tagStatus[tag] == 1) {
                validatorConfirmedTags++;
            } else if (tagStatus[tag] == 2) {
                validatorAmbiguousTags++;
            } else if (tagStatus[tag] == 3) {
                validatorWrongTags++;
            }
        }
        
        if (senderTags.length == 0 || totalConfirmedTags == 0)
        {
            uint256 bln = balanceValidators[msg.sender];
            if (bln < 15 * 1e18)
            {
                balanceValidators[msg.sender] = 0;
            }
            else
            {
                balanceValidators[msg.sender] -= 15 * 1e18;
            }
            return;
        }

        uint256 reward = 1e8 * 1e18;
        if (totalConfirmedTags > 0) {
            reward += (validatorConfirmedTags * 1e18 / totalConfirmedTags) ;
        }
        if (totalAmbiguousTags > 0) {
            reward -= (validatorAmbiguousTags * 1e18 / totalAmbiguousTags * 100) * 75 / 100  / 100;
        }
        if (totalWrongTags > 0) {
            reward -= (validatorWrongTags * 125) * (125* 1e18 / 100   - 1e18 * validatorConfirmedTags / totalConfirmedTags) / 100 ;
        }
        
        uint256 baseReward = 1e8 * 1e18;
        uint256 rewardAmount;
        bool positive = true;

        if (reward > baseReward) {
            rewardAmount = (reward - baseReward) * videoLength * constantMultiplier / 10000;
            require(balanceCompanies[company] >= rewardAmount, "Company does not have enough tokens");
            balanceCompanies[company] -= rewardAmount;
            balanceValidators[msg.sender] += rewardAmount;
        } else {
            rewardAmount = (baseReward - reward) * videoLength * constantMultiplier / 10000;
            uint256 bln = balanceValidators[msg.sender];
            if (bln < rewardAmount)
            {
                balanceValidators[msg.sender] = 0;
            }
            else
            {
                balanceValidators[msg.sender] -= rewardAmount;
            }
            positive = false;
        }
        //return (reward, reward, reward);
        emit eventGetRewards(msg.sender, company, videoId, rewardAmount, positive);
    }

    // Function to exchange 100 tokens for a voucher. The implementation should be done on the website, it return only true
    function MTGforVoucher(uint amount) public returns (bool) {
        require(amount == 100 * 1e18, "The voucher costs 100 MTG!");
        bool sent = mtgToken.transferFrom(msg.sender, mtgTeam, amount); // Transfer MTG tokens from the sender to the contract owner
        require(sent, "Token transfer failed");
        emit eventMTGforVoucher(msg.sender);
        return true;   
    }

    function withdrawFundsValidators() public {
        require(balanceCompanies[msg.sender] == 0, "You are a company!");
        require(!variableValidators[msg.sender], "You have to turn off the variable!");
        for (uint256 i=0; i < validatorVideos[msg.sender].length; i++)
        {
            getRewards(validatorVideos[msg.sender][i].companyChosen, validatorVideos[msg.sender][i].videoIdChosen);
        }
        uint256 _amount = balanceValidators[msg.sender];
        balanceValidators[msg.sender] -= _amount;
        balanceValidators[mtgTeam] += _amount * 1/100;
        require(mtgToken.transfer(msg.sender, _amount * 99/100), "Transfer failed!");
        emit eventWithdrawFundsValidators(msg.sender, _amount);
    }

// COMPANIES FUNCTIONS ####################################################################################################################################################################################
  
    // Function for companies to send their tokens to the smart contract to have the possibility to send video for tagging
    function receiveTokensFromCompany(uint256 amount) public onlyWhitelist {
        require(!variableValidators[msg.sender], "You cannot be both validator and company");
        require(balanceValidators[msg.sender] == 0, "You need to withdraw all your validator tokens!");
        bool sent = mtgToken.transferFrom(msg.sender, address(this), amount); // Transfer tokens from the company's address to this contract
        require(sent, "Token transfer failed!");
        balanceCompanies[msg.sender] += amount; // Update the company's token balance in this contract
        emit eventReceiveTokensFromCompany(msg.sender, amount);
    }

    // Function for companies to submit videos for tagging
    function addVideo(uint256 videoId, uint256 videoLength) public onlyWhitelist {
        companyVideos[msg.sender].push(videoId);
        require(readyValidators.length > 14, "There should be a minimum of 15 ready validators!");
        require(videos[msg.sender][videoId].id == 0, "Video ID already exists for this company!");
        Video storage newVideo = videos[msg.sender][videoId];
        newVideo.id = videoId;
        newVideo.length = videoLength;
        newVideo.chosenValidators = randomChooseValidators(videoId);
        newVideo.timestamp = block.number;
        lastVideo[msg.sender] = block.number;
        require(balanceCompanies[msg.sender] >= calculateNeededTokens(), "Not enough MTG tokens in the smart contract, deposit the right amount!");
        emit eventAddVideo(msg.sender, videoId, newVideo.chosenValidators, block.number);
    }

    function randomChooseValidators(uint256 videoId) internal returns ( address[] memory) {
        address[] memory selectedValidators = new address[](10);
        uint256 valRand = 0;
        uint256 valIndex = 0;
        while (selectedValidators[9] == address(0x0))
        {
            uint randomIndex = uint(keccak256(abi.encodePacked(block.prevrandao, msg.sender, valRand))) % 15;
            if (!isAddressInArray(selectedValidators, readyValidators[randomIndex]))
            {
                selectedValidators[valIndex] = readyValidators[randomIndex];
                validatorVideos[selectedValidators[valIndex]].push(ValidatorVideo(msg.sender,videoId));
                valIndex+=1;
            }
                valRand +=1;
        }

        //DELETE IT!
        for (uint i = 0; i < 10; i++) {
            selectedValidators[i] = readyValidators[i];
            validatorVideos[selectedValidators[i]].push(ValidatorVideo(msg.sender,videoId));
        }
        //DELETE IT!

        return selectedValidators;
    }

    function calculateNeededTokens() internal returns (uint256) {
        uint256 neededTokens = 0;
        uint256 last = companyVideos[msg.sender].length;
        uint256 e = 0;
        while (e < last)
        {
            if (block.number < videos[msg.sender][companyVideos[msg.sender][e]].timestamp + 72000)
            {
                neededTokens += 1e18 * videos[msg.sender][companyVideos[msg.sender][e]].length * 10 * 1/2000;
                e +=1;
            }
            else
            {
                uint256 get = companyVideos[msg.sender][e];
                companyVideos[msg.sender][e] = companyVideos[msg.sender][last - 1];
                companyVideos[msg.sender][last - 1] = get;
                companyVideos[msg.sender].pop();
                e -=1;
            }
        }
        return neededTokens;
    }

    function withdrawFundsCompany() public onlyWhitelist{
        require(balanceCompanies[msg.sender] > 0, "Nothing to withdraw!");
        require(block.number >= lastVideo[msg.sender] + 72000 , "You have to wait 10 days since adding the last video!");
        uint256 amount = balanceCompanies[msg.sender];
        balanceCompanies[msg.sender] -= amount;
        balanceValidators[mtgTeam] += amount * 1/100;
        require(mtgToken.transfer(msg.sender, amount * 99/100), "Transfer failed!");
        emit eventWithdrawFundsCompany(msg.sender, amount);
    }



// ADDITIONAL FUNCTIONS ####################################################################################################################################################################################

    // Function to check if a specific address is in an array.
    function isAddressInArray(address[] memory array, address value) internal pure returns (bool) {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    }

    // Function to emit the entire array of validators for a specific video
    function getVideoValidators(address a, uint256 b) public view returns (address[] memory) {
        return videos[a][b].chosenValidators;
    }

    // Function to slice a bytes array
    function slice(bytes memory data, uint start, uint end) internal pure returns (bytes memory) {
            bytes memory result = new bytes(end - start);
            for(uint i = start; i < end; i++) {
                result[i - start] = data[i];
            }
            return result;
        }

    // Function to extract Tags from validator's revealHash phase
    function extractTags(string memory tagsString) internal pure returns (uint256[] memory) {
        uint256 count = countSpaces(tagsString) + 1;
        uint256[] memory tags = new uint256[](count);
        uint256 index = 0;
        uint256 start = 0;
        bytes memory stringBytes = bytes(tagsString);

        for (uint256 i = 0; i < stringBytes.length; i++) {
            if (stringBytes[i] == " ") {
                tags[index] = parseUint(stringBytes, start, i);
                index++;
                start = i + 1;
            }
        }

        if (start < stringBytes.length) {
            tags[index] = parseUint(stringBytes, start, stringBytes.length);
        }

        return tags;
    }

    // Function to count spaces in a string
    function countSpaces(string memory str) internal pure returns (uint256) {
        bytes memory strBytes = bytes(str);
        uint256 spaceCount = 0;
        for (uint256 i = 0; i < strBytes.length; i++) {
            if (strBytes[i] == " ") {
                spaceCount++;
            }
        }
        return spaceCount;
    }

    // Function to convert substring of a byte array (representing a string) into uint256 
    function parseUint(bytes memory strBytes, uint256 start, uint256 end) internal pure returns (uint256) {
        uint256 res = 0;
        for (uint256 i = start; i < end; i++) {
            //require(strBytes[i] >= 48 && strBytes[i] <= 57, "Non-numeric character");
            res = res * 10 + (uint256(uint8(strBytes[i])) - 48);
        }
        return res;
    }

    // Function to hash a string into hash in string format for comparison.
    function hashStringToString(string memory input) internal pure returns (string memory) {
        bytes32 hash = keccak256(abi.encodePacked(input));
        return bytes32ToHexString(hash);
    }

    // Funtion to convert bytes32 into hex string (needed to compare hashedData and hashed revealedData)
    function bytes32ToHexString(bytes32 _bytes) internal pure returns (string memory) {
        bytes memory s = new bytes(64);
        for (uint i = 0; i < 32; i++) {
            bytes1 b = _bytes[i];
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) % 16);
            s[2 * i] = charMod(hi);
            s[2 * i + 1] = charMod(lo);
        }
        return string(s);
    }

    // Function to convert bytes1 into hexadecimal character (process to converting into bytes32, needed to compare hashedData and hashed revealedData)
    function charMod(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x61 - 10);
    }

    // Getter function for validator chosen tags on a specific Video
    function getVideoTags(address company, uint256 videoId, address validator) public view returns (uint256[] memory) {
        return videos[company][videoId].revealedTags[validator];
    }

    // Function that terminate the smart contract
    function terminate() public {
        require(msg.sender == mtgTeam, "Only the owner can terminate the smart contract!");
        selfdestruct(payable(mtgTeam)); // This is deprecated but I do not see alternatives in this moment
    }
}