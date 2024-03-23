// START_VOTE
// WAITING_VOTE

// START_REVEAL
// WAITING_REVEAL

// CLAIM
// COMPLETED

// EXPIRED



//1 MTG = 0.001 ETH
var ethxmtg = 0.001;

const pendingColor = "rgb(218, 253, 60)";
const completedColor = "rgb(116, 196, 118)";
const expiredColor = "rgb(251, 106, 74)";

// 2 Waiting Vote
// 4 Waiting Reveal
// 6 Completed

var videoDB = [
    /* {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 2,
        leftvote: 1,
        reward: "0.3 MTG",
        results: []
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 2,
        leftvote: 2,
        reward: "0.3 MTG",
        results: []
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 4,
        leftvote: 3,
        reward: "0.3 MTG",
        results: [
            [5, 10.4],
            [8, 12.2],
            [11, 55.25],
        ]
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 4,
        leftvote: 4,
        reward: "0.3 MTG",
        results: [
            [5, 10.4],
            [8, 12.2],
            [11, 55.25],
        ]
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 6,
        leftvote: 0,
        reward: "0.3 MTG",
        results: [
            [5, 10.4],
            [8, 12.2],
            [3, 30.123],
            [12, 15.12],
            [11, 55.25],
        ]
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 6,
        leftvote: 0,
        reward: "0.3 MTG",
        results: [
            [5, 10.4],
            [8, 12.2],
            [3, 30.123],
            [12, 15.12],
            [11, 55.25],
        ]
    } */
];

const validTags = [
    "adventure",
    "comedy",
    "diy",
    "technology",
    "tutorial",
    "travel",
    "cooking",
    "fitness",
    "gaming",
    "music",
    "vlog",
    "educational",
    "nature",
    "fashion",
    "science",
    "health",
    "review",
    "art",
    "entertainment",
    "inspirational",
    "beauty",
    "documentary",
    "lifestyle",
    "photography",
    "design",
    "animation",
    "food",
    "motivation",
    "business",
    "history",
    "sports",
    "pets",
    "finance",
    "cars",
    "outdoors",
    "meditation",
    "productivity",
    "spirituality",
    "mindfulness",
    "happiness",
    "self-improvement",
    "philosophy",
    "relationships",
    "storytelling",
    "humor",
    "programming",
    "coding",
    "development",
    "architecture",
    "crafts",
    "woodworking",
    "literature",
    "learning",
    "education",
    "astronomy",
    "physics",
    "chemistry",
    "biology",
    "psychology",
    "sociology",
    "politics",
    "economics",
    "events",
    "climate",
    "environment",
    "sustainability",
    "mental",
    "gardening",
    "decor",
    "parenting",
    "pregnancy",
    "family",
    "recipes",
    "experiments",
    "improvement",
    "reviews",
    "tutorials",
    "production",
    "spotlight",
    "haul",
    "routines",
    "experiment",
    "improvement",
    "awareness",
    "performance",
    "exploration",
    "innovation",
    "inspiration",
    "storytelling",
    "challenge",
    "discovery",
    "experiment",
    "innovation",
    "creation",
    "journey",
    "expression",
    "journey",
    "discovery",
    "transformation",
    "breakthrough",
    "michele"
];

// 1 BuyTokens(                     address indexed user, 					                uint amount)
// 2 ReceiveTokensFromCompany(      address indexed company, 					            uint amount)
// 3 AddVideo(                      address indexed company,    uint indexed videoId,   address[] chosenValidators)
// 4 WithdrawTokensCompany(         address indexed company, 					            uint amount)
// 5 MTGforVoucher(                 address indexed user)

