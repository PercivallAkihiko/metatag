// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Listener to jump to company' page
    document.getElementById('app_button').addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                window.location.href = 'company.html';
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            console.log('MetaMask is not installed. Please consider installing it.');
        }
    });
    // Listener to jump to validator' page
    document.getElementById('main_button').addEventListener('click', async () => {    
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);

            // Network details for the testnet
            const testnetNetwork = {
                chainId: '0x7a69',
                chainName: 'MetaTag Testnet',
                rpcUrls: ['https://metamask.blockchain.ervincit.com'],
                nativeCurrency: {
                name: 'ETHFAKE',
                symbol: 'CDC',
                decimals: 18
                },                
            };

            // Add the testnet to MetaMask
            const networkType = await web3.eth.net.getNetworkType();  
            
            console.log(networkType);

            
            try{
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [testnetNetwork]
                })
                console.log('Testnet added to MetaMask');                                        
            }catch(error){
                console.error('Error adding testnet to MetaMask:', error);
            }

            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                window.location.href = 'app.html';
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            console.log('MetaMask is not installed. Please consider installing it.');
        }
    });
})