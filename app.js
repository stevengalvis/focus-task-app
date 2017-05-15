'use strict';
var GIPHY_URL = 'http://api.giphy.com/v1/gifs/random';
var countdown = void 0;
var timerDisplay = document.querySelector('.display-time-left');


function timer(seconds){
    //clear any existing timerDisplay
    $('.display-time-left').removeClass('blink blink-infinite');
    clearInterval(countdown);
    var now = Date.now();
    var then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(function(){
        var secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop it
        if(secondsLeft < 0){
            clearInterval(countdown);
            swal("All Done!", "Time for a break", "success");
            $('.timer-header').html('Press timer to restart');
            $('.display-time-left').addClass('blink blink-infinite');
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(seconds){
    var minutes = Math.floor(seconds / 60);
    var remainderSeconds = seconds % 60;
    var display =  minutes + ':' + (remainderSeconds < 10 ? '0': '') + remainderSeconds;
    document.title = display;
    timerDisplay.textContent = display;
}

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
    var taskElement ='<span class = "task-name">' + task + '</span>' + '<div class = "task-container">' +  '<button type="button" class = "done-button" name="button" title = "mark completed"><i class="fa fa-check fa-3x" aria-hidden="true"></i></button>'  +
    '<button type ="button" class ="reset-button" id="reset" name="reset" title = "delete item"><i class="fa fa-trash-o fa-3x" aria-hidden="true"></i></button>'+ '<button type = "button" class = "start-timer" title = "reset time">' +
    '<i class="fa fa-clock-o fa-3x" aria-hidden="true"></i></button></div>';
    $('.task-result').html(taskElement);
    $('.timer-header').removeClass('visually-hidden');
    hideAddInput();
}

function hideAddInput(){
    $('.task-form').addClass('visually-hidden');
}

//event listenerss
function waitforDelete(){
    $('.task-result').on('click', '.reset-button', function(e){
        $('.timer-header').addClass('visually-hidden');
        //display failed gif
        getDataFromAPI('fail');
        $('.task-form').removeClass('visually-hidden');
        $('.task-form').trigger('reset');
        clearInterval(countdown);
        timerDisplay.textContent = '';
        document.title = '0:00';
         swal("Task Deleted!")
    });
}

function waitForDone(){
    $('.task-result').on('click','.done-button',function(e){
        $('.timer-header').addClass('visually-hidden');
        swal("Good job!", "You completed the task!", "success");
        getDataFromAPI('success');
        $('.task-form').removeClass('visually-hidden');
        $('.task-form').trigger('reset');
        //set timer to default
        clearInterval(countdown);
        timerDisplay.textContent = '';
        document.title = '0:00';
    });
}

function watchForSubmit() {
    $('.task-form').on('submit', function(e){
        e.preventDefault();
        renderTask($('.text-input').val());
        setTimer();
    });

}

function waitForSetTimer(){
    $('.task-result').on('click','.start-timer', function(e){
        setTimer();
    });
}

$('.display-time-left').on('click', function(e){
    event.preventDefault;
    setTimer();
})

function setTimer(){
    swal({
        title: "Set Total Task time",
        text: "Enter in minutes:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "e.g 25"
    },
        function(inputValue){
        if (inputValue === false) return false;

        if (inputValue === "") {
            swal.showInputError("You need to write something!");
            return false
        }

        swal("Timer Set!", "Your timer is set to: " + inputValue + ' minutes',  "success");
        timer(inputValue * 60);
        });
}

$(function(){
    watchForSubmit();
    waitforDelete();
    waitForDone();
    waitForSetTimer();

});
