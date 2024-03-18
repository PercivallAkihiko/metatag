const companies = {
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": 'YouTube'
};

const companiesReverse = {
    'YouTube': "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
};

const numberOfValidators = 2;

var dAppExternal;
var accountExternal;
document.addEventListener('DOMContentLoaded', async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            // Get first account loaded by Metamask
            const account = accounts[0];
            accountExternal = account;
            // Write the short address in the display
            document.getElementById('userAddress').textContent = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
            const web3 = new Web3(window.ethereum);
            // Load the contract addresses
            const contractAddressToken = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
            const contractAddressDApp = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
            // Fetch and setup the token contract instance
            const tokenData = await fetch('../Solidity/out/MetaTagToken.sol/MetaTagToken.json').then(response => response.json());
            const tokenContract = new web3.eth.Contract(tokenData.abi, contractAddressToken);
            // Similarly, fetch and setup the dApp contract instance
            const dAppData = await fetch('../Solidity/out/MetaTag.sol/MetaTag.json').then(response => response.json());
            var dAppContract = new web3.eth.Contract(dAppData.abi, contractAddressDApp);
            dAppExternal = dAppContract;

            // Check if validator variable is on or off
            setInitialSwitchState();
            // Get token amount displayed (both DApp and token)
            getTokensAmount();

            // Check validator's variable function
            async function getTokensAmount() {
                // Make sure dAppContract is defined and available here
                const dAppValue = await dAppContract.methods.balanceValidators(account).call();
                const tokenValue = await tokenContract.methods.balanceOf(account).call();
                const readableBalance = web3.utils.fromWei(dAppValue, 'ether');
                const readableBalance2 = web3.utils.fromWei(tokenValue, 'ether');
                document.getElementById('totalToken').innerHTML = parseFloat(readableBalance) + parseFloat(readableBalance2);
                document.getElementById('totalLock').innerHTML = parseFloat(readableBalance) + parseFloat(readableBalance2);
                document.getElementById('liquidTokens').innerHTML = parseFloat(readableBalance2);
                document.getElementById('lockedTokens').innerHTML = parseFloat(readableBalance);
            }

            // Get validator's total token amount
            async function setInitialSwitchState() {
                // Make sure dAppContract is defined and available here
                const isValidator = await dAppContract.methods.variableValidators(account).call();
                document.getElementById('toggleSwitch').checked = isValidator;
            }

            // Listen for the eventBuyTokens event
            tokenContract.events.eventBuyTokens({
                    filter: {
                        sender: account
                    },
                    fromBlock: 'latest'
                })
                .on('data', function(event) {
                    const readableBalance = web3.utils.fromWei(event.returnValues.amount, 'ether');
                    document.getElementById('totalToken').innerHTML = parseFloat(document.getElementById('totalToken').innerHTML) + parseFloat(readableBalance);
                    document.getElementById('totalLock').innerHTML = parseFloat(document.getElementById('totalToken').innerHTML);
                    document.getElementById('liquidTokens').innerHTML = parseFloat(document.getElementById('liquidTokens').innerHTML) + parseFloat(readableBalance);
                })
                .on('error', console.error);

            // Listen for the MTGforVoucher event
            dAppContract.events.eventMTGforVoucher({
                    filter: {
                        sender: account
                    },
                    fromBlock: 'latest'
                })
                .on('data', function(event) {
                    //console.log(event);
                    document.getElementById('totalToken').innerHTML = parseFloat(document.getElementById('totalToken').innerHTML) - 100;
                    document.getElementById('totalLock').innerHTML = parseFloat(document.getElementById('totalToken').innerHTML);
                    document.getElementById('liquidTokens').innerHTML = parseFloat(document.getElementById('liquidTokens').innerHTML) - 100;
                })
                .on('error', console.error);

            // Listen for the eventReceiveTokensFromValidator event
            dAppContract.events.eventReceiveTokensFromValidator({
                    filter: {
                        sender: account
                    },
                    fromBlock: 'latest'
                })
                .on('data', function(event) {
                    //console.log(event);
                    const readableBalance = web3.utils.fromWei(event.returnValues.amount, 'ether');
                    document.getElementById('liquidTokens').innerHTML = parseFloat(document.getElementById('liquidTokens').innerHTML) - parseFloat(readableBalance);
                    document.getElementById('lockedTokens').innerHTML = parseFloat(document.getElementById('lockedTokens').innerHTML) + parseFloat(readableBalance);
                })
                .on('error', console.error);

            // Listen for the eventWithdrawFundsValidator event
            dAppContract.events.eventWithdrawFundsValidator({
                    filter: {
                        sender: account
                    },
                    fromBlock: 'latest'
                })
                .on('data', function(event) {
                    //console.log(event);
                    const readableBalance = web3.utils.fromWei(event.returnValues.amount, 'ether');
                    document.getElementById('liquidTokens').innerHTML = parseFloat(document.getElementById('liquidTokens').innerHTML) + parseFloat(readableBalance);
                    document.getElementById('lockedTokens').innerHTML = 0;
                    document.getElementById('totalToken').innerHTML = parseFloat(document.getElementById('liquidTokens').innerHTML);
                    document.getElementById('totalLock').innerHTML = parseFloat(document.getElementById('liquidTokens').innerHTML);
                })
                .on('error', console.error);

            waitForEvents();

            // Token purchase function
            document.getElementById('buy_button').addEventListener('click', async () => {
                // Get the ETH amount from the input
                const ethAmount = document.getElementById('ethToBuy').value;
                // Convert ETH to Wei
                const weiValue = web3.utils.toWei(ethAmount, 'ether');
                try {
                    const receipt = await tokenContract.methods.buyTokens().send({
                        from: account,
                        value: weiValue
                    });
                    //console.log('Transaction successful:', receipt);
                } catch (error) {
                    console.error('Transaction failed:', error);
                }
            });

            // Lock validator tokens function with approval
            document.getElementById('lockValidator').addEventListener('click', async () => {
                // The amount in tokens
                const MTGAmount = document.getElementById('MTGLockAmount').value;
                // Convert amount to Wei for consistency with token decimals
                const tokensInWei = web3.utils.toWei(MTGAmount, 'ether');
                try {
                    // Check current allowance
                    const allowance = await tokenContract.methods.allowance(account, contractAddressDApp).call();
                    if (new web3.utils.BN(allowance).lt(new web3.utils.BN(tokensInWei))) {
                        // If allowance is less than the amount to be transferred, approve it
                        await tokenContract.methods.approve(contractAddressDApp, tokensInWei).send({
                            from: account
                        });
                        //console.log('Approval successful');
                    } else {
                        //console.log('Approval not needed, sufficient allowance.');
                    }

                    // Proceed with the function call after ensuring sufficient allowance
                    const receipt = await dAppContract.methods.receiveTokensFromValidator(tokensInWei).send({
                        from: account
                    });
                    //console.log('Transaction successful:', receipt);
                } catch (error) {
                    console.error('Transaction failed:', error);
                }
            });

            // Validator's setVariable
            document.getElementById('toggleSwitch').addEventListener('click', async () => {
                try {
                    const receipt = await dAppContract.methods.setVariable().send({
                        from: account
                    });
                    //console.log('setVariable transaction successful:', receipt);
                } catch (error) {
                    console.error('Failed to send setVariable transaction:', error);
                    const checkbox = document.getElementById('toggleSwitch');
                    checkbox.checked = !checkbox.checked;
                }
            });

            // Validator's withdrawFundsValidator
            document.getElementById('withdrawValidator').addEventListener('click', async () => {
                try {
                    const receipt = await dAppContract.methods.withdrawFundsValidator().send({
                        from: account
                    });
                    //console.log('withdrawFundsValidator transaction successful:', receipt);
                } catch (error) {
                    //console.error('Failed to send withdrawFundsValidator transaction:', error);
                }
            });

            // Validator's buyVoucher
            document.getElementById('buyVoucher').addEventListener('click', async () => {
                // The amount in tokens
                const MTGAmount = "100";
                // Convert amount to Wei for consistency with token decimals
                const tokensInWei = web3.utils.toWei(MTGAmount, 'ether');
                try {
                    // Check current allowance
                    const allowance = await tokenContract.methods.allowance(account, contractAddressDApp).call();
                    if (new web3.utils.BN(allowance).lt(new web3.utils.BN(tokensInWei))) {
                        // If allowance is less than the amount to be transferred, approve it
                        await tokenContract.methods.approve(contractAddressDApp, tokensInWei).send({
                            from: account
                        });
                        //console.log('Approval successful');
                    } else {
                        //console.log('Approval not needed, sufficient allowance.');
                    }
                    const receipt = await dAppContract.methods.MTGforVoucher().send({
                        from: account
                    });
                    //console.log('buyVoucher transaction successful:', receipt);
                    document.querySelector('.voucher_value').innerHTML = generateVoucher();
                } catch (error) {
                    console.error('Failed to send buyVoucher transaction:', error);
                }
            });
        } catch (error) {
            console.error('An error occurred:', error);
            document.getElementById('userAddress').textContent = 'Error fetching address.';
        }
    } else {
        document.getElementById('userAddress').textContent = 'MetaMask is not installed.';
    }
    // Event listener for the disconnect button
    document.getElementById('disconnectButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

// Function used to generate a random voucher (normally it should be retrieved with an API from YouTube)
function generateVoucher() {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
            code += '-';
        }
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// API call to retrieve the Youtube video title
async function fetchYouTubeVideoTitle(videoId) {
    const apiKey = 'AIzaSyCac5ikDuUb0bSNO1KtbiEdNp7fycWtn78';
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.items.length > 0) {
            return data.items[0].snippet.title;
        } else {
            return 'Title not found';
        }
    } catch (error) {
        console.error('Error fetching video title:', error);
        return 'Error fetching title';
    }
}

