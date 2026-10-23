const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const taskMessage = document.getElementById("task-message");

// Load saved tasks from the browser
let tasks = [];

try {
    tasks = JSON.parse(localStorage.getItem("valianceTasks")) || [];
} catch (error) {
    tasks = [];
}

// Save tasks to the browser
function saveTasks() {
    localStorage.setItem("valianceTasks", JSON.stringify(tasks));
}

// Display tasks on the page
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const listItem = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.opacity = "0.6";
        }

        listItem.appendChild(taskText);

        if (task.date) {
            const dateText = document.createElement("p");
            dateText.textContent = "Due date: " + task.date;
            listItem.appendChild(dateText);
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed
            ? "Mark Incomplete"
            : "Mark Complete";

        completeButton.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        listItem.appendChild(completeButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Task";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
            taskMessage.textContent = "Task deleted.";
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });

    const completedTasks = tasks.filter(function(task) {
        return task.completed;
    }).length;

    taskCount.textContent =
        "You have " + tasks.length + " task(s), with " +
        completedTasks + " completed.";
}

// Add a new task
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        taskMessage.textContent = "Please enter a task.";
        return;
    }

    const newTask = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        text: taskName,
        date: taskDate.value,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskForm.reset();
    taskMessage.textContent = "Task added successfully!";
});

// Display any tasks saved previously
displayTasks();