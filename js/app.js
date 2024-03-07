// START_VOTE
// WAITING_VOTE

// START_REVEAL
// WAITING_REVEAL

// CLAIM
// COMPLETED

// EXPIRED



//1 MTG = 0.001 ETH
var ethxmtg = 0.001;

var videoDB = [
    {
        hashId: "xxxr4J1fzvc",            
        title: "Bitcoin On-Chain Analysis: Value Days Destroyed Multiple",
        company: "Youtube",
        link: "www.google.it",            
        status: 1,
        reward: "-"
    },
    {
        hashId: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 1,
        reward: "0.3 MTG"
    },
    {
        hashId: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 2,
        reward: "0.3 MTG"
    },
    {
        hashId: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 3,
        reward: "0.3 MTG"
    },
    {
        hashId: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 4,
        reward: "0.3 MTG"
    },
    {
        hashId: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 5,
        reward: "0.3 MTG"
    },
    {
        hashId: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 6,
        reward: "0.3 MTG"
    },
    {
        hashId: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 7,
        reward: "0.3 MTG"
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 1,
        reward: "0.3 MTG"
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 2,
        reward: "0.3 MTG"
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 3,
        reward: "0.3 MTG"
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 4,
        reward: "0.3 MTG"
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 5,
        reward: "0.3 MTG"
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 6,
        reward: "0.3 MTG"
    },
    {
        hashId: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 7,
        reward: "0.3 MTG"
    }
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

var ethereumPrice = 1;

// OKEH
document.addEventListener("DOMContentLoaded", function() {    

    initMenu();
    initVoteList();
    initEthPrice();
    initProfile();
    
    //Generating chart
    fetchEthereumPrices().then(monthxprice => {
        generateChart(monthxprice[0], monthxprice[1], [2.4, 2.5, 2.4, 2.7, 1,3,10,5,2.3,4.2, 15, 20, 13.4, 15,5.5, 19, 20, 21.2, 30, 24, 45, 45, 70]);
    });   
    
});

function initMenu(){
    var menuButton = document.querySelector(".menu_button");    
    var titles = document.querySelectorAll(".title"); 
    
    var dashboard = document.querySelector(".dashboard"); 
    var vote = document.querySelector(".vote"); 
    var lock = document.querySelector(".lock"); 
    var buy = document.querySelector(".buy"); 
    var sell = document.querySelector(".sell"); 
    var voucher = document.querySelector(".voucher");     
    
    var dashboardWrapper = document.querySelector('.dashboard_wrapper');
    var voteWrapper = document.querySelector('.vote_wrapper');
    var lockWrapper = document.querySelector('.lock_wrapper');
    var buyWrapper = document.querySelector('.buy_wrapper');
    var sellWrapper = document.querySelector('.sell_wrapper');
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
    setItemMenuListener(sell, sellWrapper, "Sell")
    setItemMenuListener(voucher, voucherWrapper, "Voucher")
}

function initVoteList(){
    var all = document.querySelector('.filter_all');    
    var pending = document.querySelector(".filter_pending");    
    var action = document.querySelector(".filter_action");
    var completed = document.querySelector(".filter_completed");

    loadVoteList(1);

    setFilterListener(all, 1);
    setFilterListener(pending, 2);
    setFilterListener(action, 3);
    setFilterListener(completed, 4);

    overlay.addEventListener("click" , () => {
        if (event.target === overlay) {
            overlay.classList.toggle("active");
        }
    });
}

function initEthPrice(){
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
    .then(response => response.json())
    .then(data => {
        ethereumPrice = data["ethereum"].usd;
        console.log("Actual etherium price: " + ethereumPrice);
    })
    .catch(error => {
        console.error('Error fetching cryptocurrency price:', error);
    });
}

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

function setItemMenuListener(button, wrapper, title){
    var dashboard = document.querySelector(".dashboard"); 
    var vote = document.querySelector(".vote"); 
    var lock = document.querySelector(".lock"); 
    var buy = document.querySelector(".buy"); 
    var sell = document.querySelector(".sell"); 
    var voucher = document.querySelector(".voucher"); 

    var containerTitle = document.querySelector('.container_title');
    
    var dashboardWrapper = document.querySelector('.dashboard_wrapper');
    var voteWrapper = document.querySelector('.vote_wrapper');
    var lockWrapper = document.querySelector('.lock_wrapper');
    var buyWrapper = document.querySelector('.buy_wrapper');
    var sellWrapper = document.querySelector('.sell_wrapper');
    var voucherWrapper = document.querySelector('.voucher_wrapper');  

    button.addEventListener("click" , () => {
        dashboardWrapper.style.display = 'none';
        voteWrapper.style.display = 'none';
        lockWrapper.style.display = 'none';
        buyWrapper.style.display = 'none';
        sellWrapper.style.display = 'none';
        voucherWrapper.style.display = 'none'; 
    
        dashboard.classList.remove("active");
        vote.classList.remove("active");
        lock.classList.remove("active");
        buy.classList.remove("active");
        sell.classList.remove("active");
        voucher.classList.remove("active");
    
        containerTitle.textContent = title;
        wrapper.style.display = 'block';
        button.classList.add("active");
    });    
}

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
            case 1:
                if(option == 2){return;} //Pending
                //if(option == 3){return;} //Action
                if(option == 4){return;} //Completed
                pendingDiv.classList.add('START_VOTE');
                pendingDiv.innerHTML = 'START VOTE';
                break;
            case 2:
                //if(option == 2){return;} //Pending
                if(option == 3){return;} //Action
                if(option == 4){return;} //Completed
                pendingDiv.classList.add('WAITING_VOTE');
                pendingDiv.innerHTML = 'WAITING VOTE';
                break;
            case 3:
                if(option == 2){return;} //Pending
                //if(option == 3){return;} //Action
                if(option == 4){return;} //Completed
                pendingDiv.classList.add('START_REVEAL');
                pendingDiv.innerHTML = 'START REVEAL';
                break;
            case 4:
                //if(option == 2){return;} //Pending
                if(option == 3){return;} //Action
                if(option == 4){return;} //Completed
                pendingDiv.classList.add('WAITING_REVEAL');
                pendingDiv.innerHTML = 'WAITING REVEAL';
                break;
            case 5:
                if(option == 2){return;} //Pending
                //if(option == 3){return;} //Action
                if(option == 4){return;} //Completed
                pendingDiv.classList.add('CLAIM');
                pendingDiv.innerHTML = 'CLAIM';
                break;
            case 6:
                if(option == 2){return;} //Pending
                if(option == 3){return;} //Action
                //if(option == 4){return;} //Completed
                pendingDiv.classList.add('COMPLETED');
                pendingDiv.innerHTML = 'COMPLETED';
                break;                                              
            default:
                if(option == 2){return;} //Pending
                if(option == 3){return;} //Action
                if(option == 4){return;} //Completed
                pendingDiv.classList.add('EXPIRED');
                pendingDiv.innerHTML = 'EXPIRED';
        }
        
        elementDiv.appendChild(idDiv); 
        elementDiv.appendChild(companyDiv); 
        elementDiv.appendChild(titleDiv);         
        elementDiv.appendChild(pendingDiv); 
        elementDiv.appendChild(rewardDiv); 
        videolistDiv.appendChild(elementDiv);       
        
        elementDiv.addEventListener('click', function () {                        
            generateDiv(video.hashId, video.status);                   
        });             

        videoCounter += 1;
    });    
    setGridRows(videoCounter);

    overlay.addEventListener("click" , () => {
        if (event.target === overlay) {
            overlay.classList.toggle("active");
        }
    });
}

