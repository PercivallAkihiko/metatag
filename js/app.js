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
        hash_id: "xxxr4J1fzvc",            
        title: "Bitcoin On-Chain Analysis: Value Days Destroyed Multiple",
        company: "Youtube",
        link: "www.google.it",            
        status: 1,
        reward: "-"
    },
    {
        hash_id: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 1,
        reward: "0.3 MTG"
    },
    {
        hash_id: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 2,
        reward: "0.3 MTG"
    },
    {
        hash_id: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 3,
        reward: "0.3 MTG"
    },
    {
        hash_id: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 4,
        reward: "0.3 MTG"
    },
    {
        hash_id: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 5,
        reward: "0.3 MTG"
    },
    {
        hash_id: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 6,
        reward: "0.3 MTG"
    },
    {
        hash_id: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 7,
        reward: "0.3 MTG"
    },
    {
        hash_id: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 1,
        reward: "0.3 MTG"
    },
    {
        hash_id: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 2,
        reward: "0.3 MTG"
    },
    {
        hash_id: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 3,
        reward: "0.3 MTG"
    },
    {
        hash_id: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 4,
        reward: "0.3 MTG"
    },
    {
        hash_id: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 5,
        reward: "0.3 MTG"
    },
    {
        hash_id: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 6,
        reward: "0.3 MTG"
    },
    {
        hash_id: "95Bbjmwlnss",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: 7,
        reward: "0.3 MTG"
    }
];

var ethereumPrice = 1;

