import { countTasksObject } from "./script.js";

export function countAmountTasks(taskArray) {
  //Функция подсчёта количества тасков в колонках
  taskArray.forEach(function (itemTask) {
    if (itemTask.status === "TO DO") {
      countTasksObject.todoCount++;
    } else if (itemTask.status === "IN PROGRESS") {
      countTasksObject.inProgressCount++;
    } else if (itemTask.status === "DONE") {
      countTasksObject.doneCount++;
    }
  });
}

export function renderAmountTasks({ todoCount, inProgressCount, doneCount }) {
  const todoBox = document.querySelector(".todo__amount");
  const inProgress = document.querySelector(".in_progress__amount");
  const doneBox = document.querySelector(".done__amount");

  const todoInfo = document.createTextNode(todoCount);
  const inProgressInfo = document.createTextNode(inProgressCount);
  const doneInfo = document.createTextNode(doneCount);

  todoBox.append(todoInfo);
  inProgress.append(inProgressInfo);
  doneBox.append(doneInfo);
}

