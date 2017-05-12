'use strict';
var GIPHY_URL = 'http://api.giphy.com/v1/gifs/random';
var countdown = void 0;
var timerDisplay = document.querySelector('.display-time-left');
var buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    //clear any existing timerDisplay
    clearInterval(countdown);
    var now = Date.now();
    var then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(function(){
        var secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop it
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(seconds){
    var minutes = Math.floor(seconds / 60);
    var remainderSeconds = seconds % 60;
    var display = minutes + ':' + (remainderSeconds < 10 ? '0': '') + remainderSeconds;
    document.title = display;
    timerDisplay.textContent = display;
}



function startTimer(){
    var seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(function(button){
    return button.addEventListener('click', startTimer);
});

document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    var mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});


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
        swal("Good job!", "You completed the task!", "success");
        getDataFromAPI('success');
        $('.task-form').removeClass('visually-hidden');
        $('.task-form').trigger('reset');
    });
}





function watchForSubmit() {
    $('.task-form').on('submit', function(e){
        e.preventDefault();
        renderTask($('.text-input').val());
        swal({
  title: "An input!",
  text: "Write something interesting:",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  animation: "slide-from-top",
  inputPlaceholder: "Enter total task time"
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
    });

}



$(function(){
    watchForSubmit();
    waitforDelete();
    waitForDone();

});
