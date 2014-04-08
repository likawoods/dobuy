/**
 * Created by lWiB10 on 05.04.2014.
 */

RemoteStorage.defineModule('tasks', function(privateClient, publicClient) {

    // Define a common data type using JSON Schema
    privateClient.declareType('task', {
        "description": "a task",
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "format": "id"
            },
            "title": {
                "type": "string"
            },
            "completed": {
                "type": "boolean"
            }
        }
    });

    return {
        exports: {
            // Add functions for retrieving and manipulating data using
            // methods provided by BaseClient
            addTask: function (title) {
                var d = $.Deferred();
                var id = new Date().getTime().toString();
                var task = {
                    id: id,
                    title: title,
                    completed: false
                };
                privateClient.storeObject('task', id, task).then(function () {
                    d.resolve(task);
                });
                return d.promise();
            },
            removeTask: function (id) {
                privateClient.remove(id + '');
            },
            // define more functions...

            listTasks: function () {
                return privateClient.getAll("");
            },

            onAddTask: function (callback) {
                privateClient.on('change', function (e) {
                    if (e.oldValue === undefined) {
                        callback(e.newValue);
                    }
                });
            },
            onRemoveTask: function (callback) {
                privateClient.on('change', function (e) {
                    if (e.newValue === undefined) {
                        callback(e.oldValue);
                    }
                });
            }
        }
    }
});