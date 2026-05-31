const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

addTaskBtn.addEventListener("click", () => {

    const taskText = taskInput.value.trim();

    if(taskText === "") return;

    tasks.push(taskText);

    renderTasks();

    taskInput.value = "";
});

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.textContent = task;

        taskList.appendChild(li);

    });

    document.getElementById("totalTasks").textContent = tasks.length;
}