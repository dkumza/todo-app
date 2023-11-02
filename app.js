const contForStacked = document.querySelector(".tasks-wrap");
const allToDo = document.querySelector(".tasks");
const inputIcon = document.querySelector(".input-icon");
let stackDiv;
let tasks = [];

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

// creates element with stacked effect
const createStackEffect = () => {
   // container for 2 divs
   stackDiv = document.createElement("div");
   stackDiv.classList.add("stack-wrap");
   // 1st ele
   const stack1 = document.createElement("div");
   stack1.classList.add("test-wrap1");
   // 2nd ele
   const stack2 = document.createElement("div");
   stack2.classList.add("test-wrap2");
   // append to stack-wrap ele
   stackDiv.appendChild(stack1);
   stackDiv.appendChild(stack2);
};

const showList = () => {
   // reset innerHTML of allToDO
   allToDo.innerHTML = "";

   tasks.forEach((task, index) => {
      createNewItem(task, index);
   });
};

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
   console.log(tasks.length);
   if (tasks.length === 1) {
      createStackEffect();
      contForStacked.appendChild(stackDiv);
   }
};

const deleteTask = (index) => {
   tasks.splice(index, 1);
   showList();
   if (tasks.length === 0) {
      contForStacked.removeChild(stackDiv);
   }
};

const toggleAllTasks = () => {
   // toggle all tasks to finished
   const allTasksAreTrue = tasks.every((task) => task.status === true);
   // depending on value change DOM
   let changeStatus = tasks.map((task) => {
      if (allTasksAreTrue) {
         task.status = false;
         inputIcon.classList.remove("toggle-icon");
      }
      if (!task.status) {
         task.status = true;
         inputIcon.classList.add("toggle-icon");
      }
      return task;
   });
   showList(changeStatus);
};

// simple for changing status true to false and vice versa
// const toggleAllTasks = () => {
//    for (const index in tasks) {
//       tasks[index].status = !tasks[index].status;
//    }
//    showList();
// };

const markDone = (index) => {
   // ? select new created li item checkmark - circle
   let trueOrFalse = !tasks[index].status;
   tasks[index].status = trueOrFalse;

   showList();
};

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

const updateTask = (e, index) => {
   if (e.target.value != "") tasks[index].name = e.target.value;

   showList();
};
