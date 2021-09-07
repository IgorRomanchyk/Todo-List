import {taskArray} from './script.js' 

export function changeTaskStatus(taskId, newStatus) {  //функция смены статуса, принимает объект и новый статус, изменяет объект в tasksArray
    taskArray.find((item) => {
        if (item.id == taskId) {
            item.status = newStatus
        }
    });
}