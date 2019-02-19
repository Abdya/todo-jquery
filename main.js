$(document).ready(function() {
    let todosList = [
        {
            title: "FUCK EVERYONE WHO WILL READ THIS!!!",
            createdAt: new Date().getTime(),
            status: 0
        },
        {
            title: "Take out the trash",
            createdAt: new Date().getTime(),
            status: 0
        },
        {
            title: "Buy bread",
            createdAt: new Date().getTime(),
            status: 0
        },
        {
            title: "Teach penguins to fly",
            createdAt: new Date().getTime(),
            status: 0
        }
    ];

    let $newTodo = $("#newTodo");
    let $sortable = $("#sortable");
    let $todoCount = $("#count-todos");


    function takeInputData(){
        var tmpObj = {
            title: $newTodo.val(),
            createdAt: new Date().getTime(),
            status: 0
        };
        return tmpObj;
    }

    function todoRenderItem(todo) {
        let render = `<li class='ui-state-default'> \
                <div class='checkbox'> \
                <label> \
                <input type="checkbox" value="" /> ${todo.title} \
                </label> \
                </div> \
                </li>`;
        $sortable.append(render);
    }

    function todoCount(todosList) {
        $todoCount.text(todosList.length);
    }

    function todoRenderList(todos) {
        $.each(todos, function () {
            todoRenderItem(this);
        });
        todoCount(todos);
    }

    todoRenderList(todosList);

    $newTodo.on('keypress',event => {
        let keyCode = event.keyCode || event.which;
        if (keyCode == '13'){
            let newTodoItem = takeInputData();
            todosList.push(newTodoItem);
            todoCount(todosList);
            todoRenderItem(newTodoItem);
            $newTodo.val('');
        }
    })
});
