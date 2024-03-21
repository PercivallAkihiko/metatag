const companies = {
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": 'YouTube'
};
var numberOfValidators;

// Function to display total and locked validators' tokens
async function loadTotalTokensAndLockedTokens() {
    const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceValidators(account).call(), 'ether'));
    const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
    document.getElementById('totalTokens').textContent = lockedTokens + liquidTokens;
    document.getElementById('totalTokens2').textContent = lockedTokens + liquidTokens;
    document.getElementById('lockedTokens').textContent = lockedTokens;
}

// Listen for the eventBuyTokens event
async function eventBuyTokens() {
    tokenContract.events.eventBuyTokens({
        filter: {
            user: account
        },
        fromBlock: 'latest'
    }).on('data', async function(event) {
        const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceValidators(account).call(), 'ether'));
        const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
        document.getElementById('totalTokens').textContent = lockedTokens + liquidTokens;
        document.getElementById('totalTokens2').textContent = lockedTokens + liquidTokens;
        document.getElementById('liquidTokens').textContent = liquidTokens;
        document.getElementById('maxMTG').textContent = "Balance " + liquidTokens;
        document.getElementById('maxETH').textContent = "Balance " + parseFloat(web3.utils.fromWei(await web3.eth.getBalance(account), 'ether'));
    })
}

// Listen for the eventMTGforVoucher event
async function eventMTGforVoucher() {
    dAppContract.events.eventMTGforVoucher({
        filter: {
            user: account
        },
        fromBlock: 'latest'
    }).on('data', async function(event) {
        const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceValidators(account).call(), 'ether'));
        const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
        document.getElementById('totalTokens').textContent = lockedTokens + liquidTokens;
        document.getElementById('totalTokens2').textContent = lockedTokens + liquidTokens;
        document.getElementById('liquidTokens').textContent = liquidTokens;
        document.getElementById('maxMTG').textContent = "Balance " + liquidTokens;
    })
}

// Function for validators to lock their tokens (with approval)
function listenerLockTokensButton() {
    document.getElementById('lockTokensButton').addEventListener('click', async () => {
        // Convert amount to Wei for consistency with token decimals
        const tokensInWei = web3.utils.toWei(document.getElementById('MTGLockAmount').value, 'ether');
        try {
            // Check current allowance
            const allowance = await tokenContract.methods.allowance(account, dAppContractAddress).call();
            if (web3.utils.toBigInt(allowance) < (web3.utils.toBigInt(tokensInWei))) {
                // If allowance is less than the amount to be transferred, approve it
                await tokenContract.methods.approve(dAppContractAddress, tokensInWei).send({
                    from: account
                });
            }
            // Proceed with the function call after ensuring sufficient allowance
            await dAppContract.methods.receiveTokensFromValidator(tokensInWei).send({
                from: account
            });
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    });
}

// Listen for the eventReceiveTokensFromValidator event
async function eventReceiveTokensFromValidator() {
    dAppContract.events.eventReceiveTokensFromValidator({
        filter: {
            validator: account
        },
        fromBlock: 'latest'
    }).on('data', async function(event) {
        const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceValidators(account).call(), 'ether'));
        const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
        document.getElementById('liquidTokens').textContent = liquidTokens;
        document.getElementById('lockedTokens').textContent = lockedTokens;
        document.getElementById('maxMTG').textContent = "Balance " + liquidTokens;
    })
}

// Function for validators to change their variable (willing to "work")
function listenerChangeSwitch() {
    document.getElementById('changeSwitch').addEventListener('click', async () => {
        try {
            const switchValue = await dAppContract.methods.setVariable().send({
                from: account
            });
        } catch (error) {
            const checkbox = document.getElementById('changeSwitch');
            checkbox.checked = !checkbox.checked;
        }
    });
}

// Function to set the switch of the validator on or off depending on the state in the blockchain
async function loadSetVariable() {
    document.getElementById('changeSwitch').checked = await dAppContract.methods.variableValidators(account).call();
}

