// Number of validators it will be loaded from the blockchain
var numberOfValidators;

// Dictionary to keep track of the addresses of the companies
const companies = {
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": 'YouTube'
};

// Function to display total and locked validators' tokens
async function loadTotalTokensAndLockedTokens() {
    const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceCompanies(account).call(), 'ether'));
    const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
    document.getElementById('totalTokens').textContent = lockedTokens + liquidTokens;
    document.getElementById('totalTokens2').textContent = lockedTokens + liquidTokens;
    document.getElementById('lockedTokens').textContent = lockedTokens;
}

// Function to display starting date of locking and number of days
async function loadLockDateAndDays() {
    let blockReceiveTimestamp = 0;
    let blockWithdrawTimestamp = 0;
    const eventReceive = await dAppContract.getPastEvents('eventReceiveTokensFromCompany', {
        filter: {
            company: account
        },
        fromBlock: 0,
        toBlock: 'latest'
    });
    const eventsWithdraw = await dAppContract.getPastEvents('eventWithdrawTokensCompany', {
        filter: {
            company: account
        },
        fromBlock: 0,
        toBlock: 'latest'
    });
    if (eventReceive.length != 0) {
        const blockReceive = await web3.eth.getBlock(eventReceive[eventReceive.length - 1].blockNumber);
        blockReceiveTimestamp = blockReceive.timestamp;
    }
    if (eventsWithdraw.length != 0) {
        const blockWithdraw = await web3.eth.getBlock(eventsWithdraw[eventsWithdraw.length - 1].blockNumber);
        blockWithdrawTimestamp = blockWithdraw.timestamp;
    }
    if (blockReceiveTimestamp > blockWithdrawTimestamp) {
        const actualDate = formatDate(Math.floor(Date.now() / 1000));
        const blockDate = formatDate(blockReceiveTimestamp);
        document.getElementById('lockDate').textContent = blockDate;
        document.getElementById('daysLocked').textContent = calculateDaysDifference(actualDate, blockDate) + " Days";
    }
}

// Listen for the eventBuyTokens to update the UI
async function eventBuyTokens() {
    tokenContract.events.eventBuyTokens({
        filter: {
            user: account
        },
        fromBlock: 'latest'
    }).on('data', async function(event) {
        const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceCompanies(account).call(), 'ether'));
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
        const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceValidators(account).call(), 'ether'));
        const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
        document.getElementById('totalTokens').textContent = lockedTokens + liquidTokens;
        document.getElementById('totalTokens2').textContent = lockedTokens + liquidTokens;
        document.getElementById('liquidTokens').textContent = liquidTokens;
        document.getElementById('maxMTG').textContent = "Balance " + liquidTokens;
    })
}

// Listen for the eventReceiveTokensFromCompany to update the UI
async function eventReceiveTokensFromCompany() {
    dAppContract.events.eventReceiveTokensFromCompany({
        filter: {
            company: account
        },
        fromBlock: 'latest'
    }).on('data', async function(event) {
        const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceCompanies(account).call(), 'ether'));
        const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
        document.getElementById('liquidTokens').textContent = liquidTokens;
        document.getElementById('lockedTokens').textContent = lockedTokens;
        document.getElementById('maxMTG').textContent = "Balance " + liquidTokens;
        const block = await web3.eth.getBlock(event.blockNumber);
        const actualDate = formatDate(Math.floor(Date.now() / 1000));
        const blockDate = formatDate(block.timestamp);
        document.getElementById('lockDate').textContent = blockDate;
        document.getElementById('daysLocked').textContent = calculateDaysDifference(actualDate, blockDate) + " Days";
    })
}

// Function for companies to lock their tokens (with approval)
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
            await dAppContract.methods.receiveTokensFromCompany(tokensInWei).send({
                from: account
            });
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    });
}

// Function for companies to add a new video for tagging
function listenerAddVideoButton() {
    document.getElementById('addVideoButton').addEventListener('click', async () => {
        try {
            await dAppContract.methods.addVideo(asciiToDecimal(document.getElementById('videoIdInput').value), document.getElementById('videoLengthInput').value).send({
                from: account
            });
        } catch (error) {
            console.error('Failed to send addVideo transaction:', error);
        }
    });
}

