
var GIPHY_URL = 'http://api.giphy.com/v1/gifs/search';

function getDataFromAPI(searchTerm){
    var query = {
        limit: 1,
        q: searchTerm,
        api_key: 'dc6zaTOxFJmzC'
    }
    $.getJSON(GIPHY_URL, query, function(data){
        console.log(data);
        // $('.task-result')
    });
}

function renderTask(task) {
    var taskElement = '<button type="button" class = "complete-button" name="button">Done</button>' + '<span>' + task + '</span>'  +
    '<button type ="button" class ="reset-button" id="reset" name="reset">Delete</button>';
    $('.task-result').html(taskElement);
    hideAddInput();

}

function hideAddInput(){
    $('.task-form').addClass('visuallyhidden');
}

function waitforDelete(){
    $('.task-result').on('click', '.reset-button', function(e){
    alert('hi');
    console.log('ok');
    });
}


//event listeners


function watchForSubmit() {
    $('.task-form').on('submit', function(e){
        e.preventDefault();
        renderTask($('.text-input').val());
    });
}



$(function(){
    watchForSubmit();
    waitforDelete();
});