document.addEventListener("DOMContentLoaded", function() {    

    // Menu script
    var menu_button = document.querySelector(".menu_button");    
    var titles = document.querySelectorAll(".title"); 
    
    var dashboard = document.querySelector(".dashboard"); 
    var vote = document.querySelector(".vote"); 
    var lock = document.querySelector(".lock"); 
    var buy = document.querySelector(".buy"); 
    var sell = document.querySelector(".sell"); 
    var explorer = document.querySelector(".explorer"); 

    var container_title = document.querySelector('.container_title');
    
    var dashboard_wrapper = document.querySelector('.dashboard_wrapper');
    var vote_wrapper = document.querySelector('.vote_wrapper');
    var lock_wrapper = document.querySelector('.lock_wrapper');
    var buy_wrapper = document.querySelector('.buy_wrapper');
    var sell_wrapper = document.querySelector('.sell_wrapper');
    var explorer_wrapper = document.querySelector('.explorer_wrapper');    
    
    menu_button.addEventListener("click" , () => {
        document.body.classList.toggle("shrink");
        menu_button.classList.toggle("hovered");

        titles.forEach(function(element) {        
            element.classList.toggle("title_hide");
        });

        setTimeout(
            () => {
                menu_button.classList.remove("hovered");
            }, 400
        )
    });

    dashboard.addEventListener("click" , () => {
        container_title.textContent = 'Dashboard';

        dashboard_wrapper.style.display = 'block';
        vote_wrapper.style.display = 'none';
        lock_wrapper.style.display = 'none';
        buy_wrapper.style.display = 'none';
        sell_wrapper.style.display = 'none';
        explorer_wrapper.style.display = 'none';        

        dashboard.classList.add("active");
        vote.classList.remove("active");
        lock.classList.remove("active");
        buy.classList.remove("active");
        sell.classList.remove("active");
        explorer.classList.remove("active");
    });

    vote.addEventListener("click" , () => {
        container_title.textContent = 'Vote';

        dashboard_wrapper.style.display = 'none';
        vote_wrapper.style.display = 'block';
        lock_wrapper.style.display = 'none';
        buy_wrapper.style.display = 'none';
        sell_wrapper.style.display = 'none';
        explorer_wrapper.style.display = 'none';        

        dashboard.classList.remove("active");
        vote.classList.add("active");
        lock.classList.remove("active");
        buy.classList.remove("active");
        sell.classList.remove("active");
        explorer.classList.remove("active");     
    });

    lock.addEventListener("click" , () => {
        container_title.textContent = 'Lock';

        dashboard_wrapper.style.display = 'none';
        vote_wrapper.style.display = 'none';
        lock_wrapper.style.display = 'block';
        buy_wrapper.style.display = 'none';
        sell_wrapper.style.display = 'none';
        explorer_wrapper.style.display = 'none';        

        dashboard.classList.remove("active");
        vote.classList.remove("active");
        lock.classList.add("active");
        buy.classList.remove("active");
        sell.classList.remove("active");
        explorer.classList.remove("active");      
    });

    buy.addEventListener("click" , () => {
        container_title.textContent = 'Buy';

        dashboard_wrapper.style.display = 'none';
        vote_wrapper.style.display = 'none';
        lock_wrapper.style.display = 'none';
        buy_wrapper.style.display = 'block';
        sell_wrapper.style.display = 'none';
        explorer_wrapper.style.display = 'none';        

        dashboard.classList.remove("active");
        vote.classList.remove("active");
        lock.classList.remove("active");
        buy.classList.add("active");
        sell.classList.remove("active");
        explorer.classList.remove("active");      
    });

    sell.addEventListener("click" , () => {
        container_title.textContent = 'Sell';

        dashboard_wrapper.style.display = 'none';
        vote_wrapper.style.display = 'none';
        lock_wrapper.style.display = 'none';
        buy_wrapper.style.display = 'none';
        sell_wrapper.style.display = 'block';
        explorer_wrapper.style.display = 'none';        

        dashboard.classList.remove("active");
        vote.classList.remove("active");
        lock.classList.remove("active");
        buy.classList.remove("active");
        sell.classList.add("active");
        explorer.classList.remove("active");      
    });

    explorer.addEventListener("click" , () => {
        container_title.textContent = 'Explorer';

        dashboard_wrapper.style.display = 'none';
        vote_wrapper.style.display = 'none';
        lock_wrapper.style.display = 'none';
        buy_wrapper.style.display = 'none';
        sell_wrapper.style.display = 'none';
        explorer_wrapper.style.display = 'block';        

        dashboard.classList.remove("active");
        vote.classList.remove("active");
        lock.classList.remove("active");
        buy.classList.remove("active");
        sell.classList.remove("active");
        explorer.classList.add("active");         
    });
    
    // Voting page script
    var videolistDiv = document.querySelector('.video_list');
    var overlay = document.querySelector(".overlay");    

    videoDB.forEach(function(video) {                
        var elementDiv = document.createElement('div');  
        var idDiv = document.createElement('div');
        var companyDiv = document.createElement('div');
        var titleDiv = document.createElement('div');        
        var pendingDiv = document.createElement('div');  
        var rewardDiv = document.createElement('div');    
        
        idDiv.innerHTML = video.hash_id;
        companyDiv.innerHTML = video.company;
        titleDiv.innerHTML = video.title;        
        rewardDiv.innerHTML = video.reward; 

        elementDiv.classList.add('video_element');
        idDiv.classList.add('id');
        companyDiv.classList.add('company');
        titleDiv.classList.add('title');    
        rewardDiv.classList.add('reward');    
        
        // 1    START_VOTE
        // 2    WAITING_VOTE

        // 3    START_REVEAL
        // 4    WAITING_REVEAL

        // 5    CLAIM
        // 6    COMPLETED

        // 7    EXPIRED

        switch (video.status) {
            case 1:
                pendingDiv.classList.add('START_VOTE');
                pendingDiv.innerHTML = 'START VOTE';
                break;
            case 2:
                pendingDiv.classList.add('WAITING_VOTE');
                pendingDiv.innerHTML = 'WAITING VOTE';
                break;
            case 3:
                pendingDiv.classList.add('START_REVEAL');
                pendingDiv.innerHTML = 'START REVEAL';
                break;
            case 4:
                pendingDiv.classList.add('WAITING_REVEAL');
                pendingDiv.innerHTML = 'WAITING REVEAL';
                break;
            case 5:
                pendingDiv.classList.add('CLAIM');
                pendingDiv.innerHTML = 'CLAIM';
                break;
            case 6:
                pendingDiv.classList.add('COMPLETED');
                pendingDiv.innerHTML = 'COMPLETED';
                break;                                              
            default:
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
            generateDiv(video.hash_id, video.status);                   
        });             
    });    
    setGridRows(videoDB.length);

    overlay.addEventListener("click" , () => {
        if (event.target === overlay) {
            overlay.classList.toggle("active");
        }
    });

    // Buy-sell script
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
    .then(response => response.json())
    .then(data => {
        ethereumPrice = data["ethereum"].usd;
        console.log("Actual etherium price: " + ethereumPrice);
    })
    .catch(error => {
        console.error('Error fetching cryptocurrency price:', error);
    });

    // Chart scipt
    fetchEthereumPrices().then(monthxprice => {
        generateChart(monthxprice[0], monthxprice[1], [2.4, 2.5, 2.4, 2.7, 1,3,10,5,2.3,4.2, 15, 20, 13.4, 15,5.5, 19, 20, 21.2, 30, 24, 45, 45, 70]);
    });

    // Profile script
    var profile_button = document.querySelector('.profile_button');
    var profileContent = document.querySelector('.profile_content_wrapper');
    var computedStyle = window.getComputedStyle(profileContent);

    profile_button.addEventListener("click" , () => {
        if (computedStyle.display === 'none') {
            profileContent.style.display = 'block';
        } else {
            profileContent.style.display = 'none';
        }  
    });
    
});

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
    var tags_container = document.querySelector(".tags_container");
    var tag_button = document.querySelector(".tag_button");
    var inputElement = document.querySelector(".tags_insert");  
    var suggestions_container = document.querySelector(".suggestions_container");  

    suggestions_container.innerHTML = "";
    tags_container.innerHTML = "";
    inputElement.value = "";     
        
    switch (status) {
        case 1:
            tag_button.addEventListener('click', function () {   
                var seed = generateAlphanumericSeed() 
                var tagList = getTagPositions();  
                suggestions_container.innerHTML = "<grey>Seed: </grey>" + seed;        
                setCookie(videoId, { list: tagList, seed: seed } , 1);                        
            });  
            addTagFromCookie(videoId, false, true);
            inputElement.disabled = false;
            tags_container.classList.remove("disabled")
            tag_button.classList.remove("disabled");
            tag_button.innerHTML = "SEND VOTE";  
            break;
        case 2:        
            disableDiv(videoId);
            tag_button.innerHTML = "WAITING VOTE";  
            break;
        case 3:
            disableDiv(videoId, true);
            tag_button.innerHTML = "REVEAL";  
            break;
        case 4:
            disableDiv(videoId);
            tag_button.innerHTML = "WAITING REVEAL";  
            break;
        case 5:
            disableDiv(videoId, true);
            tag_button.innerHTML = "CLAIM";  
            break;
        case 6:
            disableDiv(videoId);
            tag_button.innerHTML = "COMPLITED";  
            break;                                              
        default:         
            disableDiv(videoId);
            tag_button.innerHTML = "EXPIRED";               
      }
                  
    document.getElementById('youtubeVideo').src = "https://www.youtube.com/embed/" + videoId + "?si=EwWUd-wd4mxodglK"
    overlay.classList.toggle("active");  
}