async function externalSubmitHash(seed, tagList, videoId, company) {
    try {
        const receipt = await dAppExternal.methods.submitHash(companiesReverse[company], asciiToDecimal(videoId.toString()), hashTagListAndSeed(tagList, seed)).send({
            from: accountExternal
        });
        //console.log('submitHash transaction successful:', receipt);
    } catch (error) {
        console.error('Failed to send submitHash transaction:', error);
    }
}

// Validator's revealHash
async function externalRevealHash(videoId, company)
{
    try {
        const videoCookie = getCookie(videoId);
        const seed = stringToBytes11(videoCookie["seed"]);
        const tagList = videoCookie["list"];
        //console.log(companiesReverse[company]);
        //console.log(asciiToDecimal(videoId));
        //console.log(tagList);
        //console.log(seed);
        const receipt = await dAppExternal.methods.revealHash(companiesReverse[company], asciiToDecimal(videoId), tagList, seed).send({
            from: accountExternal
        });
        //console.log('submitHash transaction successful:', receipt);
    } catch (error) {
        console.error('Failed to send submitHash transaction:', error);
    }
}

// Validator's getRewards
async function externalGetRewards(videoId, company)
{
    try {
        const receipt = await dAppExternal.methods.getRewards(companiesReverse[company], asciiToDecimal(videoId)).send({
            from: accountExternal
        });

    } catch (error) {
        console.error('Failed to send submitHash transaction:', error);
    }
}


