export const closeModalWindow = () => {
  let modalWindow = document.querySelectorAll(".modal");

  modalWindow.forEach((windowForClose) => {
    const closeBtn = windowForClose.querySelectorAll("[data-close]");
    closeBtn.forEach((el) => {
      el.addEventListener("click", () => {
        if (el.id != 'create-task-button'){
            windowForClose.style.display = "none";  
        }
      });
    });
  });

  modalWindow.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      if (event.target === elem ) {
        elem.style.display = "none";
      }
    });
  });
};
