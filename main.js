$(document).ready(function() {
    let todosList = [
        {
            title: "FUCK EVERYONE WHO WILL READ THIS!!!",
            createdAt: new Date(),
            status: 0
        },
        {
            title: "Take out the trash",
            createdAt: new Date(),
            status: 0
        },
        {
            title: "Buy bread",
            createdAt: new Date(),
            status: 1
        },
        {
            title: "Teach penguins to fly",
            createdAt: new Date(),
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
    let $fireImage = $("#fire");
    let $triangleImage = $("#triangle");
    let $smileImage = $("#smile");

    $('.selectpicker').selectpicker();

    function takeInputData(){
        var date = moment();
        var tmpObj = {
            title: $newTodo.val(),
            createdAt: date.format("DD-MM-YYYY"),
            status: 0
        };
        console.log(tmpObj.createdAt);
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

    $newTodo.on('keypress', event => {
        let keyCode = event.keyCode || event.which;
        if (keyCode == '13') {
            let newTodoItem = takeInputData();
            todosList.push(newTodoItem);
            todoCount(todosList);
            todoRenderItem(newTodoItem);
            $newTodo.val('');
        }
    });

    $fireImage.on('click', event => {
        $(event.currentTarget).css('backgroundColor', '#FF8DA1');
    })


});
