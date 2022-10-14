const inputTodoEl = document.getElementById('inputTodo')! as HTMLInputElement;
const formTodoEl = document.getElementById('formTodo')!;
const listTodoEl = document.getElementById('listTodo')!;

interface Task{
    id:number;
    name:string;
    completed:boolean; 
}

// Store data in local storage
const tasks:Task[] = readListData()

// Display data from local storage
tasks.forEach(createList)

formTodoEl.addEventListener('submit', saveData)

function saveData(e:SubmitEvent) {
    e.preventDefault();
    const newTask:Task = {
        id: Date.now(),
        name: inputTodoEl.value,
        completed: false
    }
    // Add new task to tasks array
    createList(newTask)

    // Save data in local storage
    tasks.push(newTask)
    // console.log(tasks);

    // Save data in local storage
    localStorage.setItem("myList", JSON.stringify(tasks))
}

function createList(task:Task) {
    const liEl = document.createElement("li")
    const checkBoxEl = document.createElement("input")
    const deleteBtnEL = document.createElement("button")

    // Add attributes to checkbox
    checkBoxEl.type = "checkbox"
    checkBoxEl.checked = task.completed

    // Add event listener to checkbox updtate task.completed
    checkBoxEl.addEventListener('change', (e:Event) => {
        task.completed = checkBoxEl.checked
        updateListData()
    })

    // Add delete button
    deleteBtnEL.addEventListener('click', (e:Event) => {
        deleteListData(task.id)
    })
    deleteBtnEL.textContent = "Delete"

    // Add text to li element
    liEl.appendChild(checkBoxEl)
    liEl.append(task.name)
    liEl.appendChild(deleteBtnEL)
    listTodoEl.append(liEl)
    inputTodoEl.value = ''
}

// Get data from local storage
function readListData(){
    const myList = localStorage.getItem("myList")
    if(myList == null) return []
    return JSON.parse(myList)
}

// Update data in local storage
function updateListData(){
    localStorage.setItem("myList", JSON.stringify(tasks))
}

// Delete data from local storage
function deleteListData(taskId:number | string){
    console.log("Deleted: ",taskId);
    const index = tasks.findIndex(task => task.id == taskId)
    tasks.splice(index, 1)
    localStorage.setItem("myList", JSON.stringify(tasks))
    location.reload()
}