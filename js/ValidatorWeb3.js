// Number of validators it will be loaded from the blockchain
var numberOfValidators;

// Dictionary to keep track of the addresses of the companies
const companies = {
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": 'YouTube'
};

// Temporary values of liquid and locked tokens used to generate the graph
var balances4Graph = [];

// Temporary amount of blocks displayed in the graph
var blocksDisplayed = 5000;

// Function to display total and locked validators' tokens
async function loadTotalTokensAndLockedTokens() {
    const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceValidators(account).call(), 'ether'));
    const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
    document.getElementById('totalTokens').textContent = lockedTokens + liquidTokens;
    document.getElementById('totalTokens2').textContent = lockedTokens + liquidTokens;
    document.getElementById('lockedTokens').textContent = lockedTokens;
}

// Listen for the eventBuyTokens to update the UI
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

// Listen for the eventMTGforVoucher to update the UI
async function eventMTGforVoucher() {
    dAppContract.events.eventMTGforVoucher({
        filter: {
            user: account
        },
        fromBlock: 'latest'
    }).on('data', async function(event) {
        console.log(event);
        const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceValidators(account).call(), 'ether'));
        const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
        document.getElementById('totalTokens').textContent = lockedTokens + liquidTokens;
        document.getElementById('totalTokens2').textContent = lockedTokens + liquidTokens;
        document.getElementById('liquidTokens').textContent = liquidTokens;
        document.getElementById('maxMTG').textContent = "Balance " + liquidTokens;
        eventsDB.push({
            name: "MTGforVoucher",
            validator: "",
            user: account,
            company: "",
            amount: "",
            additional: "",
            positive: "",
            hash: "",
            tags: [],
            seed: "",
            rewardAmount: "",
            timestamp: "",
            chosenValidator: [],
            videoId: "",
            status: 8
        });
        initEventList();
    })
}

// Function for validators to lock their tokens (with approval)
function listenerLockTokensButton() {
    document.getElementById('lockTokensButton').addEventListener('click', async () => {
        const tokensInWei = web3.utils.toWei(document.getElementById('MTGLockAmount').value, 'ether');
        try {
            const allowance = await tokenContract.methods.allowance(account, dAppContractAddress).call();
            if (web3.utils.toBigInt(allowance) < (web3.utils.toBigInt(tokensInWei))) {
                await tokenContract.methods.approve(dAppContractAddress, tokensInWei).send({
                    from: account
                });
            }
            await dAppContract.methods.receiveTokensFromValidator(tokensInWei).send({
                from: account
            });
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    });
}

// Listen for the eventReceiveTokensFromValidator to update the UI
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

// Function to set the switch of the validator on or off depending on the state from the blockchain
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

// Listen for the eventSetVariable to update the UI
async function eventSetVariable() {
    dAppContract.events.eventSetVariable({
        filter: {
            validator: account
        },
        fromBlock: 'latest'
    }).on('data', async function(event) {
        if (event.returnValues[1]) {
            const block = await web3.eth.getBlock(event.blockNumber);
            const actualDate = formatDate(Math.floor(Date.now() / 1000)); //  formatDate expects a timestamp in seconds
            const blockDate = formatDateFromObject(new Date(Number(block.timestamp) * 1000));
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

// Listen for the eventWithdrawTokensValidator to update the UI
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

// Function to retrieve past addVideo events to update the UI
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

// Function to retrieve past SubmitHash events to update the UI
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

// Function to retrieve past RevealHash events to update the UI
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

// Function to retrieve past eventGetRewards to update the UI
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
                } else {
                    videoDB[i].reward = "- " + web3.utils.fromWei(events[0].returnValues[3], 'ether')
                }
                loadVoteList(1);
                break;
            }
        }
    }
    await sleep(50);
    await loadMainPage();
}

