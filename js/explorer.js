// name: "", 
// emitter: "",
// validator: "",        
// purchaser: "",
// company: "",

// amount: "",
// additional: "",
// positive: "",
// hash: "",
// tags: [],
// seed: "",
// rewardAmount: "",
// timestamp: "",
// chosenValidator: [],

// videoId: "",
// status: 0

var events = [
    // BuyTokens(                  address indexed purchaser, 					uint amount) 
    {
        name: "BuyTokens", 
        emitter: "",
        validator: "",        
        purchaser: "0x9FC3da866e7DF3a1c57adE1a97c9f00a70f010c8",
        company: "",

        amount: "5MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "",
        status: 1
    },     
    // ReceiveTokensFromValidator( address indexed company, 					uint amount);
    {
        name: "ReceiveTokensFromValidator", 
        emitter: "",
        validator: "",        
        purchaser: "",
        company: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",

        amount: "5MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "zTFBJgnNgU4",
        status: 2
    },    
    // SetVariable(                address indexed validator, 					bool value);
    {
        name: "SetVariable", 
        emitter: "",
        validator: "0x9138Cc7ff38D9DA8cb2102c920b36473736E6EA5",        
        purchaser: "",
        company: "",

        amount: "",
        additional: "",
        positive: "false",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "",
        status: 3
    },    
    // SubmitHash(                 address indexed validator, 	address indexed company, 	bytes32 hash, 				uint videoId, 
    {
        name: "SubmitHash", 
        emitter: "",
        validator: "0xdbC3363De051550D122D9C623CBaff441AFb477C",        
        purchaser: "",
        company: "0xe67026A91CD57988626A2c4C6EB64c03cae20911",

        amount: "",
        additional: "",
        positive: "",
        hash: "XXXXX",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "95Bbjmwlnss",
        status: 4
    },    
    // RevealHash(                 address indexed validator, 	address indexed company, 	uint[] tags, bytes11 seed uint, 	uint videoId, 
    {
        name: "RevealHash", 
        emitter: "",
        validator: "0xB6E268B6675846104feeF5582D22f40723164d05",        
        purchaser: "",
        company: "0xB6E268B6675846104feeF5582D22f40723164d05",

        amount: "",
        additional: "",
        positive: "",
        hash: "",
        tags: ["pippo", "caio", "sempronio"],
        seed: "rMFUws0juJn",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "95Bbjmwlnss",
        status: 5
    },    
    // GetRewards(                 address indexed validator, 	address indexed company, 	uint rewardAmount, bool positive, 	uint videoId, 
    {
        name: "GetRewards", 
        emitter: "",
        validator: "0xb7019c9184580b2E1f66fCDc3EB6c62621732064",        
        purchaser: "",
        company: "0xF5d958F6eD5170903752d04d3B2a9D355e87C87B",

        amount: "",
        additional: "",
        positive: "false",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "xxxr4J1fzvc",
        status: 6
    },    
    // WithdrawFundsValidator(     address indexed validator, 					uint amount
    {
        name: "WithdrawFundsValidator", 
        emitter: "",
        validator: "0x388C818CA8B9251b393131C08a736A67ccB19297",        
        purchaser: "",
        company: "",

        amount: "5MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "",
        status: 7
    },    
    // MTGforVoucher(              address indexed validator);
    {
        name: "MTGforVoucher", 
        emitter: "",
        validator: "0x388C818CA8B9251b393131C08a736A67ccB19297",        
        purchaser: "",
        company: "",

        amount: "",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "",
        status: 8
    },
        // BuyTokens(                  address indexed purchaser, 					uint amount) 
    {
        name: "BuyTokens", 
        emitter: "",
        validator: "",        
        purchaser: "0x9FC3da866e7DF3a1c57adE1a97c9f00a70f010c8",
        company: "",

        amount: "5MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "",
        status: 1
    },     
    // ReceiveTokensFromCompany( address indexed company, 					uint amount);
    {
        name: "ReceiveTokensFromCompany", 
        emitter: "",        
        validator: "",        
        purchaser: "",
        company: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",

        amount: "5MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "zTFBJgnNgU4",
        status: 2
    },  
    // AddVideo(address indexed emitter, address[] chosenValidators,    uint timestamp uint videoId, 
    {
        name: "AddVideo", 
        emitter: "",
        validator: "",        
        purchaser: "",
        company: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",

        amount: "5MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [
            "0xDef1C0ded9bec7F1a1670819833240f027b25EfF", 
            "0xc7386DeE48a71c4F83d6E980454C678f632E6231",
            "0xfa044DB7c24da4efa1327d3847078f1fE1eB3EB3",
            "0x411099C0b413f4fedDb10Edf6a8be63BD321311C",
            "0x993864E43Caa7F7F12953AD6fEb1d1Ca635B875F",
            "0x644192291cc835A93d6330b24EA5f5FEdD0eEF9e",
            "0xbE5571197C83FC3D9FD362eD04f846a85C8028EF",
            "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
            "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
            "0x388C818CA8B9251b393131C08a736A67ccB19297",
        ],
        videoId: "zTFBJgnNgU4",
        status: 2
    },      
    // WithdrawFundsCompany(     address indexed validator, 					uint amount
    {
        name: "WithdrawFundsCompany", 
        emitter: "",
        validator: "0x388C818CA8B9251b393131C08a736A67ccB19297",        
        purchaser: "",
        company: "",

        amount: "5MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "1710151028",
        chosenValidator: [],

        videoId: "",
        status: 7
    },    
    // MTGforVoucher(              address indexed validator);
    {
        name: "MTGforVoucher", 
        emitter: "",
        validator: "0x388C818CA8B9251b393131C08a736A67ccB19297",        
        purchaser: "",
        company: "",

        amount: "",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [],

        videoId: "",
        status: 8
    },
    {
        name: "AddVideo", 
        emitter: "",
        validator: "",        
        purchaser: "",
        company: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",

        amount: "5MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidator: [
            "0xDef1C0ded9bec7F1a1670819833240f027b25EfF", 
            "0xc7386DeE48a71c4F83d6E980454C678f632E6231",
            "0xfa044DB7c24da4efa1327d3847078f1fE1eB3EB3",
            "0x411099C0b413f4fedDb10Edf6a8be63BD321311C",
            "0x993864E43Caa7F7F12953AD6fEb1d1Ca635B875F",
            "0x644192291cc835A93d6330b24EA5f5FEdD0eEF9e",
            "0xbE5571197C83FC3D9FD362eD04f846a85C8028EF",
            "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
            "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
            "0x388C818CA8B9251b393131C08a736A67ccB19297",
        ],
        videoId: "zTFBJgnNgU4",
        status: 2
    },  
]

