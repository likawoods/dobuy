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
                var id = new Date().getTime().toString();
                return privateClient.storeObject('task', id, {
                    id: id,
                    title: title,
                    completed: false
                });
            },
            // define more functions...

            listTasks: function() {
                return privateClient.getAll("");
            }
        }
    };
});