var eventsDB = [
    /* // 1 BuyTokens(                     address indexed user, 					                uint amount)
    {
        name: "BuyTokens", 
        validator: "",
        user: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",     
        company: "",

        amount: "5 MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "23",
        chosenValidator: [],

        videoId: "",
        status: 1
    },     
    // 2 ReceiveTokensFromCompany(      address indexed company, 					            uint amount)
    {
        name: "ReceiveTokensFromCompany", 
        validator: "",
        user: "",         
        company: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",

        amount: "5 MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "12",
        chosenValidator: [],

        videoId: "",
        status: 2
    },  
    // 3 AddVideo(                      address indexed company,    uint indexed videoId,   address[] chosenValidators)
    {
        name: "AddVideo", 
        validator: "",
        user: "",     
        company: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",

        amount: "",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "13",
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
        status: 3
    },      
    // 4 WithdrawTokensCompany(         address indexed company, 					            uint amount)
    {
        name: "WithdrawTokensCompany", 
        validator: "",
        user: "",       
        company: "0x388C818CA8B9251b393131C08a736A67ccB19297",

        amount: "5 MTG",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "124",
        chosenValidator: [],

        videoId: "",
        status: 4
    },    
    // 5 MTGforVoucher(                 address indexed user)
    {
        name: "MTGforVoucher", 
        validator: "",
        user: "0x388C818CA8B9251b393131C08a736A67ccB19297",        
        company: "",

        amount: "",
        additional: "",
        positive: "",
        hash: "",
        tags: [],
        seed: "",
        rewardAmount: "",
        timestamp: "53",
        chosenValidator: [],

        videoId: "",
        status: 5
    },
    // 3 AddVideo(                      address indexed company,    uint indexed videoId,   address[] chosenValidators)
    {
        name: "AddVideo", 
        validator: "",
        user: "",    
        company: "0x07FAc54A901409Fe10E56c899Be3dCF2471ae321",

        amount: "",
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
        status: 3
    }, */        
]

var ethereumPrice = 1;

document.addEventListener("DOMContentLoaded", function() {    

    initMenu();
    initVoteSection();
    initEthPrice();
    initProfile();

    initEventList();
    initVoucherListener();
    
    //Generating chart
    /* fetchEthereumPrices().then(monthxprice => {
        generateChart(monthxprice[0], monthxprice[1], [2000, 2000, 2000, 2000, 2000, 2000, 1800, 1800, 1600]);
    });   
     */
    
    generateChart();
    InitImage();    
});

//Initialization of menu functionality listeners
function initMenu(){
    var menuButton = document.querySelector(".menu_button");    
    var titles = document.querySelectorAll(".title"); 
    
    var dashboard = document.querySelector(".dashboard"); 
    var vote = document.querySelector(".vote"); 
    var lock = document.querySelector(".lock"); 
    var buy = document.querySelector(".buy");   
    var voucher = document.querySelector(".voucher");   
    
    var dashboardWrapper = document.querySelector('.dashboard_wrapper');
    var voteWrapper = document.querySelector('.vote_wrapper');
    var lockWrapper = document.querySelector('.lock_wrapper');
    var buyWrapper = document.querySelector('.buy_wrapper');  
    var voucherWrapper = document.querySelector('.voucher_wrapper');  
    
    menuButton.addEventListener("click" , () => {
        document.body.classList.toggle("shrink");
        menuButton.classList.toggle("hovered");

        titles.forEach(function(element) {        
            element.classList.toggle("title_hide");
        });

        setTimeout(
            () => {
                menuButton.classList.remove("hovered");
            }, 400
        )
    });

    setItemMenuListener(dashboard, dashboardWrapper, "Dashboard")
    setItemMenuListener(vote, voteWrapper, "Vote")
    setItemMenuListener(lock, lockWrapper, "Lock")
    setItemMenuListener(buy, buyWrapper, "Buy")
    setItemMenuListener(voucher, voucherWrapper, "Voucher")
}

//Initialization of vote functionality listeners
function initVoteSection(){
    var all = document.querySelector('.filter_all');    
    var vote = document.querySelector(".filter_vote");    
    var reveal = document.querySelector(".filter_reveal");
    var completed = document.querySelector(".filter_completed");

    var overlay = document.querySelector(".overlay");
    var youtubeVideo = document.querySelector(".youtubeVideo");
    var addVideoButton = document.querySelector(".add_video_button_cointainer");
    var insertWrapper = document.querySelector(".insert_wrapper");

    loadVoteList(1);

    setFilterListener(all, 1);
    setFilterListener(vote, 2);
    setFilterListener(reveal, 3);
    setFilterListener(completed, 4);

    overlay.addEventListener("click" , () => {
        if (event.target === overlay) {
            overlay.classList.toggle("active");
            youtubeVideo.src = "";
        }
    });

    var completed = document.querySelector(".filter_completed");

    addVideoButton.addEventListener("click" , () => {
        hideShowVote(insertWrapper)
        changeVideoID("");
        overlay.classList.toggle("active");
    }); 
}

