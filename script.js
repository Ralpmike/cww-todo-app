let todoListContainer = document.querySelector(".todo-list")
let todo = document.getElementById("todo")
let date = document.getElementById("date")
let time = document.getElementById("time")



let todoList = JSON.parse(localStorage.getItem("todoList")) || []
let isEditing = false
let editedTodoId = null


// Handle Submit  function

const handleSubmit = (event) => {
  event.preventDefault()
  // debugger

  if (isEditing) {
    const updatedTodoData = {
      todo: todo.value,
      datevalue: date.value,
      timevalue: time.value,
      isCompleted: false
    }
    todoList = todoList.map((todo, index) => {
      return (
        editedTodoId === index ? { ...todo, ...updatedTodoData } : todo
      )
    })
    isEditing = false
    editedTodoId = null
    todoAppList()
    todoStorage()
  }

  else{
    const todoData = {
      todo: todo.value,
      datevalue: date.value,
      timevalue: time.value,
      isCompleted: false
    }
    todoList.push(todoData)
    todoAppList()
    todoStorage()
  }
  event.target.reset()
}


// Todo App List UI
function todoAppList() {

  todoListContainer.innerHTML = "";

  todoList.map((todo, index) => {
    return (
      todoListContainer.innerHTML += `
<div class="todo-task" id=${index} style="text-decoration: ${todo.isCompleted ? 'line-through' : 'none'}">
    <h4 class="task">Task: ${todo.todo}</h4>
    <h4 class="todo-date">Date: ${todo.datevalue}</h4>
    <h4 class="todo-time">Time: ${todo.timevalue}</h4>
  <div class="todo-action">
      <button class="delete-btn" onclick="deleteTodo(${index})">
        Delete
      </button>
      <button class="edit-btn" onclick =" editTodo(${index})">
        Edit
      </button>
      <button class="complete-btn" onclick =" completeTodo(${index})">
        Complete
      </button>
  </div>
</div>
`
    )
  })
 
}
todoAppList()

const deleteTodo = (todoIndex) => {
  todoList = todoList.filter((_, index) => {
    return index !== todoIndex
  })
  todoAppList()
  todoStorage()
}


const editTodo = (editedIndex) => {
  todo.value = todoList[editedIndex].todo
  date.value = todoList[editedIndex].datevalue
  time.value = todoList[editedIndex].timevalue
  isEditing = true
  editedTodoId = editedIndex


}



const completeTodo = (todoIndex) => {
  todoList = todoList.map((todo, index) => {
    if(todo.isCompleted === true){
      return( index === todoIndex ? {...todo, isCompleted: false} : todo)
    }
    else{
      return( index === todoIndex ? {...todo, isCompleted: true} : todo)
    }
   
  })
  todoAppList()
  todoStorage()


}


function todoStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList))
}