document.addEventListener("DOMContentLoaded", function () {
    initMenuButton();
});

function initMenuButton(){
    var explanation = document.querySelector(".explanation");   

    explanation.addEventListener('click', function() {        
        var targetElement = document.getElementById('scrollTarget');
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
}