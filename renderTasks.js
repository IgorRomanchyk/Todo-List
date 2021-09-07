import { statusObject } from './script.js';
import { 
    focusTask, 
    unfocusTask,
    startTaskDrag,
    changeTaskStatusHandler
} from './taskModule.js';

export function renderSortedTasks(taskArray) { //функция отрисовки всех тасков в массиве
    taskArray.forEach(function(taskItem) { //перебираю все таски массива и, в зависимости от статуса, вызываю функцию, для отрисовки в нужном столбце
        let taskСontainer;

        if (taskItem.status === statusObject.toDoText) {
            taskСontainer = document.getElementById('to_do_tasks');
        } else if (taskItem.status === statusObject.inProgressText) {
            taskСontainer = document.getElementById('task-in-progress-wrapper');
        } else if (taskItem.status === statusObject.doneText) {
            taskСontainer = document.getElementById('task-done-wrapper');
        }

        renderTaskItem(taskСontainer, taskItem)
    });
}

function renderTaskItem(taskСontainer, taskItem) { //функция отрисовки ОДНОГО таска
    const divTask = document.createElement("div"); // блок для таска
    divTask.classList.add("task");
    divTask.id = taskItem.id;
    divTask.draggable = true;
    divTask.addEventListener('dragstart', (e) => startTaskDrag(e));
    divTask.addEventListener('mouseenter', (e) => focusTask(e));
    divTask.addEventListener('mouseleave', (e) => unfocusTask(e));

    const divTaskHeader = document.createElement("div"); // блок для хедера таска
    divTaskHeader.classList.add("task-header");

        const divTaskTitle = document.createElement("div"); // блок названия таска
        divTaskTitle.classList.add("task-header-name-wrapper");
            const spanTaskHeaderName = document.createElement("span"); // название таска
            spanTaskHeaderName.classList.add("task-header-name", "task-text");
            spanTaskHeaderName.textContent = taskItem.title;

        const divTaskHeaderIconsWrapper = document.createElement("div"); // блок для иконок
        divTaskHeaderIconsWrapper.classList.add("task-header-icons-wrapper");
            const iconEditTask = document.createElement("i");
            iconEditTask.classList.add("fas", "fa-pen", "task-header__icons");
            if (taskItem.status !== statusObject.toDoText){
                iconEditTask.style.display = 'none'
            }
            const iconDeleteTask = document.createElement("i");
            iconDeleteTask.classList.add("far", "fa-trash-alt", "task-header__icons");
            
    const divTaskInfo = document.createElement("div"); // блок для контента таска
    divTaskInfo.classList.add("task-info");

        const divTaskCreator = document.createElement("div"); //блок для инфы о постановщике
        divTaskCreator.classList.add("task-creator");
            const taskTextCreator = document.createElement("span");
            taskTextCreator.classList.add("task-text");
            taskTextCreator.textContent = "from: ";
            const taskTextCreatorName = document.createElement("span");
            taskTextCreatorName.classList.add("task-text");
            taskTextCreatorName.textContent = taskItem.creator;
            // taskTextCreatorName.textContent = taskItem.creator.name;

        const divTaskPerformer = document.createElement("div"); //блок для инфы о исполнителе
        divTaskPerformer.classList.add("task-performer");
            const taskTextPerformer = document.createElement("span");
            taskTextPerformer.classList.add("task-text");
            taskTextPerformer.textContent = "for: ";
            const taskPerformerName = document.createElement("span");
            taskPerformerName.classList.add("task-text");
            taskPerformerName.textContent = taskItem.performer;
            // taskPerformerName.textContent = taskItem.performer.name;
        
        const divTaskDateCreate = document.createElement("div"); //блок для инфы о дате
        divTaskDateCreate.classList.add("task-date-crate");
            const spanDateCreate = document.createElement("span");
            spanDateCreate.classList.add("task-text-date");
            spanDateCreate.textContent = taskItem.creationDate;

        const divTaskOption = document.createElement("div"); // блок для выпадающего списка
        divTaskOption.classList.add("task-option");
        const selectOption = document.createElement("select");
        selectOption.classList.add("task-select");
        selectOption.addEventListener('change', (e) => {
            changeTaskStatusHandler(e);
        })
            const optionToDo = document.createElement("option");
            optionToDo.textContent = "TO DO";
            const optionInProgress = document.createElement("option");
            optionInProgress.textContent = "IN PROGRESS";
            const optionDone = document.createElement("option");
            optionDone.textContent = "DONE";

            if (taskItem.status === statusObject.toDoText) {
                optionToDo.selected = "selected";
            } else if (taskItem.status === statusObject.inProgressText) {
                optionInProgress.selected = "selected";
            } else if (taskItem.status === statusObject.doneText) {
                optionDone.selected = "selected";
            }

    divTaskHeaderIconsWrapper.appendChild(iconEditTask);
    divTaskHeaderIconsWrapper.appendChild(iconDeleteTask);
    divTaskTitle.appendChild(spanTaskHeaderName);
    divTaskHeader.appendChild(divTaskTitle);
    divTaskHeader.appendChild(divTaskHeaderIconsWrapper);
    
    divTaskCreator.appendChild(taskTextCreator);
    divTaskCreator.appendChild(taskTextCreatorName);
    divTaskInfo.appendChild(divTaskCreator);

    divTaskPerformer.appendChild(taskTextPerformer);
    divTaskPerformer.appendChild(taskPerformerName);
    divTaskInfo.appendChild(divTaskPerformer);

    divTaskDateCreate.appendChild(spanDateCreate);
    divTaskInfo.appendChild(divTaskDateCreate);

    selectOption.appendChild(optionToDo);
    selectOption.appendChild(optionInProgress);
    selectOption.appendChild(optionDone);
    divTaskOption.appendChild(selectOption);
    
    divTask.appendChild(divTaskHeader);
    divTask.appendChild(divTaskInfo);
    divTask.appendChild(divTaskOption);

    taskСontainer.appendChild(divTask);
}