// Funtion used to load the dashboard information based on videos
async function loadMainPage() {
    let action = 0;
    let pending = 0;
    let completed = 0;
    for (let i = 0; i < videoDB.length; i++) {
        if (videoDB[i].status == 1 || videoDB[i].status == 3 || videoDB[i].status == 5) {
            action += 1;
        } else if (videoDB[i].status == 2 || videoDB[i].status == 4) {
            pending += 1;
        } else {
            completed += 1;
        }
    }
    document.getElementById('actionDisplay').textContent = action;
    document.getElementById('pendingDisplay').textContent = pending;
    document.getElementById('completedDisplay').textContent = completed;
    const [totalClaimed, totalSlashed] = await calculateTotalClaimedTokens();
    document.getElementById('claimedTokens').innerHTML = 'Claimed tokens: <span style="color: white;">' + limitDecimals(totalClaimed, 4) + '</span>';
    document.getElementById('slashedTokens').innerHTML = 'Slashed tokens: <span style="color: white;">' + limitDecimals(totalSlashed, 4) + '</span>';
    const events = await dAppContract.getPastEvents('eventReceiveTokensFromValidator', {
        filter: {
            validator: account,
        },
        fromBlock: 0,
        toBlock: 'latest'
    })
    let lastLock;
    let value;
    if (events.length != 0) {
        lastLock = parseFloat(web3.utils.fromWei(events[events.length - 1].returnValues[1], 'ether'));
        value = (totalClaimed - totalSlashed) / lastLock;
    } else {
        lastLock = 0;
        value = 0;
    }
    document.getElementById('percentageEarned').innerHTML = 'Percentage earned: <white>' + limitDecimals(value * 100, 4) + '%</white>';
    const currentBlockNumber = await web3.eth.getBlockNumber();
    let blockCounter = currentBlockNumber - BigInt(7200);
    if (blockCounter < 0) {
        blockCounter = 0;
    }
    const events2 = await dAppContract.getPastEvents('eventGetRewards', {
        filter: {
            validator: account
        },
        fromBlock: blockCounter,
        toBlock: 'latest'
    })
    if (events2.length != 0) {
        document.getElementById('averageValue').innerHTML = 'Completed last 24h: <white>' + events2.length + ' videos</white>';
    }

}

// Function to calculate total claimed tokens
async function calculateTotalClaimedTokens() {
    const events = await dAppContract.getPastEvents('eventGetRewards', {
        filter: {
            validator: account,
        },
        fromBlock: 0,
        toBlock: 'latest'
    })
    let value = 0;
    let value2 = 0;
    if (events.length != 0) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].returnValues[4]) {
                value += parseFloat(web3.utils.fromWei(events[i].returnValues[3], 'ether'));
            } else {
                value2 += parseFloat(web3.utils.fromWei(events[i].returnValues[3], 'ether'));
            }
        }
    }
    return [value, value2];
}

// Listen for the eventAddVideo to update the UI
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
                    loadMainPage();
                })
        }
    })
}

// Listen for the eventSubmitHash to update the UI
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
        loadMainPage();
    })
}

// Listen for the eventRevealHash to update the UI
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
        loadMainPage();
    })
}

// Listen for the eventGetRewards to update the UI
async function eventGetRewards() {
    dAppContract.events.eventGetRewards({
        fromBlock: 'latest',
        filter: {
            validator: account
        }
    }).on('data', async function(event) {
        for (let i = 0; i < videoDB.length; i++) {
            if (videoDB[i].company === companies[event.returnValues[1]] && videoDB[i].hashId === decimalToString(event.returnValues[2])) {
                videoDB[i].status = 6;
                retrieveTagsVoted(event.returnValues[2], event.returnValues[1]).then(output => {
                        videoDB[i].results = output;
                    })
                    .catch(error => console.error(error));
                if (event.returnValues[4]) {
                    videoDB[i].reward = web3.utils.fromWei(event.returnValues[3], 'ether');
                } else {
                    videoDB[i].reward = "- " + web3.utils.fromWei(event.returnValues[3], 'ether')
                }
                updateVotePage();
                const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceValidators(account).call(), 'ether'));
                const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
                document.getElementById('totalTokens').textContent = lockedTokens + liquidTokens;
                document.getElementById('totalTokens2').textContent = lockedTokens + liquidTokens;
                document.getElementById('lockedTokens').textContent = lockedTokens;
                break;
            }
        }
        loadMainPage();
    })
}

