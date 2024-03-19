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
            sender: account
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
           sender: account
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
            const receipt = await dAppContract.methods.receiveTokensFromValidator(tokensInWei).send({
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
           sender: account
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
            const receipt = await dAppContract.methods.setVariable().send({
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


// It waits the event from "bothWeb3.js" generated as last and it calls functions related to the validator
document.addEventListener('sharedDataReady', async () => {
    await loadTotalTokensAndLockedTokens();
    await loadSetVariable();
    listenerLockTokensButton();
    listenerChangeSwitch();
    eventBuyTokens();
    eventMTGforVoucher();
    eventReceiveTokensFromValidator();
});

