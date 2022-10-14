"use strict";
const inputTodoEl = document.getElementById('inputTodo');
const formTodoEl = document.getElementById('formTodo');
const listTodoEl = document.getElementById('listTodo');
// Store data in local storage
const tasks = readListData();
// Display data from local storage
tasks.forEach(createList);
formTodoEl.addEventListener('submit', saveData);
function saveData(e) {
    e.preventDefault();
    const newTask = {
        id: Date.now(),
        name: inputTodoEl.value,
        completed: false
    };
    // Add new task to tasks array
    createList(newTask);
    // Save data in local storage
    tasks.push(newTask);
    // console.log(tasks);
    // Save data in local storage
    localStorage.setItem("myList", JSON.stringify(tasks));
}
function createList(task) {
    const liEl = document.createElement("li");
    const checkBoxEl = document.createElement("input");
    const deleteBtnEL = document.createElement("button");
    // Add attributes to checkbox
    checkBoxEl.type = "checkbox";
    checkBoxEl.checked = task.completed;
    // Add event listener to checkbox updtate task.completed
    checkBoxEl.addEventListener('change', (e) => {
        task.completed = checkBoxEl.checked;
        updateListData();
    });
    // Add delete button
    deleteBtnEL.addEventListener('click', (e) => {
        deleteListData(task.id);
    });
    deleteBtnEL.textContent = "Delete";
    // Add text to li element
    liEl.appendChild(checkBoxEl);
    liEl.append(task.name);
    liEl.appendChild(deleteBtnEL);
    listTodoEl.append(liEl);
    inputTodoEl.value = '';
}
// Get data from local storage
function readListData() {
    const myList = localStorage.getItem("myList");
    if (myList == null)
        return [];
    return JSON.parse(myList);
}
// Update data in local storage
function updateListData() {
    localStorage.setItem("myList", JSON.stringify(tasks));
}
// Delete data from local storage
function deleteListData(taskId) {
    console.log("Deleted: ", taskId);
    const index = tasks.findIndex(task => task.id == taskId);
    tasks.splice(index, 1);
    localStorage.setItem("myList", JSON.stringify(tasks));
    location.reload();
}
