const noTasksAdd = document.querySelector(".add-to-grocery-list-icon");
const taskList = document.querySelector(".tasks-list");
const taskItem = taskList.querySelectorAll(".task-item");

displayTasks();

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
      if (taskText.innerHTML != "" && !innerDiv.classList.contains("invisible")) {
        taskText.style.textDecoration = "line-through";
      } else {
        taskText.style.textDecoration = "none";
      }
      saveTask(taskText);
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
      newClonedTask.style.backgroundColor = "#e8e8e859";
      taskList.insertBefore(newClonedTask, taskItem[taskItem.length - 1]);
    }
  }

  //deleting a task
  const deleteATask = event.target.closest(".delete-button");
  if (deleteATask) {
    const tasks = taskList.querySelectorAll(".task-item");
    const toDeleteItem = deleteATask.parentNode; 
    const toDeleteText = toDeleteItem.querySelector("span");
    toDeleteItem.style.backgroundColor = "#ff4040b3";
    //remove task from local storage
    localStorage.removeItem(toDeleteText.innerHTML);
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

//saving the task to local storage
function saveTask(task) {
  if (task.innerHTML == "") return;
  let complete = false;
  const parentDiv = task.parentNode;
  const isDone = parentDiv.querySelector(".done-button-inner");
  if (isDone.classList.contains("invisible")) complete = false;
  else complete = true;
  localStorage.setItem(task.innerHTML, complete);
}

//displaying the tasks stored previously
function displayTasks() {
  if (localStorage.length != 0) {
    const item = [];
    let spanText;
    let innerDiv = false;
    for (let i = 0; i < localStorage.length; i++) {
      item[i] = taskItem[0].cloneNode(true);
      spanText = item[i].querySelector("span");
      innerDiv = item[i].querySelector(".done-button-inner");
      spanText.innerHTML = localStorage.key(i);
      if(localStorage.getItem(localStorage.key(i)) == "true"){
        spanText.style.textDecoration= "line-through";
        innerDiv.classList.remove("invisible");
      }else{
        spanText.style.textDecoration= "none";
        innerDiv.classList.add("invisible");
      } 
      taskList.insertBefore(item[i], taskItem[taskItem.length - 1]);
    }
    taskItem[0].remove();
    taskList.classList.remove("invisible");
    noTasksAdd.classList.add("invisible");
  }
}


