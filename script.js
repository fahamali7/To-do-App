//const inputBox = document.querySelector(".todo-input");
const taskList = document.getElementById("task-List");
const input = document.querySelector(".todo-input");
let tasks = []; // holds all tasks
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            const li = document.createElement("li");
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.classList.add("Completed");
            }
            li.appendChild(taskText);
            taskList.appendChild(li);

            // Reattach functionality
            taskText.addEventListener("click", () => {
                taskText.classList.toggle("Completed");
                task.completed = !task.completed;
                savetoLocalStorage();
            });

            deleteTask(li, task);
        });
    }
}

// Call it when page loads
window.onload = loadTasksFromLocalStorage;

function addTask(){
    if(input.value === ""){
        alert("YOU MUST WRITE SOME TASKS")
    }
    else{
        var li = document.createElement("li");
        var taskText = document.createElement("span");
        taskText.textContent = input.value;
        taskList.classList.add("task-text");
        li.appendChild(taskText);
        taskList.appendChild(li);

         const newTask = {
            text: input.value,
            completed: false
        };
        tasks.push(newTask)
        savetoLocalStorage();

        //Toggle Strikethrough on click
        taskText.addEventListener("click", () =>{
            taskText.classList.toggle("Completed");
            newTask.completed = !newTask.completed;
            savetoLocalStorage();
        });
        deleteTask(li, newTask);
        //taskList.appendChild(li);
    }
    input.value = "";
}

function savetoLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

input.addEventListener("keyup", (event) =>{
    if(event.key === "Enter"){
        addTask();
    }

});
input.value ="";

function deleteTask(li, taskObject){
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", (event) => {
        //event.stopPropagation();
        li.remove();
        tasks = tasks.filter(task => task !== taskObject); // Remove from array
        savetoLocalStorage(); // Update localStorage
    });
}
