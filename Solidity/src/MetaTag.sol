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
    /// @notice To keep track of whitelisted companies by mtgTeam
    mapping(address => bool) public wlCompanies;
    /// @notice Mapping of balances for validators
    mapping(address => uint) public balanceValidators;
    /// @notice Mapping of the variable for validators, to keep track of the validators that are ready to tag a new video when the video is added
    mapping(address => bool) public variableValidators;
    /// @notice List of ready validators to perform the pseudo random decision
    address[] public readyValidators;
    /// @notice Mapping of validators' videos to keep track of the videos of every single validator (this is done mainly for the withdrawFundsValidator function)
    mapping(address => ValidatorVideo[]) public validatorVideos;
    /// @notice Mapping of the last block number when a video was added by a company (for withdrawFundsValidator function)
    mapping(address => uint) public lastVideoValidator;
    /// @notice Mapping of balances for companies
    mapping(address => uint) public balanceCompanies;
    /// @notice Mapping of videos submitted by companies (maily for calculateNeededTokens function)
    mapping(address => uint[]) public companyVideos;
    /// @notice Mapping of videos submitted by companies and their details
    mapping(address => mapping(uint => Video)) public videos;
    /// @notice Mapping of the last block number when a video was added by a company (for withdrawFundsCompany function)
    mapping(address => uint) public lastVideoCompany;

    /// @notice Structure for the video information given by the companies
    struct Video {
        /// @notice Video ID
        uint id;
        /// @notice Video length (rewards are based also on the length)
        uint length;
        /// @notice Timestamp when the video was added (to keep track of the three phases for the validators)
        uint timestamp;
        /// @notice Validators chosen for the video (done pseudo randomly)
        address[] chosenValidators;
        /// @notice Hashed data submitted by validators
        mapping(address => bytes32) hashedData;
        /// @notice Counter for hashed data submitted by validators (if all validators publish the hash they can go to the next phase)
        uint hashedCounter;
        /// @notice Tags revealed by validators (if all validators publish their tags they can go to the next phase)
        mapping(address => uint[]) revealedTags;
        /// @notice Validators who revealed their tags (needed because validators that performed the reveal may be less than the selected validators for the video because of time limit)
        uint revCounter;
    }
    /// @notice Structure for storing validator's videos
    struct ValidatorVideo {
        /// @notice Company who submitted the video
        address companyChosen;
        /// @notice ID of the chosen company's video
        uint videoIdChosen;
    }

    /// @notice These constants are here to facilitate in the future development of the DApp the preferences for the companies 
    /// @notice Number of possible tags
    uint constant tagsNumber = 20;
    /// @notice Percetage of acceptance for a tag
    uint constant confirmedTags = 80;
    /// @notice Percetage of ambiguity for a tag
    uint constant ambiguousTags = 30;
    /// @notice Minimum needed number of validators to accept a new video for tagging by a company
    uint constant minimumReadyValidators = 2;
    /// @notice Number of validators to choose tags for a video
    uint public constant validatorsQuantity = 2;
    /// @notice Predefined value to calculate rewards for validators
    uint constant rewardVariable = 2000;
    /// @notice Slashing quantity x * 1e18 tokens for not submitting the tag in time (for a single validator) or not a single confirmed tag for all validators (no agreement)
    uint constant noConfirmedOrNoRevealedTagSlash = 15;

    /// @notice Event emitted when a company is whitelisted
    event eventWhitelistCompany(address indexed company);
    /// @notice Event emitted when a company is removed from the whitelist
    event eventRemoveWhitelistCompany(address indexed company);
    /// @notice Event emitted when tokens are received from a validator
    event eventReceiveTokensFromValidator(address indexed validator, uint amount);
    /// @notice Event emitted when a validator modifies its participation variable
    event eventSetVariable(address indexed validator, bool indexed value);
    /// @notice Event emitted when a validator submits a hash for a video
    event eventSubmitHash(address indexed validator, address indexed company, uint indexed videoId, bytes32 hash);
    /// @notice Event emitted when a validator reveals their hash for a video
    event eventRevealHash(address indexed validator, address indexed company, uint indexed videoId, uint[] tags, bytes11 seed);
    /// @notice Event emitted when a validator withdraws its rewards for participating in video tagging
    event eventGetRewards(address indexed validator, address indexed company, uint indexed videoId, uint rewardAmount, bool positive);
    /// @notice Event emitted when a validator withdraws their funds from the contract
    event eventWithdrawFundsValidator(address indexed validator, uint amount);
    /// @notice Event emitted when tokens are received from a company
    event eventReceiveTokensFromCompany(address indexed company, uint amount);
    /// @notice Event emitted when a company adds a video for tagging
    event eventAddVideo(address indexed company, uint indexed videoId, address[] indexed chosenValidators);
    /// @notice Event emitted when a company withdraws their funds from the contract
    event eventWithdrawFundsCompany(address indexed company, uint amount);
    /// @notice Event emitted when tokens are exchanged for a voucher
    event eventMTGforVoucher(address indexed user);

    /// @notice Constructor function to initialize the MetaTag contract
    /// @param _mtgToken The address of the MTG token contract
    constructor(address _mtgToken) {
        mtgToken = IERC20(_mtgToken); // Initialize the MTG token contract
        mtgTeam = msg.sender; // Save the contract deployer's address as the team address
    }

    /// @notice Modifier to restrict access to MetaTag team
    modifier onlyTeam() {
        require(msg.sender == mtgTeam, "You are not MtgTeam!");
        _;
    }
    /// @notice Modifier to restrict access to whitelisted companies
    modifier onlyWhitelist() {
        require(wlCompanies[msg.sender] == true, "You are not a whitelisted company!");
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
        // If the company is registered as validator, remove it
        if (variableValidators[company]) {
            // Loop through the ready validators to find the company's index
            for (uint i = 0; i < readyValidators.length; i++) {
                if (readyValidators[i] == company) {
                    // Replace the company address with the last validator in the list
                    readyValidators[i] = readyValidators[readyValidators.length - 1];
                    // Remove the last validator from the list
                    readyValidators.pop();
                    // Set the company's participation status to false
                    variableValidators[company] = false;
                    break;
                }
            }
        }
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

    /// @notice Function for validators to send their tokens to the smart contract to participate in the DApp
    /// @param amount The amount of tokens to be sent by the validator
    function receiveTokensFromValidator(uint amount) public notCompany {
        // Transfer tokens from the validator's address to this contract and ensure the token transfer was successful, it requires the approve
        require(mtgToken.transferFrom(msg.sender, address(this), amount), "Token transfer failed!"); // 
        // Update the validator's token balance in this contract
        balanceValidators[msg.sender] += amount;
        // Emit an event indicating tokens were received from the validator
        emit eventReceiveTokensFromValidator(msg.sender, amount);
    }

    /// @notice Function for validators to announce their willingness to participate in the DApp
    function setVariable() public {
        // If the validator is already registered, remove it
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
            // This action can be performed only by a non-company
            require(wlCompanies[msg.sender] == false, "You are a company!");
            // Check if the validator has locked at least 50 tokens
            require(balanceValidators[msg.sender] >= 50 * 1e18, "You need to lock at least 50 tokens!"); 
            // Add the validator to the list of ready validators
            readyValidators.push(msg.sender);
            // Set the validator's participation status to true
            variableValidators[msg.sender] = true;
        }
        // Emit an event indicating the validator's participation status has been updated
        emit eventSetVariable(msg.sender, variableValidators[msg.sender]);
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

    /// @notice Function for validators to submit a hash for a video
    /// @param company The address of the company uploading the video
    /// @param videoId The ID of the video for which the hash is being submitted
    /// @param hash The hash of the video submitted by the validator
    function submitHash(address company, uint videoId, bytes32 hash) public {
        // Ensure the validator is chosen for the specified video
        require(isValidatorChosenForVideo(company, videoId, msg.sender), "Not a chosen validator for this video!");
        // Check if the submission time has not exceeded the allowed limit (24h)
        require(block.number <= videos[company][videoId].timestamp + 7200, "Submission time exceeded!");
        // Ensure the validator has not already submitted a hash for this video
        require((videos[company][videoId].hashedData[msg.sender]) == "","You cannot submit the hash twice!");
        // Store the submitted hash for the validator
        videos[company][videoId].hashedData[msg.sender] = hash;
        // Update the hashed counter
        videos[company][videoId].hashedCounter +=1;
        // Emit an event indicating the hash submission
        emit eventSubmitHash(msg.sender, company, videoId, hash);
    }

    /// @notice Function to check if the array of tags submitted by the validator has repeated values
    /// @param array Validator's array with his tags
    /// @return boolean value true or false
    function hasDuplicate(uint[] memory array) internal pure returns (bool) {
        for (uint i = 0; i < array.length - 1; i++) {
            for (uint j = i + 1; j < array.length; j++) {
                if (array[i] == array[j]) {
                    // Duplicate found
                    return true;
                }
            }
        }
        // No duplicates found
        return false;
    }

    /// @notice Function for validators to reveal their original value for a video
    /// @param company The address of the company uploading the video
    /// @param videoId The ID of the video for which the hash is being revealed
    /// @param tags The tags revealed by the validator for the video
    /// @param seed The seed used for hashing
    function revealHash(address company, uint videoId, uint[] memory tags, bytes11 seed) public {
        // Check on the number of tags submitted by the validator (max 10)
        require(tags.length <= tagsNumber/2, "You can submit at most half of the available tags!");
        // Check if the array of tags has duplicated tags
        require(hasDuplicate(tags) == false, "Your array has repeated values!");
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
        // Check if reveal is allowed (either reveal time greater than 24h or all validators have submitted their hashes)
        require((block.number > videos[company][videoId].timestamp + 7200) || (videos[company][videoId].hashedCounter == validatorsQuantity), "Reveal not yet allowed!");
        // Check if reveal time has not exceeded 48h
        require(block.number < videos[company][videoId].timestamp + 14400, "Reveal time exceeded!");
        // Ensure the validator has not already revealed tags for this video
        require(videos[company][videoId].revealedTags[msg.sender].length == 0,"You cannot submit the reveal twice!");
        // Store the revealed tags for the validator
        videos[company][videoId].revealedTags[msg.sender] = tags;
        // Add the validator to the list of revealing validators (needed for the getRewards function)
        videos[company][videoId].revCounter+=1;
        // Emit an event indicating the hash reveal
        emit eventRevealHash(msg.sender, company, videoId, tags, seed);
    }

    /// @notice Function for validators to claim rewards for participating in the tagging process of a video
    /// @param company The address of the company that uploaded the video
    /// @param videoId The ID of the video for which rewards are claimed
    function getRewards(address company, uint videoId) public {
        // Ensure withdrawal is allowed (either time has passed or all validators have revealed their hashes)
        require((block.number > videos[company][videoId].timestamp + 14400) || (videos[company][videoId].revCounter == videos[company][videoId].hashedCounter), "Withdraw not yet allowed!");
        // Ensure the caller is a chosen validator for this video
        require(isValidatorChosenForVideo(company, videoId, msg.sender), "Not a chosen validator for this video!");
        bool check = false;
        // Find and remove the validator's entry for the chosen video (to ensure one getRewards for video), done in this way because of withdrawFundsValidator
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
        require(check, "You cannot withdraw the reward twice!");
        // Number of validators that revealed their tags in time
        uint totalValidators = videos[company][videoId].revCounter;
        // Tags that reached 80% of votes
        uint totalConfirmedTags = 0;
        // Tags that reached 30% of votes
        uint totalAmbiguousTags = 0;
        // Tags that reached less than 30% of votes
        uint totalWrongTags = 0;
        uint validatorConfirmedTags = 0;
        uint validatorAmbiguousTags = 0;
        uint validatorWrongTags = 0;
        // Arrays to keep track of tag counts and status
        // There are 20 possible tags
        uint[tagsNumber] memory tagCounts;
        // Status: 1 for confirmed, 2 for ambiguous, 3 for wrong
        uint[tagsNumber] memory tagStatus; 
        // Tally votes for each tag by iterating through each validator's revealed tags
        for (uint i = 0; i < totalValidators; i++) {
            // Retrieve the tags revealed by the current validator
            uint[] memory tags = videos[company][videoId].revealedTags[msg.sender];
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
        // Handle cases where the validator hasn't revealed any tags or there is no agreement between validators (we want at least one confirmed tag)
        if (videos[company][videoId].revealedTags[msg.sender].length == 0 || totalConfirmedTags == 0)
        {
            // If the validator's balance is less than the threshold for no confirmed or no revealed tag slash him (possible if the validator has more than one tagging job at the same moment)
            if (balanceValidators[msg.sender] < noConfirmedOrNoRevealedTagSlash * 1e18) {
                // Set the validator's balance to zero
                balanceValidators[msg.sender] = 0;
            }
            else {
                // Deduct the threshold amount from the validator's balance
                balanceValidators[msg.sender] -= noConfirmedOrNoRevealedTagSlash * 1e18;
            }
            // Check if the validator has 50 tokens left in stake, if not remove him from the validators that are ready
            if (balanceValidators[msg.sender] < 50 * 1e18 && variableValidators[msg.sender]) {
                setVariable();
            }
            return;
        }
        // Calculate the number of confirmed, ambiguous, and wrong tags for the validator
        for (uint i = 0; i < videos[company][videoId].revealedTags[msg.sender].length; i++) {
            uint tag = videos[company][videoId].revealedTags[msg.sender][i];
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
        // Calculate the reward for the validator based on their tag categorizations
        // Initialize the base reward with a constant value
        uint reward = 1e26;
        if (totalConfirmedTags > 0) {
            // Add the confirmed tag reward proportionally based on the validator's confirmed tags compared to the total confirmed tags
            reward += validatorConfirmedTags * 1e18 / totalConfirmedTags;
        }
        if (totalAmbiguousTags > 0) {
            // Deduct the ambiguous tag penalty based on the validator's ambiguous tags compared to the total ambiguous tags
            reward -= (validatorAmbiguousTags * 1e20 / totalAmbiguousTags ) * 75 / 1e4;
        }
        if (totalWrongTags > 0) {
            // Deduct the wrong tag penalty based on validatorWrongTags, validatorConfirmedTags and totalConfirmedTags
            reward -= (validatorWrongTags * 125) * (125 * 1e16 - 1e18 * validatorConfirmedTags / totalConfirmedTags) / 1e2;
        }
        // Initialize the reward amount variable
        uint rewardAmount; 
        // Initialize a boolean variable to indicate if the reward is positive or negative for the event
        bool positive = true;
        // Distribute the reward or slash the validator's tokens based on their performance
        // If the reward is positive, calculate the reward amount and transfer it to the validator
        if (reward >= 1e26) {
            rewardAmount = (reward - 1e26) * videos[company][videoId].length * 1 / rewardVariable;
            // Deduct the reward amount from the company's balance
            balanceCompanies[company] -= rewardAmount; 
            // Add the reward amount to the validator's balance
            balanceValidators[msg.sender] += rewardAmount; 
        }
        // If the reward is negative, slash the validator's tokens
        else {
            // Calculate the slashed amount
            rewardAmount = (1e26 - reward) * videos[company][videoId].length * 1 / rewardVariable;
            // If the validator's balance is less than the slash (possible if the validator has more than one tagging job at the same moment)
            if (balanceValidators[msg.sender] < rewardAmount) {
                balanceValidators[msg.sender] = 0;
            }
            else {
                // Otherwise, deduct the slashed amount from the validator's balance
                balanceValidators[msg.sender] -= rewardAmount;
            }
            // Check if the validator has 50 tokens left in stake, if not remove him from the validators that are ready
            if (balanceValidators[msg.sender] < 50 * 1e18 && variableValidators[msg.sender]) {
                setVariable();
            }
            // Set the reward sign as negative
            positive = false;
        }
        // Emit an event indicating the reward distribution
        emit eventGetRewards(msg.sender, company, videoId, rewardAmount, positive);
    }

    /// @notice Allows validators to withdraw their accumulated rewards and funds from the smart contract
    function withdrawFundsValidator() public {
        // Ensure that the validator has turned off the variable
        require(!variableValidators[msg.sender], "You have to turn off the variable!");
        // Ensure that the validator cannot be slashed from videos
        require(block.number > lastVideoValidator[msg.sender] + 14400 || lastVideoValidator[msg.sender] == 0, "You cannot withdraw during a tagging session!");
        // Iterate through the validator's videos to withdraw all rewards
        while (validatorVideos[msg.sender].length != 0)
        {   
            // Call the getRewards function to claim rewards for the video
            getRewards(validatorVideos[msg.sender][0].companyChosen, validatorVideos[msg.sender][0].videoIdChosen);
        }
        // Withdraw the validator's balance from the contract
        uint amount = balanceValidators[msg.sender];
        balanceValidators[msg.sender] = 0;
        // Transfer 1% of the withdrawn amount to the MtgTeam address and 99% of the withdrawn amount to the validator
        require(mtgToken.transfer(mtgTeam, amount * 1/100) && mtgToken.transfer(msg.sender, amount * 99/100), "Transfer failed!");
        // Emit an event for the successful withdrawal
        emit eventWithdrawFundsValidator(msg.sender, amount * 99/100);
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
            // Generate a pseudo random index using block information, sender's address and index value
            uint randomIndex = uint(keccak256(abi.encodePacked(block.prevrandao, msg.sender, indexo))) % length;
            // Select a validator at the pseudo random index and store it in the output array
            selectedValidators[indexo] = readyFinal[randomIndex];
            // Replace the selected validator with the last validator in the array
            readyFinal[randomIndex] = readyFinal[length-1];
            // Decrease the length of the array to exclude the selected validator (done with assembly because normally it is not possible to pop from a memory array)
            assembly {mstore(readyFinal, sub(mload(readyFinal), 1))}
            // Move to choose the next validator
            indexo += 1;
            length -= 1;
        }
        // ONLY FOR TESTING (need to add second action above!)
        // Normally need to put the push and lastVideoValidator inside the while above
        for (uint i = 0; i < validatorsQuantity; i++) {
            selectedValidators[i] = readyValidators[i];
            validatorVideos[selectedValidators[i]].push(ValidatorVideo(msg.sender, videoId));
            lastVideoValidator[msg.sender] = block.number;
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
            // Check if the current video is still within the allowed time frame for rewards (10 days)
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

    /// @notice Allows companies to submit videos for tagging by selecting pseudo randomly validators and depositing the required tokens to reward the validators
    /// @param videoId The unique ID of the video being submitted
    /// @param videoLength The length of the video in seconds
    function addVideo(uint videoId, uint videoLength) public onlyWhitelist {
        // Require that there are at least the minimum number of ready validators
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
        lastVideoCompany[msg.sender] = block.number;
        // Require that the company has enough tokens deposited for the video tagging process
        require(balanceCompanies[msg.sender] >= calculateNeededTokens(), "Not enough MTG tokens in the smart contract, deposit the right amount!");
        // Emit an event to signal the addition of the video
        emit eventAddVideo(msg.sender, videoId, newVideo.chosenValidators);
    }

    /// @notice Allows companies to withdraw their funds from the smart contract
    function withdrawFundsCompany() public {
        // Ensure that 10 days have passed since the last video was added to give enough time to validators to withdraw their rewards
        require(block.number >= lastVideoCompany[msg.sender] + 72000 || lastVideoCompany[msg.sender] == 0, "You have to wait 10 days since adding the last video!");
        // Retrieve the amount of funds held by the company
        uint amount = balanceCompanies[msg.sender];
        // Deduct the withdrawn amount from the company's balance
        balanceCompanies[msg.sender] = 0;
        // Transfer 1% of the withdrawn amount to the contract owner (MTG Team) and 99% to the company's wallet
        require(mtgToken.transfer(mtgTeam, amount * 1/100) && mtgToken.transfer(msg.sender, amount * 99/100), "Transfer failed!");
        // Emit an event to log the withdrawal of funds by the company
        emit eventWithdrawFundsCompany(msg.sender, amount * 99/100);
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