//Retrieve current ethereum price using CoinGeckoAPI
function initEthPrice(){    
    var ethPriceCookie = getCookie("ethPrice")
    if(ethPriceCookie){
        ethereumPrice = ethPriceCookie;        
        return;
    }


    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
    .then(response => response.json())
    .then(data => {
        ethereumPrice = data["ethereum"].usd;
        setCookie("ethPrice", ethereumPrice, 0.5);        
    })
    .catch(error => {
        console.error('Error fetching cryptocurrency price:', error);
    });
}

//Initialization of profile functionality listeners
function initProfile(){
    var profileButton = document.querySelector('.profile_button');
    var profileContent = document.querySelector('.profile_content_wrapper');
    var computedStyle = window.getComputedStyle(profileContent);

    profileButton.addEventListener("click" , () => {
        if (computedStyle.display === 'none') {
            profileContent.style.display = 'block';
        } else {
            profileContent.style.display = 'none';
        }  
    });
}

//Init to populate the event list
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
        
        nameDiv.innerHTML = event.name;                   
        createMacroEventDiv(addressDiv, "Validator:", event.validator);
        createMacroEventDiv(addressDiv, "Company:", event.company);         
        createMacroEventDiv(addressDiv, "User:", event.user);   

        createMacroEventDiv(valuesDiv, "Amount:", event.amount);                    
        createMacroEventDiv(valuesDiv, "Additional:", event.additional);
        createMacroEventDiv(valuesDiv, "Positive:", event.positive);
        createMacroEventDiv(valuesDiv, "Hash:", event.hash);                             
        createMacroEventDiv(valuesDiv, "Seed:", event.seed);
        createMacroEventDiv(valuesDiv, "Reward:", event.rewardAmount);                   
        createMacroEventDiv(valuesDiv, "Validators:", event.chosenValidator, true); 
        createMacroEventDiv(valuesDiv, "Block", event.timestamp); 
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

//Initialization of voucher functionlity listeners
function initVoucherListener(){
    var voucherCopy = document.querySelector('.voucher_copy'); 
    var voucherGenerate = document.querySelector('.voucher_generate'); 
    var voucherValue = document.querySelector('.voucher_value'); 

    voucherCopy.addEventListener("click" , () => {
        navigator.clipboard.writeText(voucherValue.innerHTML);        
    });   
}

//Generate a random voucher
function generateVoucher() {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
            code += '-';
        }
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code;
}

//Creation of the single event div
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

//Setting up menu listeners and div change
function setItemMenuListener(button, wrapper, title){
    var dashboard = document.querySelector(".dashboard"); 
    var vote = document.querySelector(".vote"); 
    var lock = document.querySelector(".lock"); 
    var buy = document.querySelector(".buy"); 
    var voucher = document.querySelector(".voucher"); 

    var containerTitle = document.querySelector('.container_title');
    
    var dashboardWrapper = document.querySelector('.dashboard_wrapper');
    var voteWrapper = document.querySelector('.vote_wrapper');
    var lockWrapper = document.querySelector('.lock_wrapper');
    var buyWrapper = document.querySelector('.buy_wrapper');
    var voucherWrapper = document.querySelector(".voucher_wrapper");     

    button.addEventListener("click" , () => {
        dashboardWrapper.style.display = 'none';
        voteWrapper.style.display = 'none';
        lockWrapper.style.display = 'none';
        buyWrapper.style.display = 'none';
        voucherWrapper.style.display = 'none';
    
        dashboard.classList.remove("active");
        vote.classList.remove("active");
        lock.classList.remove("active");
        buy.classList.remove("active");
        voucher.classList.remove("active");
    
        containerTitle.textContent = title;
        wrapper.style.display = 'block';
        button.classList.add("active");
    });    
}