function disableDiv(videoId, confirm=false){
    var tags_container = document.querySelector(".tags_container");
    var tag_button = document.querySelector(".tag_button");
    var inputElement = document.querySelector(".tags_insert");  

    addTagFromCookie(videoId, true);
    inputElement.disabled = true;
    tags_container.classList.add("disabled")
    if(confirm){
        tag_button.classList.remove("disabled");   
    }else{
        tag_button.classList.add("disabled");   
    }
}

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

function tagInserted(event) {
    var tags_container = document.querySelector(".tags_container");
    var inputElement = document.querySelector(".tags_insert");
    var inputValue = inputElement.value.trim();

    // Check if the entered tag is valid
    if (event.key === "Enter" && inputValue !== "" && validTags.includes(inputValue)) {
        var tag = document.createElement("div");
        var tag_name = document.createElement("div");
        var icon = document.createElement("i");

        tag.className = "tag";
        tag_name.className = "tag_name";
        icon.className = "fa-solid fa-x";

        tag_name.textContent = inputValue;

        tag.addEventListener("click", function () {
            tags_container.removeChild(tag);
        });

        tag.appendChild(tag_name);
        tag.appendChild(icon);
        tags_container.appendChild(tag);
        inputElement.value = "";
    }
}

function suggestTag(event) {
    var inputElement = document.querySelector(".tags_insert");
    var inputValue = inputElement.value.trim().toLowerCase();

    var suggestions_container = document.querySelector(".suggestions_container");
    clearSuggestions(suggestions_container);

    const matchingTags = validTags.filter(tag => tag.toLowerCase().includes(inputValue));

    const availableSpace = suggestions_container.offsetWidth;
    let totalWidth = 0;

    matchingTags.some(tag => {
        const suggestionWidth = calculateTextWidth(tag) + 16; // Add padding
        if (totalWidth + suggestionWidth <= availableSpace) {
            createSuggestion(suggestions_container, tag);
            totalWidth += suggestionWidth;
            return false; 
        }
        return true; 
    });
}

function createSuggestion(container, tag) {
    var suggestionDiv = document.createElement("div");
    var tags_insert = document.querySelector(".tags_insert");    
    suggestionDiv.className = "suggestion";
    suggestionDiv.textContent = tag;

    // Add click event listener to add the clicked tag to tags
    suggestionDiv.addEventListener("click", function () {
        addTagFromSuggestion(tag);
        clearSuggestions(container);
        tags_insert.value = "";
    });

    container.appendChild(suggestionDiv);
}

