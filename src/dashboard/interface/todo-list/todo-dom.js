

export function createTodoSet(target, title) {

    //container
    const todoContainer = document.createElement('div')
    todoContainer.classList.add('todoContainer')

    const todoHeader = document.createElement('section')
    todoHeader.classList.add('todoHeader')
    //header and close
    const todoText = document.createElement('h1')
    todoText.classList.add('todoText');
    todoText.textContent = 'title'
    const todoClose = document.createElement('i') //delete todoContainer with preconfirm
    todoClose.className = 'bx bx-minus todoClose dark-hover-active'

    todoHeader.appendChild(todoText)
    todoHeader.appendChild(todoClose)

    //where todo items will be inserted
    const todoItemContainer = document.createElement('div')

    //adds new todo items
    const todoButton = document.createElement('button')
    todoButton.className = 'todoButton dark-hover-active'
    const plus = document.createElement('i');
    plus.className = 'bx bx-plus text-xl';
    todoButton.appendChild(plus)
    todoButton.textContent = 'New Task'

    todoButton.addEventListener('click', () => {
        createTodoItem(todoItemContainer);
    })

    todoContainer.appendChild(todoHeader)
    todoContainer.appendChild(todoItemContainer)
    todoContainer.appendChild(todoButton)

    target.appendChild(todoContainer)
    //todo item

}
export function createTodoItem(target) {
    //sweet alert

    //return item and duedate object
    const item = 'sample title'
    const dueDate = 'sample due date'
    //pass in dom creation
    const todoItem = document.createElement('section')
    todoItem.classList.add('todoItem')

    //task name
    const todoItemSection = document.createElement('section')
    todoItemSection.classList.add('todoItemSection')
    const todoItemText = document.createElement('h1')
    todoItemText.classList.add('todoItemText');
    todoItemText.textContent = item;
    //due date
    const todoDate = document.createElement('h1')
    todoDate.classList.add('todoDate');
    todoDate.textContent = dueDate

    //delete button
    const todoDelete = document.createElement('i')
    todoDelete.className = 'bx bx-trash todoDelete'
    todoDelete.addEventListener('click', () => {
        //remove to dom
        todoItem.remove()
        //remove to todoObject
        //remove firestore
    })

    todoItemSection.appendChild(todoItemText)
    todoItemSection.appendChild(todoDate)
    todoItem.appendChild(todoItemSection)
    todoItem.appendChild(todoDelete)

    //append to targer
    target.appendChild(todoItem);


}