// Function for companies to withdraw their tokens from the smart contract
function listenerWithdrawCompanyButton() {
    document.getElementById('withdrawCompanyButton').addEventListener('click', async () => {
        try {
            await dAppContract.methods.withdrawTokensCompany().send({
                from: account
            })
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    });
}

// Listen for the eventWithdrawTokensCompany to update the UI
async function eventWithdrawTokensCompany() {
    dAppContract.events.eventWithdrawTokensCompany({
        filter: {
            sender: account
        },
        fromBlock: 'latest'
    }).on('data', async function(event) {
        const lockedTokens = parseFloat(web3.utils.fromWei(await dAppContract.methods.balanceCompanies(account).call(), 'ether'));
        const liquidTokens = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
        document.getElementById('totalTokens').textContent = lockedTokens + liquidTokens;
        document.getElementById('totalTokens2').textContent = lockedTokens + liquidTokens;
        document.getElementById('liquidTokens').textContent = liquidTokens;
        document.getElementById('lockedTokens').textContent = lockedTokens;
        document.getElementById('maxMTG').textContent = "Balance " + liquidTokens;
        document.getElementById('lockDate').textContent = "-";
        document.getElementById('daysLocked').textContent = "-";
    })
}

// Function to retrieve past addVideo events for UI
async function eventPastAddVideo() {
    const events = await dAppContract.getPastEvents('eventAddVideo', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: {
            company: account
        }
    });
    for (let i = 0; i < events.length; i++) {
        let videoId = events[i].returnValues[1];
        let asciiString = decimalToString(videoId);
        await fetchYouTubeVideoTitle(asciiString)
            .then(title => {
                const newVideoEntry = {
                    hashId: asciiString,
                    title: title,
                    company: companies[events[i].returnValues[0]],
                    link: "",
                    status: 2,
                    leftvote: numberOfValidators,
                    reward: "-",
                    results: []
                };
                videoDB.push(newVideoEntry);
            })
        await eventPastSubmitHash(events[i].returnValues[0], videoId);
    }
}

// Listen for the AddVideo events for UI
async function eventAddVideo() {
    dAppContract.events.eventAddVideo({
        fromBlock: 'latest',
        filter: {
            company: account
        }
    }).on('data', async function(event) {
        let videoId = event.returnValues[1];
        let asciiString = decimalToString(videoId);
        await fetchYouTubeVideoTitle(asciiString)
            .then(title => {
                const newVideoEntry = {
                    hashId: asciiString,
                    title: title,
                    company: companies[event.returnValues[0]],
                    link: "",
                    status: 2,
                    leftvote: numberOfValidators,
                    reward: "-",
                    results: []
                };
                videoDB.push(newVideoEntry);
                videoDB = Array.from(videoDB.reduce((acc, item) => acc.set(`${item.hashId}-${item.company}`, item), new Map()).values());
                updateVotePage2();
                loadMainPage();
            })
    })
}

// Function to retrieve past SubmitHash events for UI
async function eventPastSubmitHash(company, video) {
    const events = await dAppContract.getPastEvents('eventSubmitHash', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: {
            company: company,
            videoId: video
        }
    });
    if (events.length != 0) {
        for (let event = 0; event < events.length; event++) {
            for (let i = 0; i < videoDB.length; i++) {
                if (videoDB[i].company === companies[company] && videoDB[i].hashId === decimalToString(video)) {
                    videoDB[i].leftvote = videoDB[i].leftvote - 1;
                    if (videoDB[i].leftvote == 0) {
                        videoDB[i].status = 4;
                        videoDB[i].leftvote = numberOfValidators;
                    }
                    break;
                }
            }
        }
        await eventPastRevealHash(events[0].returnValues[1], events[0].returnValues[2]);
    }
}

// Listen for the eventSubmitHash to update UI
async function eventSubmitHash() {
    dAppContract.events.eventSubmitHash({
        fromBlock: 'latest',
        filter: {
            company: account
        }
    }).on('data', async function(event) {
        for (let i = 0; i < videoDB.length; i++) {
            if (videoDB[i].company === companies[event.returnValues[1]] && videoDB[i].hashId === decimalToString(event.returnValues[2])) {
                getHashedCounter(event.returnValues[1], decimalToString(event.returnValues[2])).then(hashedCounter => {
                    videoDB[i].leftvote = numberOfValidators - Number(hashedCounter);
                    updateVotePage2();
                    if (numberOfValidators - Number(hashedCounter) == 0) {
                        videoDB[i].status = 4;
                        videoDB[i].leftvote = numberOfValidators;
                        updateVotePage2();
                        loadMainPage();
                    }
                });
                break;
            }
        }
    })
}

// Function to retrieve past RevealHash events to update the UI
async function eventPastRevealHash(company, video) {
    let cache = 0;
    const events = await dAppContract.getPastEvents('eventRevealHash', {
        filter: {
            company: company,
            videoId: video
        },
        fromBlock: 0,
        toBlock: 'latest'
    })
    if (events.length != 0) {
        for (let event = 0; event < events.length; event++) {
            for (let i = 0; i < videoDB.length; i++) {
                if (videoDB[i].company === companies[company] && videoDB[i].hashId === decimalToString(video)) {
                    videoDB[i].leftvote = videoDB[i].leftvote - 1;
                    if (videoDB[i].leftvote == 0) {
                        videoDB[i].status = 6;
                        const currentBlockNumber = await web3.eth.getBlockNumber();
                        let startBlockNumber = currentBlockNumber - BigInt(7200);
                        if (startBlockNumber < 0) {
                            startBlockNumber = 0;
                        }
                        if (events[event].blockNumber > startBlockNumber) {
                            const numberOfVideos = parseInt(document.getElementById('completedLast24h').textContent.match(/(\d+) videos/)[1], 10) + 1;
                            document.getElementById('completedLast24h').innerHTML = "Completed last 24h: <white>" + numberOfVideos + " videos </white>";
                        }
                        await retrieveTagsVoted(video, company).then(output => {
                                videoDB[i].results = output;
                            })
                            .catch(error => console.error(error));
                    }
                    break;
                }
            }
        }
    }
}

