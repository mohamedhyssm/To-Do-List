let input = document.querySelector(".input")

let submit = document.querySelector(".add")

let taskDiv = document.querySelector(".tasks")

let arrayOfTasks = []

// Check if Theres Tasks In Local Storage 
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
    addElementsToPage(arrayOfTasks)
}

// Add Task When Click On Submit
submit.addEventListener("click", () => {
    if (input.value) {
        taskData(input.value) // Add Task To Array Of Tasks
        input.value = ""; // Empty Input Field
    }
})

// Add Task When click Enter
input.onkeyup = function (e) {
    if (e.key === "Enter") {
        if (input.value) {
            taskData(input.value) // Add Task To Array Of Tasks
            input.value = ""; // Empty Input Field
        }
    }
}

// Click On Task Elements
taskDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        arrayOfTasks = arrayOfTasks.filter((task) => task.id != e.target.parentElement.getAttribute("data-id"))
        addDataToLocalStorage(arrayOfTasks)
        e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")
    }
})

function taskData(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false
    }
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task)
    // Add Tasks To Page
    addElementsToPage(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLocalStorage(arrayOfTasks);
}

function addElementsToPage(arrayOfTasks) {
    // Empty Tasjs Div
    taskDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        // Creat Main Div
        let div = document.createElement("div")
        div.className = "task"
        // Check If Task Is Done
        if (task.completed) {
            div.classList.add("done")
        }
        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.title))
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"))
        // Append Button and Main Div
        div.append(span)
        taskDiv.append(div)
    });
}

function addDataToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed == true : arrayOfTasks[i].completed == false
            break
        }
    }
    addDataToLocalStorage(arrayOfTasks)
}