//Populate the voting list based on the filter clicked
function loadVoteList(option){
    var videolistDiv = document.querySelector('.video_list');    
    var overlay = document.querySelector(".overlay");    

    videolistDiv.innerHTML = '';
    var videoCounter = 0;

    videoDB.forEach(function(video) {                
        var elementDiv = document.createElement('div');  
        var idDiv = document.createElement('div');
        var companyDiv = document.createElement('div');
        var titleDiv = document.createElement('div');        
        var pendingDiv = document.createElement('div');  
        var rewardDiv = document.createElement('div');    
        
        idDiv.innerHTML = video.hashId;
        companyDiv.innerHTML = video.company;
        titleDiv.innerHTML = video.title;        
        rewardDiv.innerHTML = video.reward; 

        elementDiv.classList.add('video_element');
        idDiv.classList.add('id');
        companyDiv.classList.add('company');
        titleDiv.classList.add('title');    
        rewardDiv.classList.add('reward');       

        switch (video.status) {
            case 2:
                //if(option == 2){return;} //Vote
                if(option == 3){return;} //Reveal
                if(option == 4){return;} //Completed
                pendingDiv.classList.add('WAITING_VOTE');
                pendingDiv.innerHTML = 'WAITING VOTE';
                break;
            case 4:
                if(option == 2){return;} //Vote
                //if(option == 3){return;} //Reveal
                if(option == 4){return;} //Completed
                pendingDiv.classList.add('WAITING_REVEAL');
                pendingDiv.innerHTML = 'WAITING REVEAL';
                break;
            default:
                if(option == 2){return;} //Vote
                if(option == 3){return;} //Reveal
                //if(option == 4){return;} //Completed
                pendingDiv.classList.add('COMPLETED');
                pendingDiv.innerHTML = 'COMPLETED';
        }
        
        elementDiv.appendChild(idDiv); 
        elementDiv.appendChild(companyDiv); 
        elementDiv.appendChild(titleDiv);         
        elementDiv.appendChild(pendingDiv); 
        elementDiv.appendChild(rewardDiv); 
        videolistDiv.appendChild(elementDiv);       
        
        elementDiv.addEventListener('click', function () {                        
            generateDiv(video.hashId, video.status, video.results, video.leftvote);                   
        });             

        videoCounter += 1;
    });    
    setGridRows(videoCounter, videolistDiv, 80);
}

//Setting up filter listeners
function setFilterListener(selectedFilter, option){
    var all = document.querySelector(".filter_all"); 
    var vote = document.querySelector(".filter_vote"); 
    var reveal = document.querySelector(".filter_reveal"); 
    var completed = document.querySelector(".filter_completed");

    selectedFilter.addEventListener("click" , () => {
        all.classList.remove("filter_element_active");
        vote.classList.remove("filter_element_active");
        reveal.classList.remove("filter_element_active");
        completed.classList.remove("filter_element_active");

        selectedFilter.classList.add("filter_element_active");
        loadVoteList(option);
    });    
}

//Set grid height based on the number of rows
function setGridRows(number, listDiv, height) {                  
    listDiv.style.gridTemplateRows = 'repeat(' + number + ', ' + height + 'px)';
}

//Generate an alphanumeric seed
function generateAlphanumericSeed() {
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const seedLength = 11;
    let seed = '';
  
    for (let i = 0; i < seedLength; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
      seed += alphanumericChars.charAt(randomIndex);
    }
  
    return seed;
}

//Set cookie on the user browser
function setCookie(name, dataObject, daysToExpire) {
    var expirationDate = new Date();
    if(daysToExpire == 0.5){
        var minutesToExpire = 5;
        var millisecondsPerMinute = 60000;
        var expirationTime = minutesToExpire * millisecondsPerMinute;
        expirationDate.setTime(expirationDate.getTime() + expirationTime);
    }else{
        expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    }    
  
    var cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(dataObject)) + '; expires=' + expirationDate.toUTCString() + '; path=/';
  
    document.cookie = cookieValue;
}
  