// Loads the events to be displayed in the Events section
function loadEventsSection() {
    eventsDB = [];
    tokenContract.getPastEvents('allEvents', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: {
            user: account,
        }
    }).then(events => {
        for (let i = 0; i < events.length; i++) {
            eventsDB.push({
                name: "BuyTokens",
                validator: "",
                user: account,
                company: "",
                amount: web3.utils.fromWei(events[i].returnValues[1], 'ether') + " MTG",
                value: "",
                positive: "",
                hash: "",
                tags: [],
                seed: "",
                rewardAmount: "",
                timestamp: events[i].blockNumber,
                chosenValidator: [],
                videoId: "",
                status: 1
            })
        }
    }).catch(error => {
        console.error(error);
    });
    dAppContract.getPastEvents('allEvents', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: {
            user: account,
        }
    }).then(events => {
        for (let i = 0; i < events.length; i++) {
            eventsDB.push({
                name: "MTGforVoucher",
                validator: "",
                user: account,
                company: "",
                amount: "",
                value: "",
                positive: "",
                hash: "",
                tags: [],
                seed: "",
                rewardAmount: "",
                timestamp: events[i].blockNumber,
                chosenValidator: [],
                videoId: "",
                status: 8
            })
        }
    }).catch(error => {
        console.error(error);
    });
    dAppContract.getPastEvents('allEvents', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: {
            validator: account,
        }
    }).then(events => {
        for (let i = 0; i < events.length; i++) {
            if (events[i].event == "eventReceiveTokensFromValidator") {
                eventsDB.push({
                    name: "ReceiveTokensFromValidator",
                    validator: account,
                    user: "",
                    company: "",
                    amount: web3.utils.fromWei(events[i].returnValues[1], 'ether') + " MTG",
                    value: "",
                    positive: "",
                    hash: "",
                    tags: [],
                    seed: "",
                    rewardAmount: "",
                    timestamp: events[i].blockNumber,
                    chosenValidator: [],
                    videoId: "",
                    status: 2
                })
            } else if (events[i].event == "eventSetVariable") {
                eventsDB.push({
                    name: "SetVariable",
                    validator: account,
                    user: "",
                    company: "",
                    amount: "",
                    value: events[i].returnValues[1],
                    positive: "",
                    hash: "",
                    tags: [],
                    seed: "",
                    rewardAmount: "",
                    timestamp: events[i].blockNumber,
                    chosenValidator: [],
                    videoId: "",
                    status: 3
                })
            } else if (events[i].event == "eventSubmitHash") {
                eventsDB.push({
                    name: "SubmitHash",
                    validator: account,
                    user: "",
                    company: events[i].returnValues[1],
                    amount: "",
                    value: "",
                    positive: "",
                    hash: events[i].returnValues[3],
                    tags: [],
                    seed: "",
                    rewardAmount: "",
                    timestamp: events[i].blockNumber,
                    chosenValidator: [],
                    videoId: decimalToString(events[i].returnValues[2]),
                    status: 4
                })
            } else if (events[i].event == "eventRevealHash") {
                eventsDB.push({
                    name: "RevealHash",
                    validator: account,
                    user: "",
                    company: events[i].returnValues[1],
                    amount: "",
                    value: "",
                    positive: "",
                    hash: "",
                    tags: events[i].returnValues[3],
                    seed: hexToAscii(events[i].returnValues[4]),
                    rewardAmount: "",
                    timestamp: events[i].blockNumber,
                    chosenValidator: [],
                    videoId: decimalToString(events[i].returnValues[2]),
                    status: 5
                })
            } else if (events[i].event == "eventGetRewards") {
                eventsDB.push({
                    name: "GetRewards",
                    validator: account,
                    user: "",
                    company: events[i].returnValues[1],
                    amount: "",
                    value: "",
                    positive: events[i].returnValues[4],
                    hash: "",
                    tags: "",
                    seed: "",
                    rewardAmount: Web3.utils.fromWei(events[i].returnValues[3], 'ether') + " MTG",
                    timestamp: events[i].blockNumber,
                    chosenValidator: [],
                    videoId: decimalToString(events[i].returnValues[2]),
                    status: 6
                })
            } else if (events[i].event == "eventWithdrawTokensValidator") {
                eventsDB.push({
                    name: "WithdrawTokensValidator",
                    validator: account,
                    user: "",
                    company: "",
                    amount: Web3.utils.fromWei(events[i].returnValues[1], 'ether') + " MTG",
                    value: "",
                    positive: "",
                    hash: "",
                    tags: "",
                    seed: "",
                    rewardAmount: "",
                    timestamp: events[i].blockNumber,
                    chosenValidator: [],
                    videoId: "",
                    status: 7
                })
            }
        }
        eventsDB.sort((a, b) => {
            if (a.timestamp > b.timestamp) return -1;
            if (a.timestamp < b.timestamp) return 1;
            return 0;
        });
        initEventList();
    }).catch(error => {
        console.error(error);
    });
}