// Function to display starting date of locking and number of days
async function loadLockDateAndDays() {
    const events = await dAppContract.getPastEvents('eventSetVariable', {
        filter: {
            validator: account
        },
        fromBlock: 0,
        toBlock: 'latest'
    });
    if (events.length != 0) {
        if (events[events.length - 1].returnValues[1]) {
            const block = await web3.eth.getBlock(events[events.length - 1].blockNumber);
            const actualDate = formatDate(Math.floor(Date.now() / 1000));
            const blockDate = formatDate(block.timestamp);
            document.getElementById('lockDate').textContent = blockDate;
            document.getElementById('daysLocked').textContent = calculateDaysDifference(actualDate, blockDate) + " Days";
        } else {
            document.getElementById('lockDate').textContent = "-";
            document.getElementById('daysLocked').textContent = "-";
        }
    }
}

// Listen for the eventSetVariable event
async function eventSetVariable() {
    dAppContract.events.eventSetVariable({
        filter: {
            validator: account
        },
        fromBlock: 'latest'
    }).on('data', async function(event) {
        if (event.returnValues[1]) {
            const block = await web3.eth.getBlock(events[events.length - 1].blockNumber);
            const actualDate = formatDate(Math.floor(Date.now() / 1000));
            const blockDate = formatDate(block.timestamp);
            document.getElementById('lockDate').textContent = blockDate;
            document.getElementById('daysLocked').textContent = calculateDaysDifference(actualDate, blockDate) + " Days";
        } else {
            document.getElementById('lockDate').textContent = "-";
            document.getElementById('daysLocked').textContent = "-";
        }
    })
}

// Function for validators to withdraw their tokens from the smart contract
function listenerWithdrawValidatorButton() {
    document.getElementById('withdrawValidatorButton').addEventListener('click', async () => {
        try {
            await dAppContract.methods.withdrawTokensValidator().send({
                from: account
            })
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    });
}

// Listen for the eventWithdrawTokensValidator event
async function eventWithdrawTokensValidator() {
    dAppContract.events.eventWithdrawTokensValidator({
        filter: {
            validator: account
        },
        fromBlock: 'latest'
    }).on('data', async function(event) {
        const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceValidators(account).call(), 'ether'));
        const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
        document.getElementById('totalTokens').textContent = lockedTokens + liquidTokens;
        document.getElementById('totalTokens2').textContent = lockedTokens + liquidTokens;
        document.getElementById('liquidTokens').textContent = liquidTokens;
        document.getElementById('lockedTokens').textContent = lockedTokens;
        document.getElementById('maxMTG').textContent = "Balance " + liquidTokens;
    })
}

// Function performed when the button to send the hash is clicked (in app.js switch case)
async function externalListenerSubmitHash(seed, tagList, videoId, company) {
    try {
        await dAppContract.methods.submitHash(getKeyByValue(companies, company), asciiToDecimal(videoId), hashTagListAndSeed(tagList, seed)).send({
            from: account
        });
    } catch (error) {
        console.error('Failed to send submitHash transaction:', error);
    }
}

// Function performed when the button to reveal the hash is clicked (in app.js switch case)
async function externalListenerRevealHash(videoId, company) {
    try {
        const videoCookie = getCookie(videoId);
        const seed = stringToBytes11(videoCookie["seed"]);
        const tagList = videoCookie["list"];
        await dAppContract.methods.revealHash(getKeyByValue(companies, company), asciiToDecimal(videoId), tagList, seed).send({
            from: account
        });
    } catch (error) {
        console.error('Failed to send submitHash transaction:', error);
    }
}

// Function performed when the button claim is clicked (in app.js switch case)
async function externalListenerGetRewards(videoId, company) {
    try {
        const receipt = await dAppContract.methods.getRewards(getKeyByValue(companies, company), asciiToDecimal(videoId)).send({
            from: account
        });

    } catch (error) {
        console.error('Failed to send submitHash transaction:', error);
    }
}

// Function to retrieve past addVideo events
async function eventPastAddVideo() {
    const events = await dAppContract.getPastEvents('eventAddVideo', {
        fromBlock: 0,
        toBlock: 'latest'
    });
    for (let i = 0; i < events.length; i++) {
        if (events[i].returnValues[2].map(v => v.toLowerCase()).includes(account)) {
            let videoId = events[i].returnValues[1];
            let asciiString = decimalToString(videoId);
            fetchYouTubeVideoTitle(asciiString)
                .then(title => {
                    const newVideoEntry = {
                        hashId: asciiString,
                        title: title,
                        company: companies[events[i].returnValues[0]],
                        link: "",
                        status: 1,
                        leftvote: 0,
                        reward: "-",
                        results: []
                    };
                    videoDB.push(newVideoEntry);
                    loadVoteList(1);
                    eventPastSubmitHash(events[i].returnValues[0], videoId);
                })
        }
    }
}