function addTagFromCookie(videoId, disabled = false, first = false){
    var cookieValue = getCookie(videoId);
    var suggestions_container = document.querySelector(".suggestions_container");  
    var tags_container = document.querySelector(".tags_container");  

    console.log("First: " + first);
    if (cookieValue === null && first){
        suggestions_container.innerHTML = "<grey>Seed: </grey> <cursive>submit to generate.</cursive>";        
        return
    }
    if (cookieValue === null){
        suggestions_container.innerHTML = "<grey>Seed: </grey> <cursive>missing cookies.</cursive>";
        tags_container.innerHTML = "<cursive>missing cookies.</cursive>";
        return
    }

    var integers = cookieValue.list;
    var seed = cookieValue.seed;        

    suggestions_container.innerHTML = "<grey>Seed: </grey>" + seed;
    var tagList = integers.map(index => validTags[index - 1]);
    tagList.forEach(tag => {
        addTagFromSuggestion(tag, disabled);
      });    
}

function addTagFromSuggestion(tag, disabled=false) {
    var tags_container = document.querySelector(".tags_container");
    var tagElement = document.createElement("div");
    var tag_name = document.createElement("div");
    var icon = document.createElement("i");

    tagElement.className = "tag";
    tag_name.className = "tag_name";
    icon.className = "fa-solid fa-x";

    tag_name.textContent = tag;

    if(!disabled){
        tagElement.addEventListener("click", function () {
            tags_container.removeChild(tagElement);
        });
    }

    tagElement.appendChild(tag_name);
    tagElement.appendChild(icon);
    tags_container.appendChild(tagElement);
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

function validateInput(input, crypto) {    
    var dollar_value = document.querySelectorAll(".dollar_value");
    var eth_input = document.querySelectorAll(".eth_input");
    var mtg_input = document.querySelectorAll(".mtg_input");

    var eth_sell = document.querySelector(".eth_sell");
    var mtg_sell = document.querySelector(".mtg_sell");

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

        eth_sell.value = floatValue;

        mtg_input.forEach(element => {
            element.value = floatValue / ethxmtg;
        }); 
    }
    else{
        result = floatValue * ethereumPrice  * ethxmtg;
        formattedResult = result.toFixed(4);
        numericResult = parseFloat(formattedResult);

        mtg_sell.value = floatValue;

        eth_input.forEach(element => {
            element.value = floatValue * ethxmtg;
        }); 
    }


    dollar_value.forEach(element => {        
        element.innerHTML = numericResult + " $";
    });    
}

function validateInputLock(input) {    
    var dollar_value_lock = document.getElementById("dollar_value_lock");
    input.value = input.value.replace(/[^0-9.,]/g, '');
      
    let floatValue = parseFloat(input.value);
    let result = floatValue * ethereumPrice  * ethxmtg;
    let formattedResult = result.toFixed(4);
    let numericResult = parseFloat(formattedResult);

    dollar_value_lock.innerHTML = numericResult + " $";    
}

function generateChart(days, ethprice, tokens){

    var fill = Array.from({ length: Math.max(30 - tokens.length, 0) }, () => 0).concat(tokens);
    var values = ethprice.map((price, index) => fill[index] * price * 0.001);

    var maxValueFloat = Math.max.apply(null, values)
    var maxValueInt = Math.ceil(maxValueFloat / 100) * 100 + 100;

    // console.log("OUTSIDE");
    // console.log(days);
    // console.log(ethprice);
    // console.log(fill);

    new Chart("balance_chart", {
    type: "line",
    data: {
        labels: days,
        datasets: [
            {    
                label: "USD",
                fill: true,                               
                lineTension: 0.3,
                backgroundColor: "rgba(3, 125, 214, 0.25)", // Red color with 0.3 opacity
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
                    fontColor: 'rgb(134, 163, 184)' // Set the Y-axis tick label color to white
                },       
                gridLines: {
                    color: 'rgba(134, 163, 184, 0.25)' // Set the color of the Y-axis grid lines
                }            
            }],
            xAxes: [{
                ticks: {
                    fontColor: 'rgb(134, 163, 184)' // Set the X-axis tick label color to white
                },
                gridLines: { display: false }
            }]
        },
        tooltips: {
            mode: 'x', // Display tooltips only when hovering over the Y-axis
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
    const endDate = new Date(); // Today's date
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 91); // Date from 30 days ago

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
                var day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
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