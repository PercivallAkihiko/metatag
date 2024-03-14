document.addEventListener("DOMContentLoaded", function () {
    initMenuButton();
});

function initMenuButton(){     
    var explanation = document.querySelector(".explanation");   
    var team = document.querySelector(".team");      
    var contact = document.querySelector(".contact");      
    
    var explanationTarget = document.getElementById('explanation_target');    
    var teamTarget = document.getElementById('team_target');          
    var contactTarget = document.getElementById('contact_target'); 
    
    addScrollListener(explanation, explanationTarget);
    addScrollListener(team, teamTarget);
    addScrollListener(contact, contactTarget);
}

function addScrollListener(element, target, headerHeight=94) {
    element.addEventListener('click', function() {
        const offset = target.offsetTop - headerHeight;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    });
}