// Fetches validators' liquid and locked tokens
async function fetchTokenBalances(startBlockNumber, currentBlockNumber) {
    const lockedTokensWei = await dAppContract.methods.balanceValidators(account).call();
    const liquidTokensWei = await tokenContract.methods.balanceOf(account).call();
    const lockedTokens = parseFloat(web3.utils.fromWei(lockedTokensWei, 'ether'));
    const liquidTokens = parseFloat(web3.utils.fromWei(liquidTokensWei, 'ether'));
    for (let blockNumber = startBlockNumber; blockNumber <= currentBlockNumber; blockNumber++) {
        balances4Graph.push({ blockNumber, lockedTokens, liquidTokens });
    }
    return balances4Graph;
}

// Generates chart
async function generateChart() {
    const currentBlockNumber = await web3.eth.getBlockNumber();
    let startBlockNumber = currentBlockNumber - BigInt(blocksDisplayed);
    startBlockNumber = startBlockNumber < 0 ? 0 : startBlockNumber;
    const tokenBalances = await fetchTokenBalances(startBlockNumber, currentBlockNumber);
    const chartData = {
        labels: tokenBalances.map(entry => entry.blockNumber.toString()),
        datasets: [
            {
                label: 'Locked Tokens',
                backgroundColor: 'rgb(255, 99, 132, 0.25)',
                borderColor: 'rgb(255, 99, 132)',
                data: tokenBalances.map(entry => entry.lockedTokens),
            },
            {
                label: 'Liquid Tokens',
                backgroundColor: 'rgb(54, 162, 235, 0.25)',
                borderColor: 'rgb(54, 162, 235)',
                data: tokenBalances.map(entry => entry.liquidTokens),
            }
        ]
    };
    const ctx = document.getElementById('balance_chart').getContext('2d');
    if (window.myChart) {
        window.myChart.data = chartData;
        window.myChart.options.animation = false;
        window.myChart.update();
    } else {
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                animation: false, 
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Block Number'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Tokens'
                        }
                    }
                }
            }
        });
    }
    blocksDisplayed = 1;
    for (let i = 0; i<blocksDisplayed; i++){
        balances4Graph.pop();
    }
}

// It waits the event from "bothWeb3.js" generated as last and it calls functions related to the validator
document.addEventListener('sharedDataReady', async () => {
    numberOfValidators = Number(await dAppContract.methods.validatorsQuantity().call());
    await generateChart();
    await loadTotalTokensAndLockedTokens();
    await loadSetVariable();
    await loadLockDateAndDays();
    await eventPastAddVideo();
    await loadEventsSection();
    listenerLockTokensButton();
    listenerChangeSwitch();
    listenerWithdrawValidatorButton();
    eventBuyTokens();
    eventMTGforVoucher();
    eventReceiveTokensFromValidator();
    eventSetVariable();
    eventWithdrawTokensValidator();
    eventAddVideo();
    eventSubmitHash();
    eventRevealHash();
    eventGetRewards();
    setInterval(loadEventsSection, 5000);
    setInterval(generateChart, 3000);
});