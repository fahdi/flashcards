window.onkeyup = function(e){
    if(e.code === "Space")
    {
        var elem = document.getElementsByClassName('hidden-answer')[0];
        elem.style.display = "block";
    }
    else if(e.code === "ArrowRight")
    {
        location.reload();
    }
};