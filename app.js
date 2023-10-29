const allToDo = document.querySelector(".tasks");
let tasks = [];

//CRUD:
//CREATE - Įrašo sukūrimas
//READ - Įrašo atvaizdavimas
//UPDATE - Įrašo atnaujinimas
//DELETE - Įrašo ištrynimas

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
   if (task.status) {
      task.status;
      iconBtn.classList.add("check-mark", "bi", "bi-check2-circle");
   } else {
      iconBtn.classList.add("check-mark", "bi", "bi-circle");
   }

   // create div with input of task
   const taskTxt = document.createElement("div");
   taskTxt.setAttribute("onclick", `editTask(event, ${index})`);
   if (task.status) {
      taskTxt.classList.add("line-through", "focus-me");
   } else {
      taskTxt.classList.add("focus-me");
   }

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
   // make last input first at top
   const firstToDo = allToDo.firstChild;
   allToDo.insertBefore(newLi, firstToDo);
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

   if (e.target[0].value === "") {
      return;
   }

   tasks[tasks.length] = {
      name: e.target[0].value,
      status: false,
      date: Date.now(),
   };

   e.target[0].value = "";
   showList(tasks);
};

const deleteTask = (index) => {
   tasks.splice(index, 1);
   showList();
};

const markDone = (index) => {
   // ? select new created li item checkmark - circle
   let trueOrFalse = !tasks[index].status;
   tasks[index].status = trueOrFalse;

   showList();
};

const editTask = (e, index) => {
   e.preventDefault();
   e.target.innerHTML = `<input
                               type="text"
                               class="input-text-up"

                               value="${tasks[index].name}"
                               onfocusout="updateTask(event, ${index})"
                           >`;
};
const updateTask = (e, index) => {
   if (e.target.value != "") {
      tasks[index].name = e.target.value;
   }
   showList();
};
