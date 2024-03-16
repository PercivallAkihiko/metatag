document.addEventListener('DOMContentLoaded', async () => {

    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            const account = accounts[0];
            const shortAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
            document.getElementById('userAddress').textContent = shortAddress;
            const web3 = new Web3(window.ethereum);
            const contractAddressToken = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
            const contractAddressDApp = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
            // Define contract instances outside fetch scope for broader availability
            let tokenContract, dAppContract;

            // Fetch and setup the token contract instance
            fetch('../Solidity/out/MetaTagToken.sol/MetaTagToken.json')
                .then(response => response.json())
                .then(data => {
                    const tokenAbi = data.abi;
                    tokenContract = new web3.eth.Contract(tokenAbi, contractAddressToken);
                }).catch(console.error);

            // Fetch and setup the DApp contract instance
            fetch('../Solidity/out/MetaTag.sol/MetaTag.json')
                .then(response => response.json())
                .then(data => {
                    const dAppAbi = data.abi;
                    dAppContract = new web3.eth.Contract(dAppAbi, contractAddressDApp);
                    // Check if validator variable is on or off
                    setInitialSwitchState();
                }).catch(console.error);

            // Check validator's variable function
            async function setInitialSwitchState() {
                // Make sure dAppContract is defined and available here
                const isValidator = await dAppContract.methods.variableValidators(account).call();
                document.getElementById('toggleSwitch').checked = isValidator;
            }
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

            // Lock company tokens function with approval
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

            // Validators setVariable
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

            // Validators withdrawFundsValidator
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

            // Validators buyVoucher
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