// Listen for the eventRevealHash to update the UI
async function eventRevealHash() {
    dAppContract.events.eventRevealHash({
        fromBlock: 'latest',
        filter: {
            company: account
        }
    }).on('data', async function(event) {
        for (let i = 0; i < videoDB.length; i++) {
            if (videoDB[i].company === companies[event.returnValues[1]] && videoDB[i].hashId === decimalToString(event.returnValues[2])) {
                getRevealedCounter(event.returnValues[1], decimalToString(event.returnValues[2])).then(RevealedCounter => {
                    videoDB[i].leftvote = numberOfValidators - Number(RevealedCounter);
                    if (numberOfValidators - Number(RevealedCounter) == 0) {
                        videoDB[i].status = 6;
                        loadMainPage();
                    }
                });
                await retrieveTagsVoted(event.returnValues[2], event.returnValues[1]).then(output => {
                    videoDB[i].results = output;
                });
                updateVotePage2();
                break;
            }
        }
    })
}

// Funtion used to load the dashboard information based on videos
async function loadMainPage() {
    let action = 0;
    let pending = 0;
    let completed = 0;
    for (let i = 0; i < videoDB.length; i++) {
        if (videoDB[i].status == 2) {
            action += 1;
        } else if (videoDB[i].status == 4) {
            pending += 1;
        } else {
            completed += 1;
        }
    }
    document.getElementById('actionDisplay').textContent = action;
    document.getElementById('pendingDisplay').textContent = pending;
    document.getElementById('completedDisplay').textContent = completed;
    dAppContract.methods.readyValidatorsLength().call()
        .then(length => {
            document.getElementById('readyValidatorsToWork').innerHTML = "Ready validators: <white>" + length + "</white>";
        })
        .catch(err => {
            console.error(err);
        });
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
                additional: "",
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
                additional: "",
                positive: "",
                hash: "",
                tags: [],
                seed: "",
                rewardAmount: "",
                timestamp: events[i].blockNumber,
                chosenValidator: [],
                videoId: "",
                status: 5
            })
        }
    }).catch(error => {
        console.error(error);
    });
    dAppContract.getPastEvents('allEvents', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: {
            company: account,
        }
    }).then(events => {
        for (let i = 0; i < events.length; i++) {
            if (events[i].event == "eventReceiveTokensFromCompany") {
                eventsDB.push({
                    name: "ReceiveTokensFromCompany",
                    validator: "",
                    user: "",
                    company: account,
                    amount: web3.utils.fromWei(events[i].returnValues[1], 'ether') + " MTG",
                    additional: "",
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
            } else if (events[i].event == "eventAddVideo") {
                eventsDB.push({
                    name: "AddVideo",
                    validator: "",
                    user: "",
                    company: account,
                    amount: "",
                    additional: "",
                    positive: "",
                    hash: "",
                    tags: [],
                    seed: "",
                    rewardAmount: "",
                    timestamp: events[i].blockNumber,
                    chosenValidator: events[i].returnValues[2],
                    videoId: decimalToString(events[i].returnValues[1]),
                    status: 3
                })
            } else if (events[i].event == "eventWithdrawTokensCompany") {
                eventsDB.push({
                    name: "WithdrawTokensCompany",
                    validator: "",
                    user: "",
                    company: account,
                    amount: web3.utils.fromWei(events[i].returnValues[1], 'ether') + " MTG",
                    additional: "",
                    positive: "",
                    hash: "",
                    tags: [],
                    seed: "",
                    rewardAmount: "",
                    timestamp: events[i].blockNumber,
                    chosenValidator: [],
                    videoId: "",
                    status: 4
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

// Listen for the eventSetVariable to udpate the UI
async function eventSetVariable() {
    dAppContract.events.eventSetVariable({
        fromBlock: 'latest',
    }).on('data', async function(event) {
        dAppContract.methods.readyValidatorsLength().call()
            .then(length => {
                document.getElementById('readyValidatorsToWork').innerHTML = "Ready validators: <white>" + length + "</white>";
            })
            .catch(err => {
                console.error(err);
            });
    })
}

function generateChart() {
    
}

// It waits the event from "bothWeb3.js" generated as last and it calls functions related to the validator
document.addEventListener('sharedDataReady', async () => {
    numberOfValidators = Number(await dAppContract.methods.validatorsQuantity().call());
    await loadTotalTokensAndLockedTokens();
    await loadLockDateAndDays();
    await eventPastAddVideo();
    await loadEventsSection();
    await generateChart();
    loadVoteList(1);
    loadMainPage();
    listenerLockTokensButton();
    listenerAddVideoButton();
    listenerWithdrawCompanyButton();
    eventAddVideo();
    eventSubmitHash();
    eventRevealHash();
    eventBuyTokens();
    eventMTGforVoucher();
    eventReceiveTokensFromCompany();
    eventWithdrawTokensCompany();
    eventSetVariable();
    setInterval(loadEventsSection, 5000);
    setInterval(generateChart, 10000);
});