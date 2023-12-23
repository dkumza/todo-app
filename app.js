const contForStacked = document.querySelector(".tasks-wrap");
const stackWrap = document.querySelector(".stack-wrap");
const allToDo = document.querySelector(".tasks");
const selAll = document.querySelector(".s-all");
const inputIcon = document.querySelector(".input-icon");
// tasks counter
const tasksCounter = document.querySelector(".counter");
// all tasks button
const btnAll = document.querySelector(".btn-all");
// all active tasks button
const btnActive = document.querySelector(".btn-act");
let btnActiveON = false;
// toggle completed tasks button
const complBtn = document.querySelector(".btn-com");
let btnCompON = false;
// clear button
const clearBtn = document.querySelector(".btn-clear");

// let stackDiv;
let tasks = [];
let array = [];
let complTasks = [];

// * show / hide bottom menu
const stackWrapMenu = () => {
   if (tasks.length === 0) {
      // * show "stack" and show select all tasks icon
      stackWrap.classList.add("hide");
      selAll.classList.add("hide");
   }
   if (tasks.length > 0) {
      // * hide "stack" and hide select all tasks icon
      stackWrap.classList.remove("hide");
      selAll.classList.remove("hide");
   }
};

// * create new task as DOM element
const createNewItem = (task) => {
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
   task.status
      ? (task.status,
        iconBtn.classList.add("check-mark", "bi", "bi-check2-circle"))
      : iconBtn.classList.add("check-mark", "bi", "bi-circle");
   // create div with input of task
   const taskTxt = document.createElement("div");
   task.status
      ? taskTxt.classList.add("line-through", "focus-me")
      : taskTxt.classList.add("focus-me");
   // delete button with icon
   const delBtn = document.createElement("button");
   delBtn.classList.add("del-btn");
   const delBtnIcon = document.createElement("i");
   delBtnIcon.classList.add("bi", "bi-x");

   // * append all to ul item
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

   // * change tasks status by target
   iconBtn.addEventListener("click", () => {
      // ? select new created li item check mark - circle
      let taskIndex = tasks.indexOf(task);
      tasks[taskIndex].status = !tasks[taskIndex].status;
      // * update DOM
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showList(tasks);
      countTasks();
      // * checks clear all tasks button
      toggleClearBtn();

      // //* count tasks length with marked done tasks, and if all tasks are marked done, change icon of inputIcon
      const markedTasks = [...tasks].filter((task) => task.status === true);
      tasks.length === markedTasks.length
         ? inputIcon.classList.add("toggle-icon")
         : inputIcon.classList.remove("toggle-icon");

      // * check for filters
      btnCompON ? completedAll() : null;
      btnActiveON ? activeAll() : null;
   });

   // * delete tasks by target
   delBtnIcon.addEventListener("click", () => {
      // * deletes selected item from DOM
      allToDo.removeChild(newLi);
      // * updates tasks array and localStorage by removing selected task
      tasks.splice(tasks.indexOf(task), 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      countTasks();
      stackWrapMenu();
      toggleClearBtn();
      btnCompON ? completedAll() : null;
      btnActiveON ? activeAll() : null;
   });

   // * on double click on tasks text toggles input field with tasks text to edit task
   taskTxt.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.innerHTML = `<input
                              type="text"
                              class="input-text-up"      
                              value="${e.target.textContent}"
                              onkeyup="updateOnEnter(event, ${tasks.indexOf(
                                 task
                              )})"
                              onfocusout="updateTask(event, ${tasks.indexOf(
                                 task
                              )})"
                           >`;
   });
};

// * counts tasks / items and updates how many items are in ul
const countTasks = () => {
   tasks.length === 1
      ? (tasksCounter.textContent = `${tasks.length} item left`)
      : (tasksCounter.textContent = `${tasks.length} items left`);

   // *checks how many items are done and shows on DOM
   const markedTasks = [...tasks].filter((task) => task.status === true);
   let leftUndoneTasks = tasks.length - markedTasks.length;
   leftUndoneTasks === 1
      ? (tasksCounter.textContent = `${leftUndoneTasks} item left`)
      : (tasksCounter.textContent = `${leftUndoneTasks} items left`);
};

// * toggle clear complete button
const toggleClearBtn = () => {
   const exists = [...tasks].map((task) => task.status).includes(true);
   exists ? clearBtn.classList.remove("hide") : clearBtn.classList.add("hide");
};

// * creates li items
const showList = (array) => {
   // reset innerHTML of allToDO
   allToDo.innerHTML = "";

   array.forEach((task) => {
      createNewItem(task);
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

   localStorage.setItem("tasks", JSON.stringify(tasks));
   e.target[0].value = "";
   showList(tasks);
   countTasks();
   stackWrapMenu();

   const markedTasks = [...tasks].filter((task) => task.status === true);
   tasks.length === markedTasks.length
      ? inputIcon.classList.add("toggle-icon")
      : inputIcon.classList.remove("toggle-icon");

   btnCompON ? completedAll() : null;
   btnActiveON ? activeAll() : null;
};

// * toggles all tasks done or not done
const toggleAllTasks = () => {
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
   localStorage.setItem("tasks", JSON.stringify(tasks));
   showList(changeStatus);
   countTasks();
   btnCompON ? completedAll() : null;
   btnActiveON ? activeAll() : null;
};

const updateOnEnter = (e, index) => {
   e.preventDefault();
   if (e.keyCode === 13) {
      // * if on task edit input value is same or empty - keep last task value
      if (e.target.value != "") tasks[index].name = e.target.value;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showList(tasks);
   }
};
const updateTask = (e, index) => {
   e.preventDefault();
   // * if on task edit input value is same or empty - keep last task value
   if (e.target.value != "") tasks[index].name = e.target.value;
   localStorage.setItem("tasks", JSON.stringify(tasks));
   showList(tasks);
};

// * clears all tasks on "clear completed" button click
const clearAll = () => {
   const clearedTasks = [...tasks].filter((task) => task.status === false);
   tasks = clearedTasks;
   localStorage.setItem("tasks", JSON.stringify(tasks));
   showList(tasks);
   countTasks();
   toggleClearBtn();
   stackWrapMenu();
   inputIcon.classList.remove("toggle-icon");
   btnCompON ? completedAll() : null;
   btnActiveON ? activeAll() : null;
   // * if tasks length === 0, show all tasks
   tasks.length === 0 ? selectAll() : null;
};

// * select all tasks in menu
const selectAll = () => {
   showList(tasks);
   btnAll.classList.add("btn-all");
   btnActive.classList.remove("btn-all");
   complBtn.classList.remove("btn-all");
   btnActiveON = false;
   btnCompON = false;
};

// * toggle active tasks
const activeAll = () => {
   const activeTasks = [...tasks].filter((task) => task.status === false);
   btnAll.classList.remove("btn-all");
   btnActive.classList.add("btn-all");
   complBtn.classList.remove("btn-all");
   showList(activeTasks);
   btnActiveON = true;
   btnCompON = false;
};

// * toggle completed tasks
const completedAll = () => {
   complTasks = [...tasks].filter((task) => task.status === true);
   btnAll.classList.remove("btn-all");
   btnActive.classList.remove("btn-all");
   complBtn.classList.add("btn-all");
   btnCompON = true;
   btnActiveON = false;
   showList(complTasks);
};

if (localStorage.getItem("tasks")) {
   tasks = JSON.parse(localStorage.getItem("tasks"));
   showList(tasks);
   countTasks();
   stackWrapMenu();
   toggleClearBtn();
}
