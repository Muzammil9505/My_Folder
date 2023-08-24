// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim(); // Remove leading/trailing white spaces

  if (task !== '') {
    tasks.push({ name: task, completed: false }); // Add the task object to the array

    // Update the display
    displayTasks();

    taskInput.value = ''; // Clear the input field

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Function to mark a task as completed
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed; // Toggle the completed status

  // Update the display
  displayTasks();

  // Save tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove the task from the array

  // Update the display
  displayTasks();

  // Save tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to display saved tasks
function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear existing tasks

  tasks.forEach(function(task, index) {
    const newTaskItem = document.createElement('li');
   
    newTaskItem.textContent = task.name;
    if (task.completed) {
      newTaskItem.classList.add('completed');
    }
    const deleteButton = document.createElement('button');
    
    deleteButton.textContent = ' Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
      deleteTask(index);
    });

    newTaskItem.appendChild(deleteButton);
    taskList.appendChild(newTaskItem);

    newTaskItem.addEventListener('click', function() {
      toggleCompleted(index);
    });
  });
}

// Add event listener to the Add Task button
const addTaskButton = document.getElementById('addTaskButton');
addTaskButton.addEventListener('click', addTask);

// Display saved tasks on page load
displayTasks();


//time and date function
function displayCurrentDate() {
  // Create a new Date object
  var currentDate = new Date();

  // Get the day, month, and year
  var day =  currentDate.toLocaleString('en-US', { weekday: 'long' });
  var month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
  var year = currentDate.getFullYear();
  // get the time
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  var amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  var formattedTime = hours + ":" + minutes  + ":"+ seconds + " "+amPm;

  // Format the date
  var formattedDate= day + ", " + month + "-" + currentDate.getDate() + "-" + year ;

  var formated_date_time=formattedDate+" "+formattedTime;
  // Update the HTML element with the formatted date
  document.getElementById("dateOutput").textContent = "Today: " +formattedDate;
  document.getElementById("timeOutput").textContent = "Time : " + formattedTime;
}
setInterval(displayCurrentDate, 1000);
displayCurrentDate();