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