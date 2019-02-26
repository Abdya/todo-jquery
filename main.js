$(document).ready(function() {
    let todosList = [
        {
            title: "FUCK EVERYONE WHO WILL READ THIS!!!",
            createdAt: 1551177360,
            status: 0
        },
        {
            title: "Take out the trash",
            createdAt: 1551177360,
            status: 0
        },
        {
            title: "Buy bread",
            createdAt: 1551177360,
            status: 1
        },
        {
            title: "Teach penguins to fly",
            createdAt: 1551177360,
            status: 2
        }
    ];
    /*about status
    * 0 - new
    * 1 - in process
    * 2 - done*/

    //console.log(todosList[0].createdAt);

    let $newTodo = $("#newTodo");
    let $sortable = $("#sortable");
    let $todoCount = $("#count-todos");
    $('.selectpicker').selectpicker();

    function takeInputData(){
        var date = moment();
        var tmpObj = {
            title: $newTodo.val(),
            createdAt: date.unix(),
            status: 0
        };
        console.log(tmpObj.createdAt);
        return tmpObj;
    }

    function todoRenderItem(todo) {
        let render = `<li class='ui-state-default'> \
                <div class='checkbox'> \
                <label> \
                ${todo.title} ${moment.unix(todo.createdAt).format("MMMM Do YYYY, h:mm:ss a")} \
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
    }

    function renderApp() {
        $sortable.empty();
        todoCount(todosList);
        todoRenderList(todosList)
    }

    $newTodo.on('keypress', event => {
        let keyCode = event.keyCode || event.which;
        if (keyCode == '13') {
            let newTodoItem = takeInputData();
            todosList.push(newTodoItem);
            renderApp();
            $newTodo.val('');
        }
    });

    renderApp();
});
