const tasks = [];
const alert = document.querySelector(".alert");

//CRUD:
//CREATE - Įrašo sukūrimas
//READ - Įrašo atvaizdavimas
//UPDATE - Įrašo atnaujinimas
//DELETE - Įrašo ištrynimas

const showList = () => {
   let res = "";

   tasks.forEach((task, index) => {
      res += `<li 
                   class="d-flex justify-content-between align-items-center"
                   ondblclick="editTask(event, ${index})"
               >
                   <span 
                       onclick="markDone(${index})" 
                       ${task.status ? 'class="done"' : ""}
                   >
                       ${task.name}
                   </span>
                   <button 
                       class="btn btn-danger" 
                       onclick="deleteTask(${index})"
                   >Ištrinti</button>
               </li>`;
   });

   document.querySelector(".tasks").innerHTML = res;
};

const submitTask = (e) => {
   e.preventDefault();

   if (e.target[0].value === "") {
      alert.textContent = "Neįvestas užduoties pavadinimas";
      alert.style.display = "block";
      return;
   }

   alert.style.display = "none";

   tasks[tasks.length] = {
      name: e.target[0].value,
      status: false,
      date: Date.now(),
   };

   e.target[0].value = "";

   showList();
};

const deleteTask = (index) => {
   // delete tasks[index];

   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
   tasks.splice(index, 1);

   showList();
};

const markDone = (index) => {
   tasks[index].status = !tasks[index].status;

   showList();
};

const editTask = (e, index) => {
   e.preventDefault();

   e.target.querySelector("span").style.display = "none";

   e.target.innerHTML = `<input 
                               type="text" 
                               class="form-control" 
                               value="${tasks[index].name}"
                               onfocusout="updateTask(event, ${index})"
                           >`;
};

const updateTask = (e, index) => {
   tasks[index].name = e.target.value;

   showList();
};
