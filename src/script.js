// to do (сделать)
// in progress (в работе)
// review (на проверке)
// done (готово)

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
    newTask.classList.add('task-item');
    newTask.textContent = taskText;

    currentContainer.appendChild(newTask);

    currentInput.value = '';
}