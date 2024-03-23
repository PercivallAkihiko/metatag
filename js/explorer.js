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

var eventsDB = [
    /* //1 BuyTokens(address indexed user, uint amount);
    {
        name: "BuyTokens", 
        validator: "",        
        company: "",
        user: "0x9FC3da866e7DF3a1c57adE1a97c9f00a70f010c8",

        amount: "5 MTG",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "",
        status: 1
    },     
    //2 ReceiveTokensFromValidator(address indexed validator, uint amount);
    {
        name: "ReceiveTokensFromValidator", 
        validator: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",        
        company: "",
        user: "",

        amount: "5 MTG",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "",
        status: 2
    },    
    //3 SetVariable(address indexed validator, bool indexed value);
    {
        name: "SetVariable", 
        validator: "0x9138Cc7ff38D9DA8cb2102c920b36473736E6EA5",        
        company: "",
        user: "",

        amount: "",
        value: "true",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "",
        status: 3
    },    
    //4 SubmitHash(address indexed validator, address indexed company, uint indexed videoId, bytes32 hash);
    {
        name: "SubmitHash", 
        validator: "0xdbC3363De051550D122D9C623CBaff441AFb477C",        
        company: "0xe67026A91CD57988626A2c4C6EB64c03cae20911",
        user: "",

        amount: "",
        value: "",
        positive: "",
        hash: "XXXXX",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "95Bbjmwlnss",
        status: 4
    },    
    //5 RevealHash(address indexed validator, address indexed company, uint indexed videoId, uint[] tags, bytes11 seed); 
    {
        name: "RevealHash", 
        validator: "0xB6E268B6675846104feeF5582D22f40723164d05",        
        company: "0xB6E268B6675846104feeF5582D22f40723164d05",
        user: "",

        amount: "",
        value: "",
        positive: "",
        hash: "",
        tags: ["pippo", "caio", "sempronio"],
        seed: "rMFUws0juJn",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "95Bbjmwlnss",
        status: 5
    },    
    //6 GetRewards(address indexed validator, address indexed company, uint indexed videoId, uint rewardAmount, bool positive);
    {
        name: "GetRewards", 
        validator: "0xb7019c9184580b2E1f66fCDc3EB6c62621732064",        
        company: "0xF5d958F6eD5170903752d04d3B2a9D355e87C87B",
        user: "",

        amount: "",
        value: "",
        positive: "false",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "15 MTG",
        timestamp: "",
        chosenValidators: [],

        videoId: "xxxr4J1fzvc",
        status: 6
    },    
    //7 WithdrawTokensValidator(address indexed validator, uint amount);
    {
        name: "WithdrawTokensValidator",
        validator: "0x388C818CA8B9251b393131C08a736A67ccB19297",    
        company: "",
        user: "",

        amount: "5 MTG",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "",
        status: 7
    },    
    //8 MTGforVoucher(address indexed user);
    {
        name: "MTGforVoucher", 
        validator: "",        
        company: "",
        user: "0x388C818CA8B9251b393131C08a736A67ccB19297",

        amount: "",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "",
        status: 8
    },
    //1 BuyTokens(address indexed user, uint amount);
    {
        name: "BuyTokens", 
        validator: "",        
        company: "",
        user: "0x9FC3da866e7DF3a1c57adE1a97c9f00a70f010c8",

        amount: "5 MTG",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "",
        status: 1
    },     
    //9 ReceiveTokensFromCompany(address indexed company, uint amount);
    {
        name: "ReceiveTokensFromCompany",      
        validator: "",        
        company: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",
        user: "",

        amount: "5 MTG",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "zTFBJgnNgU4",
        status: 9
    },  
    //10 AddVideo(address indexed company, uint indexed videoId, address[] chosenValidators); 
    {
        name: "AddVideo", 
        validator: "",        
        company: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",
        user: "",

        amount: "5 MTG",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [
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
        status: 10
    },      
    //11 WithdrawTokensCompany(address indexed company, uint amount);
    {
        name: "WithdrawTokensCompany", 
        validator: "",        
        company: "0x388C818CA8B9251b393131C08a736A67ccB19297",
        user: "",

        amount: "5 MTG",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "",
        status: 11
    },    
    //8 MTGforVoucher(address indexed user);
    {
        name: "MTGforVoucher", 
        validator: "",        
        company: "",
        user: "0x388C818CA8B9251b393131C08a736A67ccB19297",

        amount: "",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "",
        status: 8
    },
    //10 AddVideo(address indexed company, uint indexed videoId, address[] chosenValidators);
    {
        name: "AddVideo", 
        validator: "",        
        company: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",
        user: "",

        amount: "5 MTG",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [
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
    //12 WhitelistCompany(address indexed company);
    {
        name: "WhitelistCompany", 
        validator: "",        
        company: "0x388C818CA8B9251b393131C08a736A67ccB19297",
        user: "",

        amount: "",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "",
        status: 12
    },
    //13 RemoveWhitelistCompany(address indexed company);
    {
        name: "RemoveWhitelistCompany", 
        validator: "",        
        company: "0x388C818CA8B9251b393131C08a736A67ccB19297",
        user: "",

        amount: "",
        value: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "",
        chosenValidators: [],

        videoId: "",
        status: 13
    } */
]

document.addEventListener("DOMContentLoaded", function() {    
    initEventList();
});

function initEventList(){
    var events_list = document.querySelector('.events_list');        

    events_list.innerHTML = '';    

    var eventCounter = 0;

    eventsDB.forEach(function(event) {                
        var elementDiv = document.createElement('div');  
        elementDiv.classList.add('event_element');

        var nameDiv = document.createElement('div');
        var addressDiv = document.createElement('div');
        var valuesDiv = document.createElement('div'); 
        
        //console.log(`Analyzing: ${event.name}, emitter: ${event.emitter}`)
        
        nameDiv.innerHTML = event.name;                   
        createMacroEventDiv(addressDiv, "Validator:", event.validator);
        createMacroEventDiv(addressDiv, "User:", event.user);
        createMacroEventDiv(addressDiv, "Company:", event.company);
        createMacroEventDiv(addressDiv, "From:", event.from);    
        createMacroEventDiv(addressDiv, "To:", event.to);             

        createMacroEventDiv(valuesDiv, "Amount:", event.amount);                    
        createMacroEventDiv(valuesDiv, "Value:", event.value);
        createMacroEventDiv(valuesDiv, "Positive:", event.positive);
        createMacroEventDiv(valuesDiv, "Hash:", event.hash);                             
        createMacroEventDiv(valuesDiv, "Seed:", event.seed);
        createMacroEventDiv(valuesDiv, "Reward:", event.rewardAmount);                   
        createMacroEventDiv(valuesDiv, "Validators:", event.chosenValidators, true); 
        createMacroEventDiv(valuesDiv, "Block:", event.timestamp); 
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