document.addEventListener("DOMContentLoaded", function() {    
    initEventList();
});

function initEventList(){
    var events_list = document.querySelector('.events_list');        

    events_list.innerHTML = '';    

    var eventCounter = 0;

    events.forEach(function(event) {                
        var elementDiv = document.createElement('div');  
        elementDiv.classList.add('event_element');

        var nameDiv = document.createElement('div');
        var addressDiv = document.createElement('div');
        var valuesDiv = document.createElement('div'); 
        
        console.log(`Analyzing: ${event.name}, emitter: ${event.emitter}`)
        
        nameDiv.innerHTML = event.name;                   
        createMacroEventDiv(addressDiv, "Validator:", event.validator);
        createMacroEventDiv(addressDiv, "Purchaser:", event.purchaser);
        createMacroEventDiv(addressDiv, "Company:", event.company);         
        createMacroEventDiv(addressDiv, "Emitter:", event.emitter);   

        createMacroEventDiv(valuesDiv, "Amount:", event.amount);                    
        createMacroEventDiv(valuesDiv, "Additional:", event.additional);
        createMacroEventDiv(valuesDiv, "Positive:", event.positive);
        createMacroEventDiv(valuesDiv, "Hash:", event.hash);                             
        createMacroEventDiv(valuesDiv, "Seed:", event.seed);
        createMacroEventDiv(valuesDiv, "Reward:", event.rewardAmount);                   
        createMacroEventDiv(valuesDiv, "Validators:", event.chosenValidator, true); 
        createMacroEventDiv(valuesDiv, "Timestamp", event.timestamp); 
        createMacroEventDiv(valuesDiv, "Video ID:", event.videoId); 

        createMacroEventDiv(valuesDiv, "Tags:", event.tags); 
        
        elementDiv.appendChild(nameDiv); 
        elementDiv.appendChild(addressDiv); 
        elementDiv.appendChild(valuesDiv); 
        events_list.appendChild(elementDiv);       
        
        eventCounter += 1;
    });    
    setGridRows(eventCounter, events_list, 100);
}

function createMacroEventDiv(div, name, value, chosenValidator = false){
    if(value.length == 0){ return;}
    var macroElement = document.createElement('div');
    var nameDiv = document.createElement('div');
    var valueDiv = document.createElement('div');       

    nameDiv.innerHTML = "<grey>" + name + "</grey>";        
    if(chosenValidator){
        valueDiv.innerHTML = value[0].substring(0, 6) + "...";
        var chosenValidatorDiv = document.createElement('div');          
        
        value.forEach(function(validator) {   
            var validatorDiv = document.createElement('div');    
            validatorDiv.innerHTML = validator;
            validatorDiv.classList.add("validator");
            chosenValidatorDiv.appendChild(validatorDiv);        
        });

        valueDiv.classList.add("container-event");
        chosenValidatorDiv.classList.add("hidden-div");
        valueDiv.appendChild(chosenValidatorDiv);        
    }
    else{
        valueDiv.innerHTML = value; 
    }

    macroElement.appendChild(nameDiv);
    macroElement.appendChild(valueDiv);
    macroElement.classList.add('event_macro_element');

    div.appendChild(macroElement);        
}

function setGridRows(number, listDiv, height) {                  
    listDiv.style.gridTemplateRows = 'repeat(' + number + ', ' + height + 'px)';
}