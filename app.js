var GIPHY_URL = 'http://api.giphy.com/v1/gifs/random';

function getDataFromAPI(searchTerm){
    var query = {
        limit: 1,
        tag: searchTerm,
        api_key: 'dc6zaTOxFJmzC'
    }
    $.getJSON(GIPHY_URL, query, function(data){
        console.log(data);
        var results = data.data;
        var resultElement = '';
        if (data){
            resultElement += '<img src = "' + results.fixed_height_downsampled_url + '">';
            console.log(resultElement);
        }

        $('.task-result').html(resultElement);
    });
}

function renderTask(task) {
    var taskElement = '<button type="button" class = "done-button" name="button"><i class="fa fa-check fa-3x" aria-hidden="true"></i></button>' + '<span class = "task-name">' + task + '</span>'  +
    '<button type ="button" class ="reset-button" id="reset" name="reset"><i class="fa fa-trash-o fa-3x" aria-hidden="true"></i></button>';
    $('.task-result').html(taskElement);

    hideAddInput();


}

function hideAddInput(){
    $('.task-form').addClass('visually-hidden');
}



//event listenerss
function waitforDelete(){
    $('.task-result').on('click', '.reset-button', function(e){
        getDataFromAPI('fail');
        $('.task-form').removeClass('visually-hidden');
        $('.task-form').trigger('reset');
    });
}

function waitForDone(){
    $('.task-result').on('click','.done-button',function(e){
        getDataFromAPI('success');
        $('.task-form').removeClass('visually-hidden');
        $('.task-form').trigger('reset');
    });
}





function watchForSubmit() {
    $('.task-form').on('submit', function(e){
        e.preventDefault();
        renderTask($('.text-input').val());
    });
}



$(function(){
    watchForSubmit();
    waitforDelete();
    waitForDone();
});