function setFilterListener(selectedFilter, option){
    var all = document.querySelector(".filter_all"); 
    var pending = document.querySelector(".filter_pending"); 
    var action = document.querySelector(".filter_action"); 
    var completed = document.querySelector(".filter_completed");

    selectedFilter.addEventListener("click" , () => {
        all.classList.remove("filter_element_active");
        pending.classList.remove("filter_element_active");
        action.classList.remove("filter_element_active");
        completed.classList.remove("filter_element_active");

        selectedFilter.classList.add("filter_element_active");
        loadVoteList(option);
    });    
}

function setGridRows(number) {
    var gridContainer = document.querySelector('.video_list');                    
    gridContainer.style.gridTemplateRows = 'repeat(' + number + ', 80px)';
}

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

function setCookie(name, dataObject, daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
  
    const cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(dataObject)) + '; expires=' + expirationDate.toUTCString() + '; path=/';
  
    document.cookie = cookieValue;
}
  
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

function getTagPositions() {
    const tagNames = document.querySelectorAll('.tags_container .tag_name');
    const tagPositions = [];
  
    tagNames.forEach(tagName => {
        const tagIndex = validTags.indexOf(tagName.textContent.toLowerCase()) + 1;
        tagPositions.push(tagIndex);
    });    
    return tagPositions;
}