//Get cookie from the user browser
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name + '=') === 0) {
             const cookieValue = cookie.substring(name.length + 1);
            return JSON.parse(decodeURIComponent(cookieValue));
        }
    }
    return null;
}

//Convert the tag from text to index
function getTagPositions() {
    const tagNames = document.querySelectorAll('.tags_container .tag_name');
    const tagPositions = [];
  
    tagNames.forEach(tagName => {
        const tagIndex = validTags.indexOf(tagName.textContent.toLowerCase()) + 1;
        tagPositions.push(tagIndex);
    });    
    return tagPositions;
}

//Reset every listener set on the element
function resetListeners(element){
    var element = document.querySelector(element);
    var new_element = element.cloneNode(true);
    element.parentNode.replaceChild(new_element, element);
}

//Popup of the video's div
function generateDiv(videoId, status, results, leftVote) {       
    var overlay = document.querySelector(".overlay");
    var pollWrapper = document.querySelector(".poll_wrapper");

    hideShowVote(pollWrapper);
    switch (status) {
        case 2:
            //Waiting Vote  
            setTitleDesc("Information", `Waiting for ${leftVote} votes`);
            break;
        case 4:
            //Waiting Reveal
            setTitleDesc("Temporary results", `Waiting for ${leftVote} reveals`);
            generatePoll(results);   
            break;
        default:
            //Completed
            setTitleDesc("Poll results", " ");
            generatePoll(results);        
      }
                  
    changeVideoID(videoId)
    overlay.classList.toggle("active");  
}

//Change the video ID in the youtube iframe
function changeVideoID(id){
    document.getElementById('youtubeVideo').src = "https://www.youtube.com/embed/" + id;
    fetchYouTubeVideoLength(id)
        .then(lengthInSeconds => {
            if (lengthInSeconds !== null) {
                document.getElementById('videoLengthInput').value = lengthInSeconds;
            }
        })
}

//Generate the poll results on the div
function generatePoll(results){
    var pollContainer = document.querySelector(".poll_container");

    if(results.length < 5){
        pollContainer.style.gridTemplateRows = "30px repeat(" + results.length + ", 60px) auto";
    }
    else{
        pollContainer.style.gridTemplateRows = "30px repeat(" + results.length + ", auto)";
    }    

    results.sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < results.length; i++){
        var tag = results[i][0];
        var percentage = results[i][1];

        var resultElement = document.createElement('div');
        var resultName = document.createElement('div');
        var resultVote = document.createElement('div');
        var resultFull = document.createElement('div');
        var resultEmpty = document.createElement('div');
        var resultVoteValue = document.createElement('div');

        resultName.innerHTML = getTagByIndex(tag);
        resultFull.innerHTML = " ";
        resultEmpty.innerHTML = " ";
        resultVoteValue.innerHTML = percentage + "%";

        resultElement.appendChild(resultName);
        resultVote.appendChild(resultFull);
        resultVote.appendChild(resultEmpty);
        resultElement.appendChild(resultVote);
        resultElement.appendChild(resultVoteValue); 

        var fullFraction = percentage * 100;
        var emptyFraction = 10000 - fullFraction;        
        resultVote.style.display = "grid";        
        resultVote.style.gridTemplateColumns = fullFraction + "fr " + emptyFraction + "fr";
        resultVote.style.alignItems = "center";

        if (percentage >= 80) {
            resultFull.style.backgroundColor = completedColor;
        } else if (percentage >= 20 && percentage < 80) {
            resultFull.style.backgroundColor = pendingColor;
        } else {
            resultFull.style.backgroundColor = expiredColor;
        }
        
        resultElement.classList.add("result_element");
        resultName.classList.add("result_name");        
        resultFull.classList.add("result_full");
        resultEmpty.classList.add("result_empty");
        resultVoteValue.classList.add("result_vote_value");

        pollContainer.appendChild(resultElement);
    }
}