// Function to retrieve past SubmitHash events
async function eventPastSubmitHash(company, video) {
    const events = await dAppContract.getPastEvents('eventSubmitHash', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: {
            validator: account,
            company: company,
            videoId: video
        }
    });
    if (events.length != 0) {
        for (let i = 0; i < videoDB.length; i++) {
            if (videoDB[i].company === companies[company] && videoDB[i].hashId === decimalToString(video)) {
                videoDB[i].status = 2;
                loadVoteList(1);
                getHashedCounter(company, decimalToString(video)).then(hashedCounter => {
                    videoDB[i].leftvote = numberOfValidators - Number(hashedCounter);
                    if (numberOfValidators - Number(hashedCounter) == 0) {
                        videoDB[i].status = 3;
                        loadVoteList(1);
                    }
                });
                break;
            }
        }
        eventPastRevealHash(events[0].returnValues[1], events[0].returnValues[2]);
    }
}

// Function to retrieve past RevealHash events
async function eventPastRevealHash(company, video) {
    const events = await dAppContract.getPastEvents('eventRevealHash', {
        filter: {
            validator: account,
            company: company,
            videoId: video
        },
        fromBlock: 0,
        toBlock: 'latest'
    })
    if (events.length != 0) {
        for (let i = 0; i < videoDB.length; i++) {
            if (videoDB[i].company === companies[company] && videoDB[i].hashId === decimalToString(video)) {
                videoDB[i].status = 4;
                loadVoteList(1);
                getRevealedCounter(company, videoDB[i].hashId).then(RevealedCounter => {
                    videoDB[i].leftvote = numberOfValidators - Number(RevealedCounter);
                    if (numberOfValidators - Number(RevealedCounter) == 0) {
                        videoDB[i].status = 5;
                        loadVoteList(1);
                    }
                });
                break;
            }
        }
        eventPastGetRewards(video, company);
    }
}

// Function to retrieve past eventGetRewards events
async function eventPastGetRewards(video, company) {
    const events = await dAppContract.getPastEvents('eventGetRewards', {
        filter: {
            validator: account,
            company: company,
            videoId: video
        },
        fromBlock: 0,
        toBlock: 'latest'
    })
    if (events.length != 0) {
        for (let i = 0; i < videoDB.length; i++) {
            if (videoDB[i].company === companies[company] && videoDB[i].hashId === decimalToString(video)) {
                videoDB[i].status = 6;
                retrieveTagsVoted(video, company).then(output => {
                        videoDB[i].results = output;
                    })
                    .catch(error => console.error(error));
                if (events[0].returnValues[4]) {
                    videoDB[i].reward = web3.utils.fromWei(events[0].returnValues[3], 'ether');
                }
                else {
                    videoDB[i].reward = "- " + web3.utils.fromWei(events[0].returnValues[3], 'ether')
                }
                loadVoteList(1);
                break;
            }
        }
    }
}

// Function to get the tags voted by the validators
async function retrieveTagsVoted(video, company) {
    // Return the promise chain
    const events = await dAppContract.getPastEvents('eventRevealHash', {
        filter: {
            company: company,
            videoId: video
        },
        fromBlock: 0,
        toBlock: 'latest'
    })
    if (events.length != 0) {
        let combined = [];
        for (let i = 0; i < events.length; i++) {
            combined = combined.concat(events[i].returnValues[3]);
        }
        return calculateTagPercentages(combined, numberOfValidators);
    }
    
}

// Listen for the eventAddVideo event
async function eventAddVideo() {
    dAppContract.events.eventAddVideo({
        fromBlock: 'latest'
    }).on('data', async function(event) {
        let videoId = event.returnValues[1];
        if (event.returnValues[2].map(v => v.toLowerCase()).includes(account)) {
            let asciiString = decimalToString(videoId);
            await fetchYouTubeVideoTitle(asciiString)
                .then(title => {
                    const newVideoEntry = {
                        hashId: asciiString,
                        title: title,
                        company: companies[event.returnValues[0]],
                        link: "",
                        status: 1,
                        leftvote: 0,
                        reward: "-",
                        results: []
                    };
                    videoDB.push(newVideoEntry);
                    videoDB = Array.from(videoDB.reduce((acc, item) => acc.set(`${item.hashId}-${item.company}`, item), new Map()).values());
                    updateVotePage();
                })
        }
    })
}

