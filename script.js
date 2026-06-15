const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }
  const li = document.createElement("li");

  li.innerHTML = `
  <label>
    <input type="checkbox">
    <span class="task-text">${task}</span>
  </label>

  <div class="action-buttons">
    <span class="edit-btn">✏️ Edit</span>
    <span class="delete-btn">🗑️ Delete</span>
  </div>
  `;

  listContainer.appendChild(li);
  attachEvents(li);
  inputBox.value = "";
  saveTasks();


  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector(".task-text");
  const deleteBtn = li.querySelector(".delete-btn");


  li.classList.remove("completed");

  const completedCounter = document.getElementById("completed-counter");
  const uncompletedCounter = document.getElementById("uncompleted-counter");

  function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks =
      document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
  }

  updateCounters();

  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
    saveTasks();
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
      saveTasks();
    }
  });
}

function saveTasks(){
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";

    const allTasks = listContainer.querySelectorAll("li");

    allTasks.forEach(task => {
        attachEvents(task);
    });
}

showTasks();

function attachEvents(li) {
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector(".task-text");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        saveTasks();
    });

    editBtn.addEventListener("click", function () {
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            saveTasks();
        }
    });

    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}