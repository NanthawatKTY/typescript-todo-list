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

    // Add attributes to checkbox
    checkBoxEl.type = "checkbox"
    checkBoxEl.checked = task.completed

    // Add event listener to checkbox updtate task.completed
    checkBoxEl.addEventListener('change', (e:Event) => {
        task.completed = checkBoxEl.checked
        updateListData()
    })

    // Add text to li element
    liEl.appendChild(checkBoxEl)
    liEl.append(task.name)
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