// Listen for the eventSubmitHash event
async function eventSubmitHash() {
    dAppContract.events.eventSubmitHash({
        fromBlock: 'latest',
    }).on('data', async function(event) {
        for (let i = 0; i < videoDB.length; i++) {
            if (videoDB[i].company === companies[event.returnValues[1]] && videoDB[i].hashId === decimalToString(event.returnValues[2])) {
                if (event.returnValues[0].toLowerCase() == account) {
                    videoDB[i].status = 2;
                }
                getHashedCounter(event.returnValues[1], decimalToString(event.returnValues[2])).then(hashedCounter => {
                    videoDB[i].leftvote = numberOfValidators - Number(hashedCounter);
                    updateVotePage();
                    if (numberOfValidators - Number(hashedCounter) == 0) {
                        videoDB[i].status = 3;
                        updateVotePage();
                    }
                });
                break;
            }
        }
    })
}

// Listen for the eventRevealHash event
async function eventRevealHash() {
    dAppContract.events.eventRevealHash({
        fromBlock: 'latest',
    }).on('data', async function(event) {
        for (let i = 0; i < videoDB.length; i++) {
            if (videoDB[i].company === companies[event.returnValues[1]] && videoDB[i].hashId === decimalToString(event.returnValues[2])) {
                if (event.returnValues[0].toLowerCase() == account) {
                    videoDB[i].status = 4;
                }
                getRevealedCounter(event.returnValues[1], decimalToString(event.returnValues[2])).then(RevealedCounter => {
                    videoDB[i].leftvote = numberOfValidators - Number(RevealedCounter);
                    updateVotePage();
                    if (numberOfValidators - Number(RevealedCounter) == 0) {
                        videoDB[i].status = 5;
                        updateVotePage();
                    }
                });
                break;
            }
        }
    })
}

// Listen for the eventGetRewards event
async function eventGetRewards() {
    dAppContract.events.eventGetRewards({
        fromBlock: 'latest',
    }).on('data', async function(event) {
        for (let i = 0; i < videoDB.length; i++) {
            if (videoDB[i].company === companies[event.returnValues[1]] && videoDB[i].hashId === decimalToString(event.returnValues[2])) {
                if (event.returnValues[0].toLowerCase() == account) {
                    videoDB[i].status = 6;
                }
                retrieveTagsVoted(event.returnValues[2], event.returnValues[1]).then(output => {
                    videoDB[i].results = output;
                })
                .catch(error => console.error(error));
                if (event.returnValues[4]) {
                    videoDB[i].reward = web3.utils.fromWei(event.returnValues[3], 'ether');
                }
                else {
                    videoDB[i].reward = "- " + web3.utils.fromWei(event.returnValues[3], 'ether')
                }
                updateVotePage();
                break;
            }
        }
    })
}

for (let i = 0; i < videoDB.length; i++) {
    if (videoDB[i].company === companies[company] && videoDB[i].hashId === decimalToString(video)) {
        videoDB[i].status = 6;
        retrieveTagsVoted(video, company).then(output => {
                videoDB[i].results = output;
            })
            .catch(error => console.error(error));
        if (events[0].returnValues[4]) {
            videoDB[i].reward = web3.utils.fromWei(events[0].returnValues[3], 'ether');
        }
        else {
            videoDB[i].reward = "- " + web3.utils.fromWei(events[0].returnValues[3], 'ether')
        }
        loadVoteList(1);
        break;
    }
}

// It waits the event from "bothWeb3.js" generated as last and it calls functions related to the validator
document.addEventListener('sharedDataReady', async () => {
    numberOfValidators = Number(await dAppContract.methods.validatorsQuantity().call());
    await loadTotalTokensAndLockedTokens();
    await loadSetVariable();
    await loadLockDateAndDays();
    await eventPastAddVideo();
    listenerLockTokensButton();
    listenerChangeSwitch();
    eventBuyTokens();
    eventMTGforVoucher();
    eventReceiveTokensFromValidator();
    eventSetVariable();
    eventWithdrawTokensValidator();
    eventAddVideo();
    eventSubmitHash();
    eventRevealHash();
    eventGetRewards();
});