// Function used to transfor an ASCII string into Integer to pass as input at the addVideo function of the smart contract
function asciiToDecimal(asciiString) {
    let decimalString = '';
    for (let i = 0; i < asciiString.length; i++) {
        let decimalValue = asciiString.charCodeAt(i).toString();
        // Add a leading 0 if the decimalValue length is 2, except for the first character
        if (decimalValue.length === 2 && i !== 0) {
            decimalValue = '0' + decimalValue;
        }
        decimalString += decimalValue;
    }
    return decimalString;
}

// Function to calculate the kecca256 to pass as input to submitHash
function hashTagListAndSeed(tagList, seed) {
    // Ensure the seed length is 11
    if (seed.length !== 11) {
        throw new Error('Seed must have a length of 11 characters');
    }
    // Convert the array of integers to a string, with elements separated by spaces
    const tagListString = tagList.join(' ');
    // Concatenate the tagList string and the seed, separated by a space
    const inputString = `${tagListString} ${seed}`;
    // Compute and return the Keccak-256 hash
    return "0x" + keccak256(inputString);
}

// Function to convert decimal videoID to string type
function decimalToString(decimal) {
    let asciiString = '';
    let firstCharLength = decimal.length % 3 === 0 ? 3 : 2;
    asciiString += String.fromCharCode(parseInt(decimal.substr(0, firstCharLength), 10));
    for (let i = firstCharLength; i < decimal.length; i += 3) {
        let charCodeStr = decimal.substr(i, 3);
        asciiString += String.fromCharCode(parseInt(charCodeStr, 10));
    }
    return asciiString
}

