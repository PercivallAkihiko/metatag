// Global variables so they can be called by all functions
var account;
var web3;
var tokenContractAddress;
var tokenContract;
var dAppContractAddress;
var dAppContract;

// Function to load the Web3 account of the users
function mainWeb3Loading() {
    document.addEventListener('DOMContentLoaded', async () => {
        if (window.ethereum) {
            try {
                await loadAccountAndWeb3();
                await loadSmartContracs();
                await setBlockiesImage();
            } catch (error) {
                console.error('An error occurred:', error);
                document.getElementById('userAddress').textContent = 'Error fetching address!';
            }
        } else {
            document.getElementById('userAddress').textContent = 'MetaMask is not installed!';
        }
        loadLiquidTokens();
        loadMaxETH();
        listenerMaxETHButton();
        loadMaxMTG();
        listenerMaxMTGButton()
        listenerDisconnectButton();
        listenerBuyTokensButton();
        listenerBuyVoucherButton();
        document.dispatchEvent(new CustomEvent('sharedDataReady'));
    })
}

// Function to load account and initialize Web3
async function loadAccountAndWeb3() {
    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
    });
    account = accounts[0];
    document.getElementById('userAddress').textContent = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
    web3 = new Web3(window.ethereum);
}

// Function to load the smart contracts
async function loadSmartContracs() {
    // Load the contract addresses
    tokenContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    dAppContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    // Fetch and setup the token contract instance
    const tokenData = await fetch('../Solidity/out/MetaTagToken.sol/MetaTagToken.json').then(response => response.json());
    tokenContract = new web3.eth.Contract(tokenData.abi, tokenContractAddress);
    // Similarly, fetch and setup the dApp contract instance
    const dAppData = await fetch('../Solidity/out/MetaTag.sol/MetaTag.json').then(response => response.json());
    dAppContract = new web3.eth.Contract(dAppData.abi, dAppContractAddress);
}

// Function to set blockies image
async function setBlockiesImage() {
    const icon = blockies.create({
        seed: account,
        size: 8,
        scale: 2
    });
    icon.style.transform = 'scale(1.5)'; // Adjust scaling factor for desired zoom level
    icon.style.transformOrigin = 'center'; // Zoom in on the center
    icon.style.borderRadius = '50%'; // Maintain circular shape
    document.getElementById('blockiesImage').appendChild(icon);
    const icon2 = blockies.create({
        seed: account,
        size: 8,
        scale: 2
    });
    icon2.style.transform = 'scale(1.5)'; // Adjust scaling factor for desired zoom level
    icon2.style.transformOrigin = 'center'; // Zoom in on the center
    icon2.style.borderRadius = '50%'; // Maintain circular shape
    document.getElementById('blockiesImage2').appendChild(icon2);
}

// Function to disconnect the account
function listenerDisconnectButton() {
    document.getElementById('disconnectButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Function to buy tokens
function listenerBuyTokensButton() {
    document.getElementById('buyTokensButton').addEventListener('click', async () => {
        const weiValue = web3.utils.toWei(document.getElementById('ethToBuy').value, 'ether');
        try {
            const receipt = await tokenContract.methods.buyTokens().send({
                from: account,
                value: weiValue
            });
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    });
}

// Function to purchase a voucher
function listenerBuyVoucherButton() {
    document.getElementById('buyVoucherButton').addEventListener('click', async () => {
        // Convert amount to Wei for consistency with token decimals
        const tokensInWei = web3.utils.toWei("100", 'ether');
        try {
            // Check current allowance
            const allowance = await tokenContract.methods.allowance(account, dAppContractAddress).call();
            if (web3.utils.toBigInt(allowance) < (web3.utils.toBigInt(tokensInWei))) {
                // If allowance is less than the amount to be transferred, approve it
                await tokenContract.methods.approve(dAppContractAddress, tokensInWei).send({
                    from: account
                });
            }
            await dAppContract.methods.MTGforVoucher().send({
                from: account
            });
            document.getElementById('voucherOutput').textContent = generateVoucher();
        } catch (error) {
            console.error('Failed to send buyVoucher transaction:', error);
        }
    });
}

// Function to display the liquid tokens of the users
async function loadLiquidTokens() {
    document.getElementById('liquidTokens').textContent = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
}

// Function to display the max amount of ETH in the "Buy" section
async function loadMaxETH() {
    document.getElementById('maxETH').textContent = "Balance " + parseFloat(web3.utils.fromWei(await web3.eth.getBalance(account), 'ether'));
}

// Function to paste the max amount of ETH into the "Buy" input
function listenerMaxETHButton() {
    document.getElementById('maxETHButton').addEventListener('click', async () => {
        const parts = document.getElementById('maxETH').innerHTML.split(" ");
        document.getElementById('ethToBuy').value = parts[parts.length - 1];
        validateInput(document.getElementById('ethToBuy'), 'ethereum');
    });
}

// Function to display the max amount of MTG in the "Lock" section
async function loadMaxMTG() {
    document.getElementById('maxMTG').textContent = "Balance " + parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(account).call(), 'ether'));
}

// Function to paste the max amount of MTG into the "Lock" input
function listenerMaxMTGButton() {
    document.getElementById('maxMTGButton').addEventListener('click', async () => {
        document.getElementById('MTGLockAmount').value = document.getElementById('maxMTG').innerHTML;
        validateInputLock(document.getElementById('MTGLockAmount'));
    });
}

mainWeb3Loading();