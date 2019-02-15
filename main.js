$(function() {
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

    let objList = () => {
        return listOfTodos;
    };

    function takeInputData(){
        let tmp = {
            title: $("#newTodo").val(),
            createdAt: new Date().getTime(),
            status: 0
        };
        listOfTodos.push(tmp);
    }

    function pushDataOnPage(todoList) {
        $.each(todoList, (key, value) => {
            $("#sortable").prepend(`<li class='ui-state-default'>
    <div class='checkbox'>
        <label>
            <input type="checkbox" value="" />${value.text}
        </label>
    </div>
</li>`)
        })
    }

    $("#newTodo").onkeypress(function (event) {
        if (event.which === '13'){

        }
    })
});



console.log(objList());
