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