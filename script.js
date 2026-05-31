const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

addTaskBtn.addEventListener("click", () => {

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    renderTasks();

    taskInput.value = "";
});

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";

        const taskText = document.createElement("span");

        taskText.textContent = task.text;

        if(task.completed){
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        const actions =
            document.createElement("div");

        actions.classList.add("task-actions");

        const completeBtn =
            document.createElement("button");

        completeBtn.textContent = "✓";

        completeBtn.onclick = () => {

            tasks[index].completed =
                !tasks[index].completed;

            renderTasks();
        };

        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent = "🗑";

        deleteBtn.onclick = () => {

            tasks.splice(index,1);

            renderTasks();
        };

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    updateStats();

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateStats(){

    const total = tasks.length;

    const completed =
        tasks.filter(task =>
            task.completed
        ).length;

    const progress =
        total === 0
        ? 0
        : Math.round(
            (completed/total)*100
        );

    document.getElementById(
        "totalTasks"
    ).textContent = total;

    document.getElementById(
        "completedTasks"
    ).textContent = completed;

    document.getElementById(
        "progressPercent"
    ).textContent = progress + "%";

    document.getElementById(
        "progressBar"
    ).style.width = progress + "%";
}

function calculateCountdown(){

    const examDate =
        document.getElementById("examDate").value;

    if(!examDate) return;

    const today = new Date();

    const exam = new Date(examDate);

    const difference = exam - today;

    const days = Math.ceil(
        difference /
        (1000*60*60*24)
    );

    document.getElementById(
        "daysLeft"
    ).textContent =
        days + " Days Remaining";
}

const themeToggle =
    document.getElementById(
        "themeToggle"
    );

const currentTheme =
    localStorage.getItem("theme");

if(currentTheme === "dark"){

    document.body.classList.add(
        "dark-mode"
    );

    themeToggle.textContent =
        "☀️ Light Mode";
}

themeToggle.addEventListener(
    "click",
    ()=>{

        document.body.classList.toggle(
            "dark-mode"
        );

        if(
            document.body.classList.contains(
                "dark-mode"
            )
        ){

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeToggle.textContent =
                "☀️ Light Mode";

        }else{

            localStorage.setItem(
                "theme",
                "light"
            );

            themeToggle.textContent =
                "🌙 Dark Mode";
        }
    }
);

renderTasks();
const subjectInput =
    document.getElementById(
        "subjectInput"
    );

const addSubjectBtn =
    document.getElementById(
        "addSubjectBtn"
    );

const subjectList =
    document.getElementById(
        "subjectList"
    );

let subjects =
    JSON.parse(
        localStorage.getItem(
            "subjects"
        )
    ) || [];

addSubjectBtn.addEventListener(
    "click",
    ()=>{

        const subject =
            subjectInput.value.trim();

        if(subject === "") return;

        subjects.push(subject);

        renderSubjects();

        subjectInput.value = "";
    }
);

function renderSubjects(){

    subjectList.innerHTML = "";

    subjects.forEach(
        (subject,index)=>{

            const li =
                document.createElement(
                    "li"
                );

            const text =
                document.createElement(
                    "span"
                );

            text.textContent =
                subject;

            const deleteBtn =
                document.createElement(
                    "button"
                );

            deleteBtn.textContent =
                "🗑";

            deleteBtn.onclick =
                ()=>{

                    subjects.splice(
                        index,
                        1
                    );

                    renderSubjects();
                };

            li.appendChild(text);

            li.appendChild(deleteBtn);

            subjectList.appendChild(
                li
            );
        }
    );

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );
}

renderSubjects();
