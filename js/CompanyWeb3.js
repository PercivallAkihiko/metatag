var numberOfValidators;

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

// Listen for the eventBuyTokens event
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

// Listen for the eventReceiveTokensFromCompany event
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

// Listen for the eventWithdrawTokensCompany event
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

// Function to retrieve past addVideo events
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
                loadVoteList(1);
            })
        await eventPastSubmitHash(events[i].returnValues[0], videoId);
    }
}

// Listen for the eventAddVideo event
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

// Function to retrieve past SubmitHash events
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
                    loadVoteList(1);
                    if (videoDB[i].leftvote == 0) {
                        videoDB[i].status = 4;
                        videoDB[i].leftvote = numberOfValidators;
                        loadVoteList(1);
                    }
                    break;
                }
            }
        }
        await eventPastRevealHash(events[0].returnValues[1], events[0].returnValues[2]);
    }
}

// Listen for the eventSubmitHash event
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

// Function to retrieve past RevealHash events
async function eventPastRevealHash(company, video) {
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
                    loadVoteList(1);
                    if (videoDB[i].leftvote == 0) {
                        videoDB[i].status = 6;
                        await retrieveTagsVoted(video, company).then(output => {
                            videoDB[i].results = output;
                        })
                        .catch(error => console.error(error));
                    }
                loadVoteList(1);
                break;
                }
            }
        }
    }
}

// Listen for the eventRevealHash event
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
            action +=1;
        }
        else if (videoDB[i].status == 4) {
            pending +=1;
        }
        else {
            completed +=1;
        }
    }
    document.getElementById('actionDisplay').textContent = action;
    document.getElementById('pendingDisplay').textContent = pending;
    document.getElementById('completedDisplay').textContent = completed;
}

// It waits the event from "bothWeb3.js" generated as last and it calls functions related to the validator
document.addEventListener('sharedDataReady', async () => {
    numberOfValidators = Number(await dAppContract.methods.validatorsQuantity().call());
    await loadTotalTokensAndLockedTokens();
    await loadLockDateAndDays();
    await eventPastAddVideo();
    loadMainPage();
    eventAddVideo();
    eventSubmitHash();
    eventRevealHash();
    listenerLockTokensButton();
    listenerAddVideoButton();
    listenerWithdrawCompanyButton();
    eventBuyTokens();
    eventMTGforVoucher();
    eventReceiveTokensFromCompany();
    eventWithdrawTokensCompany();
});