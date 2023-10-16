// Get tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task">
                <span class="${task.completed ? 'completed' : ''}" onclick="toggleComplete(${index})">${task.text}</span>
                <button class="edit-button" onclick="editTask(${index})">Edit</button>
                <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
            </div>
            <div class="edit-form" style="display:none;">
                <input type="text" id="editInput${index}" value="${task.text}">
                <button class="save-button" onclick="saveTask(${index})">Save</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
function addTask(event) {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        tasks.push({ text: taskInput.value, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Edit a task
function editTask(index) {
    const editForm = document.querySelector(`#editInput${index}`).parentNode;
    const taskText = editForm.previousElementSibling.querySelector('span');
    
    editForm.style.display = 'block';
    taskText.style.display = 'none';
}

// Save an edited task
function saveTask(index) {
    const editForm = document.querySelector(`#editInput${index}`).parentNode;
    const taskText = editForm.previousElementSibling.querySelector('span');
    
    tasks[index].text = document.querySelector(`#editInput${index}`).value;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    editForm.style.display = 'none';
    taskText.style.display = 'block';
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Initial render
renderTasks();
