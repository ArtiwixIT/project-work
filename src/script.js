const buttonToDo = document.getElementById('add-todo-btn');
const buttonInProgress = document.getElementById('add-in-progress-btn');
const buttonReview = document.getElementById('add-review-btn');
const buttonDone = document.getElementById('add-done-btn');

const inputToDo = document.querySelector('#to-do .task-input');
const inputInProgress = document.querySelector('#in-progress .task-input');
const inputReview = document.querySelector('#review .task-input');
const inputDone = document.querySelector('#done .task-input');


const containerToDo = document.getElementById('task-todo');
const containerInProgress = document.getElementById('task-in-progress');
const containerReview = document.getElementById('task-review');
const containerDone = document.getElementById('task-done');

let draggableTask = null;

buttonToDo.addEventListener('click', () => {
  addTask('todo');
});

buttonInProgress.addEventListener('click', () => {
  addTask('in-progress');
});

buttonReview.addEventListener('click', () => {
  addTask('review');
});

buttonDone.addEventListener('click', () => {
  addTask('done');
});

function loadTasks(task) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks !== null) {
        savedTasks.forEach(task => {
            renderTask(task);    
        })
    }
}

loadTasks();

function renderTask(task) {
    const columnElement = document.getElementById('task-' + task.column);
    if (!columnElement) {
        return;
    }

    const newTask = document.createElement('div');
    const buttons = document.createElement('div');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');

    newTask.id = task.id;

    newTask.classList.add('task-item');
    buttons.classList.add('task-buttons');
    editButton.classList.add('edit-button');
    deleteButton.classList.add('delete-button');

    newTask.textContent = task.text;
    editButton.textContent = '✎';
    deleteButton.textContent = '✕';

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    newTask.appendChild(buttons);
    columnElement.appendChild(newTask);

    editTask(editButton, newTask);
    deleteTask(deleteButton, newTask);
    dragAndDrop(newTask);
}

function addTask(value) {
    let currentInput;
    let currentContainer;
    
    switch (value) {
        case 'todo':
            currentInput = inputToDo;
            currentContainer = containerToDo;
            break;
        case 'in-progress':
            currentInput = inputInProgress;
            currentContainer = containerInProgress;
            break;
        case 'review':
            currentInput = inputReview;
            currentContainer = containerReview;
            break;
        case 'done':
            currentInput = inputDone;
            currentContainer = containerDone;
            break;
        default:
            alert('Что-то пошло не так');
            return;
    }

    const taskText = currentInput.value;
    if (taskText === '') {
        alert('Введите задачу');
        return;
    }

    const newTask = document.createElement('div');
    const buttons = document.createElement('div');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');

    newTask.id = crypto.randomUUID();

    newTask.classList.add('task-item');
    buttons.classList.add('task-buttons');
    editButton.classList.add('edit-button');
    deleteButton.classList.add('delete-button');

    newTask.textContent = taskText;
    editButton.textContent = '✎';
    deleteButton.textContent = '✕';

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    newTask.appendChild(buttons);
    currentContainer.appendChild(newTask);
    
    editTask(editButton, newTask);
    deleteTask(deleteButton, newTask);
    dragAndDrop(newTask);
    saveTask(taskText, value, newTask.id);

    currentInput.value = '';
}

function saveTask(taskText, value, id) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks === null) {
        savedTasks = [];
    }
    
    const task = {
        id: id,
        text: taskText,
        column: value
    }

    savedTasks.push(task);
    
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function editTask(editButton, newTask) {
    editButton.addEventListener('click', () => {
        let editInput = prompt('Изменение задачи на:', newTask.firstChild.textContent);
        if (editInput.trim() !== '' && editInput !== null) {
            newTask.firstChild.textContent = editInput;
            
            const savedTasks = JSON.parse(localStorage.getItem('tasks'));

            savedTasks.forEach(task => {
                if (newTask.id === task.id) {
                    task.text = editInput;
                }
            });
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        }
    })
}

function deleteTask(deleteButton, newTask) {
    deleteButton.addEventListener('click', () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));

        const warning = confirm("Удалить сообщение?");
        if (warning) {
            newTask.remove();
            savedTasks.forEach((task, index) => {
                if (newTask.id === task.id) {
                    savedTasks.splice(index, 1);
                }
            });
        }
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    })
}

function dragAndDrop(newTask) {
    newTask.draggable = true;

    newTask.addEventListener('dragstart', () => {
        draggableTask = newTask;
    });

    containerToDo.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    containerInProgress.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    containerReview.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    containerDone.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    containerToDo.addEventListener('drop', (event) => {
        event.preventDefault();
        containerToDo.appendChild(draggableTask);
        
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        
        savedTasks.forEach(task => {
            if (draggableTask.id === task.id) {
                task.column = "todo";
            }
        });
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    })
    containerInProgress.addEventListener('drop', (event) => {
        event.preventDefault();
        containerInProgress.appendChild(draggableTask);
        
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        
        savedTasks.forEach(task => {
            if (draggableTask.id === task.id) {
                task.column = "in-progress";
            }
        });
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    })
    containerReview.addEventListener('drop', (event) => {
        event.preventDefault();
        containerReview.appendChild(draggableTask);
        
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        
        savedTasks.forEach(task => {
            if (draggableTask.id === task.id) {
                task.column = "review";
            }
        });
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    })
    containerDone.addEventListener('drop', (event) => {
        event.preventDefault();
        containerDone.appendChild(draggableTask);
        
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        
        savedTasks.forEach(task => {
            if (draggableTask.id === task.id) {
                task.column = "done";
            }
        });
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    })

    newTask.addEventListener('dragend', () => {
        draggableTask = null;
    })
}