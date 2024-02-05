document.addEventListener("DOMContentLoaded", function () {
    //const incrementButton = document.getElementById("incrementButton");
    //const numberValueSpan = document.getElementById("numberValue");
    /* const connectButton = document.getElementById("app_button"); */
    //const connectedAccountSpan = document.getElementById("connectedAccount");
    const appButton = document.getElementById("app_button");

    // Replace with the address of your deployed contract
    const contractAddress = '0xd3255346b2ed5bc623708c334b1d56da1ad9d63a';

    let web3;
    let contract;

    const contractABI = [
        {
           "type":"constructor",
           "inputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"MAX_SUPPLY",
           "inputs":[
              
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"TOKEN_PRICE_ETH",
           "inputs":[
              
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"allowance",
           "inputs":[
              {
                 "name":"owner",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"spender",
                 "type":"address",
                 "internalType":"address"
              }
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"approve",
           "inputs":[
              {
                 "name":"spender",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"value",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"bool",
                 "internalType":"bool"
              }
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"balanceOf",
           "inputs":[
              {
                 "name":"account",
                 "type":"address",
                 "internalType":"address"
              }
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"buyTokens",
           "inputs":[
              
           ],
           "outputs":[
              
           ],
           "stateMutability":"payable"
        },
        {
           "type":"function",
           "name":"decimals",
           "inputs":[
              
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"uint8",
                 "internalType":"uint8"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"name",
           "inputs":[
              
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"string",
                 "internalType":"string"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"owner",
           "inputs":[
              
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"address",
                 "internalType":"address"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"symbol",
           "inputs":[
              
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"string",
                 "internalType":"string"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"terminate",
           "inputs":[
              
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"totalSupply",
           "inputs":[
              
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"transfer",
           "inputs":[
              {
                 "name":"to",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"value",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"bool",
                 "internalType":"bool"
              }
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"transferFrom",
           "inputs":[
              {
                 "name":"from",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"to",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"value",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"bool",
                 "internalType":"bool"
              }
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"withdrawETH",
           "inputs":[
              
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"event",
           "name":"Approval",
           "inputs":[
              {
                 "name":"owner",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"spender",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"value",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"Transfer",
           "inputs":[
              {
                 "name":"from",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"to",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"value",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              }
           ],
           "anonymous":false
        },
        {
           "type":"error",
           "name":"ERC20InsufficientAllowance",
           "inputs":[
              {
                 "name":"spender",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"allowance",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"needed",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ]
        },
        {
           "type":"error",
           "name":"ERC20InsufficientBalance",
           "inputs":[
              {
                 "name":"sender",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"balance",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"needed",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ]
        },
        {
           "type":"error",
           "name":"ERC20InvalidApprover",
           "inputs":[
              {
                 "name":"approver",
                 "type":"address",
                 "internalType":"address"
              }
           ]
        },
        {
           "type":"error",
           "name":"ERC20InvalidReceiver",
           "inputs":[
              {
                 "name":"receiver",
                 "type":"address",
                 "internalType":"address"
              }
           ]
        },
        {
           "type":"error",
           "name":"ERC20InvalidSender",
           "inputs":[
              {
                 "name":"sender",
                 "type":"address",
                 "internalType":"address"
              }
           ]
        },
        {
           "type":"error",
           "name":"ERC20InvalidSpender",
           "inputs":[
              {
                 "name":"spender",
                 "type":"address",
                 "internalType":"address"
              }
           ]
        }
     ];

   
    

    // Function to initialize Web3 with MetaMask's provider
    async function initializeWeb3() {
        if (window.ethereum) {
            try {
                web3 = new Web3(window.ethereum);
                contract = new web3.eth.Contract(contractABI, contractAddress);
                //await updateNumberValue();
            } catch (error) {
                console.error("Error initializing web3:", error);
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask.");
        }
    }

    /* function updateUserAddress(account) {
        // Assuming you have an HTML element to display the address
        const addressElement = document.getElementById('userAddress');
        if (addressElement) {
            addressElement.textContent = account;
        }
    } */
    
/*     // Function to listen for contract events
    function listenForContractEvents() {
        contract.events.Transfer({ fromBlock: 'latest' }, function(error, event) { 
            if (error) {
                console.error(error);
            } else {
                // Handle the event data
                console.log(event);
                // Update your UI based on event data
            }
        });
        // Add similar listeners for other events like Approval, etc.
    } */

    
   /*  async function buyTokens() {
        const account = await getAccount();
        if (!account) {
            alert("Please connect to MetaMask.");
            return;
        }
    
        const ethAmount = document.querySelector(".eth_input").value; // Replace with your actual input field selector
        if (!ethAmount) {
            alert("Please enter an amount of ETH.");
            return;
        }
    
        const weiAmount = web3.utils.toWei(ethAmount, "ether");
    
        try {
            await contract.methods.buyTokens().send({ from: account, value: weiAmount });
            alert("Tokens purchased successfully!");
        } catch (error) {
            console.error("Error purchasing tokens:", error);
            alert("There was an error purchasing tokens.");
        }
    } */

   /*  async function updateNumberValue() {
        try {
            const numberValue = await contract.methods.number().call();
            numberValueSpan.innerText = numberValue;
        } catch (error) {
            console.error("Error fetching the number value:", error);
            numberValueSpan.innerText = 'Unavailable';
        }
    } */

    async function getAccount() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                return accounts[0];
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask.");
        }
        return null;
    }

    appButton.addEventListener("click", async function () {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                window.location.href = 'app.html'; // Redirect to app.html after successful connection
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
                alert("Please connect to MetaMask to continue.");
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask.");
        }
    });


    /* let lastNumberValue = null;

    async function pollNumberValue() {
        try {
            const numberValue = await contract.methods.number().call();
            // Update the displayed value only if it has changed
            if (numberValue !== lastNumberValue) {
                numberValueSpan.innerText = numberValue;
                lastNumberValue = numberValue;
            }
        } catch (error) {
            console.error("Error fetching the number value:", error);
            numberValueSpan.innerText = 'Unavailable';
        }
    } */

    // Start polling with a specified interval, e.g., every 3 seconds
   /*  setInterval(pollNumberValue, 1000);
    
    incrementButton.addEventListener("click", async function () {
        try {
            const account = await getAccount();
            if (account && contract) {
                await contract.methods.increment().send({ from: account });

                const updatedNumber = await contract.methods.number().call();
                numberValueSpan.innerText = updatedNumber;
            }
        } catch (error) {
            console.error("Error in transaction:", error);
        }
    }); */

    /* connectButton.addEventListener("click", async function () {
        const account = await getAccount();
        if (account) {
            //connectedAccountSpan.innerText = account;
            console.log(account);
            initializeWeb3();
        }
    }); */

    

    /* const disconnectButton = document.getElementById("disconnectButton");

    disconnectButton.addEventListener("click", function () {
        // Reset the connected account display
        connectedAccountSpan.innerText = 'Not connected';
        // Reset the DApp state
        contract = null;
        // Reload the page to reset the state of the DApp or perform additional state cleanup as needed
        window.location.reload();
    }); */

    initializeWeb3().then(() => {
        console.log("Web3 initialized, starting polling...");
        //startPolling(); // Start polling when Web3 is initialized
    });

   /*  initializeWeb3().then(async () => {
        console.log("Web3 initialized");
        const account = await getAccount();
        if (account) {
            console.log(account);
            updateUserAddress(account);  // Update the user address in the UI
            listenForContractEvents();  // Start listening for contract events
        }
    }); */
    
});