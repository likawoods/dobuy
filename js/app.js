/**
 * Created by lWiB10 on 05.04.2014.m
 */

$("#addbutton").click(function () {
    var text = $("#new-item").val();
    if (text) {
        remoteStorage.tasks.addTask(text).then(function (task) {
            displayItem(task);
        });
    }
    $("#new-item").val("");
});

$(document).on("click",".delete-task", function() {
    var taskId = $(this).data("task-id");

    $(this).parents(".task-item").remove();
    remoteStorage.tasks.removeTask(taskId);

});

remoteStorage.tasks.onAddTask(function(task){
   displayItem(task);
});

remoteStorage.tasks.onRemoveTask(function(task){
   var taskId = task.id;
    $("[data-task-id=" + taskId + "]").parents(".task-item").remove();
});



remoteStorage.access.claim('tasks', 'rw');
remoteStorage.caching.enable("/tasks/");
remoteStorage.displayWidget();
remoteStorage.tasks.listTasks().then(function (tasks) {
    for (var id in tasks) {
        var task = tasks[id];
        displayItem(task);

    }
});

function displayItem(task) {
    if ($("[data-task-id=" + task.id + "]").length == 0) {
        $("#list").append('<li class="list-group-item task-item list-group-item-warning" >' +
            '<div class="checkbox">' +
            '<label>' +
            task.title +
            '<input type="checkbox">' +
            '</label>' +
            '<button data-task-id="' + task.id + '" type="button" class="btn btn-danger btn-xs pull-right delete-task">' +
            '<span class="glyphicon glyphicon-remove"></span> delete' +
            '</button>' +
            '</div>' +
            '</li>');
    }
}


