const noTasksAdd = document.querySelector(".add-to-grocery-list-icon");
const taskList = document.querySelector(".tasks-list");
const taskItem = taskList.querySelectorAll(".task-item");
const taskText = taskList.querySelectorAll(".task-item-content span");
const addNewTask = taskList.querySelector(".next-task-item");
/* const done = taskList.querySelectorAll(".done-button");
const checked = taskList.querySelectorAll(".done-button-inner"); */

noTasksAdd.addEventListener("click", function(){
    taskList.classList.remove("invisible");
    noTasksAdd.classList.add("invisible");
});

addNewTask.addEventListener("click", function(){
    const newClonedTask = taskItem[0].cloneNode(true);
    newClonedTask.querySelector("span").innerHTML = "";
    taskList.insertBefore(newClonedTask, taskItem[taskItem.length-1]);
})

/* done.forEach((btn, index)=>{
    btn.addEventListener("click",() => {
       if(checked[index].classList.contains("invisible"))
            checked[index].classList.remove("invisible"); 
       else
            checked[index].classList.add("invisible"); 

    })
    
}); */
