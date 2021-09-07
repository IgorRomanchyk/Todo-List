export const countTasksObject = {
    todoCount: 0,
    inProgressCount: 0,
    doneCount: 0,
    refreshCountTasksObject: function(status) {
      if(status===statusObject.toDoText) { //обнуляю счетчик в колонке
          countTasksObject.todoCount =  0;
      } else if (status===statusObject.inProgressText) {
          countTasksObject.inProgressCount = 0;
      } else if (status===statusObject.doneText){
          countTasksObject.doneCount = 0;
      }
    }

}