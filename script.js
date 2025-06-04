const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let draggedIndex = null;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.setAttribute("draggable", true);
        li.setAttribute("data-index", index);

        li.innerHTML = `
          ${task.text}
          <div class="actions">
            <button class="done" onclick="toggleComplete(${index})">✅</button>
            <button class="delete" onclick="deleteTask(${index})">🗑️</button>
          </div>
        `;

        // Drag & Drop events
        li.addEventListener("dragstart", () => {
            draggedIndex = index;
        });

        li.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        li.addEventListener("drop", () => {
            const tasks = JSON.parse(localStorage.getItem("tasks"));
            const draggedTask = tasks[draggedIndex];
            tasks.splice(draggedIndex, 1);
            tasks.splice(index, 0, draggedTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        });

        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return alert("Please enter a task!");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
}

function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark");
    }
}

loadTheme();
loadTasks();