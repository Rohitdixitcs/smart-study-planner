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
    const category =
    document.getElementById(
        "categoryInput"
    ).value;

tasks.push({
    text: taskText,
    category: category,
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
        const badge =
    document.createElement("span");

badge.classList.add(
    "category-badge"
);

if(task.category === "Study"){
    badge.classList.add("study");
}

if(task.category === "Assignment"){
    badge.classList.add("assignment");
}

if(task.category === "Revision"){
    badge.classList.add("revision");
}

if(task.category === "Exam Prep"){
    badge.classList.add("exam");
}

badge.textContent =
    task.category;

const wrapper =
    document.createElement("div");

wrapper.style.display = "flex";
wrapper.style.alignItems = "center";
wrapper.style.gap = "10px";

taskText.textContent =
    task.text;

wrapper.appendChild(badge);
wrapper.appendChild(taskText);

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

        li.appendChild(wrapper);
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
const quotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "Do something today that your future self will thank you for.",
    "The secret of getting ahead is getting started.",
    "Small progress is still progress.",
    "Dream big. Start small. Act now.",
    "Discipline is choosing between what you want now and what you want most.",
    "Every expert was once a beginner.",
    "Your only limit is your mind."
];

const quoteText =
    document.getElementById("quoteText");

const newQuoteBtn =
    document.getElementById("newQuoteBtn");

newQuoteBtn.addEventListener(
    "click",
    ()=>{

        const randomIndex =
            Math.floor(
                Math.random() *
                quotes.length
            );

        quoteText.textContent =
            quotes[randomIndex];
    }
);
let streak =
    Number(
        localStorage.getItem(
            "studyStreak"
        )
    ) || 0;

const streakCount =
    document.getElementById(
        "streakCount"
    );

const studyTodayBtn =
    document.getElementById(
        "studyTodayBtn"
    );

streakCount.textContent =
    streak + " Days";

studyTodayBtn.addEventListener(
    "click",
    ()=>{

        streak++;

        localStorage.setItem(
            "studyStreak",
            streak
        );

        streakCount.textContent =
            streak + " Days";
    }
);
const saveWeekBtn =
    document.getElementById(
        "saveWeekBtn"
    );

const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
];

weekDays.forEach(day => {

    const savedValue =
        localStorage.getItem(day);

    if(savedValue){

        document.getElementById(day)
            .value = savedValue;
    }
});

saveWeekBtn.addEventListener(
    "click",
    ()=>{

        weekDays.forEach(day => {

            localStorage.setItem(
                day,
                document
                    .getElementById(day)
                    .value
            );

        });

        alert(
            "Weekly Study Plan Saved!"
        );
    }
);
let timer;
let timeLeft = 1500;

const timerDisplay =
    document.getElementById(
        "timerDisplay"
    );

const startTimerBtn =
    document.getElementById(
        "startTimerBtn"
    );

const pauseTimerBtn =
    document.getElementById(
        "pauseTimerBtn"
    );

const resetTimerBtn =
    document.getElementById(
        "resetTimerBtn"
    );

function updateTimer(){

    const minutes =
        Math.floor(
            timeLeft / 60
        );

    const seconds =
        timeLeft % 60;

    timerDisplay.textContent =
        `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
}

startTimerBtn.addEventListener(
    "click",
    ()=>{

        clearInterval(timer);

        timer =
            setInterval(()=>{

                if(timeLeft > 0){

                    timeLeft--;

                    updateTimer();

                }else{

                    clearInterval(timer);

                    alert(
                        "Pomodoro Session Complete!"
                    );
                }

            },1000);

    }
);

pauseTimerBtn.addEventListener(
    "click",
    ()=>{

        clearInterval(timer);

    }
);

    "click",
    ()=>{

        clearInterval(timer);

        timeLeft = 1500;

        updateTimer();

    }
);

updateTimer();
