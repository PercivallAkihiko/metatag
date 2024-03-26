document.addEventListener("DOMContentLoaded", function () {    
    initMenuButton();
});

function initMenuButton(){     
    var logo = document.querySelector('.logo_container'); 
    var logoName = document.querySelector('.logo_name_container'); 
    var explanation = document.querySelector(".explanation");   
    var team = document.querySelector(".team");      
    var contact = document.querySelector(".contact");          
        
    var explanationTarget = document.getElementById('explanation_target');    
    var teamTarget = document.getElementById('team_target');          
    var contactTarget = document.getElementById('contact_target'); 
    
    addScrollListener(logo);
    addScrollListener(logoName);
    addScrollListener(explanation, explanationTarget);
    addScrollListener(team, teamTarget);
    addScrollListener(contact, contactTarget);    
}

function addScrollListener(element, target = "TOP", headerHeight=94) {
    element.addEventListener('click', function() {
        if(target == "TOP"){
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Optional: smooth scrolling behavior
            });
            return;
        }

        const offset = target.offsetTop - headerHeight;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    });
}