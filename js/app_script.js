document.addEventListener("DOMContentLoaded", function () {
    //const incrementButton = document.getElementById("incrementButton");
    //const numberValueSpan = document.getElementById("numberValue");
    /* const connectButton = document.getElementById("app_button"); */
    //const connectedAccountSpan = document.getElementById("connectedAccount");
    /* const appButton = document.getElementById("app_button"); */
    const addressElement = document.getElementById('userAddress');





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

    /* function formatString(str) {
        return str.slice(0, 5) + "..." + str.slice(-4);
    } */

    function updateUserAddress(account) {
        // Assuming you have an HTML element to display the address
        if (addressElement) {
            addressElement.textContent = account.slice(0, 5) + "..." + account.slice(-4);;
        }
    }

    async function getEthereumPrice() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const data = await response.json();
            return data.ethereum.usd;
        } catch (error) {
            console.error('Error fetching Ethereum price:', error);
            return null;
        }
    }
    
    async function updateEthBalance() {
        const account = await getAccount();
        if (account) {
            const ethereumPrice = await getEthereumPrice();
            if (!ethereumPrice) {
                console.log("Failed to fetch Ethereum price.");
                return;
            }
    
            web3.eth.getBalance(account, function(err, result) {
                if (err) {
                    console.error(err);
                } else {
                    const balanceInEther = web3.utils.fromWei(result, "ether");
                    
                    // Update Ethereum balance in the buy section
                    const ethBalanceElement = document.querySelector(".ethereum .total_balance");
                    if (ethBalanceElement) {
                        ethBalanceElement.textContent = `Balance  ${balanceInEther}`;
                    }
    
                    /* // Update the dollar value in the buy section
                    const dollarValueElement = document.querySelector(".ethereum .dollar_value");
                    if (dollarValueElement) {
                        const dollarValue = (balanceInEther * ethereumPrice).toFixed(2);
                        dollarValueElement.textContent = `${dollarValue} $`;
                    } */
                }
            });
        }
    }
    

    // Assuming you have a conversion rate from ETH to MTG
    const ethToMtgRate = 0.001; // Replace with the actual conversion rate

    // Add functionality for "Max" button
    document.querySelectorAll('.max').forEach(maxButton => {
        maxButton.addEventListener('click', async function() {
            const ethBalanceDisplay = maxButton.closest('.money').querySelector('.total_balance').innerText;
            const ethBalance = ethBalanceDisplay.split(" ")[1]; // Assuming format "Balance X ETH"

            // Fetch Ethereum price
            const ethereumPrice = await getEthereumPrice();
            if (!ethereumPrice) {
                console.log("Failed to fetch Ethereum price.");
                return;
            }

            // Update the input field with the maximum ETH balance
            maxButton.closest('.money').querySelector('.eth_input').value = ethBalance;
            const ethDollarValue = (parseFloat(ethBalance) * ethereumPrice).toFixed(2);

            // Calculate and update the dollar value for ETH
            const ethDollarValueElement = maxButton.closest('.money').querySelector('.dollar_value');
            if (ethDollarValueElement) {
                ethDollarValueElement.textContent = `${ethDollarValue} $`;
            }

            // Calculate and update the MTG amount and dollar value
            const mtgAmount = parseFloat(ethBalance) / ethToMtgRate;
            const mtgInput = document.querySelector('.mtg_input.mtg_sell');
            const mtgDollarValueElement = document.querySelector('.mtg.money .dollar_value');

            if (mtgInput && mtgDollarValueElement) {
                mtgInput.value = mtgAmount.toFixed(2);
                mtgDollarValueElement.textContent = `${ethDollarValue} $`; // Same dollar value as ETH
            }
        });
    });


    
    

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

    

    async function buyMetaTagTokens(ethAmount) {
        if (!contract) {
            console.error("Contract not initialized");
            return;
        }
        const userAccount = await getAccount();
        const transactionParameters = {
            to: contractAddress,
            from: userAccount,
            value: web3.utils.toHex(web3.utils.toWei(ethAmount, 'ether')),
            data: contract.methods.buyTokens().encodeABI() // Replace with the actual contract function
        };
    
        try {
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            console.log("Transaction Hash:", txHash);
            // Additional logic after successful transaction (if needed)
        } catch (error) {
            console.error(error);
        }
    }

/* 
    let lastNumberValue = null; */

    /* async function pollNumberValue() {
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
    }

    // Start polling with a specified interval, e.g., every 3 seconds
    setInterval(pollNumberValue, 1000);
     */

    const buyButton = document.getElementById('buy_button');
    buyButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const ethInput = document.querySelector('.eth_input');
        const ethAmount = ethInput.value; // Get the value from the input field

        if (ethAmount) {
            buyMetaTagTokens(ethAmount);
        } else {
            console.error("No Ethereum amount specified");
        }
    });

    const disconnectButton = document.getElementById("disconnectButton");

    disconnectButton.addEventListener("click", function () {
        // Reset the connected account display
        addressElement.textContent = 'Not connected';
        // Reset the DApp state
        contract = null;
        // Reload the page to reset the state of the DApp or perform additional state cleanup as needed
        window.location.reload();
    });

    /* initializeWeb3().then(() => {
        console.log("Web3 initialized, starting polling...");
        //startPolling(); // Start polling when Web3 is initialized
    }); */

    initializeWeb3().then(async () => {
        console.log("Web3 initialized");
        const account = await getAccount();
        if (account) {
            console.log(account);
            updateUserAddress(account);  // Update the user address in the UI
            updateEthBalance(); // Update the Ethereum balance
            listenForContractEvents();  // Start listening for contract events
        }
    });
    
});