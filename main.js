$(document).ready(function() {
    let todosList = [
        {
            id: 1,
            title: "FUCK EVERYONE WHO WILL READ THIS!!!",
            createdAt: 1532177360,
            priority: 0,
            status: 0
        },
        {
            id: 2,
            title: "Teach penguins to fly",
            createdAt: 1542017360,
            priority: 2,
            status: 1
        },
        {
            id: 3,
            title: "Take out the trash",
            createdAt: 1551177360,
            priority: 0,
            status: 0
        },
        {
            id: 4,
            title: "Buy bread",
            createdAt: 1451177360,
            priority: 1,
            status: 0
        },
    ];
    /*about priority
    * 0 - low
    * 1 - middle
    * 2 - high
    *
    * about status
    * 0 - in progress
    * 1 - done*/


    let $newTodo = $("#newTodo");
    let $sortable = $("#sortable");
    let $doneItems = $("#done-items");
    let $todoCount = $("#count-todos");
    let $todoPriority = $("#pr-select");
    let $sortSel = $("#sortSelect");
    let $editTodo = $("#editTodoModal");
    let $modalBody = $(".modal-body");
    let iter = 5;
    let editingTodo = null;

    $('.selectpicker').selectpicker();

    function takeInputData(){
        var date = moment();
        var tmpObj = {
            id: iter,
            title: $newTodo.val(),
            createdAt: date.unix(),
            priority: parseInt($todoPriority.val()),
            status: 0
        };
        iter += 1;
        return tmpObj;
    }

    function todoRenderItem(todo) {
        let priorityClass = '';

        switch (todo.priority) {
            case 2:
                priorityClass = 'high-priority';
                break;
            case 1:
                priorityClass = 'middle-priority';
                break;
            case 0:
                priorityClass = 'low-priority';
                break;
        }

        let render = `<li data-id="${todo.id}" class='ui-state-default ${priorityClass}'> 
                <p>${todo.title} ${moment.unix(todo.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                <button type="button" data-id="${todo.id}" class="btn btn-outline-info btn-sm edit-btn">edit</button>
                </li>`;
        $sortable.append(render);
    }

    function doneTodoRenderItem(todo) {
        let render = `<li data-id = "${todo.id}">
            ${todo.title} ${moment.unix(todo.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </li>`;
        $doneItems.append(render);
    }

    function editTodoModalRender() {
        let $rendered = $(`<div><label class="col-form-label">Edit your Todo</label>
                    <input type="text" class="form-control editing-todo-title" value="${editingTodo.title}" id="insertedTodo">
                    <label class="col-form-label">Edit priority:</label>
                        <select id="editing-todo-priority" class="selectpicker editing-todo-priority">
                            <option value="-1" ${editingTodo.priority === -1 ? "selected" : ''}>None</option>
                            <option value="2" ${editingTodo.priority === 2 ? "selected" : ''}>High</option>
                            <option value="1" ${editingTodo.priority === 1 ? "selected" : ''}>Medium</option>
                            <option value="0" ${editingTodo.priority === 0 ? "selected" : ''}>Low</option>
                        </select></div>`);

        $rendered.find('.selectpicker').selectpicker();

        $modalBody.html($rendered);
    }

    function todoCount(todosList) {
        let tmpTodoCount = 0;
        $.each(todosList, function () {
            if (this.status === 0)
                tmpTodoCount += 1;
        });
        $todoCount.text(tmpTodoCount);
    }

    function todoRenderList(todos) {
        $.each(todos, function () {
            if (this.status === 1)
                return true;
            todoRenderItem(this);
        });
    }
    
    function doneTodoRenderList(todos) {
        $.each(todos, function () {
            if (this.status === 0)
                return true;
            doneTodoRenderItem(this);
        })
    }

    function renderApp() {
        $sortable.empty();
        $doneItems.empty();
        todoCount(todosList);
        todoRenderList(todosList);
        doneTodoRenderList(todosList);
    }


    function comparePriority(a,b) {
        return b.priority - a.priority;
    }

    function compareDate(a,b) {
        return b.createdAt - a.createdAt;
    }

    function findTodo(id) {
        let result = null;

        todosList.some((item) => {
            if (item.id === id){
                result = item;
                return true;
            }
        });

        return result;
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

    $sortSel.on('change', event => {
        if ($sortSel.val() == 'priority') {
            todosList = todosList.sort(comparePriority);
        } else {
            todosList = todosList.sort(compareDate);
        }
        renderApp();
    });

    $('#sortable').on('click', "li.ui-state-default", (event) => {
        let id = parseInt($(event.currentTarget).data("id"));

        findTodo(id).status = 1;

        renderApp();
    });

    $('#sortable').on('click', '.edit-btn', event => {
        let id = parseInt($(event.currentTarget).data('id'));

        event.stopPropagation();
        $("#editTodoModal").modal();

        editingTodo = findTodo(id);
        editTodoModalRender();
    });

    $('.save-edit-todo').click(function() {
        editingTodo.title = $('.editing-todo-title').val();
        editingTodo.priority = parseInt($('#editing-todo-priority').val());
        console.log(editingTodo);
        $("#editTodoModal").modal('hide');
        renderApp();
    });

    renderApp();
});
