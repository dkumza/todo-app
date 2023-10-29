const tasks = [];

//CRUD:
//CREATE - Įrašo sukūrimas
//READ - Įrašo atvaizdavimas
//UPDATE - Įrašo atnaujinimas
//DELETE - Įrašo ištrynimas

const showList = () => {
   let res = "";

   tasks.forEach((task, index) => {
      res += `<li class="new-li">  
                  <div class="new-li-wrap">
                     <button>
                        <i onclick="markDone(${index})" 
                        ${
                           task.status
                              ? 'class="check-mark bi bi-check2-circle"'
                              : 'class="check-mark bi bi-circle"'
                        }>
                        </i>
                     </button>
                     <div 
                           ondblclick="editTask(event, ${index})" 
                           ${
                              task.status
                                 ? 'class="line-through focus-me"'
                                 : 'class="focus-me"'
                           }>
                       ${task.name}
                     </div>
                  </div>
                  <button
                       class=""
                       onclick="deleteTask(${index})">
                       <i class="bi bi-x"></i>
                  </button>
               </li>`;
   });

   document.querySelector(".tasks").innerHTML = res;
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

   showList();
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

   console.log(e.target);
   const editLiItem = e.target.querySelector(".focus-me");
   editLiItem.classlist.add("hide");
   console.log(editLiItem);

   e.target.innerHTML = `<input
                               type="text"
                               class="input-text-up"

                               value="${tasks[index].name}"
                               onfocusout="updateTask(event, ${index})"
                           >`;
};

const updateTask = (e, index) => {
   tasks[index].name = e.target.value;

   showList();
};
