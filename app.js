const contForStacked = document.querySelector(".tasks-wrap");
const stackWrap = document.querySelector(".stack-wrap");
const allToDo = document.querySelector(".tasks");
const selAll = document.querySelector(".s-all");
const inputIcon = document.querySelector(".input-icon");
// tasks counter
const tasksCounter = document.querySelector(".counter");
// clear button
const clearBtn = document.querySelector(".btn-clear");
// let stackDiv;
let tasks = [];
let array = [];

const createNewItem = (task, index) => {
   // create li ele container
   const newLi = document.createElement("li");
   newLi.classList.add("new-li");
   // create li item left side wrapper
   const liWrap = document.createElement("div");
   liWrap.classList.add("new-li-wrap");
   // create check li ele icon for marking complete or not
   const checkStatusIcon = document.createElement("button");
   // create icon inside button ele
   const iconBtn = document.createElement("i");
   iconBtn.setAttribute("onclick", `markDone(${index})`);
   task.status
      ? (task.status,
        iconBtn.classList.add("check-mark", "bi", "bi-check2-circle"))
      : iconBtn.classList.add("check-mark", "bi", "bi-circle");

   // create div with input of task
   const taskTxt = document.createElement("div");
   taskTxt.setAttribute("onclick", `editTask(event, ${index})`);
   task.status
      ? taskTxt.classList.add("line-through", "focus-me")
      : taskTxt.classList.add("focus-me");

   // delete button with icon
   const delBtn = document.createElement("button");
   delBtn.setAttribute("onclick", `deleteTask(${index})`);
   const delBtnIcon = document.createElement("i");
   delBtnIcon.classList.add("bi", "bi-x");

   taskTxt.textContent = `${task.name}`; //${task.name}
   checkStatusIcon.appendChild(iconBtn);
   liWrap.appendChild(checkStatusIcon);
   liWrap.appendChild(taskTxt);
   delBtn.appendChild(delBtnIcon);
   newLi.appendChild(liWrap);
   newLi.appendChild(delBtn);
   allToDo.appendChild(newLi);
   // make last input first at top
   // const firstToDo = allToDo.firstChild;
   // allToDo.insertBefore(newLi, firstToDo);
};

// count tasks / items
const countTasks = () => {
   tasks.length === 1
      ? (tasksCounter.textContent = `${tasks.length} item left`)
      : (tasksCounter.textContent = `${tasks.length} items left`);
};

// * toggle clear complete button
const toggleClearBtn = () => {
   const exists = [...tasks].map((task) => task.status).includes(true);
   exists ? clearBtn.classList.remove("hide") : clearBtn.classList.add("hide");
};

// * creates li items
const showList = (array) => {
   // * passed array to function declared to tasks variable - array > tasks. To work with any passed array
   tasks = array;
   // reset innerHTML of allToDO
   allToDo.innerHTML = "";
   console.log(tasks);

   tasks.forEach((task, index) => {
      createNewItem(task, index);
   });
};

// * on submit new task creates fills up tasks array
const submitTask = (e) => {
   e.preventDefault();

   if (e.target[0].value === "") return;

   tasks[tasks.length] = {
      name: e.target[0].value,
      status: false,
      date: Date.now(),
   };

   e.target[0].value = "";
   showList(tasks);

   countTasks();

   if (tasks.length === 1) {
      // hide "stack" and hide select all tasks icon
      stackWrap.classList.remove("hide");
      selAll.classList.remove("hide");
   }
};

// * on task delete action deletes clicked li item from tasks array and DOM
const deleteTask = (index) => {
   tasks.splice(index, 1);
   showList();
   countTasks();
   if (tasks.length === 0) {
      // show "stack" and show select all tasks icon
      stackWrap.classList.add("hide");
      selAll.classList.add("hide");
   }
};

// * toggles all tasks done or not done
const toggleAllTasks = () => {
   console.log("first");
   // toggle all tasks to finished
   const allTasksAreTrue = [...tasks].every((task) => task.status === true);
   // depending on value change DOM
   const changeStatus = tasks.map((task) => {
      if (allTasksAreTrue) {
         task.status = false;
         inputIcon.classList.remove("toggle-icon");
         clearBtn.classList.add("hide");
      }
      if (!allTasksAreTrue) {
         task.status = true;
         inputIcon.classList.add("toggle-icon");
         clearBtn.classList.remove("hide");
      }
      return task;
   });
   showList(changeStatus);
};

// * function to select 1 task item to finish or not
const markDone = (index) => {
   // ? select new created li item checkmark - circle
   let trueOrFalse = !tasks[index].status;
   tasks[index].status = trueOrFalse;

   toggleClearBtn();
   // check done status for clear completed button
   showList(tasks);
};

// * on double click on tasks text toggles input field with tasks text to edit task
const editTask = (e, index) => {
   e.preventDefault();
   // create input on click of todo text
   e.target.innerHTML = `<input
                               type="text"
                               class="input-text-up"

                               value="${tasks[index].name}"
                               onfocusout="updateTask(event, ${index})"
                           >`;
};

// * if on task edit input value is same or empty - keep last task value
const updateTask = (e, index) => {
   if (e.target.value != "") tasks[index].name = e.target.value;

   showList();
};

// * clears all tasks on "clear completed" button click
const clearAll = () => {
   const clearedTasks = [...tasks].filter((task) => task.status === false);
   showList(clearedTasks);
   countTasks();
   toggleClearBtn();
};
