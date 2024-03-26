// Global variables so all the functions can use them
var web3;
var tokenContractAddress;
var tokenContract;
var dAppContractAddress;
var dAppContract;

// Function to load the smart contracts
async function loadSmartContracs() {
  tokenContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  dAppContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const tokenData = await fetch(
    "../Solidity/out/MetaTagToken.sol/MetaTagToken.json"
  ).then((response) => response.json());
  tokenContract = new web3.eth.Contract(tokenData.abi, tokenContractAddress);
  const dAppData = await fetch("../Solidity/out/MetaTag.sol/MetaTag.json").then(
    (response) => response.json()
  );
  dAppContract = new web3.eth.Contract(dAppData.abi, dAppContractAddress);
}

// Loads the events to be displayed
async function loadEvents() {
  try {
    const localEvents = [];
    console.log(localEvents);
    const tokenContractEvents = await tokenContract.getPastEvents("allEvents", {
      fromBlock: 0,
      toBlock: "latest",
    });
    console.log(tokenContractEvents);
    for (let i = 0; i < tokenContractEvents.length; i++) {
      if (tokenContractEvents[i].event == "eventBuyTokens") {
        localEvents.push({
          name: "BuyTokens",
          validator: "",
          user: tokenContractEvents[i].returnValues[0],
          company: "",
          from: "",
          to: "",
          amount:
            web3.utils.fromWei(
              tokenContractEvents[i].returnValues[1],
              "ether"
            ) + " MTG",
          value: "",
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: tokenContractEvents[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 1,
        });
      } else if (tokenContractEvents[i].event == "Transfer") {
        localEvents.push({
          name: "Transfer",
          validator: "",
          user: "",
          company: "",
          from: tokenContractEvents[i].returnValues[0],
          to: tokenContractEvents[i].returnValues[1],
          amount:
            web3.utils.fromWei(
              tokenContractEvents[i].returnValues[2],
              "ether"
            ) + " MTG",
          value: "",
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: tokenContractEvents[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 14,
        });
      } else if (tokenContractEvents[i].event == "Approval") {
        localEvents.push({
          name: "Approval",
          validator: "",
          user: "",
          company: "",
          from: tokenContractEvents[i].returnValues[0],
          to: tokenContractEvents[i].returnValues[1],
          amount:
            web3.utils.fromWei(
              tokenContractEvents[i].returnValues[2],
              "ether"
            ) + " MTG",
          value: "",
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: tokenContractEvents[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 15,
        });
      }
    }
    const events = await dAppContract.getPastEvents("allEvents", {
      fromBlock: 0,
      toBlock: "latest",
    });
    console.log(events);
    for (let i = 0; i < events.length; i++) {
      if (events[i].event == "eventMTGforVoucher") {
        localEvents.push({
          name: "MTGforVoucher",
          validator: "",
          user: events[i].returnValues[0],
          company: "",
          from: "",
          to: "",
          amount: "",
          value: "",
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 8,
        });
      } else if (events[i].event == "eventReceiveTokensFromValidator") {
        localEvents.push({
          name: "ReceiveTokensFromValidator",
          validator: events[i].returnValues[0],
          user: "",
          company: "",
          from: "",
          to: "",
          amount:
            web3.utils.fromWei(events[i].returnValues[1], "ether") + " MTG",
          value: "",
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 2,
        });
      } else if (events[i].event == "eventSetVariable") {
        localEvents.push({
          name: "SetVariable",
          validator: events[i].returnValues[0],
          user: "",
          company: "",
          from: "",
          to: "",
          amount: "",
          value: events[i].returnValues[1],
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 3,
        });
      } else if (events[i].event == "eventSubmitHash") {
        localEvents.push({
          name: "SubmitHash",
          validator: events[i].returnValues[0],
          user: "",
          company: events[i].returnValues[1],
          from: "",
          to: "",
          amount: "",
          value: "",
          positive: "",
          hash: events[i].returnValues[3],
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: decimalToString(events[i].returnValues[2]),
          status: 4,
        });
      } else if (events[i].event == "eventRevealHash") {
        localEvents.push({
          name: "RevealHash",
          validator: events[i].returnValues[0],
          user: "",
          company: events[i].returnValues[1],
          from: "",
          to: "",
          amount: "",
          value: "",
          positive: "",
          hash: "",
          tags: events[i].returnValues[3],
          seed: hexToAscii(events[i].returnValues[4]),
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: decimalToString(events[i].returnValues[2]),
          status: 5,
        });
      } else if (events[i].event == "eventGetRewards") {
        localEvents.push({
          name: "GetRewards",
          validator: events[i].returnValues[0],
          user: "",
          company: events[i].returnValues[1],
          from: "",
          to: "",
          amount: "",
          value: "",
          positive: events[i].returnValues[4],
          hash: "",
          tags: "",
          seed: "",
          rewardAmount:
            Web3.utils.fromWei(events[i].returnValues[3], "ether") + " MTG",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: decimalToString(events[i].returnValues[2]),
          status: 6,
        });
      } else if (events[i].event == "eventWithdrawTokensValidator") {
        localEvents.push({
          name: "WithdrawTokensValidator",
          validator: events[i].returnValues[0],
          user: "",
          company: "",
          from: "",
          to: "",
          amount:
            Web3.utils.fromWei(events[i].returnValues[1], "ether") + " MTG",
          value: "",
          positive: "",
          hash: "",
          tags: "",
          seed: "",
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 7,
        });
      }
      if (events[i].event == "eventReceiveTokensFromCompany") {
        localEvents.push({
          name: "ReceiveTokensFromCompany",
          validator: "",
          user: "",
          company: events[i].returnValues[0],
          from: "",
          to: "",
          amount:
            web3.utils.fromWei(events[i].returnValues[1], "ether") + " MTG",
          value: "",
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 2,
        });
      } else if (events[i].event == "eventAddVideo") {
        localEvents.push({
          name: "AddVideo",
          validator: "",
          user: "",
          company: events[i].returnValues[0],
          from: "",
          to: "",
          amount: "",
          value: "",
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: events[i].returnValues[2],
          videoId: decimalToString(events[i].returnValues[1]),
          status: 3,
        });
      } else if (events[i].event == "eventWithdrawTokensCompany") {
        localEvents.push({
          name: "WithdrawTokensCompany",
          validator: "",
          user: "",
          company: events[i].returnValues[0],
          from: "",
          to: "",
          amount:
            web3.utils.fromWei(events[i].returnValues[1], "ether") + " MTG",
          value: "",
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 4,
        });
      } else if (events[i].event == "eventWhitelistCompany") {
        localEvents.push({
          name: "eventWhitelistCompany",
          validator: "",
          user: "",
          company: events[i].returnValues[0],
          from: "",
          to: "",
          amount: "",
          value: "",
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 4,
        });
      } else if (events[i].event == "eventRemoveWhitelistCompany") {
        localEvents.push({
          name: "eventRemoveWhitelistCompany",
          validator: "",
          user: "",
          company: events[i].returnValues[0],
          from: "",
          to: "",
          amount: "",
          value: "",
          positive: "",
          hash: "",
          tags: [],
          seed: "",
          rewardAmount: "",
          timestamp: events[i].blockNumber,
          chosenValidators: [],
          videoId: "",
          status: 4,
        });
      }
    }

    localEvents.sort((a, b) => {
      if (a.timestamp > b.timestamp) return -1;
      if (a.timestamp < b.timestamp) return 1;
      return 0;
    });

    initEventList(localEvents);
  } catch (err) {
    console.error(error);
  }
}

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  loadSmartContracs()
    .then(() => {
      loadEvents();
      setInterval(loadEvents, 5000);
    })
    .catch((err) => {
      console.log("error loading smart contract", err);
    });
} else {
  console.log("No web 3 client. Not possible to load smart contracts");
}
