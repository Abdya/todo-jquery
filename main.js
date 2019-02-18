$(document).ready(function() {
    let listOfTodos = [
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

/*    let objList = () => {
        return listOfTodos;
    };*/

    function takeInputData(){
        var tmpObj = {
            title: $("#newTodo").val(),
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
        $("#sortable").append(render);
    }

    function todoRenderList(todos) {
        console.log(todos);
        $.each(todos, function () {
            todoRenderItem(this);
        })
    }

    todoRenderList(listOfTodos);

    $("#newTodo").on('keypress',event => {
        let keyCode = event.keyCode || event.which;
        if (keyCode == '13'){
            let newTodoItem = takeInputData();
            listOfTodos.push(newTodoItem);
            todoRenderItem(newTodoItem);
            $("#newTodo").val('');
        }
    })
});
