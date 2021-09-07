import { renderAmountTasks, countAmountTasks } from "./countAmountTasks.js"; //Функция отрисовки количества тасков в каждом из 3 блоков
import { renderSortedTasks } from "./renderTasks.js"; //Функция отрисовки тасков
import { closeModalWindow } from "./closeModalWindow.js"; // Функция закрытия модальных окон
import {createNewTask, validateForm, dropTask} from './taskModule.js' //Функция добавления таска по нажатию ОК в toDo

export const statusObject = {
  toDoText: "TO DO",
  inProgressText: "IN PROGRESS",
  doneText: "DONE",
};

document.getElementById("task-to-do-delete").onclick = function () {
  checkDeleteAllInProgressBlock(statusObject.toDoText);
};
document.getElementById("task-in-progress-delete").onclick = function () {
  checkDeleteAllInProgressBlock(statusObject.inProgressText);
};
document.getElementById("task-done-delete").onclick = function () {
  checkDeleteAllInProgressBlock(statusObject.doneText);
};
document.getElementById("delete-task-ok").onclick = function () {
  deleteAllTasksInBlock(statusObject.inProgressText);
};

let toDoTasksBlock = document.getElementById("to_do_tasks");
let taskInProgressBlock = document.getElementById("task-in-progress-wrapper");
let doneTaskBlock = document.getElementById("task-done-wrapper");
let amountNodeList = document.getElementsByClassName("block-item__amount");

let userName = "Leanne Graham";

export let taskArray = [
  {
    id: 1,
    title: "Task 1",
    creator: userName,
    performer: userName,
    creationDate: "23.03.2021",
    status: "TO DO",
    comment: "Comment 1 task",
  },
  {
    id: 2,
    title: "Task 2",
    creator: userName,
    performer: userName,
    creationDate: "27.03.2021",
    status: "IN PROGRESS",
    comment: "Comment 2 task",
  },
  {
    id: 3,
    title: "Task 3",
    creator: userName,
    performer: userName,
    creationDate: "04.03.2021",
    status: "TO DO",
    comment: "Comment 3 task",
  },
  {
    id: 4,
    title: "Task 4",
    creator: userName,
    performer: userName,
    creationDate: "07.03.2021",
    status: "DONE",
    comment: "Comment 4 task",
  },
  {
    id: 5,
    title: "Task 5",
    creator: userName,
    performer: userName,
    creationDate: "07.03.2021",
    status: "DONE",
    comment: "Comment 5 task",
  },
  {
    id: 6,
    title: "Task 6",
    creator: userName,
    performer: userName,
    creationDate: "07.03.2021",
    status: "IN PROGRESS",
    comment: "Comment 6 task",
  },
];

export const countTasksObject = {
  todoCount: 0,
  inProgressCount: 0,
  doneCount: 0,
  refresh: function (status) {
    if (status === statusObject.toDoText) {
      //обнуляю счетчик в колонке
      this.todoCount = 0;
    } else if (status === statusObject.inProgressText) {
      this.inProgressCount = 0;
    } else if (status === statusObject.doneText) {
      this.doneCount = 0;
    }
  },
  minus: function (status) {
    if (status === statusObject.toDoText) {
      //обнуляю счетчик в колонке
      this.todoCount--;
    } else if (status === statusObject.inProgressText) {
      this.inProgressCount--;
    } else if (status === statusObject.doneText) {
      this.doneCount--;
    }
  },
  cleanAllCounters: function() {
    this.todoCount = 0;
    this.inProgressCount = 0;
    this.doneCount = 0;
  },
};

let userList = [];

window.onload = function () {
  checkTasksInLocalStorage();
  renderSortedTasks(taskArray);
  writeTasksToLocalStorage();
  closeModalWindow();
  countAmountTasks(taskArray);
  renderAmountTasks(countTasksObject);
  addUsersToSelect();
};

export const writeTasksToLocalStorage = () => {
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
};

const getTasksFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("taskArray"));
};

