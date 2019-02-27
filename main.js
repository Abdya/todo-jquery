$(document).ready(function() {
    let todosList = [
        {
            title: "FUCK EVERYONE WHO WILL READ THIS!!!",
            createdAt: 1551177360,
            priority: 0
        },
        {
            title: "Teach penguins to fly",
            createdAt: 1542177360,
            priority: 2
        },
        {
            title: "Take out the trash",
            createdAt: 1551177360,
            priority: 0
        },
        {
            title: "Buy bread",
            createdAt: 1551177360,
            priority: 1
        },
    ];
    /*about priority
    * 0 - low
    * 1 - middle
    * 2 - high */


    let $newTodo = $("#newTodo");
    let $sortable = $("#sortable");
    let $todoCount = $("#count-todos");
    let $todoPriority = $("#pr-select");
    let $sortSel = $("#sortSelect");

    $('.selectpicker').selectpicker();

    function takeInputData(){
        var date = moment();
        var tmpObj = {
            title: $newTodo.val(),
            createdAt: date.unix(),
            priority: $todoPriority.val(),
        };
        console.log(tmpObj.priority);
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

    function comparePriority(a,b) {
        return b.priority - a.priority;
    }

    /*function compareDate(a,b) {

    }*/

    $newTodo.on('keypress', event => {
        let keyCode = event.keyCode || event.which;
        if (keyCode == '13') {
            let newTodoItem = takeInputData();
            todosList.push(newTodoItem);
            renderApp();
            $newTodo.val('');
        }
    });

    $('#sortBy').on('click', event => {
        if ($sortSel.val() == 'priority') {
            todosList = todosList.sort(comparePriority);
            renderApp();
        }
    });

    renderApp();
});
