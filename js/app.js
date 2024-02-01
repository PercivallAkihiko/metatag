// START_VOTE
// WAITING_VOTE

// START_REVEAL
// WAITING_REVEAL

// CLAIM
// COMPLETED

// EXPIRED

var videoDB = [
    {
        hash_id: "yRkdHFdiuaI",            
        title: "Bitcoin On-Chain Analysis: Value Days Destroyed Multiple",
        company: "Youtube",
        link: "www.google.it",            
        status: "START_VOTE",
        reward: "-"
    },
    {
        hash_id: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: "START_VOTE",
        reward: "0.3 MTG"
    },
    {
        hash_id: "rUWpziOMk-4",
        company: "Youtube",
        title: "Cryptocurrencies: What if they had the marketcap of...",
        link: "www.google.it",
        status: "WAITING_VOTE",
        reward: "-0.41 MTG"
    },
    {
        hash_id: "XE4s0guHI9Y",
        company: "Youtube",
        title: "Bitcoin: Dubious Speculation",
        link: "www.google.it",
        status: "WAITING_VOTE",
        reward: "-0.41 MTG"
    },
    {
        hash_id: "1231256263245234",
        company: "Youtube",
        title: "Stablecoin Dominance",
        link: "www.google.it",
        status: "START_REVEAL",
        reward: "-0.41 MTG"
    },
    {
        hash_id: "s3fWLaD7Zok",
        company: "Youtube",
        title: "Bitcoin: Early Halving Year Pattern (Update)",
        link: "www.google.it",
        status: "WAITING_REVEAL",
        reward: "-0.41 MTG"
    },
    {
        hash_id: "xxxr4J1fzvc",
        company: "Youtube",
        title: "Bitcoin: Watching the Weekly Close",
        link: "www.google.it",
        status: "CLAIM",
        reward: "0.3 MTG"
    },
    {
        hash_id: "rUWpziOMk-4",
        company: "Youtube",
        title: "Cryptocurrencies: What if they had the marketcap of...",
        link: "www.google.it",
        status: "COMPLETED",
        reward: "-0.41 MTG"
    },
    {
        hash_id: "XE4s0guHI9Y",
        company: "Youtube",
        title: "Bitcoin: Dubious Speculation",
        link: "www.google.it",
        status: "COMPLETED",
        reward: "-0.41 MTG"
    },
    {
        hash_id: "1231256263245234",
        company: "Youtube",
        title: "Stablecoin Dominance",
        link: "www.google.it",
        status: "COMPLETED",
        reward: "-0.41 MTG"
    },
    {
        hash_id: "1231256263245234",
        company: "Youtube",
        title: "Stablecoin Dominance",
        link: "www.google.it",
        status: "EXPIRED",
        reward: "-0.41 MTG"
    },
    {
        hash_id: "1231256263245234",
        company: "Youtube",
        title: "Stablecoin Dominance",
        link: "www.google.it",
        status: "EXPIRED",
        reward: "-0.41 MTG"
    }
];

