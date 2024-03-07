// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @notice Import ERC20 token contract
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
/// @notice Import utility functions for strings
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title MetaTag contract for video tagging DApp
contract MetaTag {

    /// @notice ERC20 token used for transactions within the contract
    IERC20 public mtgToken;
    /// @notice Address of the team managing the contract
    address public mtgTeam;
    /// @notice Mapping of whitelisted companies
    mapping(address => bool) public wlCompanies;
    /// @notice Mapping of balances for companies
    mapping(address => uint) public balanceCompanies;
    /// @notice Mapping of videos submitted by companies
    mapping(address => uint[]) public companyVideos;
    /// @notice Mapping of variable validators
    mapping(address => bool) public variableValidators;
    /// @notice Mapping of balances for validators
    mapping(address => uint) public balanceValidators;
    /// @notice List of ready validators
    address[] public readyValidators;
    /// @notice Mapping of validators' videos
    mapping(address => ValidatorVideo[]) public validatorVideos;
    /// @notice Mapping of videos submitted by companies and their details
    mapping(address => mapping(uint => Video)) public videos;
    /// @notice Mapping of the last block number when a video was added by a company
    mapping(address => uint) public lastVideo;

    /// @notice Structure for the video information given by the companies
    struct Video {
        /// @notice Video ID
        uint id;
        /// @notice Video length
        uint length;
        /// @notice Validators chosen for the video
        address[] chosenValidators;
        /// @notice Timestamp when the video was added
        uint timestamp;
        /// @notice Hashed data submitted by validators
        mapping(address => bytes32) hashedData;
        /// @notice Tags revealed by validators
        mapping(address => uint[]) revealedTags;
        /// @notice Counter for hashed data submitted
        uint hashedCounter;
        /// @notice Validators who revealed their tags
        address[] revValidators;
    }
    /// @notice Structure for storing validator's videos
    struct ValidatorVideo {
        /// @notice Company who submitted the video
        address companyChosen;
        /// @notice ID of the chosen company's video
        uint videoIdChosen;
    }

    /// @notice Number of total tags
    uint constant tagsNumber = 20;
    /// @notice Percetage of acceptance for a tag
    uint constant confirmedTags = 80;
    /// @notice Percetage of ambiguity for a tag
    uint constant ambiguousTags = 30;
    /// @notice Minimum needed number of validators to accept a new video for tagging
    uint constant minimumReadyValidators = 15;
    /// @notice Number of validators to choose tags for a video
    uint constant validatorsQuantity = 10;
    /// @notice Predefined value to calculate rewards for validators
    uint constant rewardVariable = 2000;
    /// @notice Slashing quantity x * 1e18 for not submitting the tag in time (for a single validator) or not a single confirmed tag for all validators (no agreement)
    uint constant noConfirmedOrNoRevealedTagSlash = 15;
    
    /// @notice Event emitted when tokens are exchanged for a voucher
    event eventMTGforVoucher(address indexed validator);
    /// @notice Event emitted when a company is whitelisted
    event eventWhitelistCompany(address indexed company);
    /// @notice Event emitted when a company is removed from the whitelist
    event eventRemoveWhitelistCompany(address indexed company);
    /// @notice Event emitted when tokens are received from a validator
    event eventReceiveTokensFromValidator(address indexed company, uint amount);
    /// @notice Event emitted when a validator modifies its participation variable
    event eventSetVariable(address indexed validator, bool value);
    /// @notice Event emitted when a validator submits a hash for a video
    event eventSubmitHash(address indexed validator, address indexed company, uint videoId, bytes32 hash);
    /// @notice Event emitted when a validator reveals their hash for a video
    event eventRevealHash(address indexed validator, address indexed company, uint videoId, uint[] tags, bytes11 seed);
    /// @notice Event emitted when a validator withdraws its rewards for participating in video tagging
    event eventGetRewards(address indexed validator, address indexed company, uint videoId, uint rewardAmount, bool positive);
    /// @notice Event emitted when a validator withdraws their funds from the contract
    event eventWithdrawFundsValidator(address indexed validator, uint amount);
    /// @notice Event emitted when tokens are received from a company
    event eventReceiveTokensFromCompany(address indexed company, uint amount);
    /// @notice Event emitted when a company adds a video for tagging
    event eventAddVideo(address indexed emitter, uint videoId, address[] chosenValidators, uint timestamp);
    /// @notice Event emitted when a company withdraws their funds from the contract
    event eventWithdrawFundsCompany(address indexed company, uint amount);

    /// @notice Constructor function to initialize the MetaTag contract
    /// @param _mtgToken The address of the MTG token contract
    constructor(address _mtgToken) {
        mtgToken = IERC20(_mtgToken); // Initialize the MTG token contract
        mtgTeam = msg.sender; // Save the contract deployer's address as the team address
    }

    /// @notice Modifier to restrict access to whitelisted companies
    modifier onlyWhitelist() {
        require(wlCompanies[msg.sender] == true, "You are not a whitelisted company!");
        _;
    }
    /// @notice Modifier to restrict access to MetaTag team
    modifier onlyTeam() {
        require(msg.sender == mtgTeam, "You are not MtgTeam!");
        _;
    }
    /// @notice Modifier to restrict access to non-companies
    modifier notCompany() {
        require(wlCompanies[msg.sender] == false, "You are a company!");
        _;
    }

    /// @notice Whitelists a company, allowing it to access certain functionalities
    /// @param company The address of the company to be whitelisted
    function whitelistCompany(address company) public onlyTeam {
        // Set the company's whitelist status to true
        wlCompanies[company] = true;
        // Emit an event indicating the company was whitelisted
        emit eventWhitelistCompany(company); 
    }

    /// @notice Removes a company from the whitelist, restricting its access to certain functionalities
    /// @param company The address of the company to be removed from the whitelist
    function removeWhitelistCompany(address company) public onlyTeam {
        // Set the company's whitelist status to false
        wlCompanies[company] = false;
        // Emit an event indicating the company was removed from the whitelist
        emit eventRemoveWhitelistCompany(company);
    }

    /// @notice Function for validators to announce their willingness to participate in the DApp.
    function setVariable() public notCompany {
        // Check if the validator has locked at least 50 tokens
        require(balanceValidators[msg.sender] >= 50 * 1e18, "You need to lock at least 50 tokens!"); 
        // If the validator is already registered
        if (variableValidators[msg.sender]) {
            // Loop through the ready validators to find the validator's index
            for (uint i = 0; i < readyValidators.length; i++) {
                if (readyValidators[i] == msg.sender) {
                    // Replace the validator with the last validator in the list
                    readyValidators[i] = readyValidators[readyValidators.length - 1];
                    // Remove the last validator from the list
                    readyValidators.pop();
                    // Set the validator's participation status to false
                    variableValidators[msg.sender] = false;
                    break;
                }
            }
        }
        // If the validator is not registered
        else {
            // Add the validator to the list of ready validators
            readyValidators.push(msg.sender);
            // Set the validator's participation status to true
            variableValidators[msg.sender] = true;
        }
        // Emit an event indicating the validator's participation status has been updated
        emit eventSetVariable(msg.sender, variableValidators[msg.sender]);
    }

    /// @notice Function for validators to send their tokens to the smart contract to participate in the DApp
    /// @param amount The amount of tokens to be sent by the validator
    function receiveTokensFromValidator(uint amount) public notCompany {
        // Transfer tokens from the validator's address to this contract and ensure the token transfer was successful
        require(mtgToken.transferFrom(msg.sender, address(this), amount), "Token transfer failed!"); // 
        // Update the validator's token balance in this contract
        balanceValidators[msg.sender] += amount;
        // Emit an event indicating tokens were received from the validator
        emit eventReceiveTokensFromValidator(msg.sender, amount);
    }

    /// @notice Function for validators to submit a hash for a video.
    /// @param company The address of the company uploading the video
    /// @param videoId The ID of the video for which the hash is being submitted
    /// @param hash The hash of the video submitted by the validator
    function submitHash(address company, uint videoId, bytes32 hash) public {
        // Ensure the validator is chosen for the specified video
        require(isValidatorChosenForVideo(company, videoId, msg.sender), "Not a chosen validator for this video!");
        // Check if the submission time has not exceeded the allowed limit
        require(block.number <= videos[company][videoId].timestamp + 7200, "Submission time exceeded!");
        // Ensure the validator has not already submitted a hash for this video
        require((videos[company][videoId].hashedData[msg.sender]) == "","You cannot submit the hash twice!");
        // Store the submitted hash for the validator and update the hashed counter
        videos[company][videoId].hashedData[msg.sender] = hash;
        videos[company][videoId].hashedCounter +=1;
        // Emit an event indicating the hash submission
        emit eventSubmitHash(msg.sender, company, videoId, hash);
    }

    /// @notice Helper function to check if a validator is chosen for a specific video
    /// @param company The address of the company uploading the video
    /// @param videoId The ID of the video to check
    /// @param validator The address of the validator to check
    /// @return Whether the validator is chosen for the specified video
    function isValidatorChosenForVideo(address company, uint videoId, address validator) private view returns (bool) {
        // Iterate through the list of chosen validators for the video
        for (uint i = 0; i < videos[company][videoId].chosenValidators.length; i++) {
            // Check if the validator is in the list of chosen validators
            if (videos[company][videoId].chosenValidators[i] == validator) {
                return true;
            }
        }
        return false;
    }

    /// @notice Function for validators to reveal their original value for a video
    /// @param company The address of the company uploading the video
    /// @param videoId The ID of the video for which the hash is being revealed
    /// @param tags The tags revealed by the validator for the video
    /// @param seed The seed used for hashing
    function revealHash(address company, uint videoId, uint[] memory tags, bytes11 seed) public {
        // Encode the first tag into bytes
        bytes memory result = abi.encodePacked(Strings.toString(tags[0]));
        // Ensure the first tag is within the legal range
        require(tags[0] < tagsNumber, "Illegal first tag!");
        // Iterate through the remaining tags
        for (uint i = 1; i < tags.length; i++) {
            // Append each tag to the result
            result = abi.encodePacked(result, " ", Strings.toString(tags[i]));
            // Ensure each tag is within the legal range
            require(tags[i] < tagsNumber, "Illegal tag!");
        }
        // Ensure the hash of the revealed tags matches the stored hash
        require(videos[company][videoId].hashedData[msg.sender] == keccak256(abi.encodePacked(result, " ", seed)), "Hash mismatch!");
        // Check if reveal is allowed (either reveal time exceeded or all validators have submitted their hashes)
        require((block.number > videos[company][videoId].timestamp + 7200) || (videos[company][videoId].hashedCounter == validatorsQuantity), "Reveal not yet allowed!");
        // Check if reveal time has not exceeded
        require(block.number < videos[company][videoId].timestamp + 14400, "Reveal time exceeded!");
        // Ensure the validator has not already revealed tags for this video
        require(videos[company][videoId].revealedTags[msg.sender].length == 0,"You cannot submit the reveal twice!");
        // Store the revealed tags for the validator and add the validator to the list of revealing validators
        videos[company][videoId].revealedTags[msg.sender] = tags;
        videos[company][videoId].revValidators.push(msg.sender);
        // Emit an event indicating the hash reveal
        emit eventRevealHash(msg.sender, company, videoId, tags, seed);
    }

    /// @notice Function for validators to claim rewards for participating in the tagging process of a video
    /// @param company The address of the company that uploaded the video
    /// @param videoId The ID of the video for which rewards are claimed
    function getRewards(address company, uint videoId) public {
        // Ensure withdrawal is allowed (either time has passed or all validators have revealed their hashes)
        require((block.number > videos[company][videoId].timestamp + 14400) || (videos[company][videoId].revValidators.length == videos[company][videoId].hashedCounter), "Withdraw not yet allowed!");
        // Ensure the caller is a chosen validator for this video
        require(isValidatorChosenForVideo(company, videoId, msg.sender), "Not a chosen validator for this video!");
        bool check = false;
        // Find and remove the validator's entry for the chosen video (to ensure one getRewards), done in this way because of withdrawFundsValidator
        for (uint i = 0; i < validatorVideos[msg.sender].length; i++) {
            if (validatorVideos[msg.sender][i].companyChosen == company && validatorVideos[msg.sender][i].videoIdChosen == videoId) {
                uint lastIndex = validatorVideos[msg.sender].length - 1;
                validatorVideos[msg.sender][i] = validatorVideos[msg.sender][lastIndex];
                validatorVideos[msg.sender].pop();
                check = true;
                break;
            }
        }
        // Ensure the validator has not already withdrawn rewards for this video
        require(check, "You cannot withdraw twice!");
        // Number of validators that revealed their tags in time
        uint totalValidators = videos[company][videoId].revValidators.length;
        // Tags that reached 80% of votes
        uint totalConfirmedTags = 0;
        // Tags that reached 30% of votes
        uint totalAmbiguousTags = 0;
        // Tags that reached less than 30% of votes
        uint totalWrongTags = 0;
        uint validatorConfirmedTags = 0;
        uint validatorAmbiguousTags = 0;
        uint validatorWrongTags = 0;
        uint videoLength = videos[company][videoId].length;
        // Arrays to keep track of tag counts and status
        // There are 20 possible tags
        uint[tagsNumber] memory tagCounts;
        // Status: 1 for confirmed, 2 for ambiguous, 3 for wrong
        uint[tagsNumber] memory tagStatus; 
        // Tally votes for each tag by iterating through each validator's revealed tags
        for (uint i = 0; i < totalValidators; i++) {
            // Retrieve the tags revealed by the current validator
            uint[] memory tags = videos[company][videoId].revealedTags[videos[company][videoId].revValidators[i]];
            // Iterate through the revealed tags and update the count for each tag
            for (uint j = 0; j < tags.length; j++) {
                tagCounts[tags[j]]++;
            }
        }
        // Categorize tags and count totals for each category based on the accumulated tag counts
        for (uint i = 0; i < tagsNumber; i++) {
            // Check if the percentage of votes for the current tag exceeds the threshold for confirmed tags
            if (tagCounts[i] * 100 >= totalValidators * confirmedTags) {
                tagStatus[i] = 1;
                totalConfirmedTags++;
            } 
            // Check if the percentage of votes for the current tag exceeds the threshold for ambiguous tags
            else if (tagCounts[i] * 100 >= totalValidators * ambiguousTags) {
                tagStatus[i] = 2;
                totalAmbiguousTags++;
            } 
            // If the tag has some votes but doesn't meet the criteria for confirmation or ambiguity, categorize it as wrong
            else if (tagCounts[i] > 0) {
                tagStatus[i] = 3;
                totalWrongTags++;
            }
        }
        // Calculate the number of confirmed, ambiguous, and wrong tags for the validator
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
        // Handle cases where the validator hasn't revealed any tags or there is no agreement between validators (at least one confirmed tag)
        if (senderTags.length == 0 || totalConfirmedTags == 0)
        {
            // Calculate the validator's balance in this contract
            uint bln = balanceValidators[msg.sender];
            // If the validator's balance is less than the threshold for no confirmed or no revealed tag slash (possible if the validator has more than one tagging job at the same moment)
            if (bln < noConfirmedOrNoRevealedTagSlash * 1e18) {
                // Set the validator's balance to zero and his variable to false
                balanceValidators[msg.sender] = 0;
                variableValidators[msg.sender] = false;
            }
            else {
                // Deduct the threshold amount from the validator's balance
                balanceValidators[msg.sender] -= noConfirmedOrNoRevealedTagSlash * 1e18;
            }
            return;
        }
        // Calculate the reward for the validator based on their tag categorizations
        // Initialize the base reward with a constant value
        uint reward = 1e26;
        if (totalConfirmedTags > 0) {
            // Add the confirmed tag reward proportionally based on the validator's confirmed tags compared to the total confirmed tags
            reward += (validatorConfirmedTags * 1e18 / totalConfirmedTags);
        }
        if (totalAmbiguousTags > 0) {
            // Deduct the ambiguous tag penalty based on the validator's ambiguous tags compared to the total ambiguous tags
            reward -= (validatorAmbiguousTags * 1e20 / totalAmbiguousTags ) * 75 / 10000;
        }
        if (totalWrongTags > 0) {
            // Deduct the wrong tag penalty based on validatorWrongTags, validatorConfirmedTags and totalConfirmedTags
            reward -= (validatorWrongTags * 125) * (125 * 1e16 - 1e18 * validatorConfirmedTags / totalConfirmedTags) / 100 ;
        }
        // Initialize the reward amount variable
        uint rewardAmount; 
        // Initialize a boolean variable to indicate if the reward is positive or negative
        bool positive = true; 
        // Distribute the reward or slash the validator's tokens based on their performance
        if (reward >= 1e26) {
            // If the reward is positive, calculate the reward amount and transfer it to the validator
            rewardAmount = (reward - 1e26) * videoLength * 1 / rewardVariable;
            // Deduct the reward amount from the company's balance
            balanceCompanies[company] -= rewardAmount; 
            // Add the reward amount to the validator's balance
            balanceValidators[msg.sender] += rewardAmount; 
        } 
        else {
            // If the reward is negative, slash the validator's tokens
            // Calculate the slashed amount
            rewardAmount = (1e26 - reward) * videoLength * 1 / rewardVariable;
            // Get the validator's balance in this contract
            uint bln = balanceValidators[msg.sender]; 
            if (bln < rewardAmount) {
                // If the validator's balance is less than the slash (possible if the validator has more than one tagging job at the same moment)
                balanceValidators[msg.sender] = 0;
                variableValidators[msg.sender] = false;
            }
            else {
                // Otherwise, deduct the slashed amount from the validator's balance
                balanceValidators[msg.sender] -= rewardAmount;
            }
            // Set the reward sign as negative
            positive = false; 
        }
        // Emit an event indicating the reward distribution
        emit eventGetRewards(msg.sender, company, videoId, rewardAmount, positive);
    }

    /// @notice Allows validators to withdraw their accumulated rewards and funds from the smart contract
    function withdrawFundsValidator() public notCompany {
        // Ensure that the validator has turned off the variable
        require(!variableValidators[msg.sender], "You have to turn off the variable!");
        // Initialize a variable to iterate through the validator's videos
        uint val = 0;
        // Iterate through the validator's videos to check for rewards eligibility
        while (val < validatorVideos[msg.sender].length)
        {   
            address company = validatorVideos[msg.sender][val].companyChosen;
            uint videoId = validatorVideos[msg.sender][val].videoIdChosen;
            // Check if the withdrawal time conditions are met for the video
            if ((block.number > videos[company][videoId].timestamp + 7200) || (videos[company][videoId].hashedCounter == validatorsQuantity)) {
                // Call the getRewards function to claim rewards for the video
                getRewards(company, videoId);
            }
            else {
                // Move to the next video if withdrawal conditions are not met
                val++;
            }
        }
        // Withdraw the validator's balance from the contract
        uint amount = balanceValidators[msg.sender];
        balanceValidators[msg.sender] = 0;
        // Transfer 1% of the withdrawn amount to the MtgTeam address
        require(mtgToken.transfer(mtgTeam, amount * 1/100), "Transfer failed!");
        // Transfer 99% of the withdrawn amount to the validator
        require(mtgToken.transfer(msg.sender, amount * 99/100), "Transfer failed!");
        // Emit an event for the successful withdrawal
        emit eventWithdrawFundsValidator(msg.sender, amount);
    }

    /// @notice Allows whitelisted companies to deposit tokens for video tagging
    /// @param amount The amount of tokens to deposit
    function receiveTokensFromCompany(uint amount) public onlyWhitelist {
        // Ensure that the company is not also registered as a validator
        require(!variableValidators[msg.sender], "You cannot be both a validator and a company!");
        // Transfer tokens from the company's address to this contract
        require(mtgToken.transferFrom(msg.sender, address(this), amount), "Token transfer failed!");
        // Update the company's token balance in this contract
        balanceCompanies[msg.sender] += amount;
        // Emit an event to log the token deposit
        emit eventReceiveTokensFromCompany(msg.sender, amount);
    }

    /// @notice Allows companies to submit videos for tagging by selecting pseudo randomly validators and depositing the required tokens to reward the validators.
    /// @param videoId The unique ID of the video being submitted
    /// @param videoLength The length of the video in seconds
    function addVideo(uint videoId, uint videoLength) public onlyWhitelist {
        // Require that there are at least the minimum required number of ready validators
        require(readyValidators.length >= minimumReadyValidators, "There should be a minimum of 15 ready validators!");
        // Require that the video ID does not already exist for this company
        require(videos[msg.sender][videoId].id == 0, "Video ID already exists for this company!");
        // Add the video ID to the list of company's videos (needed for calculateNeededTokens function)
        companyVideos[msg.sender].push(videoId);
        // Create a new video object and initialize its properties
        Video storage newVideo = videos[msg.sender][videoId];
        newVideo.length = videoLength;
        newVideo.chosenValidators = randomChooseValidators(videoId);
        newVideo.timestamp = block.number;
        // Update the timestamp of the last submitted video for the company (needed for withdrawFundsCompany function)
        lastVideo[msg.sender] = block.number;
        // Require that the company has enough tokens deposited for the video tagging process
        require(balanceCompanies[msg.sender] >= calculateNeededTokens(), "Not enough MTG tokens in the smart contract, deposit the right amount!");
        // Emit an event to signal the addition of the video
        emit eventAddVideo(msg.sender, videoId, newVideo.chosenValidators, block.number);
    }
    
    /// @notice Pseudo randomly selects validators for a video
    /// @param videoId The ID of the video for which validators are being selected
    /// @return An array of addresses representing the selected validators for the video
    function randomChooseValidators(uint videoId) internal returns (address[] memory) {
        // Initialize an array to store the selected validators
        address[] memory selectedValidators = new address[](validatorsQuantity);
        // Copy the current list of ready validators into a temporary array
        address[] memory readyFinal = readyValidators;
        // Get the length of the ready validators array
        uint length = readyFinal.length;
        // Initialize variables for loop iteration and validator index
        uint indexo = 0;
        // Iterate until the required number of validators is selected
        while (indexo != validatorsQuantity) {
            // Generate a random index using block information and sender's address
            uint randomIndex = uint(keccak256(abi.encodePacked(block.prevrandao, msg.sender, indexo))) % length;
            // Select a validator at the random index and store it in the selected validators array
            selectedValidators[indexo] = readyFinal[randomIndex];
            // Replace the selected validator with the last validator in the array
            readyFinal[randomIndex] = readyFinal[length-1];
            // Decrease the length of the array to exclude the selected validator
            assembly { mstore(readyFinal, sub(mload(readyFinal), 1))}
            // Move to choose the next validator
            indexo += 1;
            length -= 1;
        }
        // ONLY FOR TESTING (need to add second action above!)
        // Add the selected validators to the list of validators for the video
        for (uint i = 0; i < validatorsQuantity; i++) {
            selectedValidators[i] = readyValidators[i];
            validatorVideos[selectedValidators[i]].push(ValidatorVideo(msg.sender,videoId));
        }
        // ONLY FOR TESTING
        // Return the array of selected validators
        return selectedValidators;
    }

    /// @notice Calculates the total number of tokens that a company needs to have before adding a new video
    /// @return The total number of tokens needed by the company
    function calculateNeededTokens() internal returns (uint) {
        // Initialize the variable to store the total needed tokens
        uint neededTokens = 0;
        // Get the total number of videos uploaded by the company
        uint last = companyVideos[msg.sender].length;
        // Initialize a counter for video index
        uint e = 0;
        // Iterate through each video uploaded by the company
        while (e < last) {
            // Check if the current video is still within the allowed time frame for tagging
            if (block.number < videos[msg.sender][companyVideos[msg.sender][e]].timestamp + 72000) {
                // Calculate the tokens needed for the current video and add to the total needed tokens
                neededTokens += 1e18 * videos[msg.sender][companyVideos[msg.sender][e]].length * validatorsQuantity * 1/rewardVariable;
                // Move to the next video
                e += 1;
            }
            else {
                // If the current video has exceeded the time frame, remove it from the list of pending videos
                companyVideos[msg.sender][e] = companyVideos[msg.sender][last - 1];
                companyVideos[msg.sender].pop();
            }
        }
        // Return the total needed tokens for pending videos
        return neededTokens;
    }

    /// @notice Allows whitelisted companies to withdraw their funds from the smart contract
    function withdrawFundsCompany() public onlyWhitelist {
        // Ensure that 10 days have passed since the last video was added to give enough time to validators to withdraw their rewards
        require(block.number >= lastVideo[msg.sender] + 72000 , "You have to wait 10 days since adding the last video!");
        // Retrieve the amount of funds held by the company
        uint amount = balanceCompanies[msg.sender];
        // Deduct the withdrawn amount from the company's balance
        balanceCompanies[msg.sender] = 0;
        // Transfer 1% of the withdrawn amount to the contract owner (MtG Team)
        require(mtgToken.transfer(mtgTeam, amount * 1/100), "Transfer to team failed!");
        // Transfer the remaining 99% of the withdrawn amount to the company's wallet
        require(mtgToken.transfer(msg.sender, amount * 99/100), "Transfer to wallet failed!");
        // Emit an event to log the withdrawal of funds by the company
        emit eventWithdrawFundsCompany(msg.sender, amount);
    }

    /// @notice Allows users to exchange 100 MTG tokens for a voucher
    /// @return Returns true if the exchange is successful
    function MTGforVoucher() public returns (bool) {
        // Ensure the sender is not the contract owner
        require(msg.sender != mtgTeam, "You cannot be the team!");
        // Transfer MTG tokens from the sender to the contract owner
        require(mtgToken.transferFrom(msg.sender, mtgTeam, 1e20), "Token transfer failed!");
        // Emit an event to log the voucher exchange
        emit eventMTGforVoucher(msg.sender);
        // Return true to indicate a successful exchange
        return true;
    }

    /// @notice Allows MtgTeam to terminate the smart contract
    function terminate() public onlyTeam {
        // Deprecated but there is no alternative at this moment
        selfdestruct(payable(mtgTeam)); 
    }
}