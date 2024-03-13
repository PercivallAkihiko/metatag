document.addEventListener("DOMContentLoaded", function () {
    initMenuButton();
});

function initMenuButton(){
    var explanation = document.querySelector(".explanation");   
    var team = document.querySelector(".team");  

    var explanationTarget = document.getElementById('explanation_target');    
    var teamTarget = document.getElementById('team_target');    

    addScrollListener(explanation, explanationTarget);
    addScrollListener(team, teamTarget);
}

function addScrollListener(element, target){
    element.addEventListener('click', function() {                
        target.scrollIntoView({ behavior: 'smooth' });
    }); 
}