function resetListeners(element){
    var element = document.querySelector(element);
    var new_element = element.cloneNode(true);
    element.parentNode.replaceChild(new_element, element);
}

function generateDiv(videoId, status) {   
    resetListeners(".tag_button");

    var overlay = document.querySelector(".overlay");
    var tagsContainer = document.querySelector(".tags_container");
    var tagButton = document.querySelector(".tag_button");
    var inputElement = document.querySelector(".tags_insert");  
    var suggestionsContainer = document.querySelector(".suggestions_container");  

    suggestionsContainer.innerHTML = "";
    tagsContainer.innerHTML = "";
    inputElement.value = "";     
        
    switch (status) {
        case 1:
            tagButton.addEventListener('click', function () {   
                var seed = generateAlphanumericSeed() 
                var tagList = getTagPositions();  
                suggestionsContainer.innerHTML = "<grey>Seed: </grey>" + seed;        
                setCookie(videoId, { list: tagList, seed: seed } , 1);                        
            });  
            addTagFromCookie(videoId, false, true);
            inputElement.disabled = false;
            tagsContainer.classList.remove("disabled")
            tagButton.classList.remove("disabled");
            tagButton.innerHTML = "SEND VOTE";  
            break;
        case 2:        
            disableDiv(videoId);
            tagButton.innerHTML = "WAITING VOTE";  
            break;
        case 3:
            disableDiv(videoId, true);
            tagButton.innerHTML = "REVEAL";  
            break;
        case 4:
            disableDiv(videoId);
            tagButton.innerHTML = "WAITING REVEAL";  
            break;
        case 5:
            disableDiv(videoId, true);
            tagButton.innerHTML = "CLAIM";  
            break;
        case 6:
            disableDiv(videoId);
            tagButton.innerHTML = "COMPLITED";  
            break;                                              
        default:         
            disableDiv(videoId);
            tagButton.innerHTML = "EXPIRED";               
      }
                  
    document.getElementById('youtubeVideo').src = "https://www.youtube.com/embed/" + videoId + "?si=EwWUd-wd4mxodglK"
    overlay.classList.toggle("active");  
}

function disableDiv(videoId, confirm=false){
    var tagsContainer = document.querySelector(".tags_container");
    var tag_button = document.querySelector(".tag_button");
    var inputElement = document.querySelector(".tags_insert");  

    addTagFromCookie(videoId, true);
    inputElement.disabled = true;
    tagsContainer.classList.add("disabled")
    if(confirm){
        tag_button.classList.remove("disabled");   
    }else{
        tag_button.classList.add("disabled");   
    }
}

function tagInserted(event) {
    var tagsContainer = document.querySelector(".tags_container");
    var inputElement = document.querySelector(".tags_insert");
    var inputValue = inputElement.value.trim();

    // Check if the entered tag is valid
    if (event.key === "Enter" && inputValue !== "" && validTags.includes(inputValue)) {
        var tag = document.createElement("div");
        var tagName = document.createElement("div");
        var icon = document.createElement("i");

        tag.className = "tag";
        tagName.className = "tag_name";
        icon.className = "fa-solid fa-x";

        tagName.textContent = inputValue;

        tag.addEventListener("click", function () {
            tagsContainer.removeChild(tag);
        });

        tag.appendChild(tagName);
        tag.appendChild(icon);
        tagsContainer.appendChild(tag);
        inputElement.value = "";
    }
}

