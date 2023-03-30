const tasksList = [];
let isEditable = false;
let activeId = -1;
let taskId = 0;

const userInput = document.getElementById("user-input");
// adding an evenet listner funtion 
const keyPressListener = (event) => {
    // adding event key "Enter" to add functionality using Enter key
    if (event.key === "Enter") {
        const { value } = document.getElementById("user-input");
        // console.log("Value of in put is " , value);
        if (!isEditable) {
            addTask(value);
          } else {
            updateText(value);
          }
    }
};

// adding an evenet listner to get value push from input 
document.addEventListener("keypress", keyPressListener)
const addTask = (taskText) => {
    const obj = {
        id: ++taskId,
        title:taskText,
        isCompleted:false,
        createdAt:new Date().toLocaleDateString()
    }
    tasksList.push(obj);
    //destructing
    const currentId = obj.id;  
    // console.log(lastIndex);

    // Create a new list item (li)
    const taskItem = document.createElement("li");
    // taskItem.classList.add("task-item")
    taskItem.className = "task-item";
    taskItem.id = `item_${currentId}`;

    //HTML inner Text set
    taskItem.innerHTML = `<div class="checkbox" onclick="markAsComplete(${currentId})"></div>
<span>${obj.title}</span>
<button id="edit_${currentId}" onclick="updateTask(${currentId})">Edit</button>
<button onclick="deleteTask(${currentId})">Delete</button>`

    // access list of ("ul")

    const list = document.querySelector(".tasks-list");
    list.appendChild(taskItem);
    //reset the input field after adding.

    resetInputField();
};

// prepare the code for editing the task
const updateTask = (id) => {
    const currentTask = tasksList.find((t) => t.id === id);
    userInput.value = currentTask.title;
    isEditable = true;
    activeId = id;
};


//value modification in term of UI
const updateText = (taskText) =>{
    const currentTask = tasksList.find((t) => t.id === activeId);
    currentTask.title = taskText;

    const activeSpan = document.querySelector(`#item_${activeId} span`)

    activeSpan.innerText = taskText;

    isEditable = false;

    resetInputField();

    console.log(tasksList);
}
//reset Function for reset the input field
const resetInputField = () => {
    userInput.value = "";
}

//Mark As Compelete Functionality
const markAsComplete = (id) => {
    const currentTask = tasksList.find((t) => t.id === id);
    // const currentTask = tasksList[index];
    currentTask.isCompleted = !currentTask.isCompleted;

    // get desired list item

    const activeCheckbox = document.querySelector(`#item_${id} .checkbox`);

    activeCheckbox.classList.toggle("checkbox-filled");

    const currentTaskItem = document.querySelector(`#item_${id}`)
    currentTaskItem.classList.toggle("completed")
}

const deleteTask = (id) => {
    const index = tasksList.findIndex((t) => t.id === id);
    tasksList.splice(index, 1);

    const currentTaskItem = document.querySelector(`#item_${id}`)
    currentTaskItem.remove();

}