const checkTasksInLocalStorage = () => {
  if (getTasksFromLocalStorage()) taskArray = getTasksFromLocalStorage();
};

function checkDeleteAllInProgressBlock(status) {
  //функция проверяет статус и выводит форму подтверждения для "in progress"
  if (status === statusObject.inProgressText) {
    document.getElementById("modal__text-delete-task").style.display = "flex";
  } else {
    deleteAllTasksInBlock(status);
  }
}

function deleteAllTasksInBlock(status) {
  //функция очистки тасков в определенном блоке (фактически визуальный снос всего с последующей отрисовкой оставшегося)
  taskArray = taskArray.filter(function (itemTask) {
    return itemTask.status != status;
  });
  countTasksObject.refresh(status); //обнуляю счетчик в колонке
  document.getElementById("modal__text-delete-task").style.display = "none"; //скрываю модальное окно
  cleanAllTask(); //очищаю все таски
  writeTasksToLocalStorage(); //перезаписываю локалсторедж
  renderAmountTasks(countTasksObject); //отрисовываю кол-во тасков
  renderSortedTasks(taskArray); //рисую
}

export function cleanAllTask() {
  //функция визуальной очистки всех-всех тасков + удаление отрисованных счетчиков
  while (toDoTasksBlock.firstChild) {
    toDoTasksBlock.removeChild(toDoTasksBlock.firstChild);
  }
  while (taskInProgressBlock.firstChild) {
    taskInProgressBlock.removeChild(taskInProgressBlock.firstChild);
  }
  while (doneTaskBlock.firstChild) {
    doneTaskBlock.removeChild(doneTaskBlock.firstChild);
  }
  cleanNodeCounter();
}

function cleanNodeCounter() {
  for (let i = 0; i < amountNodeList.length; i++) {
    // функция очистки отрисованных счетчиков
    amountNodeList[i].textContent = null;
  }
}

//функция удаления таска
const taskInProgressWrapper = document.getElementById(
  "task-in-progress-wrapper"
);
const toDoTasks = document.getElementById("to_do_tasks");
const taskDoneWrapper = document.getElementById("task-done-wrapper");

const deleteTaskInProgress = (event) => {
  if (event.target.classList.contains("far", "fa-trash-alt")) {
    let task = event.target.closest(".task");
    let taskInfo = taskArray.find((item) => {
      return task.id == item.id;
    }); //получаю статус таска
    const inprogressDelete = document.querySelector(".inprogress-delete-task");
    if (taskInfo.status == statusObject.nProgressText) {
      cleanNodeCounter(); // убираю отрисованные счетчики тасков
      countTasksObject.minus(taskInfo.status); //вычетаю из счетчика единицу
      renderAmountTasks(countTasksObject); //отрисовываю кол-во тасков
    }
    inprogressDelete.style.display = "block";
    const btnOk = document.querySelector("#delete-task");
    btnOk.onclick = function () {
      //событие по клику
      cleanNodeCounter(); // убираю отрисованные счетчики тасков
      countTasksObject.minus(taskInfo.status); //вычетаю из счетчика единицу
      renderAmountTasks(countTasksObject); //отрисовываю кол-во тасков
      inprogressDelete.style.display = "none";
      taskArray = getTasksFromLocalStorage();
      const result = taskArray.filter((taskArray) => taskArray.id != task.id);
      taskArray = result;
      writeTasksToLocalStorage();
      task.remove();
    };
  }
};

taskInProgressWrapper.addEventListener("click", deleteTaskInProgress);

taskInProgressWrapper.addEventListener("click", deleteTaskInProgress);

const deleteTaskIn = (event) => {
  if (event.target.classList.contains("far", "fa-trash-alt")) {
    let task = event.target.closest(".task");
    let taskInfo = taskArray.find((item) => {
      return task.id == item.id;
    }); //получаю статус таска

    taskArray = getTasksFromLocalStorage();
    const result = taskArray.filter((taskArray) => taskArray.id != task.id);
    taskArray = result;
    writeTasksToLocalStorage();
    task.remove();
    countTasksObject.minus(taskInfo.status); //обнуляю счетчик в колонке
    closeModalWindow();
    cleanNodeCounter(); // убираю отрисованные счетчики тасков
    renderAmountTasks(countTasksObject); //отрисовываю кол-во тасков
  }
};