function suggestTag(event) {
    var inputElement = document.querySelector(".tags_insert");
    var inputValue = inputElement.value.trim().toLowerCase();

    var suggestionsContainer = document.querySelector(".suggestions_container");
    clearSuggestions(suggestionsContainer);

    const matchingTags = validTags.filter(tag => tag.toLowerCase().includes(inputValue));

    const availableSpace = suggestionsContainer.offsetWidth;
    let totalWidth = 0;

    matchingTags.some(tag => {
        const suggestionWidth = calculateTextWidth(tag) + 16; // Add padding
        if (totalWidth + suggestionWidth <= availableSpace) {
            createSuggestion(suggestionsContainer, tag);
            totalWidth += suggestionWidth;
            return false; 
        }
        return true; 
    });
}

function createSuggestion(container, tag) {
    var suggestionDiv = document.createElement("div");
    var tagsInsert = document.querySelector(".tags_insert");    
    suggestionDiv.className = "suggestion";
    suggestionDiv.textContent = tag;

    // Add click event listener to add the clicked tag to tags
    suggestionDiv.addEventListener("click", function () {
        addTagFromSuggestion(tag);
        clearSuggestions(container);
        tagsInsert.value = "";
    });

    container.appendChild(suggestionDiv);
}

function addTagFromCookie(videoId, disabled = false, first = false){
    var cookieValue = getCookie(videoId);
    var suggestionsContainer = document.querySelector(".suggestions_container");  
    var tagsContainer = document.querySelector(".tags_container");  

    console.log("First: " + first);
    if (cookieValue === null && first){
        suggestionsContainer.innerHTML = "<grey>Seed: </grey> <cursive>submit to generate.</cursive>";        
        return
    }
    if (cookieValue === null){
        suggestionsContainer.innerHTML = "<grey>Seed: </grey> <cursive>missing cookies.</cursive>";
        tagsContainer.innerHTML = "<cursive>missing cookies.</cursive>";
        return
    }

    var integers = cookieValue.list;
    var seed = cookieValue.seed;        

    suggestionsContainer.innerHTML = "<grey>Seed: </grey>" + seed;
    var tagList = integers.map(index => validTags[index - 1]);
    tagList.forEach(tag => {
        addTagFromSuggestion(tag, disabled);
      });    
}

function addTagFromSuggestion(tag, disabled=false) {
    var tagsContainer = document.querySelector(".tags_container");
    var tagElement = document.createElement("div");
    var tagName = document.createElement("div");
    var icon = document.createElement("i");

    tagElement.className = "tag";
    tagName.className = "tag_name";
    icon.className = "fa-solid fa-x";

    tagName.textContent = tag;

    if(!disabled){
        tagElement.addEventListener("click", function () {
            tagsContainer.removeChild(tagElement);
        });
    }

    tagElement.appendChild(tagName);
    tagElement.appendChild(icon);
    tagsContainer.appendChild(tagElement);
}

function clearSuggestions(container) {
    container.innerHTML = ""; // Clear existing suggestions
}

function calculateTextWidth(text) {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.whiteSpace = "nowrap";
    span.textContent = text;
    document.body.appendChild(span);
    const width = span.offsetWidth;
    document.body.removeChild(span);
    return width;
}

//Input validation form
function validateInput(input, crypto) {    
    var dollarValue = document.querySelectorAll(".dollar_value");
    var ethInput = document.querySelectorAll(".eth_input");
    var mtgInput = document.querySelectorAll(".mtg_input");

    var ethSell = document.querySelector(".eth_sell");
    var mtgSell = document.querySelector(".mtg_sell");

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

        ethSell.value = floatValue;

        mtgInput.forEach(element => {
            element.value = floatValue / ethxmtg;
        }); 
    }
    else{
        result = floatValue * ethereumPrice  * ethxmtg;
        formattedResult = result.toFixed(4);
        numericResult = parseFloat(formattedResult);

        mtgSell.value = floatValue;

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
function generateChart(days, ethprice, tokens){

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
}

var fetchEthereumPrices = async () => {
    const endDate = new Date(); 
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 91);

    const endTimestamp = Math.floor(endDate.getTime() / 1000);
    const startTimestamp = Math.floor(startDate.getTime() / 1000);


    const apiUrl = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${startTimestamp}&to=${endTimestamp}&interval`;

    console.log(endTimestamp);
    console.log(startTimestamp);
    console.log(apiUrl);

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
            return [months, prices];

        } else {
            console.error('Unable to fetch Ethereum prices.');
        }
    } catch (error) {
        console.error('Error fetching Ethereum prices:', error);
    }
};