// Function to retrieve addVideo events
function waitForEvents() {
    dAppExternal.getPastEvents('eventAddVideo', {
        fromBlock: 0,
        toBlock: 'latest'
    }).then(events => {
        for (let i = 0; i < events.length; i++) {
            if (events[i].returnValues[2].map(v => v.toLowerCase()).includes(accountExternal)) {
                let video = events[i].returnValues[1];
                let asciiString = decimalToString(video);
                fetchYouTubeVideoTitle(asciiString)
                    .then(title => {
                        const newVideoEntry = {
                            hashId: asciiString,
                            title: title,
                            company: companies[events[i].returnValues[0]],
                            link: "www.google.it",
                            status: 1,
                            leftvote: 0,
                            reward: "-",
                            results: []
                        };
                        // Push the new entry into videoDB
                        videoDB.push(newVideoEntry);
                        loadVoteList(1);
                        waitForEventSubmitHash(events[i].returnValues[0], video);
                    })
                    .catch(error => console.error(error));;
            }
        }
    }).catch(err => console.error(err));
}

// Event to get list of videos in which the validator has to wait
function waitForEventRevealHash(company1, video1) {
    dAppExternal.getPastEvents('eventRevealHash', {
        filter: {
            validator: accountExternal,
            company: company1,
            videoId: video1
        },
        fromBlock: 0,
        toBlock: 'latest'
    }).then(events => {
        if (events.length != 0) {
            for (let i = 0; i < videoDB.length; i++) {
                if (videoDB[i].company === companies[company1] && videoDB[i].hashId === decimalToString(video1)) {
                    videoDB[i].status = 4;
                    loadVoteList(1);
                    getRevealedCounter(company1, videoDB[i].hashId).then(RevealedCounter => {
                        videoDB[i].leftvote = numberOfValidators - RevealedCounter;
                        if (numberOfValidators - RevealedCounter == 0)
                        {
                            videoDB[i].status = 5;
                            loadVoteList(1);
                            waitForEventGetRewards(video1, company1);
                        }
                    });
                    break;
                }
            }
        }
    }).catch(err => console.error(err));
}

// Event to get list of videos in which the validator has to wait
function waitForEventGetRewards(video1, company1) {
    dAppExternal.getPastEvents('eventGetRewards', {
        filter: {
            validator: accountExternal,
            company: company1,
            videoId: video1
        },
        fromBlock: 0,
        toBlock: 'latest'
    }).then(events => {
        if (events.length != 0) {
            for (let i = 0; i < videoDB.length; i++) {
                if (videoDB[i].company === companies[company1] && videoDB[i].hashId === decimalToString(video1)) {
                    videoDB[i].status = 6;
                    EventsRevealHash(video1, company1).then(output => {
                        videoDB[i].results = output;
                    })
                    .catch(error => console.error(error));;
                    loadVoteList(1);
                    break;
                }
            }
        }
    }).catch(err => console.error(err));
}

