window.onload = function() {
document.getElementById('app_button').addEventListener('click', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Assuming the user successfully connects, redirect to app.html
        window.location.href = 'app.html';
  
        // You can use the account information to interact with the blockchain
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.log('MetaMask is not installed. Please consider installing it.');
    }
  });
}
  