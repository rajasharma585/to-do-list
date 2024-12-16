// Retrieve funtion elements from DOM
const todoInput = document.getElementById("todoInput");
const todoContainer = document.querySelector(".todo-list");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");

// Initialize todo app
document.addEventListener("DOMContentLoaded", () => {
    addBtn.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteBtn.addEventListener("click", deleteAllTask);
    displayTask();
});

todoContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveToLocalstorage();

    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        saveToLocalstorage();
    }

    displayTask();
});

function addTask() {
    if (todoInput.value === "") {
        alert("You must add a todo task");
    }
    else {
        const div = document.createElement("div");
        const li = document.createElement("li");
        const span = document.createElement("span");

        div.classList.add("todo");
        li.innerHTML = todoInput.value;
        span.innerHTML = "\u00d7";

        div.append(li, span);
        todoContainer.appendChild(div);

        todoInput.value = "";

        saveToLocalstorage();
        displayTask();
    }

}

function deleteAllTask() {
    todoContainer.innerHTML = "";
    saveToLocalstorage()
}

function displayTask() {
    todoContainer.innerHTML = localStorage.getItem("todo");
    const todos = document.querySelectorAll(".todo").length;
    const counter = document.querySelector(".counter");
    counter.textContent = todos;
}

function saveToLocalstorage() {
    localStorage.setItem("todo", todoContainer.innerHTML);
}