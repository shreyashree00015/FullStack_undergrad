const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const filterButtons = document.getElementById('filter-buttons');
const clearCompletedButton = document.getElementById('clearCompleted');
const popup = document.getElementById('popup');
let tasks = [];

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const taskDueDate = document.getElementById('taskDueDate').value;

    if (taskDescription === '') {
        alert('Task description cannot be empty!');
        return;
    }

    const newTask = {
        id: Date.now(),
        description: taskDescription,
        dueDate: taskDueDate,
        completed: false
    };

    tasks.push(newTask);
    renderTasks(tasks);
    taskForm.reset();
});

taskList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        const taskId = parseInt(event.target.dataset.id);
        tasks = tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
        renderTasks(tasks);
        checkAllTasksCompleted();
    } else if (event.target.tagName === 'BUTTON') {
        const taskId = parseInt(event.target.parentElement.dataset.id);
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks(tasks);
        checkAllTasksCompleted();
    }
});

clearCompletedButton.addEventListener('click', function() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks(tasks);
    checkAllTasksCompleted();
});

filterButtons.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const filter = event.target.id;
        if (filter === 'all') {
            renderTasks(tasks);
        } else if (filter === 'active') {
            renderTasks(tasks.filter(task => !task.completed));
        } else if (filter === 'completed') {
            renderTasks(tasks.filter(task => task.completed));
        }
    }
});

function renderTasks(tasksToRender) {
    taskList.innerHTML = '';
    tasksToRender.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.dataset.id = task.id;
        taskItem.textContent = `${task.description} - Due: ${task.dueDate}`;
        if (task.completed) {
            taskItem.style.textDecoration = 'line-through';
        }
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

function checkAllTasksCompleted() {
    const allTasks = document.querySelectorAll('#taskList li');
    const completedTasks = document.querySelectorAll('#taskList li[style*="line-through"]');

    if (allTasks.length > 0 && allTasks.length === completedTasks.length) {
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 1200);  // Close popup after 3 seconds
    } else {
        popup.style.display = 'none';
    }
}
