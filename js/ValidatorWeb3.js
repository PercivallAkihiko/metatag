const companies = {
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": 'YouTube'
  };

document.addEventListener('DOMContentLoaded', async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            // Get first account loaded by Metamask
            const account = accounts[0];
            
            // Write the short address in the display
            document.getElementById('userAddress').textContent = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
            const web3 = new Web3(window.ethereum);
            // Load the contract addresses
            const contractAddressToken = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
            const contractAddressDApp = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
            // Fetch and setup the token contract instance
            const tokenData = await fetch('../Solidity/out/MetaTagToken.sol/MetaTagToken.json').then(response => response.json());
            const tokenContract = new web3.eth.Contract(tokenData.abi, contractAddressToken);
            // Similarly, fetch and setup the dApp contract instance
            const dAppData = await fetch('../Solidity/out/MetaTag.sol/MetaTag.json').then(response => response.json());
            const dAppContract = new web3.eth.Contract(dAppData.abi, contractAddressDApp);

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
                    console.log(event);
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
                    console.log(event);
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
                    console.log(event);
                    const readableBalance = web3.utils.fromWei(event.returnValues.amount, 'ether');
                    document.getElementById('liquidTokens').innerHTML = parseFloat(document.getElementById('liquidTokens').innerHTML) + parseFloat(readableBalance);
                    document.getElementById('lockedTokens').innerHTML = 0;
                    document.getElementById('totalToken').innerHTML = parseFloat(document.getElementById('liquidTokens').innerHTML);
                    document.getElementById('totalLock').innerHTML = parseFloat(document.getElementById('liquidTokens').innerHTML);
                })
                .on('error', console.error);

            // Event to get list of videos for tagging
            dAppContract.getPastEvents('eventAddVideo', {
                filter: {
                    sender: account
                },
                fromBlock: 0,
                toBlock: 'latest'
            }).then(events => {
                // make it 0 not 1!!! FIX
                for (let i = 1; i < events.length; i++) {
                let asciiString = '';
                let video = events[i].returnValues[1];
                let firstCharLength = video.length % 3 === 0 ? 3 : 2;
                asciiString += String.fromCharCode(parseInt(video.substr(0, firstCharLength), 10));
                for (let i = firstCharLength; i < video.length; i += 3) {
                    let charCodeStr = video.substr(i, 3);
                    asciiString += String.fromCharCode(parseInt(charCodeStr, 10));
                }
                const newVideoEntry = {
                    hashId: asciiString,
                    title: "Bitcoin On-Chain Analysis: Value Days Destroyed Multiple",
                    company: companies[events[i].returnValues[0]],
                    link: "www.google.it",            
                    status: 1,
                    leftvote: 0,
                    reward: "-",
                    results: []
                }
                console.log(events[i].returnValues[0]);
                videoDB.push(newVideoEntry);
                ;}
            }).catch(err => console.error(err));

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
                    console.log('Transaction successful:', receipt);
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
                        console.log('Approval successful');
                    } else {
                        console.log('Approval not needed, sufficient allowance.');
                    }

                    // Proceed with the function call after ensuring sufficient allowance
                    const receipt = await dAppContract.methods.receiveTokensFromValidator(tokensInWei).send({
                        from: account
                    });
                    console.log('Transaction successful:', receipt);
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
                    console.log('setVariable transaction successful:', receipt);
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
                    console.log('withdrawFundsValidator transaction successful:', receipt);
                } catch (error) {
                    console.error('Failed to send withdrawFundsValidator transaction:', error);
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
                        console.log('Approval successful');
                    } else {
                        console.log('Approval not needed, sufficient allowance.');
                    }
                    const receipt = await dAppContract.methods.MTGforVoucher().send({
                        from: account
                    });
                    console.log('buyVoucher transaction successful:', receipt);
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