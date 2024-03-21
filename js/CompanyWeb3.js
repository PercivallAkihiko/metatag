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

// It waits the event from "bothWeb3.js" generated as last and it calls functions related to the validator
document.addEventListener('sharedDataReady', async () => {
    await loadTotalTokensAndLockedTokens()
    await loadLockDateAndDays();
    listenerLockTokensButton();
    listenerAddVideoButton();
    listenerWithdrawCompanyButton();
    eventBuyTokens();
    eventMTGforVoucher()
    eventReceiveTokensFromCompany();
    eventWithdrawTokensCompany();
});