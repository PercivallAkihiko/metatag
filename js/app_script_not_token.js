document.addEventListener("DOMContentLoaded", function () {
    //const incrementButton = document.getElementById("incrementButton");
    //const numberValueSpan = document.getElementById("numberValue");
    /* const connectButton = document.getElementById("app_button"); */
    //const connectedAccountSpan = document.getElementById("connectedAccount");
    /* const appButton = document.getElementById("app_button"); */
    




    // Replace with the address of your deployed contract
    const contractAddress = '0xeca0a1d71791e0d9e237fca07fef7039776c7114';
    const tokenContractAddress = '0xd3255346b2ed5bc623708c334b1d56da1ad9d63a';

    let web3;
    let contract;


    const contractABI = [
        {
           "type":"constructor",
           "inputs":[
              {
                 "name":"_mtgToken",
                 "type":"address",
                 "internalType":"address"
              }
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"MTGforVoucher",
           "inputs":[
              {
                 "name":"amount",
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
           "name":"addVideo",
           "inputs":[
              {
                 "name":"videoId",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"videoLength",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"balanceCompanies",
           "inputs":[
              {
                 "name":"",
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
           "name":"balanceValidators",
           "inputs":[
              {
                 "name":"",
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
           "name":"companyVideos",
           "inputs":[
              {
                 "name":"",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"",
                 "type":"uint256",
                 "internalType":"uint256"
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
           "name":"getRewards",
           "inputs":[
              {
                 "name":"company",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"videoId",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"getVideoTags",
           "inputs":[
              {
                 "name":"company",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"videoId",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"validator",
                 "type":"address",
                 "internalType":"address"
              }
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"uint256[]",
                 "internalType":"uint256[]"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"getVideoValidators",
           "inputs":[
              {
                 "name":"a",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"b",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"address[]",
                 "internalType":"address[]"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"lastVideo",
           "inputs":[
              {
                 "name":"",
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
           "name":"mtgTeam",
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
           "name":"mtgToken",
           "inputs":[
              
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"address",
                 "internalType":"contract ERC20"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"readyValidators",
           "inputs":[
              {
                 "name":"",
                 "type":"uint256",
                 "internalType":"uint256"
              }
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
           "name":"receiveTokensFromCompany",
           "inputs":[
              {
                 "name":"amount",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"receiveTokensFromValidator",
           "inputs":[
              {
                 "name":"amount",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"removeWhitelistCompany",
           "inputs":[
              {
                 "name":"company",
                 "type":"address",
                 "internalType":"address"
              }
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"revealHash",
           "inputs":[
              {
                 "name":"company",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"videoId",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"originalValue",
                 "type":"string",
                 "internalType":"string"
              }
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"setVariable",
           "inputs":[
              
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"submitHash",
           "inputs":[
              {
                 "name":"company",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"videoId",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"hash",
                 "type":"string",
                 "internalType":"string"
              }
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
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
           "name":"validatorVideos",
           "inputs":[
              {
                 "name":"",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "outputs":[
              {
                 "name":"companyChosen",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"videoIdChosen",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"variableValidators",
           "inputs":[
              {
                 "name":"",
                 "type":"address",
                 "internalType":"address"
              }
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"bool",
                 "internalType":"bool"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"videos",
           "inputs":[
              {
                 "name":"",
                 "type":"address",
                 "internalType":"address"
              },
              {
                 "name":"",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "outputs":[
              {
                 "name":"id",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"length",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"timestamp",
                 "type":"uint256",
                 "internalType":"uint256"
              },
              {
                 "name":"hashedCounter",
                 "type":"uint256",
                 "internalType":"uint256"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"function",
           "name":"whitelistCompany",
           "inputs":[
              {
                 "name":"company",
                 "type":"address",
                 "internalType":"address"
              }
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"withdrawFundsCompany",
           "inputs":[
              
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"withdrawFundsValidators",
           "inputs":[
              
           ],
           "outputs":[
              
           ],
           "stateMutability":"nonpayable"
        },
        {
           "type":"function",
           "name":"wlCompanies",
           "inputs":[
              {
                 "name":"",
                 "type":"address",
                 "internalType":"address"
              }
           ],
           "outputs":[
              {
                 "name":"",
                 "type":"bool",
                 "internalType":"bool"
              }
           ],
           "stateMutability":"view"
        },
        {
           "type":"event",
           "name":"eventAddVideo",
           "inputs":[
              {
                 "name":"emitter",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"videoId",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              },
              {
                 "name":"chosenValidators",
                 "type":"address[]",
                 "indexed":false,
                 "internalType":"address[]"
              },
              {
                 "name":"timestamp",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventGetRewards",
           "inputs":[
              {
                 "name":"validator",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"company",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"videoId",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              },
              {
                 "name":"rewardAmount",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              },
              {
                 "name":"positive",
                 "type":"bool",
                 "indexed":false,
                 "internalType":"bool"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventMTGforVoucher",
           "inputs":[
              {
                 "name":"validator",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventReceiveTokensFromCompany",
           "inputs":[
              {
                 "name":"validator",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"amount",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventReceiveTokensFromValidator",
           "inputs":[
              {
                 "name":"company",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"amount",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventRemoveWhitelistCompany",
           "inputs":[
              {
                 "name":"company",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventRevealHash",
           "inputs":[
              {
                 "name":"validator",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"company",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"videoId",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              },
              {
                 "name":"originalValue",
                 "type":"string",
                 "indexed":false,
                 "internalType":"string"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventSetVariable",
           "inputs":[
              {
                 "name":"validator",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventSubmitHash",
           "inputs":[
              {
                 "name":"validator",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"company",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"videoId",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              },
              {
                 "name":"hash",
                 "type":"string",
                 "indexed":false,
                 "internalType":"string"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventWhitelistCompany",
           "inputs":[
              {
                 "name":"company",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventWithdrawFundsCompany",
           "inputs":[
              {
                 "name":"company",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"amount",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              }
           ],
           "anonymous":false
        },
        {
           "type":"event",
           "name":"eventWithdrawFundsValidators",
           "inputs":[
              {
                 "name":"validator",
                 "type":"address",
                 "indexed":true,
                 "internalType":"address"
              },
              {
                 "name":"amount",
                 "type":"uint256",
                 "indexed":false,
                 "internalType":"uint256"
              }
           ],
           "anonymous":false
        }
     ]

    const erc20Abi = [
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
        },
        {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "purchaser", "type": "address"},
                       {"indexed": false, "internalType": "uint256", "amount": "purchaser", "type": "uint256"}],
            "name": "TokensPurchased",
            "type": "event"
        }// event TokensPurchased(address indexed purchaser, uint256 amount);
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

    async function whitelistAddress(company) {
        if (!contract) {
            console.error("Contract not initialized");
            return;
        }
    
        const userAccount = await getAccount();
        let estimatedGas;
    
        //try {
        //    // Try estimating the gas. If it fails (e.g., due to a require statement), catch the error.
        //    estimatedGas = await contract.methods.whitelistCompany(company).estimateGas({ from: userAccount });
        //} catch (error) {
        //    console.error("Gas estimation failed, setting to a default value:", error);
        //    estimatedGas = 1000000; // Set a default gas limit
        //}
    
        const transactionParameters = {
            to: contractAddress,
            from: userAccount,
            gas: web3.utils.toHex(estimatedGas),
            data: contract.methods.whitelistCompany(company).encodeABI()
        };
    
        try {
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            console.log("Transaction Hash:", txHash);
        } catch (error) {
            console.error("Transaction Error:", error);
        }
    }

    async function ridiAddress() {
        if (!contract) {
            console.error("Contract not initialized");
            return;
        }
    
        const userAccount = await getAccount();
    
        try {
    
            // Call the receiveTokensFromValidator function of the contract
            const transaction = contract.methods.setVariable();
    
            // Send the transaction
            const txHash = await transaction.send({ from: userAccount });
            console.log("Transaction Hash:", txHash);
        } catch (error) {
            console.error("Transaction Error:", error);
        }
    }

    async function getMtgPrice() {
        return 2.500;
    }

    document.querySelectorAll('.max_mtg').forEach(maxButton => {
        maxButton.addEventListener('click', async function() {
            // Find the nearest '.mtg_lock_wrapper' parent to scope the query
            const lockWrapper = maxButton.closest('.mtg_lock_wrapper');
    
            // Get the balance from '.total_balance' within the same '.mtg_lock_wrapper'
            const mtgBalanceDisplay = lockWrapper.querySelector('.total_balance').innerText;
            const mtgBalance = mtgBalanceDisplay.split(" ")[1]; // Assuming format "Balance X MTG"
    
            // Fetch Ethereum price (assuming this is a function you have defined)
            const mtgPrice = await getMtgPrice();
            if (!mtgPrice) {
                console.log("Failed to fetch Ethereum price.");
                return;
            }
            
            // Update the input field with the maximum MTG balance
            lockWrapper.querySelector('.mtg_input[type="text"]').value = mtgBalance;
    
            // Calculate the dollar value of the ETH balance
            const mtgDollarValue = (parseFloat(mtgBalance) * mtgPrice).toFixed(2);
    
            // Update the dollar value display
            const mtgDollarValueElement = lockWrapper.querySelector('#dollar_value_lock');
            if (mtgDollarValueElement) {
                mtgDollarValueElement.textContent = `${mtgDollarValue} $`;
            }
        });
    });

    async function lockTokens(amount, tokenContractAddress) {
        if (!contract) {
            console.error("Contract not initialized");
            return;
        }
    
        const userAccount = await getAccount();
    
        try {
            // Create a new contract instance for the ERC-20 token
            const tokenContract = new web3.eth.Contract(erc20Abi, tokenContractAddress);
    
            // Convert the amount to Wei
            const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
    
            // Approve the contract to spend the tokens
            await tokenContract.methods.approve(contract._address, amountInWei).send({ from: userAccount });
            console.log("Approval successful");
    
            // Call the receiveTokensFromValidator function of the contract
            const transaction = contract.methods.receiveTokensFromValidator(amountInWei);
    
            // Send the transaction
            const txHash = await transaction.send({ from: userAccount });
            console.log("Transaction Hash:", txHash);
            updateLockedTokens();
        } catch (error) {
            console.error("Transaction Error:", error);
        }
    }
    

    
    
    // Event listener for the Confirm button
    document.querySelector('.deposit_submit').addEventListener('click', function() {
        const amountInput = document.querySelector('.mtg_input[type="text"]');
        
        const amount = amountInput.value; // Get the amount to lock from the input field
        if (amount) {
            console.log(amount);
            lockTokens(amount, tokenContractAddress); // Lock the tokens
        } else {
            console.error("No amount specified");
        }
    });

    async function updateLockedTokens() {
        if (!contract) {
            console.error("Contract not initialized");
            return;
        }
    
        const userAccount = await getAccount();
    
        try {
            // Call the balanceValidators function of the contract
            const lockedTokensInWei = await contract.methods.balanceValidators(userAccount).call();
            
            // Convert the balance from Wei to MTG (assuming MTG has the same decimals as Ether)
            const lockedTokens = web3.utils.fromWei(lockedTokensInWei, 'ether');
    
            // Update the locked tokens display
            const lockedTokensElement = document.querySelector('.lock_element_value.lock_element_value_locked');
            if (lockedTokensElement) {
                lockedTokensElement.textContent = `${lockedTokens} MTG`;
            }
        } catch (error) {
            console.error("Error fetching locked tokens:", error);
        }
    }
    

    

    const whitelistButton = document.getElementById("whitelist_button");
    whitelistButton.addEventListener('click', function(event) {
        const searchInput = document.querySelector('.searchAddress');
        const searchValue = searchInput.value;
        if (searchValue) {
            whitelistAddress(searchValue);
        } else {
            console.error("No Ethereum address specified");
        }
    });

    const ridiButton = document.getElementById("ridi_button");
    ridiButton.addEventListener('click', function(event) {
        ridiAddress();
    });



    initializeWeb3().then(async () => {
        console.log("Web3 initialized");
        const account = await getAccount();
        if (account) {
            console.log(account);
            updateLockedTokens();
        }
    });
    
});