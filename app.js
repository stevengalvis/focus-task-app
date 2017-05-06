
function renderTask(task) {
console.log(task);
}







//event listeners
function watchAddTask(){
    $('.task-form').on('submit',function(e){
        e.preventDefault();
        renderTask($('.text-input').val());
    });
}

$(function(){watchAddTask();})