document.addEventListener("DOMContentLoaded", function() {
    // menu script
    var menu_button = document.querySelector(".menu_button");    
    var titles = document.querySelectorAll(".title"); 
    
    var dashboard = document.querySelector(".dashboard"); 
    var vote = document.querySelector(".vote"); 
    var stake = document.querySelector(".stake"); 
    var swap = document.querySelector(".swap"); 
    var explorer = document.querySelector(".explorer"); 

    var container_title = document.querySelector('.container_title');
    
    var dashboard_wrapper = document.querySelector('.dashboard_wrapper');
    var vote_wrapper = document.querySelector('.vote_wrapper');
    var stake_wrapper = document.querySelector('.stake_wrapper');
    var swap_wrapper = document.querySelector('.swap_wrapper');
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
        stake_wrapper.style.display = 'none';
        swap_wrapper.style.display = 'none';
        explorer_wrapper.style.display = 'none';        

        dashboard.classList.add("active");
        vote.classList.remove("active");
        stake.classList.remove("active");
        swap.classList.remove("active");
        explorer.classList.remove("active");
    });

    vote.addEventListener("click" , () => {
        container_title.textContent = 'Vote';

        dashboard_wrapper.style.display = 'none';
        vote_wrapper.style.display = 'block';
        stake_wrapper.style.display = 'none';
        swap_wrapper.style.display = 'none';
        explorer_wrapper.style.display = 'none';     

        dashboard.classList.remove("active");
        vote.classList.add("active");
        stake.classList.remove("active");
        swap.classList.remove("active");
        explorer.classList.remove("active");        
    });

    stake.addEventListener("click" , () => {
        container_title.textContent = 'Stake';

        dashboard_wrapper.style.display = 'none';
        vote_wrapper.style.display = 'none';
        stake_wrapper.style.display = 'block';
        swap_wrapper.style.display = 'none';
        explorer_wrapper.style.display = 'none';     

        dashboard.classList.remove("active");
        vote.classList.remove("active");
        stake.classList.add("active");
        swap.classList.remove("active");
        explorer.classList.remove("active");        
    });

    swap.addEventListener("click" , () => {
        container_title.textContent = 'Swap';

        dashboard_wrapper.style.display = 'none';
        vote_wrapper.style.display = 'none';
        stake_wrapper.style.display = 'none';
        swap_wrapper.style.display = 'block';
        explorer_wrapper.style.display = 'none';     

        dashboard.classList.remove("active");
        vote.classList.remove("active");
        stake.classList.remove("active");
        swap.classList.add("active");
        explorer.classList.remove("active");        
    });

    explorer.addEventListener("click" , () => {
        container_title.textContent = 'Explorer';

        dashboard_wrapper.style.display = 'none';
        vote_wrapper.style.display = 'none';
        stake_wrapper.style.display = 'none';
        swap_wrapper.style.display = 'none';
        explorer_wrapper.style.display = 'block';     

        dashboard.classList.remove("active");
        vote.classList.remove("active");
        stake.classList.remove("active");
        swap.classList.remove("active");
        explorer.classList.add("active");        
    });
    
    // voting page script
    var videolistDiv = document.querySelector('.video_list');

    var overlay = document.querySelector(".overlay");
    var tags_container = document.querySelector(".tags_container");
    var inputElement = document.querySelector(".tags_insert");

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
        
        // START_VOTE
        // WAITING_VOTE

        // START_REVEAL
        // WAITING_REVEAL

        // CLAIM
        // COMPLETED

        // EXPIRED

        if (video.status == 'START_VOTE') {
            pendingDiv.classList.add('START_VOTE');
            pendingDiv.innerHTML = 'START VOTE';
        } else if (video.status == 'WAITING_VOTE') {
            pendingDiv.classList.add('WAITING_VOTE');
            pendingDiv.innerHTML = 'WAITING VOTE';
        } else if (video.status == 'START_REVEAL') {
            pendingDiv.classList.add('START_REVEAL');
            pendingDiv.innerHTML = 'START REVEAL';
        } else if (video.status == 'WAITING_REVEAL') {
            pendingDiv.classList.add('WAITING_REVEAL');
            pendingDiv.innerHTML = 'WAITING REVEAL';
        } else if (video.status == 'CLAIM') {
            pendingDiv.classList.add('CLAIM');
            pendingDiv.innerHTML = 'CLAIM';
        } else if (video.status == 'COMPLETED') {
            pendingDiv.classList.add('COMPLETED');
            pendingDiv.innerHTML = 'COMPLETED';
        } else {
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
            changeVideoSource(video.hash_id);
            //document.getElementById('youtubeVideo').src = "https://www.youtube.com/embed/" + id + "?si==t8ONwp4s-zO5XMyJ";
            tags_container.innerHTML = "";
            inputElement.value = "";
            overlay.classList.toggle("active");            
        });             
    });    
    setGridRows(videoDB.length);

    overlay.addEventListener("click" , () => {
        if (event.target === overlay) {
            overlay.classList.toggle("active");
        }
    });
});

function setGridRows(number) {
    var gridContainer = document.querySelector('.video_list');                    
    gridContainer.style.gridTemplateRows = 'repeat(' + number + ', 80px)';
}

function changeVideoSource(id) {            
    document.getElementById('youtubeVideo').src = "https://www.youtube.com/embed/" + id + "?si==t8ONwp4s-zO5XMyJ";
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

    // Check if the entered tag matches any valid tags
    const matchingTags = validTags.filter(tag => tag.toLowerCase().includes(inputValue));

    // Display suggestions within available space
    const availableSpace = suggestions_container.offsetWidth;
    let totalWidth = 0;

    matchingTags.some(tag => {
        const suggestionWidth = calculateTextWidth(tag) + 16; // Add padding
        if (totalWidth + suggestionWidth <= availableSpace) {
            createSuggestion(suggestions_container, tag);
            totalWidth += suggestionWidth;
            return false; // Continue iterating
        }
        return true; // Stop iterating
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

function addTagFromSuggestion(tag) {
    var tags_container = document.querySelector(".tags_container");
    var tagElement = document.createElement("div");
    var tag_name = document.createElement("div");
    var icon = document.createElement("i");

    tagElement.className = "tag";
    tag_name.className = "tag_name";
    icon.className = "fa-solid fa-x";

    tag_name.textContent = tag;

    tagElement.addEventListener("click", function () {
        tags_container.removeChild(tagElement);
    });

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