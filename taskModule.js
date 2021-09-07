import { changeTaskStatus } from './changeTaskStatus.js';
import { renderSortedTasks } from './renderTasks.js';
import { renderAmountTasks, countAmountTasks } from "./countAmountTasks.js";
import { 
    taskArray,
    statusObject,
    cleanAllTask, 
    countTasksObject, 
    writeTasksToLocalStorage,
    addNewTaskToTaskArray 
} from './script.js';

export const createNewTask = () => {
    return {
        title: document.getElementById('task_name').value,
        creator: document.getElementById('creator').value,
        performer: document.getElementById('performer').value,
        creationDate: getTaskCreationDate(),
        status: statusObject.toDoText,
        comment: document.getElementById('modal-text__area').value
    }
}

export const changeTaskStatusHandler = (e) => {
    e.preventDefault();

    const taskId = e.target.parentElement.parentElement.id;
    const taskStatus = e.target.value;
    changeTask(taskId, taskStatus);
}

export const dropTask = (e, taskStatus) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");
    changeTask(taskId, taskStatus);
}

export const startTaskDrag = (e) => {
    e.dataTransfer.setData("taskId", e.target.id);
}

export const focusTask = (e) => {
    e.target.style.boxShadow = "3px 3px 3px grey";
}

export const unfocusTask = (e) => {
    e.target.style.removeProperty('box-shadow');
}

const changeTask = (taskId, taskStatus) => {
    if (taskStatus === statusObject.doneText) {
        taskArray.forEach(item => {
            item.comment = '';
        })
    }

    if (taskStatus === statusObject.inProgressText && countTasksObject.inProgressCount > 4) {
        const inprogressTooMuchElem = document.querySelector('.inprogress-too-much-elem');
        inprogressTooMuchElem.style.display = 'block';
    } else {
        changeTaskStatus(taskId, taskStatus);
    }
    
    writeTasksToLocalStorage();

    cleanAllTask();
    renderSortedTasks(taskArray);
    
    countTasksObject.cleanAllCounters();
    countAmountTasks(taskArray);
    renderAmountTasks(countTasksObject);
}

  const getTaskCreationDate = () => {
    const date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); 
    let year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

export const validateForm = (e) => {
    const alertNode = document.getElementById('alert');
    const title = document.getElementById('task_name').value;
    const creator = document.getElementById('creator').value;
    const modal = document.getElementById('modal-todo');
    if (title && creator!=='Name Surname'){
        addNewTaskToTaskArray(e);
        modal.style.display = 'none';
    } else {
        alertNode.style.display = 'block';
        setTimeout(() => { 
            alertNode.style.display = 'none'; 
        }, 2000);
    }
}