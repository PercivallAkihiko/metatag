document.addEventListener('DOMContentLoaded', async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            // Get the first account
            const account = accounts[0];
            // Format the address: first 6 characters + "..." + last 4 characters
            const shortAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;

            // Update the div with the formatted address
            document.getElementById('userAddress').textContent = shortAddress;
            // Initialize web3 instance
            const web3 = new Web3(window.ethereum);
            const contractAddressToken = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
            const contractAddressDApp = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

            // Smart contract of the token (ABI and address)
            fetch('../Solidity/out/MetaTagToken.sol/MetaTagToken.json')
                .then(response => response.json())
                .then(data => {
                    const abi = data.abi;
                    const contract = new web3.eth.Contract(abi, contractAddressToken);

                    // Function to call buyTokens
                    document.getElementById('buy_button').addEventListener('click', async () => {
                        const ethAmount = document.getElementById('ethToBuy').value; // Get the ETH amount from the input
                        const weiValue = web3.utils.toWei(ethAmount, 'ether'); // Convert ETH to Wei

                        try {
                            const receipt = await contract.methods.buyTokens().send({
                                from: account,
                                value: weiValue
                            });
                            console.log('Transaction successful:', receipt);
                        } catch (error) {
                            console.error('Transaction failed:', error);
                        }
                    });
                })
                .catch(console.error);

            // Smart contract of the DApp (ABI and address)
            fetch('../Solidity/out/MetaTag.sol/MetaTag.json')
            .then(response => response.json())
            .then(data => {
                const abi = data.abi;
                const contract = new web3.eth.Contract(abi, contractAddressDApp);

                // Function to call buyTokens
                document.getElementById('lockCompany').addEventListener('click', async () => {
                    const MTGAmount = document.getElementById('MTGLockAmount').value; // Get the ETH amount from the input
                    try {
                        const receipt = await contract.methods.receiveTokensFromCompany(MTGAmount).send({
                            from: account,
                        });
                        console.log('Transaction successful:', receipt);
                    } catch (error) {
                        console.error('Transaction failed:', error);
                    }
                });
            })
            .catch(console.error);

        } catch (error) {
            console.error('An error occurred:', error);
            document.getElementById('userAddress').textContent = 'Error fetching address.';
        }
    } else {
        console.log('MetaMask is not installed. Please consider installing it.');
        document.getElementById('userAddress').textContent = 'MetaMask is not installed.';
    }

    // Event listener for the disconnect button
    document.getElementById('disconnectButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});