//Set the info on the poll container
function setTitleDesc(title, desc){
    var pollContainer = document.querySelector(".poll_container");
    pollContainer.innerHTML = "";
    
    var pollTitle = document.createElement('div');
    var pollDesc = document.createElement('div');

    pollTitle.classList.add("poll_title");
    pollDesc.classList.add("poll_desc");

    pollContainer.appendChild(pollTitle);
    pollContainer.appendChild(pollDesc);

    pollTitle.innerHTML = title;
    pollDesc.innerHTML = desc;
}

//Convert index to tag
function getTagByIndex(index) {    
    index = index - 1;    
    if (index >= 0 && index < validTags.length) {
        var tag = validTags[index];    
        return tag.charAt(0).toUpperCase() + tag.slice(1)
    } else {
        return "Invalid TAG";
    }
}

//Switch div between poll and tags wrapper
function hideShowVote(element){
    var pollWrapper = document.querySelector(".poll_wrapper");  
    var insertWrapper = document.querySelector(".insert_wrapper");  

    pollWrapper.classList.add("hide");
    insertWrapper.classList.add("hide");

    element.classList.remove("hide");
}

//Input validation form
function validateInput(input, crypto) {    
    var dollarValue = document.querySelectorAll(".dollar_value");
    var ethInput = document.querySelectorAll(".eth_input");
    var mtgInput = document.querySelectorAll(".mtg_input");

    input.value = input.value.replace(/[^0-9.,]/g, '');

    let result = 0;
    let formattedResult = 0;
    let numericResult = 0;
      
    if (input.value.split('.').length > 2) {
      input.value = input.value.slice(0, -1);
    }    

    let floatValue = parseFloat(input.value);
    if(crypto == "ethereum"){
        result = floatValue * ethereumPrice;
        formattedResult = result.toFixed(4);
        numericResult = parseFloat(formattedResult);

        mtgInput.forEach(element => {
            element.value = floatValue / ethxmtg;
        }); 
    }
    else{
        result = floatValue * ethereumPrice  * ethxmtg;
        formattedResult = result.toFixed(4);
        numericResult = parseFloat(formattedResult);

        ethInput.forEach(element => {
            element.value = floatValue * ethxmtg;
        }); 
    }


    dollarValue.forEach(element => {        
        element.innerHTML = numericResult + " $";
    });    
}

function validateInputLock(input) {    
    var dollarValueLock = document.getElementById("dollar_value_lock");
    input.value = input.value.replace(/[^0-9.,]/g, '');
      
    let floatValue = parseFloat(input.value);
    let result = floatValue * ethereumPrice  * ethxmtg;
    let formattedResult = result.toFixed(4);
    let numericResult = parseFloat(formattedResult);

    dollarValueLock.innerHTML = numericResult + " $";    
}

//Chart generation in profile
/* function generateChart(days, ethprice, tokens){

    var fill = Array.from({ length: Math.max(30 - tokens.length, 0) }, () => 0).concat(tokens);
    var values = ethprice.map((price, index) => fill[index] * price * 0.001);

    var maxValueFloat = Math.max.apply(null, values)
    var maxValueInt = Math.ceil(maxValueFloat / 100) * 100 + 100;

    new Chart("balance_chart", {
    type: "line",
    data: {
        labels: days,
        datasets: [
            {    
                label: "USD",
                fill: true,                               
                lineTension: 0.3,
                backgroundColor: "rgba(3, 125, 214, 0.25)",
                borderColor: "rgba(3, 125, 214, 1)",
                pointBackgroundColor: "rgb(3, 125, 214)", 
                data: values                          
            },
            {    
                label: "Tokens",
                fill: true,                               
                lineTension: 0.3,
                backgroundColor: "rgba(116, 196, 118, 0.25)",
                borderColor: "rgba(116, 196, 118, 1)",
                pointBackgroundColor: "rgb(116, 196, 118)", 
                data: fill                          
            },
        ]
    },
    options: {
        legend: { display: true },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: maxValueInt,
                    fontColor: 'rgb(134, 163, 184)' 
                },       
                gridLines: {
                    color: 'rgba(134, 163, 184, 0.25)'
                }            
            }],
            xAxes: [{
                ticks: {
                    fontColor: 'rgb(134, 163, 184)' 
                },
                gridLines: { display: false }
            }]
        },
        tooltips: {
            mode: 'x',
            intersect: false,
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel;
                }
            }
        }
    }
    });
} */

