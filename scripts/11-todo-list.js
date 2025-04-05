const todoList = [{
    name:'make dinner', 
    dueDate: '2022-12-22'}, {
        name:'wash dishes', 
        dueDate: '2022-12-22'}];

// renderTodoList();

function renderTodoList () {
    let todoListHTML = ``;

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        // const name = todoObject.name;
        // const dueDate = todoObject.dueDate;
        // This s the destructuring syntax, this is used when the variable name the object is being stored to and the property name is the same. You can see more about it in the note concerning this topic.
        const { name, dueDate } = todoObject; 
        const html = `
            <div>
                ${name}
            </div>
            
            <div>
                ${dueDate}
            </div> 
            <button onclick = "
                todoList.splice(${i}, 1);
                renderTodoList();
            " class = "delete-todo-button">Delete</button>`;
        todoListHTML += html;
    }
    // console.log(todoListHTML);

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addToDo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;
    // console.log(name);
    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    todoList.push({
        // name: name,
        // dueDate: dueDate
        // This is the shorthand property syntax, this is when the property name and the value name is the same. You can see more about it in the note concerning this topic.
        name,
        dueDate

    });
    // console.log(todoList);

    inputElement.value = '';

    renderTodoList();
}