toDoTasks.addEventListener("click", deleteTaskIn);
taskDoneWrapper.addEventListener("click", deleteTaskIn);

// Функция показа модального окна

const taskCreate = document.querySelector(".task__create");
const todo = document.querySelector(".todo");
const showModal = () => {
  clearCommentFromCreateTaskForm();
  todo.style.display = "block";
  document.querySelector(".modal-new__task").textContent = "New Task";
  const buttonOk = document.getElementById("create-task-button")
  buttonOk.onclick = function(e) {
    validateForm(e);
  }
};
taskCreate.addEventListener("click", showModal);


const addUsersToSelect = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((users) => {
      for (let user of users) {
        userList.push(user);
        const creator = document.getElementById("creator");
        const optionCreator = document.createElement("option");
        optionCreator.textContent = user.name;
        optionCreator.value = user.name;
        creator.append(optionCreator);

        const performer = document.getElementById("performer");
        const optionPerformer = document.createElement("option");
        optionPerformer.textContent = user.name;
        optionPerformer.value = user.name;
        performer.append(optionPerformer);
      }
    });
};

export const addNewTaskToTaskArray = (e) => {
    e.preventDefault();

  pushTaskToArray();
  writeTasksToLocalStorage();

  cleanAllTask();
  renderSortedTasks(taskArray);

  countTasksObject.cleanAllCounters();
  countAmountTasks(taskArray);
  renderAmountTasks(countTasksObject);

  clearCommentFromCreateTaskForm();
};

const pushTaskToArray = () => {
  let newTask = createNewTask();
  if (taskArray.length > 0) {
    newTask.id = taskArray[taskArray.length - 1].id + 1;
  } else {
    newTask.id = 1;
  }
  taskArray.push(newTask);
};

const clearCommentFromCreateTaskForm = () => {
  document.getElementById("task_name").value = "";
  document.getElementById("modal-text__area").value = "";
  document.getElementById("creator").value = "Name Surname";
  document.getElementById("performer").value = "Name Surname";
};


const editTask = (event) => {
  if (event.target.classList.contains("fas", "fa-pen")) {
    let task = event.target.closest(".task");
    document.querySelector(".modal-new__task").textContent = "Edit Task";
    
    let taskInfo = taskArray.find((item) => {
      return task.id == item.id;
    }); 
    
    const windowEdit = document.querySelector(".todo");

    windowEdit.style.display = "block";

    const taskEdit = (editTask) => {
      document.getElementById("task_name").value = editTask.title;
      document.getElementById("creator").value = editTask.creator;
      document.getElementById("performer").value = editTask.performer;
      document.getElementById("modal-text__area").value = editTask.comment;
    }

    taskEdit(taskInfo);

    const btnOk = document.getElementById("create-task-button");
    btnOk.onclick = function () {
      taskInfo.title = document.getElementById("task_name").value;
      taskInfo.comment = document.getElementById("modal-text__area").value;
      taskInfo.creator = document.getElementById("creator").value;
      taskInfo.performer = document.getElementById("performer").value;

      writeTasksToLocalStorage(taskArray);
      cleanAllTask();
      renderSortedTasks(taskArray);
      renderAmountTasks(countTasksObject); 
      windowEdit.style.display = "none";
    }
  }
};

document.addEventListener("dragover", (e) => e.preventDefault());

document.getElementById('to-do').addEventListener('drop', (e) => dropTask(e, statusObject.toDoText));
document.getElementById('in-progress').addEventListener('drop', (e) => dropTask(e, statusObject.inProgressText));
document.getElementById('done').addEventListener('drop', (e) => dropTask(e, statusObject.doneText));


toDoTasks.addEventListener("click", editTask);