let chartInstance;

//Chart generation 
function generateChart() {
    const ctx = document.getElementById("balance_chart").getContext('2d');
    const initialTotalTokensValue = parseFloat(document.getElementById('lockedTokens').innerText) || 0;
    const initialLiquidTokensValue = parseFloat(document.getElementById('liquidTokens').innerText) || 0;
    const initialDataArray = Array(5).fill(initialTotalTokensValue);
    const initialLiquidDataArray = Array(5).fill(initialLiquidTokensValue);
    const initialTimeArray = Array(5).fill(new Date());

    if (!chartInstance) {
        chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: initialTimeArray,
                datasets: [
                    {
                        label: "Locked Tokens",
                        backgroundColor: "rgba(3, 125, 214, 0.25)",
                        borderColor: "rgba(3, 125, 214, 1)",
                        data: initialDataArray,
                        fill: false,
                    },
                    {
                        label: "Liquid Tokens",
                        backgroundColor: "rgba(116, 196, 118, 0.25)",
                        borderColor: "rgba(116, 196, 118, 1)",
                        data: initialLiquidDataArray,
                        fill: false,
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'minute',
                            displayFormats: {
                                minute: 'h:mm a'
                            },
                            tooltipFormat: 'h:mm a'
                        }
                    }]
                }
            }
        });
    }

    // Function to update chart data
    function updateChartData() {
        const totalTokens = parseFloat(document.getElementById('lockedTokens').innerText) || 0;
        const liquidTokens = parseFloat(document.getElementById('liquidTokens').innerText) || 0;
        const currentTime = new Date();

        chartInstance.data.labels.push(currentTime);
        chartInstance.data.datasets[0].data.push(totalTokens);
        chartInstance.data.datasets[1].data.push(liquidTokens);

        const maxTokenValue = Math.max(...chartInstance.data.datasets[0].data, ...chartInstance.data.datasets[1].data);
        chartInstance.options.scales.yAxes[0].ticks.max = maxTokenValue + (maxTokenValue * 0.1); // Add 10% padding

        chartInstance.update();
    }

    // Update the chart data every 2 minutes
    setInterval(updateChartData, 5000);
}




/* var fetchEthereumPrices = async () => {
    var ethPrices = getCookie("ethPrices");
    if(ethPrices){
        console.log("Prices fetched from cookies.");
        return ethPrices;
    }

    const endDate = new Date(); 
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 91);

    const endTimestamp = Math.floor(endDate.getTime() / 1000);
    const startTimestamp = Math.floor(startDate.getTime() / 1000);


    const apiUrl = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${startTimestamp}&to=${endTimestamp}&interval`;

    try {
        var response = await fetch(apiUrl);
        var data = await response.json();

        if (data.prices) {

            var startIndex = Math.max(0, data.prices.length - 30);
            var dataSliced = data.prices.slice(startIndex);
            
            var datePricePairs = dataSliced.map(([timestamp, price]) => {
                var date = new Date(timestamp);
                var day = String(date.getDate()).padStart(2, '0'); 
                var month = String(date.getMonth() + 1).padStart(2, '0'); 
            
                return {
                    date: `${day}/${month}`,
                    price: price
                };
            });

            var months = datePricePairs.map(entry => entry.date);
            var prices = datePricePairs.map(entry => entry.price);
            setCookie("ethPrices", [months, prices], 0.5);
            console.log("Prices fetched from API.");
            return [months, prices];

        } else {
            console.error('Unable to fetch Ethereum prices.');
        }
    } catch (error) {
        console.error('Error fetching Ethereum prices:', error);
    }
}; */

function InitImage(){
    document.getElementById('showImageBtn').addEventListener('click', function() {
        const container = document.getElementById('fullscreenImageContainer');
        container.style.display = 'flex'; 

        setTimeout(function() {
            container.style.display = 'none';
        }, 50);
    });
}