// Event to get list of videos in which the validator has to wait
function waitForEventSubmitHash(company, video) {
    dAppExternal.getPastEvents('eventSubmitHash', {
        filter: {
            validator: accountExternal,
            company: company,
            videoId: video
        },
        fromBlock: 0,
        toBlock: 'latest'
    }).then(events => {
        if (events.length != 0) {
        updateVideoStatusByUniqueCompanyAndHashId(videoDB, events[0].returnValues[1], decimalToString(events[0].returnValues[2]));
        waitForEventRevealHash(events[0].returnValues[1], events[0].returnValues[2]);
        }
    }).catch(err => console.error(err));
}

// Update a video thanks to events when a user upload hash
function updateVideoStatusByUniqueCompanyAndHashId(videoDB, company, videoId) {
    for (let i = 0; i < videoDB.length; i++) {
        if (videoDB[i].company === companies[company] && videoDB[i].hashId === videoId) {
            videoDB[i].status = 2;
            loadVoteList(1);
            getHashedCounter(company, videoId).then(hashedCounter => {
                videoDB[i].leftvote = numberOfValidators - hashedCounter;
                if (numberOfValidators - hashedCounter == 0)
                {
                    videoDB[i].status = 3;
                    loadVoteList(1);
                }
            });
            // Stop searching once the match is found and updated
            break;
        }
    } 
}

// Retrieve number of validators that submitted their hashes
function getHashedCounter(address, videoId) {
    const hashedCounter = dAppExternal.methods.videos(address, asciiToDecimal(videoId)).call().then((video) => video.hashedCounter);
    return hashedCounter;
}

// Retrieve number of validators that revealed their hashes
function getRevealedCounter(address, videoId) {
    const RevealedCounterino = dAppExternal.methods.videos(address, asciiToDecimal(videoId)).call().then((video) => video.revCounter);
    return RevealedCounterino;
}

// Convert string into Bytes11
function stringToBytes11(str) {
    // Convert the string to a hex string
    let hex = '';
    for(let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16);
    }
    // Ensure the hex string is no longer than 22 characters (11 bytes)
    hex = hex.slice(0, 22);
    // Pad the hex string to ensure it represents exactly 11 bytes
    while(hex.length < 22) {
        hex += '0'; // Pad with trailing zeros (adjust if different padding is required)
    }
    return '0x' + hex; // Prefix with '0x' to denote a hex string
}

// To get the tags voted by the validators
function EventsRevealHash(video1, company1) {
    // Return the promise chain
    return dAppExternal.getPastEvents('eventRevealHash', {
        filter: {
            company: company1,
            videoId: video1
        },
        fromBlock: 0,
        toBlock: 'latest'
    }).then(events => {
        if (events.length != 0) {
            let combined = [];
            for (let i = 0; i < events.length; i++) {
                // Assuming events[i].returnValues[3] is the tag
                // and you need to combine them into a single array
                combined = combined.concat(events[i].returnValues[3]);
            }
            // Calculate and return tag percentages after processing all events
            return calculateTagPercentages(combined);
        } else {
            // Handle the case where no events are found
            return []; // Return an empty array or any appropriate default value
        }
    }).catch(err => {
        console.error(err);
        throw err; // Re-throw the error to be caught by the caller
    });
}

function calculateTagPercentages(votes) {
    // Object to keep track of tag counts
    const tagCounts = {};
    // Total number of validators
    const totalValidators = 2; 
    // Count the occurrences of each tag in the votes list
    votes.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    // Map the tagCounts object to an array of [tag, percentage] pairs
    const result = Object.entries(tagCounts).map(([tag, count]) => {
        const percentage = (count / totalValidators) * 100;
        return [tag, percentage.toString()];
    });
    return result;
}