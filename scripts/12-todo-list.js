let todoList = JSON.parse(localStorage.getItem('toDo'))||[{
    name:'make dinner', 
    dueDate: '2022-12-22'}, {
        name:'wash dishes', 
        dueDate: '2022-12-22'}];

renderTodoList();

function renderTodoList () {
    let todoListHTML = ``;

    todoList.forEach((todoObject, index) => {
        // const todoObject = todoList[i]; is already a parameter so we don't really need it again
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
            <button class = "delete-todo-button js-delete-todo-button">Delete</button>`;
            todoListHTML += html;
        })
        
        document.querySelector('.js-todo-list').innerHTML = todoListHTML;
        
        document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                todoList.splice(index, 1);
                renderTodoList();
                saveToStorage();               
        });
    })

}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
    addToDo();
})
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
    saveToStorage();
}
function saveToStorage(){localStorage.setItem('toDo', JSON.stringify(todoList))};
//Note the storage code was referenced from one of my previous exercises. Exercise 11x.