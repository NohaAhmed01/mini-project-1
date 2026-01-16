const noTasksAdd = document.querySelector(".add-to-grocery-list-icon");
const taskList = document.querySelector(".tasks-list");
const taskItem = taskList.querySelectorAll(".task-item");

//creating the first task
noTasksAdd.addEventListener("click", function () {
  taskList.classList.remove("invisible");
  noTasksAdd.classList.add("invisible");
});

taskList.addEventListener("click", (event) => {
  //handling the checkbox
  const doneBtn = event.target.closest(".done-button");
  if (doneBtn) {
    const innerDiv = doneBtn.querySelector(".done-button-inner");
    //toogle the checkbox
    if (innerDiv) {
      innerDiv.classList.toggle("invisible");
    }

    //toggle the strike through
    const taskDone = event.target.closest(".task-item");
    if (taskDone) {
      const taskText = taskDone.querySelector("span");
      if (taskText.innerHTML != "" && !innerDiv.classList.contains("invisible"))
        taskText.style.textDecoration = "line-through";
      else taskText.style.textDecoration = "none";
    }
  }

  //adding a new task
  const addNewTaskItem = event.target.closest(".task-item");
  if (addNewTaskItem) {
    const addIcon = addNewTaskItem.querySelector(".next-task-item");
    if (addIcon) {
      const newClonedTask = taskItem[0].cloneNode(true);
      newClonedTask.querySelector("span").innerHTML = "";
      newClonedTask
        .querySelector(".done-button-inner")
        .classList.add("invisible");
      newClonedTask.querySelector("span").style.textDecoration = "none";
      newClonedTask.style.backgroundColor= "#e8e8e859";
      taskList.insertBefore(newClonedTask, taskItem[taskItem.length - 1]);
    }
  }

  //deleting a task
  const deleteATask = event.target.closest(".delete-button");
  if (deleteATask) {
    const tasks = taskList.querySelectorAll(".task-item");
    deleteATask.parentNode.style.backgroundColor = "#ff4040b3";
    if (tasks.length <= 2) {     
      setTimeout(() => {
        taskList.classList.add("invisible");
        noTasksAdd.classList.remove("invisible");
        const taskText = tasks[0].querySelector("span");
        taskText.innerHTML = "";
        taskText.style.textDecoration = "none";
        tasks[0].querySelector(".done-button-inner").classList.add("invisible");
        tasks[0].style.backgroundColor = "#e8e8e859";
      }, 1100);
    } else {
      setTimeout(() => {
        deleteATask.parentNode.remove();
      }, 1100);
    }
  }
});

