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

function addTask(value) {
    let currentInput;
    let currentContainer;
    
    if (value === 'todo') {
        currentInput = inputToDo;
        currentContainer = containerToDo;
    } else if (value === 'in-progress') {
        currentInput = inputInProgress;
        currentContainer = containerInProgress;
    } else if (value === 'review') {
        currentInput = inputReview;
        currentContainer = containerReview;
    } else if (value === 'done') {
        currentInput = inputDone;
        currentContainer = containerDone;
    } else {
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

    newTask.classList.add('task-item');
    
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
    })
    containerInProgress.addEventListener('drop', (event) => {
        event.preventDefault();
        containerInProgress.appendChild(draggableTask);
    })
    containerReview.addEventListener('drop', (event) => {
        event.preventDefault();
        containerReview.appendChild(draggableTask);
    })
    containerDone.addEventListener('drop', (event) => {
        event.preventDefault();
        containerDone.appendChild(draggableTask);
    })


    newTask.addEventListener('dragend', () => {
        draggableTask = null;
    })

    newTask.textContent = taskText;

    buttons.classList.add('task-buttons');

    editButton.classList.add('edit-button');
    editButton.type = 'button';
    editButton.textContent = '✎';

    deleteButton.classList.add('delete-button');
    deleteButton.type = 'button';
    deleteButton.textContent = '✕';

    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);
    newTask.appendChild(buttons);
    currentContainer.appendChild(newTask);

    
    deleteButton.addEventListener('click', () => {
        newTask.remove();
    })

    editButton.addEventListener('click', () => {
        let editInput = prompt('Изменение задачи на:');
        if (editInput.trim() !== '' && editInput !== null) {
            newTask.firstChild.textContent = editInput;
        }
    })

    currentInput.value = '';
}