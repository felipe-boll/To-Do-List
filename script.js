const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const taskCounter = document.getElementById('task-counter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateCounter() {
    const pendingTasks = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = pendingTasks;
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        
        if (task.completed) {
            taskText.classList.add('completed');
        }

        taskText.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveToLocalStorage();
            renderTasks();
            updateCounter();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveToLocalStorage();
            renderTasks();
            updateCounter();
        });

        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    updateCounter();
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === '') {
        alert('Por favor, digite uma tarefa antes de adicionar!');
        return;
    }

    const newTask = {
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();
    
    taskInput.value = '';
    taskInput.focus();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

renderTasks();