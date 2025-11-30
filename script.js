document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Utility function to save the current tasks in the DOM to Local Storage
  function saveTasks() {
    // Get all task text content from the list items in the DOM
    const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => {
      // Get the text content, excluding the 'Remove' button's text
      return li.firstChild.textContent.trim();
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to create and append a new task element
  // 'save' parameter determines if the task should be saved to Local Storage immediately
  function createTaskElement(taskText, save = true) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const button = document.createElement("button");
    button.classList.add("remove-btn");
    button.textContent = "Remove";

    // Removal Logic: Remove from DOM and update Local Storage
    button.onclick = function () {
      taskList.removeChild(li);
      saveTasks(); // Update Local Storage after removal
    };

    li.appendChild(button);
    taskList.appendChild(li);

    // If 'save' is true, it means this is a newly added task, so save the whole list
    if (save) {
      saveTasks();
    }
  }

  // Function to handle adding a new task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      window.alert("Task is empty, please enter a task.");
      return; // Exit if input is empty
    }

    // Create the task element and save it to Local Storage
    createTaskElement(taskText);

    // Clear the input field
    taskInput.value = "";
  }

  // Function to load tasks from Local Storage when the page loads
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    // Loop through stored tasks and create DOM elements.
    // 'false' is passed to avoid saving them back immediately (no need to save when loading)
    storedTasks.forEach((taskText) => {
      createTaskElement(taskText, false);
    });
  }

  // --- Initialization ---

  // 1. Load existing tasks from Local Storage
  loadTasks();

  // 2. Attach event listeners
  addButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
});
