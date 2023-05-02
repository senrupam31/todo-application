var todoList = document.getElementById('todo-list')
var editTodoModal = document.getElementById('edit-todo-modal')
var addTodoModal = document.getElementById('add-todo-modal')
var completedTodoList = document.getElementById('completed-todo-list')

// Open the first tab by default
document.getElementById("tab1").style.display = "block";
document.getElementsByClassName("tab")[0].classList.add("active");

function openTab(evt, tabName) {
  // Hide all tab content
  var tabContent = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Remove 'active' class from all tabs
  var tabs = document.getElementsByClassName("tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  // Show the selected tab content
  document.getElementById(tabName).style.display = "block";

  // Add the 'active' class to the clicked tab
  evt.currentTarget.classList.add("active");
}

// Variable to keep track of the currently edited todo item
var editedTodoItem = null

// Function to open the add modal
function openAddModal() {
	addTodoModal.style.display = 'block'
}

// Function to close the add modal
function closeAddModal() {
	addTodoModal.style.display = 'none'
}

// Function to handle addTodo
function addTodo() {
	var addTodoTitle = document.getElementById('add-todo-input__title')
	var addTodoDesc = document.getElementById('add-todo-input__desc')
	
	if (addTodoTitle.value !== '') {
		var todoItem = createTodoItem(addTodoTitle.value, addTodoDesc.value)
		todoList.appendChild(todoItem)
		addTodoTitle.value = ''
		addTodoDesc.value = ''
	}
	closeAddModal()
}

// Function to create a new todo item
function createTodoItem(text, desc) {
	var todoItem = document.createElement('li')
	todoItem.className = 'todo-item'

	var checkbox = document.createElement('div')
	checkbox.className = 'checkbox'
	checkbox.addEventListener('click', toggleTodo)

	var span = document.createElement('span')
	span.textContent = text

  var descSpan = document.createElement('span')
	descSpan.textContent = desc


	var editButton = document.createElement('button')
	editButton.innerHTML = `<img src='./images/edit.png' class='modal-icon edit-icon'/>`
	editButton.addEventListener('click', editTodo)
	
	var deleteButton = document.createElement('button')
	deleteButton.innerHTML = `<img src='./images/delete.png' class='modal-icon delete-icon'/>`
	deleteButton.addEventListener('click', deleteTodo)

	todoItem.appendChild(checkbox)
	todoItem.appendChild(span)
  todoItem.appendChild(descSpan)
	todoItem.appendChild(editButton)
	todoItem.appendChild(deleteButton)

	return todoItem
}

// Function to edit a todo
function editTodo() {
	var todoItem = this.parentNode
	openEditModal(todoItem)
}

// Function to open the edit modal
function openEditModal(todoItem) {
	var editTodoInput = document.getElementById('edit-todo-input__title')
	var editTodoInputDesc = document.getElementById('edit-todo-input__desc')
	editTodoInput.value = todoItem.querySelectorAll('span')[0].textContent
  editTodoInputDesc.value = todoItem.querySelectorAll('span')[1].textContent
	editTodoModal.style.display = 'block'
	editedTodoItem = todoItem
}

// Function to close the edit modal
function closeEditModal() {
	editTodoModal.style.display = 'none'
	editedTodoItem = null
}

// Function to save the edited todo
function saveEditedTodo() {
	var editTodoInput = document.getElementById('edit-todo-input__title')
	var editTodoInputDesc = document.getElementById('edit-todo-input__desc')
	var newText = editTodoInput.value.trim()
  var newDesc = editTodoInputDesc.value.trim()
	if (newText !== '' && newDesc !== '') {
		editedTodoItem.querySelectorAll('span')[0].textContent = newText
		editedTodoItem.querySelectorAll('span')[1].textContent = newDesc
	}
	closeEditModal()
}

// Function to toggle the completed status of a todo
function toggleTodo() {
	var todoItem = this.parentNode
	if (todoItem.classList.contains('completed')) {
		todoList.appendChild(todoItem)
	} else {
		completedTodoList.appendChild(todoItem)
	}
	todoItem.classList.toggle('completed')
	todoItem.firstElementChild.classList.toggle('checked')
}

// Function to delete a todo
function deleteTodo() {
	var todoItem = this.parentNode
	if (todoItem.classList.contains('completed')) {
		completedTodoList.removeChild(todoItem)
	} else {
		todoList.removeChild(todoItem)
	}
}
